"use server";

import { auth, signIn, signOut } from "@/auth";

export const githublogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const googlelogin = async () => {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    //FIXME: CURRENT ISSUE WITH NEXT AUTH but /api/auth/signin works
    console.error(error);
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/let-me-in" });
};

export const getStatus = async () => {
  const a = await auth();
  if (a) {
    return true;
  } else {
    return false;
  }
};
