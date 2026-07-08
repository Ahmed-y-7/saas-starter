import Link from "next/link";
import { logout } from "@/app/actions";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/tickets", label: "Tickets" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar({ email }: { email: string }) {
  return (
    <aside className="flex w-60 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <div className="px-2 text-lg font-semibold">◆ SaaS Starter</div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-200 pt-4">
        <p className="truncate px-3 text-xs text-slate-500">{email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
