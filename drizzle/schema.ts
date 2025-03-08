import { pgTable, foreignKey, text, jsonb, timestamp, unique, integer, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const businessCard = pgTable("businessCard", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	name: text(),
	title: text(),
	email: text(),
	phone: text(),
	company: text(),
	website: text(),
	address: text(),
	shareslug: text(),
	tags: jsonb().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "businessCard_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const contacts = pgTable("contacts", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	cardId: text().notNull(),
	contact: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.cardId],
			foreignColumns: [businessCard.id],
			name: "contacts_cardId_businessCard_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.contact],
			foreignColumns: [user.id],
			name: "contacts_contact_user_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "contacts_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);
