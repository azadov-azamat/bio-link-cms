import { QueryTypes, type QueryInterface, type Sequelize, type Transaction } from "sequelize";

async function indexExists(
  sequelize: Sequelize,
  indexName: string,
  transaction: Transaction,
) {
  const rows = await sequelize.query<{ exists: string | null }>(
    "SELECT to_regclass($1) AS exists;",
    {
      bind: [indexName],
      type: QueryTypes.SELECT,
      transaction,
    },
  );

  return Boolean(rows[0]?.exists);
}

export const migration = {
  name: "004-telegram-user-indexes",
  async up(params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) {
    const { queryInterface, sequelize, transaction } = params;

    if (
      !(await indexExists(
        sequelize,
        "public.users_provider_provider_user_id_idx",
        transaction,
      ))
    ) {
      await queryInterface.addIndex("users", ["provider", "provider_user_id"], {
        transaction,
        name: "users_provider_provider_user_id_idx",
      });
    }
  },
};
