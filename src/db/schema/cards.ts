import {
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const businessCards = pgTable("businessCard", {
  id: text("id").$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  ownedBy: text("ownedBy")
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  title: text("title"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  website: text("website"),
  address: text("address"),
});
