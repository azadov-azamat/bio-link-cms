import {
  DataTypes,
  QueryTypes,
  type QueryInterface,
  type Sequelize,
  type Transaction,
} from "sequelize";

async function tableExists(
  sequelize: Sequelize,
  tableName: string,
  transaction: Transaction,
) {
  const rows = await sequelize.query<{ exists: string | null }>(
    "SELECT to_regclass($1) AS exists;",
    {
      bind: [`public.${tableName}`],
      type: QueryTypes.SELECT,
      transaction,
    },
  );

  return Boolean(rows[0]?.exists);
}

export const migration = {
  name: "006-onboarding-attributions",
  async up(params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) {
    const { queryInterface, sequelize, transaction } = params;

    if (!(await tableExists(sequelize, "onboarding_attributions", transaction))) {
      await queryInterface.createTable(
        "onboarding_attributions",
        {
          user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          source: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
          },
          platforms: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction },
      );
    }

    await queryInterface.addIndex("onboarding_attributions", ["source"], {
      transaction,
      name: "onboarding_attributions_source_idx",
    }).catch(() => {});

    await sequelize.query(
      `
        INSERT INTO onboarding_attributions (user_id, source, platforms, created_at, updated_at)
        SELECT user_id, source, platforms, created_at, updated_at
        FROM profiles
        ON CONFLICT (user_id)
        DO UPDATE SET
          source = EXCLUDED.source,
          platforms = EXCLUDED.platforms,
          updated_at = NOW();
      `,
      { transaction },
    );
  },
};
