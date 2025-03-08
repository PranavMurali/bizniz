import { relations } from "drizzle-orm/relations";
import { user, businessCard, contacts, account, authenticator, session } from "./schema";

export const businessCardRelations = relations(businessCard, ({one, many}) => ({
	user: one(user, {
		fields: [businessCard.userId],
		references: [user.id]
	}),
	contacts: many(contacts),
}));

export const userRelations = relations(user, ({many}) => ({
	businessCards: many(businessCard),
	contacts_contact: many(contacts, {
		relationName: "contacts_contact_user_id"
	}),
	contacts_userId: many(contacts, {
		relationName: "contacts_userId_user_id"
	}),
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
}));

export const contactsRelations = relations(contacts, ({one}) => ({
	businessCard: one(businessCard, {
		fields: [contacts.cardId],
		references: [businessCard.id]
	}),
	user_contact: one(user, {
		fields: [contacts.contact],
		references: [user.id],
		relationName: "contacts_contact_user_id"
	}),
	user_userId: one(user, {
		fields: [contacts.userId],
		references: [user.id],
		relationName: "contacts_userId_user_id"
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));