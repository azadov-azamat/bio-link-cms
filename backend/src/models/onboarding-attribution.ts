import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class OnboardingAttribution extends Model<
  InferAttributes<OnboardingAttribution>,
  InferCreationAttributes<OnboardingAttribution>
> {
  declare userId: string;
  declare source: string;
  declare platforms: string[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initOnboardingAttributionModel(sequelize: Sequelize) {
  OnboardingAttribution.init(
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
      tableName: "onboarding_attributions",
      underscored: true,
    },
  );
}
