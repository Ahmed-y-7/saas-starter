"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/app/actions";

export default function RegisterPage() {
  const [error, formAction, pending] = useActionState(register, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Start using the dashboard.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input id="name" name="name" type="text" required placeholder="Ada Lovelace"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="password" name="password" type="password" required minLength={6} placeholder="At least 6 characters"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" disabled={pending}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60">
            {pending ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
