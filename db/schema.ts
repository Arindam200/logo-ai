import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


export const logosTable = pgTable('logos_table', {
  id: serial('id').primaryKey(),
  image_url: text('link').notNull(),
  primary_color: text('primary_color').notNull(),
  background_color: text('background_color').notNull(),
  username: text('username').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});


export type InsertLogo = typeof logosTable.$inferInsert;
export type SelectLogo = typeof logosTable.$inferSelect;
