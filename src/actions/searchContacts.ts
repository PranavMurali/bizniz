"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { contacts } from "@/db/schema/contacts";
import { eq, ilike, or, sql } from "drizzle-orm"; // Adjust the import path as necessary
import { BusinessCard } from "./getBusinessCard";
import { Tag } from "emblor";

export const searchContacts = async ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  console.log("Searching for", searchQuery);
  const session = await auth();
  if (!session) {
    throw new Error("Authentication failed");
  }
  const userId = session.user.id;

  const subQuery = db
    .select()
    .from(contacts)
    .where(eq(contacts.user, userId))
    .as("subQuery");
  const card: (Omit<BusinessCard, "edit"> & { edit?: boolean | null })[] = [];
  const results = await db
    .select()
    .from(businessCards)
    .innerJoin(subQuery, eq(subQuery.cardId, businessCards.id))
    .where(
      or(
        ilike(businessCards.name, `%${searchQuery}%`),
        ilike(businessCards.title, `%${searchQuery}%`),
        sql`CAST(${businessCards.tags} AS TEXT) ILIKE ${'%' + searchQuery + '%'}`
      )
    );
  results.forEach((res) => {
    card.push({
      ...res.businessCard,
      tags: res.businessCard.tags as Tag[],
      styles: res.businessCard.styles as { [key: string]: any } | undefined,
    });
  });
  return card;
};
