import { DataTypes, type QueryInterface, type Sequelize, type Transaction } from "sequelize";

export const migration = {
  name: "001-initial-schema",
  async up(params: {
    queryInterface: QueryInterface;
    sequelize: Sequelize;
    transaction: Transaction;
  }) {
    const { queryInterface, transaction } = params;

    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        kind: {
          type: DataTypes.ENUM("guest", "oauth"),
          allowNull: false,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        provider_user_id: {
          type: DataTypes.STRING,
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

    await queryInterface.createTable(
      "sessions",
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
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        expires_at: {
          type: DataTypes.DATE,
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

    await queryInterface.createTable(
      "profiles",
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
        },
        platforms: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        template: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        logo_data: {
          type: DataTypes.BLOB("long"),
          allowNull: true,
        },
        logo_mime_type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        socials: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        websites: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        work_hours: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phones: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        google_maps: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM("draft", "ready"),
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

    await queryInterface.addIndex("sessions", ["user_id"], {
      transaction,
      name: "sessions_user_id_idx",
    });
    await queryInterface.addIndex("profiles", ["slug"], {
      unique: true,
      transaction,
      name: "profiles_slug_idx",
    });
  },
};
