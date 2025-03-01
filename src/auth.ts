import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      return session;
    },
  },
});
