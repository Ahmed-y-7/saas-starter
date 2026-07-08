import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
        Next.js 16 · Prisma · Auth.js
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your SaaS starts here</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        A minimal, production-shaped foundation: real authentication, a
        PostgreSQL-backed dashboard, and settings. Build your product on top.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href={session?.user ? "/dashboard" : "/login"}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700">
          {session?.user ? "Go to dashboard" : "Get started"}
        </Link>
        <a href="https://nextjs.org/docs/app"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50">
          Docs
        </a>
      </div>
    </main>
  );
}
