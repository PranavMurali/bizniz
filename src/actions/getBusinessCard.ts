"use server";
import { auth } from "@/auth";
import { db } from "@/db/config";
import { businessCards} from "@/db/schema/cards"

import { eq } from 'drizzle-orm';

export const getBusinessCard = async () => {
    const session = await auth();
    const card = await db.select().from(businessCards).where(eq(businessCards.userId, session?.user?.id ?? ""))
    return card
}
