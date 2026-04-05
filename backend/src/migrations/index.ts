import { QueryTypes, type QueryInterface, type Sequelize, type Transaction } from "sequelize";

import { migration as initialSchemaMigration } from "./001-initial-schema.js";
import { migration as telegramAuthMigration } from "./003-telegram-auth.js";
import { migration as telegramUserIndexesMigration } from "./004-telegram-user-indexes.js";
import { migration as onboardingMediaTemplatesMigration } from "./005-onboarding-media-templates.js";
import { migration as onboardingAttributionsMigration } from "./006-onboarding-attributions.js";

type Migration = {
  name: string;
  up: (params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) => Promise<void>;
};

const migrations: Migration[] = [
  initialSchemaMigration,
  telegramAuthMigration,
  telegramUserIndexesMigration,
  onboardingMediaTemplatesMigration,
  onboardingAttributionsMigration,
];

export async function runMigrations(sequelize: Sequelize) {
  const queryInterface = sequelize.getQueryInterface();

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
      "name" VARCHAR(255) PRIMARY KEY,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const rows = await sequelize.query<{ name: string }>(
    'SELECT "name" FROM "SequelizeMeta" ORDER BY "name" ASC;',
    {
      type: QueryTypes.SELECT,
    },
  );
  const applied = new Set(rows.map((row: { name: string }) => row.name));

  for (const migration of migrations) {
    if (applied.has(migration.name)) {
      continue;
    }

    await sequelize.transaction(async (transaction) => {
      await migration.up({
        queryInterface,
        sequelize,
        transaction,
      });

      await sequelize.query(
        'INSERT INTO "SequelizeMeta" ("name") VALUES ($1);',
        {
          bind: [migration.name],
          transaction,
        },
      );
    });
  }
}
