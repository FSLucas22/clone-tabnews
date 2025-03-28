import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.getVersion();
  const maxConnections = await database.getMaxConnections();
  const activeConnections = await database.getActiveConnections();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: maxConnections,
        active_connections: activeConnections,
      },
    },
  });
}
