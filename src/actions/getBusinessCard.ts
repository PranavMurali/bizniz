"use server";
import { auth } from "@/auth";
import { businessCards, db } from "@/db/schema"
import { eq } from 'drizzle-orm';

export const getBusinessCard = async () => {
    const session = await auth();
    const card = await db.select().from(businessCards).where(eq(businessCards.userId, session?.user?.id ?? ""))
    return card
}
