import {
  DataTypes,
  QueryTypes,
  type QueryInterface,
  type Sequelize,
  type Transaction,
} from "sequelize";

async function columnExists(
  queryInterface: QueryInterface,
  tableName: string,
  columnName: string,
) {
  const definition = await queryInterface.describeTable(tableName);
  return columnName in definition;
}

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
  name: "003-telegram-auth",
  async up(params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) {
    const { queryInterface, sequelize, transaction } = params;

    if (!(await columnExists(queryInterface, "users", "phone"))) {
      await queryInterface.addColumn(
        "users",
        "phone",
        {
          type: DataTypes.STRING,
          allowNull: true,
        },
        { transaction },
      );
    }

    if (!(await columnExists(queryInterface, "users", "telegram_username"))) {
      await queryInterface.addColumn(
        "users",
        "telegram_username",
        {
          type: DataTypes.STRING,
          allowNull: true,
        },
        { transaction },
      );
    }

    if (!(await columnExists(queryInterface, "users", "first_name"))) {
      await queryInterface.addColumn(
        "users",
        "first_name",
        {
          type: DataTypes.STRING,
          allowNull: true,
        },
        { transaction },
      );
    }

    if (!(await columnExists(queryInterface, "users", "last_name"))) {
      await queryInterface.addColumn(
        "users",
        "last_name",
        {
          type: DataTypes.STRING,
          allowNull: true,
        },
        { transaction },
      );
    }

    if (!(await tableExists(sequelize, "telegram_auth_tokens", transaction))) {
      await queryInterface.createTable(
        "telegram_auth_tokens",
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
          user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          status: {
            type: DataTypes.ENUM("pending", "used", "expired"),
            allowNull: false,
          },
          expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          used_at: {
            type: DataTypes.DATE,
            allowNull: true,
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

      await queryInterface.addIndex("telegram_auth_tokens", ["user_id"], {
        transaction,
        name: "telegram_auth_tokens_user_id_idx",
      });
      await queryInterface.addIndex("telegram_auth_tokens", ["status"], {
        transaction,
        name: "telegram_auth_tokens_status_idx",
      });
    }
  },
};
