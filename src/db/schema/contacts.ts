import { pgTable, text } from "drizzle-orm/pg-core";
import { businessCards } from "./cards";
import { users } from "./auth";

export const contacts = pgTable("contacts", {
    id: text("id")
        .$defaultFn(() => crypto.randomUUID())
        .primaryKey()
        .unique(),
    user: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    cardId: text("cardId")
        .notNull()
        .references(() => businessCards.id, { onDelete: "cascade" }),
    contact: text("contact")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});
