import { Client } from "pg";

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production",
  });

  await client.connect();
  return client;
}

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getVersion() {
  const queryResult = await query("SHOW server_version");
  const result = queryResult.rows[0].server_version;
  return result;
}

async function getMaxConnections() {
  const queryResult = await query("SHOW max_connections");
  const result = parseInt(queryResult.rows[0].max_connections);
  return result;
}

async function getActiveConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const queryResult = await query({
    text: "select count(1)::int as used_connections from pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  const result = parseInt(queryResult.rows[0].used_connections);
  return result;
}

export default {
  query,
  getVersion,
  getMaxConnections,
  getActiveConnections,
  clientFactory: getNewClient,
};
