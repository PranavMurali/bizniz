"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";

import { eq } from "drizzle-orm";

export const shareCard = async ({ shareid }) => {
  const sharedCard = await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.id, shareid));
  console.log(sharedCard);
  const card = sharedCard[0];

  if (!card) {
    throw new Error("Card not found");
  }

  const user = await auth();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { id, ...cardWithoutId } = card;
  const newCard = {
    ...cardWithoutId,
    ownerId: card.ownedBy,
    userId: user.user.id,
  };

  await db.insert(businessCards).values(newCard);
  return card;
};
