"use server";
import { auth } from "@/auth";
import { infoFormSchema } from "@/components/info-form";
import { businessCards} from "@/db/schema/cards"
import { db } from "@/db/config";
import { z } from "zod";

export const updateCard = async (values: z.infer<typeof infoFormSchema> )=> {
    const session = await auth();
    await db.insert(businessCards).values({
        userId: session?.user.id,
        ownedBy: session?.user.id,
        ...values
    }).onConflictDoUpdate({
        target: businessCards.ownedBy,
        set: values
    })
    
    return true
}
