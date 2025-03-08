"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { contacts } from "@/db/schema/contacts";
import { eq, and } from "drizzle-orm";

export const shareCard = async ({ shareslug }: { shareslug: string }) => {
  const sharedCard = await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.shareslug, shareslug));

  if (sharedCard.length === 0) {
    throw new Error("Card not found");
  }

  const card = sharedCard[0];
  const cardId = card.id;
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const similarContact = await db
    .select()
    .from(contacts)
    .where(
      and(eq(contacts.user, session.user.id), eq(contacts.cardId, cardId))
    );

  if (similarContact.length > 0) {
    return 1;
  } else {
    await db.insert(contacts).values({
      user: session.user.id,
      cardId: cardId,
      contact: card?.userId,
    });
  }
};
