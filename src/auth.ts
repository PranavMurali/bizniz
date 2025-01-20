import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/schema"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
});
