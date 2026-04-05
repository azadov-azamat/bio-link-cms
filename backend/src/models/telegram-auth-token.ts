import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class TelegramAuthToken extends Model<
  InferAttributes<TelegramAuthToken>,
  InferCreationAttributes<TelegramAuthToken>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare status: "pending" | "used" | "expired";
  declare expiresAt: Date;
  declare usedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initTelegramAuthTokenModel(sequelize: Sequelize) {
  TelegramAuthToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
      status: {
        type: DataTypes.ENUM("pending", "used", "expired"),
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expires_at",
      },
      usedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "used_at",
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
      tableName: "telegram_auth_tokens",
      underscored: true,
    },
  );
}
