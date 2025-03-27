"use server";
import { auth } from "@/auth";
import { SettingSchema } from "@/components/settings-form";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getExistingCard } from "./updateCard";
import { track } from "@vercel/analytics/server";

const updateCardSettings = async (
  cardId: string,
  values: z.infer<typeof SettingSchema>
) => {
  await db
    .update(businessCards)
    .set(values)
    .where(eq(businessCards.id, cardId));
  track("Card Settings Updated", {
    cardId: cardId,
  });
};

export const updateShareSettings = async (
  values: z.infer<typeof SettingSchema>
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Authentication failed");
  }
  const userId = session.user.id;
  const existingCard = await getExistingCard(userId);

  let cardId = "";
  if (existingCard.length > 0) {
    cardId = existingCard[0].id;
    await updateCardSettings(cardId, values);
  }
  return true;
};
