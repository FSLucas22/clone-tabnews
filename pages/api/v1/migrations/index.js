import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { InternalServerError } from "infra/errors";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method "${request.method}" not allowed!` });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient: dbClient,
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method == "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method == "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      const status = migratedMigrations.length == 0 ? 200 : 201;
      return response.status(status).json(migratedMigrations);
    }
  } catch (error) {
    console.log(error);
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    response.status(publicErrorObject.statusCode).json(publicErrorObject);
  } finally {
    dbClient?.end();
  }
}
