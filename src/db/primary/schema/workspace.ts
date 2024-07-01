import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

import { users, workspaceMemberships } from "./auth"; // Adjust the import path if necessary

export const workspaces = sqliteTable("workspaces", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  database_name: text("database_name").notNull(),
  database_auth_token: text("database_auth_token").notNull(),
  subdomain: text("subdomain").notNull(),
  owner_id: text("owner_id")
    .notNull()
    .references(() => users.id),
});

export const workspacesRelations = relations(workspaces, ({ many, one }) => ({
  users: many(workspaceMemberships),
  owner: one(users, {
    fields: [workspaces.owner_id],
    references: [users.id],
  }),
}));

export type Workspace = typeof workspaces.$inferSelect;
export type InsertWorkspace = typeof workspaces.$inferInsert;

export const insertWorkspaceSchema = createInsertSchema(workspaces);
export const selectWorkspaceSchema = createSelectSchema(workspaces);
