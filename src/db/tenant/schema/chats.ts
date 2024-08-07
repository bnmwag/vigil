import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tickets } from "./tickets";

export const chats = sqliteTable(
  "chats",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    ticket_id: integer("ticket_id").notNull(),
    message: text("message").notNull(),
    sender: text("sender", {
      enum: ["customer", "employee"],
    }).notNull(),
    timestamp: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  },
  (table) => ({
    ticket_id_index: index("ticket_id_index").on(table.ticket_id),
    timestamp_index: index("timestamp_index").on(table.timestamp),
  }),
);

export const chatsRelations = relations(chats, ({ one }) => ({
  tickets: one(tickets, {
    fields: [chats.ticket_id],
    references: [tickets.id],
  }),
}));

export type Chat = typeof chats.$inferSelect;
export type InsertChat = typeof chats.$inferInsert;
