import database from "infra/database.js";

import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await killConnections();
});

async function killConnections() {
  const dbName = process.env.POSTGRES_DB;
  await database.query(
    `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = '${dbName}';`,
  );
}

const API_URL = "http://localhost:3000/api/v1";

describe("DELETE /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("deleting pending migrations", async () => {
      const response = await fetch(API_URL + "/migrations", {
        method: "DELETE",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint.",
        action:
          "Verifique se o método HTTP enviado é válido para este endpoint",
        status_code: 405,
      });

      const statusResponse = await fetch(API_URL + "/status");
      expect(statusResponse.status).toBe(200);
      const responseStatusBody = await statusResponse.json();
      expect(
        responseStatusBody.dependencies.database.active_connections,
      ).toEqual(1);
    });
  });
});
