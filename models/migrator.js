import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

function getDefaultMigrationOptions(dbClient) {
  return {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  };
}

async function listPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = getDefaultMigrationOptions(dbClient);

    const pendingMigrations = await migrationRunner(defaultMigrationOptions);

    return pendingMigrations;
  } finally {
    dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = getDefaultMigrationOptions(dbClient);

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
