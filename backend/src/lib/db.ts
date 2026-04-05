import { Op, type Sequelize, type Transaction } from "sequelize";

import type {
  AuthSessionResponse,
  BasicStepInput,
  ContactsStepInput,
  DashboardResponse,
  MediaRecord,
  OnboardingStepId,
  PlatformsStepInput,
  ProfileRecord,
  SocialsStepInput,
  SourceStepInput,
  TemplateRecord,
  TemplateStepInput,
} from "../types/profile.js";
import { runMigrations } from "../migrations/index.js";
import {
  Media,
  OnboardingAttribution,
  Profile,
  Session,
  TelegramAuthToken,
  Template,
  User,
  createSequelize,
  initModels,
} from "../models/index.js";
import { encodeLogoDataUrl } from "./logo.js";
import { toSlug } from "./slug.js";

const SESSION_TTL_DAYS = 30;
const TELEGRAM_AUTH_TTL_MINUTES = 10;

export interface SessionWithUser {
  token: string;
  expiresAt: string;
  user: {
    id: string;
    kind: "guest" | "oauth";
    provider: string | null;
    providerUserId: string | null;
  };
}

type ProfileWithRelations = Profile & {
  templateEntity?: Template | null;
  logoMedia?: Media | null;
};

type OnboardingAttributionRecord = {
  source: string;
  platforms: string[];
};

type ProfileDraftDefaults = {
  userId: string;
  source: string;
  platforms: string[];
  template: string;
  templateId: string | null;
  logoData: Buffer | null;
  logoMimeType: string | null;
  logoMediaId: string | null;
  title: string;
  description: string;
  socials: Record<string, string>;
  websites: Array<{ name: string; url: string }>;
  workHours: string;
  phones: string[];
  googleMaps: string;
  slug: string;
  status: "draft" | "ready";
};

function nowPlusDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function nowPlusMinutes(minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

function normalizeTelegramValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function serializeTemplate(template: Template): TemplateRecord {
  return {
    id: template.id,
    key: template.key,
    name: template.name,
    description: template.description,
    sortOrder: template.sortOrder,
    isActive: template.isActive,
  };
}

function serializeMedia(media: Media): MediaRecord {
  return {
    id: media.id,
    url: encodeLogoDataUrl(media.data, media.mimeType) || "",
    mimeType: media.mimeType,
    fileName: media.fileName,
  };
}

function serializeProfile(
  userId: string,
  profile: ProfileWithRelations | null,
  attribution?: OnboardingAttributionRecord | null,
): ProfileRecord {
  const defaults = buildDraftDefaults(userId);
  const mediaUrl = profile?.logoMedia
    ? encodeLogoDataUrl(profile.logoMedia.data, profile.logoMedia.mimeType)
    : encodeLogoDataUrl(profile?.logoData ?? null, profile?.logoMimeType ?? null);
  const templateName =
    profile?.templateEntity?.name || profile?.template || "";
  const templateId =
    profile?.templateEntity?.id || profile?.templateId || "";

  return {
    source: attribution?.source ?? profile?.source ?? defaults.source,
    platforms:
      attribution?.platforms ?? profile?.platforms ?? defaults.platforms,
    template: templateName,
    templateId,
    logo: mediaUrl,
    logoMediaId: profile?.logoMedia?.id || profile?.logoMediaId || null,
    title: profile?.title ?? defaults.title,
    description: profile?.description ?? defaults.description,
    socials: profile?.socials ?? defaults.socials,
    websites: profile?.websites ?? defaults.websites,
    workHours: profile?.workHours ?? defaults.workHours,
    phones: profile?.phones ?? defaults.phones,
    googleMaps: profile?.googleMaps ?? defaults.googleMaps,
    slug: profile?.slug ?? defaults.slug,
    status: profile?.status ?? defaults.status,
  };
}

function serializeSessionWithUser(session: Session, user: User): SessionWithUser {
  return {
    token: session.token,
    expiresAt: session.expiresAt.toISOString(),
    user: {
      id: user.id,
      kind: user.kind,
      provider: user.provider,
      providerUserId: user.providerUserId,
    },
  };
}

function buildDraftDefaults(userId: string): ProfileDraftDefaults {
  return {
    userId,
    source: "",
    platforms: [],
    template: "",
    templateId: null,
    logoData: null,
    logoMimeType: null,
    logoMediaId: null,
    title: "",
    description: "",
    socials: {},
    websites: [{ name: "", url: "" }],
    workHours: "",
    phones: [""],
    googleMaps: "",
    slug: `draft-${userId.slice(0, 8)}`,
    status: "draft",
  };
}

export class DatabaseStore {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = createSequelize();
    initModels(this.sequelize);
  }

  async initialize() {
    await this.sequelize.authenticate();
    await runMigrations(this.sequelize);
  }

  async close() {
    await this.sequelize.close();
  }

  async createGuestSession(): Promise<SessionWithUser> {
    return this.sequelize.transaction(async (transaction) => {
      const user = await User.create(
        {
          kind: "guest",
          provider: null,
          providerUserId: null,
          phone: null,
          telegramUsername: null,
          firstName: null,
          lastName: null,
        },
        { transaction },
      );

      const session = await this.createSessionRecord(user.id, transaction);
      return serializeSessionWithUser(session, user);
    });
  }

  async findSessionByToken(token: string): Promise<SessionWithUser | null> {
    const session = await Session.findOne({
      where: { token },
      include: [{ model: User, as: "user", required: true }],
    });

    if (!session) {
      return null;
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await session.destroy();
      return null;
    }

    const user = session.get("user") as User;
    return serializeSessionWithUser(session, user);
  }

  async findUserSessionById(userId: string): Promise<SessionWithUser | null> {
    const user = await User.findByPk(userId);

    if (!user) {
      return null;
    }

    return {
      token: "",
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
      user: {
        id: user.id,
        kind: user.kind,
        provider: user.provider,
        providerUserId: user.providerUserId,
      },
    };
  }

  async getAuthSessionByUserId(userId: string): Promise<AuthSessionResponse | null> {
    const user = await User.findByPk(userId);

    if (!user) {
      return null;
    }

    return {
      authenticated: true,
      kind: user.kind,
      provider: user.provider,
      userId: user.id,
      telegramId:
        user.provider === "telegram" ? user.providerUserId || null : null,
    };
  }

  async findTelegramUserByTelegramId(telegramUserId: string): Promise<User | null> {
    return User.findOne({
      where: {
        provider: "telegram",
        providerUserId: telegramUserId,
      },
    });
  }

  async upsertTelegramUser(params: {
    telegramUserId: string;
    phone: string;
    telegramUsername?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }): Promise<User> {
    const telegramUserId = params.telegramUserId.trim();
    const phone = params.phone.trim();

    if (!telegramUserId || !phone) {
      throw new Error("Telegram user data is incomplete");
    }

    return this.sequelize.transaction(async (transaction) => {
      const existingUser = await User.findOne({
        where: {
          provider: "telegram",
          providerUserId: telegramUserId,
        },
        transaction,
      });

      const values = {
        kind: "oauth" as const,
        provider: "telegram",
        providerUserId: telegramUserId,
        phone,
        telegramUsername: normalizeTelegramValue(params.telegramUsername),
        firstName: normalizeTelegramValue(params.firstName),
        lastName: normalizeTelegramValue(params.lastName),
      };

      if (existingUser) {
        await existingUser.update(values, { transaction });
        return existingUser;
      }

      return User.create(values, { transaction });
    });
  }

  async createTelegramAuthToken(userId: string): Promise<{
    authUuid: string;
    expiresAt: string;
  }> {
    return this.sequelize.transaction(async (transaction) => {
      await TelegramAuthToken.update(
        {
          status: "expired",
          usedAt: new Date(),
        },
        {
          where: {
            userId,
            status: "pending",
            usedAt: null,
            expiresAt: {
              [Op.lte]: new Date(),
            },
          },
          transaction,
        },
      );

      const activeToken = await TelegramAuthToken.findOne({
        where: {
          userId,
          status: "pending",
          usedAt: null,
          expiresAt: {
            [Op.gt]: new Date(),
          },
        },
        order: [["createdAt", "DESC"]],
        transaction,
      });

      if (activeToken) {
        return {
          authUuid: activeToken.id,
          expiresAt: activeToken.expiresAt.toISOString(),
        };
      }

      const token = await TelegramAuthToken.create(
        {
          userId,
          status: "pending",
          expiresAt: nowPlusMinutes(TELEGRAM_AUTH_TTL_MINUTES),
          usedAt: null,
        },
        { transaction },
      );

      return {
        authUuid: token.id,
        expiresAt: token.expiresAt.toISOString(),
      };
    });
  }

  async consumeTelegramAuthToken(authUuid: string): Promise<{
    session: SessionWithUser;
    userId: string;
    telegramId: string;
  }> {
    return this.sequelize.transaction(async (transaction) => {
      const authToken = await TelegramAuthToken.findByPk(authUuid, {
        transaction,
      });

      if (!authToken) {
        throw new Error("Telegram auth token not found");
      }

      if (authToken.expiresAt.getTime() <= Date.now()) {
        await authToken.update(
          {
            status: "expired",
          },
          { transaction },
        );
        throw new Error("Telegram auth token expired");
      }

      const user = await User.findByPk(authToken.userId, { transaction });

      if (!user) {
        throw new Error("Telegram auth user not found");
      }

      if (authToken.status === "pending") {
        await authToken.update(
          {
            status: "used",
            usedAt: new Date(),
          },
          { transaction },
        );
      }

      const session = await this.createSessionRecord(user.id, transaction);

      return {
        session: serializeSessionWithUser(session, user),
        userId: user.id,
        telegramId: user.providerUserId || "",
      };
    });
  }

  async getTemplates(): Promise<TemplateRecord[]> {
    const templates = await Template.findAll({
      where: { isActive: true },
      order: [["sortOrder", "ASC"]],
    });

    return templates.map(serializeTemplate);
  }

  async createMedia(params: {
    userId: string;
    mimeType: string;
    fileName?: string | null;
    data: Buffer;
  }): Promise<MediaRecord> {
    const media = await Media.create({
      userId: params.userId,
      mimeType: params.mimeType,
      fileName: params.fileName || null,
      data: params.data,
    });

    return serializeMedia(media);
  }

  async getProfileByUserId(
    userId: string,
    transaction?: Transaction,
  ): Promise<ProfileRecord | null> {
    const [profile, attribution] = await Promise.all([
      Profile.findByPk(userId, {
        include: [
          { model: Template, as: "templateEntity", required: false },
          { model: Media, as: "logoMedia", required: false },
        ],
        transaction,
      }) as Promise<ProfileWithRelations | null>,
      this.getOnboardingAttributionByUserId(userId, transaction),
    ]);

    if (!profile && !attribution) {
      return null;
    }

    return serializeProfile(userId, profile, attribution);
  }

  async getDashboardByUserId(userId: string): Promise<DashboardResponse | null> {
    const [user, profile] = await Promise.all([
      User.findByPk(userId),
      this.getProfileByUserId(userId),
    ]);

    if (!user || !profile) {
      return null;
    }

    return {
      profile,
      isGuest: user.kind === "guest",
      claimRequired: user.kind === "guest",
    };
  }

  async saveOnboardingStep(
    userId: string,
    stepId: OnboardingStepId,
    payload:
      | SourceStepInput
      | PlatformsStepInput
      | TemplateStepInput
      | BasicStepInput
      | SocialsStepInput
      | ContactsStepInput,
  ): Promise<ProfileRecord> {
    return this.sequelize.transaction(async (transaction) => {
      const existing = await Profile.findByPk(userId, {
        include: [
          { model: Template, as: "templateEntity", required: false },
          { model: Media, as: "logoMedia", required: false },
        ],
        transaction,
      }) as ProfileWithRelations | null;
      const attribution = await OnboardingAttribution.findByPk(userId, {
        transaction,
      });

      const base = this.buildProfileDraftValues(userId, existing);
      const nextValues: Partial<ProfileDraftDefaults> = {
        status: "draft",
      };

      if (stepId === "source") {
        await this.upsertOnboardingAttribution(
          userId,
          {
            source: (payload as SourceStepInput).source,
            platforms: attribution?.platforms ?? [],
          },
          transaction,
        );

        const profile = await this.getProfileByUserId(userId, transaction);

        if (!profile) {
          throw new Error("Onboarding source step was not saved");
        }

        return profile;
      }

      if (stepId === "platforms") {
        await this.upsertOnboardingAttribution(
          userId,
          {
            source: attribution?.source ?? "",
            platforms: (payload as PlatformsStepInput).platforms,
          },
          transaction,
        );

        const profile = await this.getProfileByUserId(userId, transaction);

        if (!profile) {
          throw new Error("Onboarding platforms step was not saved");
        }

        return profile;
      }

      if (stepId === "template") {
        const templateId = (payload as TemplateStepInput).templateId || null;

        if (!templateId) {
          nextValues.templateId = null;
          nextValues.template = "";
        } else {
          const template = await this.findTemplateById(templateId, transaction);

          if (!template) {
            throw new Error("Template not found");
          }

          nextValues.templateId = template.id;
          nextValues.template = template.name;
        }
      }

      if (stepId === "basic") {
        const basicPayload = payload as BasicStepInput;
        nextValues.title = basicPayload.title;
        nextValues.description = basicPayload.description;

        if (basicPayload.logoMediaId === null) {
          nextValues.logoMediaId = null;
          nextValues.logoData = null;
          nextValues.logoMimeType = null;
        } else if (basicPayload.logoMediaId) {
          const media = await this.findUserMediaById(
            userId,
            basicPayload.logoMediaId,
            transaction,
          );

          if (!media) {
            throw new Error("Uploaded media not found");
          }

          nextValues.logoMediaId = media.id;
          nextValues.logoData = null;
          nextValues.logoMimeType = null;
        }
      }

      if (stepId === "socials") {
        const socialsPayload = payload as SocialsStepInput;
        nextValues.socials = socialsPayload.socials;
        nextValues.websites = socialsPayload.websites.length
          ? socialsPayload.websites
          : [{ name: "", url: "" }];
      }

      if (stepId === "contacts") {
        const contactsPayload = payload as ContactsStepInput;
        nextValues.workHours = contactsPayload.workHours;
        nextValues.phones = contactsPayload.phones.length
          ? contactsPayload.phones
          : [""];
        nextValues.googleMaps = contactsPayload.googleMaps;
      }

      const values = {
        ...base,
        ...nextValues,
      };

      if (existing) {
        await existing.update(values, { transaction });
      } else {
        await Profile.create(values, { transaction });
      }

      const profile = await this.getProfileByUserId(userId, transaction);

      if (!profile) {
        throw new Error("Onboarding draft was not saved");
      }

      return profile;
    });
  }

  async completeOnboarding(userId: string): Promise<ProfileRecord> {
    return this.sequelize.transaction(async (transaction) => {
      const attribution = await OnboardingAttribution.findByPk(userId, {
        transaction,
      });
      const profile = await Profile.findByPk(userId, {
        include: [
          { model: Template, as: "templateEntity", required: false },
          { model: Media, as: "logoMedia", required: false },
        ],
        transaction,
      }) as ProfileWithRelations | null;

      if (!profile) {
        throw new Error("Onboarding draft not found");
      }

      if (!attribution?.source.trim()) {
        throw new Error("Source step is required");
      }

      if (!attribution.platforms.length) {
        throw new Error("Platforms step is required");
      }

      if (!profile.templateId) {
        throw new Error("Template step is required");
      }

      if (!profile.title.trim()) {
        throw new Error("Basic information step is required");
      }

      const slug = await this.createUniqueSlug(userId, profile.title, transaction);

      await profile.update(
        {
          slug,
          status: "ready",
        },
        { transaction },
      );

      const completedProfile = await this.getProfileByUserId(
        userId,
        transaction,
      );

      if (!completedProfile) {
        throw new Error("Profile completion failed");
      }

      return completedProfile;
    });
  }

  private async createSessionRecord(userId: string, transaction: Transaction) {
    return Session.create(
      {
        userId,
        token: crypto.randomUUID(),
        expiresAt: nowPlusDays(SESSION_TTL_DAYS),
      },
      { transaction },
    );
  }

  private buildProfileDraftValues(
    userId: string,
    existing: ProfileWithRelations | null,
  ): ProfileDraftDefaults {
    const defaults = buildDraftDefaults(userId);

    if (!existing) {
      return defaults;
    }

    return {
      userId,
      source: existing.source,
      platforms: existing.platforms,
      template: existing.templateEntity?.name || existing.template || "",
      templateId: existing.templateEntity?.id || existing.templateId || null,
      logoData: existing.logoData,
      logoMimeType: existing.logoMimeType,
      logoMediaId: existing.logoMedia?.id || existing.logoMediaId || null,
      title: existing.title,
      description: existing.description,
      socials: existing.socials,
      websites: existing.websites.length
        ? existing.websites
        : defaults.websites,
      workHours: existing.workHours,
      phones: existing.phones.length ? existing.phones : defaults.phones,
      googleMaps: existing.googleMaps,
      slug: existing.slug || defaults.slug,
      status: existing.status,
    };
  }

  private async getOnboardingAttributionByUserId(
    userId: string,
    transaction?: Transaction,
  ): Promise<OnboardingAttributionRecord | null> {
    const resolvedAttribution = await OnboardingAttribution.findByPk(userId, {
      transaction,
    });

    if (!resolvedAttribution) {
      return null;
    }

    return {
      source: resolvedAttribution.source,
      platforms: resolvedAttribution.platforms,
    };
  }

  private async upsertOnboardingAttribution(
    userId: string,
    values: OnboardingAttributionRecord,
    transaction?: Transaction,
  ) {
    const existing = await OnboardingAttribution.findByPk(userId, {
      transaction,
    });

    if (existing) {
      await existing.update(values, { transaction });
      return existing;
    }

    return OnboardingAttribution.create(
      {
        userId,
        source: values.source,
        platforms: values.platforms,
      },
      { transaction },
    );
  }

  private async findTemplateById(id: string, transaction?: Transaction) {
    return Template.findOne({
      where: {
        id,
        isActive: true,
      },
      transaction,
    });
  }

  private async findUserMediaById(
    userId: string,
    mediaId: string,
    transaction?: Transaction,
  ) {
    return Media.findOne({
      where: {
        id: mediaId,
        userId,
      },
      transaction,
    });
  }

  private async createUniqueSlug(
    userId: string,
    title: string,
    transaction?: Transaction,
  ) {
    const baseSlug = toSlug(title) || "profile";

    const existingProfiles = await Profile.findAll({
      where: {
        userId: {
          [Op.ne]: userId,
        },
        [Op.or]: [
          { slug: baseSlug },
          {
            slug: {
              [Op.like]: `${baseSlug}-%`,
            },
          },
        ],
      },
      attributes: ["slug"],
      transaction,
    });

    const taken = new Set(existingProfiles.map((profile) => profile.slug));

    if (!taken.has(baseSlug)) {
      return baseSlug;
    }

    let suffix = 2;
    while (taken.has(`${baseSlug}-${suffix}`)) {
      suffix += 1;
    }

    return `${baseSlug}-${suffix}`;
  }
}
