"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards } from "@/db/schema/cards";
import { contacts } from "@/db/schema/contacts";
import { eq, and } from "drizzle-orm";
import { Tag } from "emblor";

export type BusinessCard = {
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
  edit: boolean | null;
  tags: Tag[];
  shareception: boolean;
  info_visibility: string[];
  styles: { [key: string]: any } | undefined;
};

export const getBusinessCard = async () => {
  const contactCards: BusinessCard[] = [];
  const session = await auth();
  const cards = await db
    .select()
    .from(contacts)
    .where(eq(contacts.user, session?.user?.id ?? ""))
    .innerJoin(businessCards, eq(contacts.cardId, businessCards.id));
  cards.forEach((card) => {
    if (card.businessCard.userId === session?.user?.id) {
      card.businessCard.shareception = true;
      card.businessCard.edit = true;
      card.businessCard.info_visibility = [
        "name",
        "title",
        "email",
        "phone",
        "company",
        "address",
        "tags",
        "website",
      ];
    }
    contactCards.push({
      ...card.businessCard,
      tags: card.businessCard?.tags as Tag[],
      edit: card.businessCard.edit ?? null,
      styles: card.businessCard.styles,
    });
  });
  return contactCards;
};

export const getMyCard = async () => {
  const session = await auth();
  const cards = await db
    .select()
    .from(businessCards)
    .where(eq(businessCards.userId, session?.user?.id ?? ""));
  
  return cards.map((card) => ({
    ...card,
    shareception: true,
    edit: true,
    info_visibility: [
      "name",
      "title",
      "email",
      "phone",
      "company",
      "address",
      "tags",
      "website",
    ],
    tags: card?.tags as Tag[],
    styles: card.styles,
  }));
};
