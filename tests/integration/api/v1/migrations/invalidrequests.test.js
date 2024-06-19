import database from "infra/database.js";

beforeAll(killConnections);

async function killConnections() {
  const dbName = process.env.POSTGRES_DB;
  await database.query(
    `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = '${dbName}';`,
  );
}

const API_URL = "http://localhost:3000/api/v1";
test("/api/v1/migrations should return 403 and close connections when request method is invalid", async () => {
  const response = await fetch(API_URL + "/migrations", {
    method: "DELETE",
  });
  expect(response.status).toBe(405);

  const statusResponse = await fetch(API_URL + "/status");
  expect(statusResponse.status).toBe(200);
  const responseStatusBody = await statusResponse.json();
  expect(responseStatusBody.dependencies.database.active_connections).toEqual(
    1,
  );
});
