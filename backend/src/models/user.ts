import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare kind: "guest" | "oauth";
  declare provider: string | null;
  declare providerUserId: string | null;
  declare phone: string | null;
  declare telegramUsername: string | null;
  declare firstName: string | null;
  declare lastName: string | null;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      kind: {
        type: DataTypes.ENUM("guest", "oauth"),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      providerUserId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "provider_user_id",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telegramUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "telegram_username",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "users",
      underscored: true,
    },
  );
}
