"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";

import { eq } from "drizzle-orm";

export const shareCard = async ({ shareid }: { shareid: string }) => {
  const sharedCard = await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.id, shareid));

  if (sharedCard.length === 0) {
    throw new Error("Card not found");
  }

  const card = sharedCard[0];
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const { id, ...cardWithoutId } = card;
  const newCard = {
    ...cardWithoutId,
    ownerId: card.ownedBy,
    userId: session.user.id,
  };

  const similarCard = await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.id, id));

  if (similarCard.length > 0) {
    await db.update(businessCards).set(newCard).where(eq(businessCards.id, id));
  } else {
    await db.insert(businessCards).values(newCard);
  }
};
