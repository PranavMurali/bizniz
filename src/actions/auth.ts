"use server";

import { signIn, signOut } from "@/auth";

export const githublogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const googlelogin = async () => {
  try{
    await signIn("google");
  } catch (error) {
    console.error(error);
  }
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
