import { json, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const businessCards = pgTable("businessCard", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  title: text("title"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  website: text("website"),
  address: text("address"),
  shareslug: text("shareslug")
    .$defaultFn(() => Math.random().toString(36).substring(2, 12)),
  tags: json("tags").notNull(),
});

