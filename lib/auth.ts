import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export type Session = { email: string };

// Reads the current session from the cookie (null if signed out).
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    return JSON.parse(value) as Session;
  } catch {
    return null;
  }
}

// NOTE: This is a DEMO auth flow — it trusts any email/password so the
// starter runs with zero setup. Replace with Auth.js (next-auth) + a real
// database before shipping anything real. See README "Next steps".
export async function createSession(email: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify({ email }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
