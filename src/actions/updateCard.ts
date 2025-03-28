"use server";
import { auth } from "@/auth";
import { infoFormSchema } from "@/components/info-form";
import { businessCards } from "@/db/schema/cards";
import { db } from "@/db/config";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { contacts } from "@/db/schema/contacts";
import { track } from "@vercel/analytics/server";

const initialCardData = {
  backgroundColor: "#000000",
  textColor: "#ffffff",
  secondaryTextColor: "#888888",
};

export const getExistingCard = async (userId: string) => {
  return await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.userId, userId));
};

const updateExistingCard = async (
  cardId: string,
  values: z.infer<typeof infoFormSchema>
) => {
  await db
    .update(businessCards)
    .set(values)
    .where(eq(businessCards.id, cardId));
  track("Existing Card Updated", {
    cardId: cardId,
  });
};

const insertNewCard = async (
  userId: string,
  values: z.infer<typeof infoFormSchema>
) => {
  const insertedCard = await db
    .insert(businessCards)
    .values([
      {
        userId,
        ...values,
        styles: initialCardData,
        shareception: values.shareception ?? true,
      },
    ])
    .onConflictDoUpdate({
      target: businessCards.id,
      set: values,
    })
    .returning({ id: businessCards.id });
  track("Card Created", {
    userId,
    cardId: insertedCard[0].id,
  });
  return insertedCard[0].id;
};

const getExistingContact = async (cardId: string) => {
  return await db.select().from(contacts).where(eq(contacts.cardId, cardId));
};

const insertNewContact = async (userId: string, cardId: string) => {
  await db
    .insert(contacts)
    .values([{ user: userId, cardId, contact: userId }])
    .onConflictDoNothing();
};

export const updateCard = async (values: z.infer<typeof infoFormSchema>) => {
  const session = await auth();
  if (!session) {
    throw new Error("Authentication failed");
  }

  const userId = session.user.id;
  const existingCard = await getExistingCard(userId);

  let cardId = "";
  if (existingCard.length > 0) {
    cardId = existingCard[0].id;
    await updateExistingCard(cardId, values);
  } else {
    cardId = await insertNewCard(userId, values);
  }

  const existingContact = await getExistingContact(cardId);
  if (existingContact.length === 0) {
    await insertNewContact(userId, cardId);
  }

  return true;
};
