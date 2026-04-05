import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class Profile extends Model<
  InferAttributes<Profile>,
  InferCreationAttributes<Profile>
> {
  declare userId: string;
  declare source: string;
  declare platforms: string[];
  declare template: string;
  declare templateId: string | null;
  declare logoData: Buffer | null;
  declare logoMimeType: string | null;
  declare logoMediaId: string | null;
  declare title: string;
  declare description: string;
  declare socials: Record<string, string>;
  declare websites: Array<{ name: string; url: string }>;
  declare workHours: string;
  declare phones: string[];
  declare googleMaps: string;
  declare slug: string;
  declare status: "draft" | "ready";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initProfileModel(sequelize: Sequelize) {
  Profile.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        field: "user_id",
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
      templateId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "template_id",
      },
      logoData: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
        field: "logo_data",
      },
      logoMimeType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "logo_mime_type",
      },
      logoMediaId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "logo_media_id",
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
      workHours: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "work_hours",
      },
      phones: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      googleMaps: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "google_maps",
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
      tableName: "profiles",
      underscored: true,
    },
  );
}
