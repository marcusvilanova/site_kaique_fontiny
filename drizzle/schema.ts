import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// CMS Content (Text fields)
export const cmsContent = mysqlTable("cms_content", {
  id: int("id").autoincrement().primaryKey(),
  section: varchar("section", { length: 64 }).notNull(), // e.g., "hero", "about"
  key: varchar("key", { length: 64 }).notNull().unique(), // e.g., "hero_title", "about_text"
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// CMS Photos (Gallery & Assets)
export const cmsPhotos = mysqlTable("cms_photos", {
  id: int("id").autoincrement().primaryKey(),
  section: varchar("section", { length: 64 }).notNull(), // e.g., "gallery", "hero_bg", "brands"
  src: text("src").notNull(), // URL (Google Drive or Upload)
  alt: varchar("alt", { length: 255 }),
  title: varchar("title", { length: 255 }),
  category: varchar("category", { length: 64 }), // e.g., "fashion", "portrait"
  description: text("description"),
  order: int("order").default(0),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CmsContent = typeof cmsContent.$inferSelect;
export type InsertCmsContent = typeof cmsContent.$inferInsert;

export type CmsPhoto = typeof cmsPhotos.$inferSelect;
export type InsertCmsPhoto = typeof cmsPhotos.$inferInsert;