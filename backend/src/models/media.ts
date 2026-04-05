import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class Media extends Model<
  InferAttributes<Media>,
  InferCreationAttributes<Media>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare mimeType: string;
  declare fileName: string | null;
  declare data: Buffer;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initMediaModel(sequelize: Sequelize) {
  Media.init(
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
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "mime_type",
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "file_name",
      },
      data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
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
      tableName: "media",
      underscored: true,
    },
  );
}
