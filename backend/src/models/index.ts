import { Sequelize } from "sequelize";

import { initMediaModel, Media } from "./media.js";
import {
  initOnboardingAttributionModel,
  OnboardingAttribution,
} from "./onboarding-attribution.js";
import { initProfileModel, Profile } from "./profile.js";
import { initSessionModel, Session } from "./session.js";
import {
  initTelegramAuthTokenModel,
  TelegramAuthToken,
} from "./telegram-auth-token.js";
import { initTemplateModel, Template } from "./template.js";
import { initUserModel, User } from "./user.js";

export function createSequelize() {
  const databaseUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@127.0.0.1:5432/biosahifa";

  const explicitSsl = process.env.DATABASE_SSL?.trim().toLowerCase();
  const shouldUseSsl =
    explicitSsl === "true" ||
    explicitSsl === "1" ||
    explicitSsl === "require" ||
    (() => {
      try {
        const parsed = new URL(databaseUrl);
        const sslMode = parsed.searchParams.get("sslmode");

        if (sslMode && sslMode !== "disable") {
          return true;
        }

        return !["127.0.0.1", "localhost"].includes(parsed.hostname);
      } catch {
        return false;
      }
    })();

  return new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: shouldUseSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : undefined,
  });
}

export function initModels(sequelize: Sequelize) {
  initUserModel(sequelize);
  initSessionModel(sequelize);
  initMediaModel(sequelize);
  initOnboardingAttributionModel(sequelize);
  initTemplateModel(sequelize);
  initProfileModel(sequelize);
  initTelegramAuthTokenModel(sequelize);

  User.hasMany(Session, {
    foreignKey: "userId",
    as: "sessions",
  });
  Session.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasOne(Profile, {
    foreignKey: "userId",
    as: "profile",
  });
  Profile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasOne(OnboardingAttribution, {
    foreignKey: "userId",
    as: "onboardingAttribution",
  });
  OnboardingAttribution.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(Media, {
    foreignKey: "userId",
    as: "mediaItems",
  });
  Media.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Template.hasMany(Profile, {
    foreignKey: "templateId",
    as: "profiles",
  });
  Profile.belongsTo(Template, {
    foreignKey: "templateId",
    as: "templateEntity",
  });

  Media.hasMany(Profile, {
    foreignKey: "logoMediaId",
    as: "logoProfiles",
  });
  Profile.belongsTo(Media, {
    foreignKey: "logoMediaId",
    as: "logoMedia",
  });

  User.hasMany(TelegramAuthToken, {
    foreignKey: "userId",
    as: "telegramAuthTokens",
  });
  TelegramAuthToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  return {
    User,
    Session,
    Media,
    OnboardingAttribution,
    Profile,
    Template,
    TelegramAuthToken,
  };
}

export {
  Media,
  OnboardingAttribution,
  Profile,
  Session,
  TelegramAuthToken,
  Template,
  User,
};
