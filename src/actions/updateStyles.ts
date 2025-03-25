"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getExistingCard } from "./updateCard";
import { StylesSchema } from "@/components/card-editor";

const updateCardStyles = async (
  cardId: string,
  values: z.infer<typeof StylesSchema>
) => {
  await db
    .update(businessCards)
    .set({
        styles: values
    })
    .where(eq(businessCards.id, cardId));
};

export const updateStyles = async (
  values: z.infer<typeof StylesSchema>
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Authentication failed");
  }
  console.log("values", values);
  const userId = session.user.id;
  const existingCard = await getExistingCard(userId);

  let cardId = "";
  if (existingCard.length > 0) {
    cardId = existingCard[0].id;
    await updateCardStyles(cardId, values);
  }
  return true;
};
