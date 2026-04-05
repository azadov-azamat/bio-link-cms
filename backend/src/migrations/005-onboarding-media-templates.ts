import {
  DataTypes,
  QueryTypes,
  type QueryInterface,
  type Sequelize,
  type Transaction,
} from "sequelize";

const TEMPLATE_SEED = [
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000001", key: "minimal-oq", name: "Minimal oq", sortOrder: 1 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000002", key: "qora-premium", name: "Qora premium", sortOrder: 2 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000003", key: "gradient", name: "Gradient", sortOrder: 3 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000004", key: "biznes", name: "Biznes", sortOrder: 4 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000005", key: "kreativ", name: "Kreativ", sortOrder: 5 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000006", key: "soft-pastel", name: "Soft pastel", sortOrder: 6 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000007", key: "dark-glass", name: "Dark glass", sortOrder: 7 },
  { id: "d9547e40-1f2a-4a9b-8aaf-000000000008", key: "bold-social", name: "Bold social", sortOrder: 8 },
] as const;

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
  name: "005-onboarding-media-templates",
  async up(params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) {
    const { queryInterface, sequelize, transaction } = params;

    if (!(await tableExists(sequelize, "templates", transaction))) {
      await queryInterface.createTable(
        "templates",
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
          key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          sort_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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

      await queryInterface.addIndex("templates", ["sort_order"], {
        transaction,
        name: "templates_sort_order_idx",
      });
    }

    if (!(await tableExists(sequelize, "media", transaction))) {
      await queryInterface.createTable(
        "media",
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
          mime_type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          file_name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          data: {
            type: DataTypes.BLOB("long"),
            allowNull: false,
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

      await queryInterface.addIndex("media", ["user_id"], {
        transaction,
        name: "media_user_id_idx",
      });
    }

    if (!(await columnExists(queryInterface, "profiles", "template_id"))) {
      await queryInterface.addColumn(
        "profiles",
        "template_id",
        {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "templates",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        { transaction },
      );
    }

    if (!(await columnExists(queryInterface, "profiles", "logo_media_id"))) {
      await queryInterface.addColumn(
        "profiles",
        "logo_media_id",
        {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "media",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        { transaction },
      );
    }

    await queryInterface.addIndex("profiles", ["template_id"], {
      transaction,
      name: "profiles_template_id_idx",
    }).catch(() => {});

    await queryInterface.addIndex("profiles", ["logo_media_id"], {
      transaction,
      name: "profiles_logo_media_id_idx",
    }).catch(() => {});

    for (const template of TEMPLATE_SEED) {
      await sequelize.query(
        `
          INSERT INTO templates (id, key, name, description, sort_order, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, NULL, $4, TRUE, NOW(), NOW())
          ON CONFLICT (key)
          DO UPDATE SET id = EXCLUDED.id, name = EXCLUDED.name, sort_order = EXCLUDED.sort_order, updated_at = NOW();
        `,
        {
          bind: [template.id, template.key, template.name, template.sortOrder],
          transaction,
        },
      );
    }
  },
};
