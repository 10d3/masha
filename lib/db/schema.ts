import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  index,
  integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Better-Auth Required Tables ────────────────────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


// ─── Projects ────────────────────────────────────────────────────────────────

/**
 * A project entry shown on the portfolio homepage and its own slug detail page.
 * The slug detail page is designed to impress recruiters, so the schema
 * supports rich content beyond the card: full description, challenges,
 * outcomes, multiple screenshots, role, team size, and duration.
 */
export const projects = pgTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Core
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  body: text("body"),
  order: integer("order").default(0).notNull(),

  // Meta
  category: text("category"),
  client: text("client"),
  timeline: text("timeline"),
  year: text("year"),
  dates: text("dates").notNull(),
  active: boolean("active").default(false).notNull(),

  // Media
  videoUrl: text("video_url"),
  heroImage: text("hero_image"),
  gallery: jsonb("gallery").$type<{
    src: string
    alt: string
    span?: "full" | "half"
  }[]>(),
  fullWidthImages: jsonb("full_width_images").$type<{
    src: string
    alt: string
    caption?: string
  }[]>(),

  // Case study sections
  overview: jsonb("overview").$type<{
    mainText: string
    subText: string
    services: string[]
  }>(),
  process: jsonb("process").$type<{
    sectionTitle: string
    steps: {
      number: string
      title: string
      description: string
      image: string
    }[]
  }>(),
  results: jsonb("results").$type<{
    introText: string
    stats: { value: string; label: string }[]
    testimonial: {
      quote: string
      authorName: string
      authorTitle: string
    }
  }>(),

  // Technologies & links
  technologies: text("technologies").array(),
  siteUrl: text("site_url"),
  sourceUrl: text("source_url"),

  // Recruiter fields
  role: text("role"),
  teamSize: text("team_size"),
  challenges: jsonb("challenges").$type<string[]>(),
  outcomes: jsonb("outcomes").$type<string[]>(),
  features: jsonb("features").$type<{ title: string; description: string }[]>(),

  // SEO
  metaDescription: text("meta_description"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
},
(table) => [
  index("projects_active_idx").on(table.active),
  index("projects_order_idx").on(table.order),
  index("projects_createdAt_idx").on(table.createdAt),
])

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),

  /** Tiptap HTML content. */
  content: text("content"),

  imageUrl: text("image_url"),
  keywords: text("keywords").array(),

  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Type Exports ────────────────────────────────────────────────────────────

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
