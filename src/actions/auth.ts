"use server";

import { signIn, signOut } from "@/auth";

console.log("auth", signIn, signOut);
export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
