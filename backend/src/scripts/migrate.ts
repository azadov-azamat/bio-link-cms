import "../env.js";

import { createSequelize } from "../models/index.js";
import { runMigrations } from "../migrations/index.js";

const sequelize = createSequelize();

try {
  await sequelize.authenticate();
  await runMigrations(sequelize);
  console.log("Migrations completed");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
