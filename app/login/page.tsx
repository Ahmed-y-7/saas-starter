"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" disabled={pending}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          No account?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:underline">Create one</Link>
        </p>
      </div>
    </main>
  );
}
