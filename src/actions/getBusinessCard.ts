"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { contacts } from "@/db/schema/contacts";
import { eq } from "drizzle-orm";

export const getBusinessCard = async () => {
  const contactCards: Array<{
    id: string;
    name: string | null;
    email: string | null;
    userId: string;
    title: string | null;
    phone: string | null;
    company: string | null;
    website: string | null;
    address: string | null;
    shareslug: string | null;
    tags: string[],
  }> = [];

  const session = await auth();
  const cards = await db
    .select()
    .from(contacts)
    .where(eq(contacts.user, session?.user?.id ?? ""))
    .innerJoin(businessCards, eq(contacts.cardId, businessCards.id));
  cards.forEach((card) => {
    contactCards.push({
      ...card.businessCard,
      tags: card.businessCard?.tags as string[],
    });
  });
  return contactCards;
};
