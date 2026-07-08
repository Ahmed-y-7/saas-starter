import { prisma } from "@/lib/prisma";

export type Stat = { label: string; value: string; change: string; positive: boolean };

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export async function getStats(): Promise<Stat[]> {
  const weekAgo = daysAgo(7);

  const [users, newUsers, projects, newProjects, open, closed] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.project.count(),
    prisma.project.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.count({ where: { status: "CLOSED" } }),
  ]);

  const total = open + closed;
  const resolved = total === 0 ? 0 : Math.round((closed / total) * 100);

  return [
    { label: "Total users", value: String(users), change: `+${newUsers} this week`, positive: newUsers >= 0 },
    { label: "Projects", value: String(projects), change: `+${newProjects} this week`, positive: newProjects >= 0 },
    { label: "Open tickets", value: String(open), change: `${closed} resolved`, positive: open === 0 },
    { label: "Resolution rate", value: `${resolved}%`, change: `${total} total tickets`, positive: resolved >= 50 },
  ];
}

export type Activity = { who: string; action: string; when: string };

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

export async function getActivity(): Promise<Activity[]> {
  const rows = await prisma.activity.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return rows.map((row) => ({
    who: row.user.name,
    action: row.action,
    when: relativeTime(row.createdAt),
  }));
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { owner: true },
  });
}

export async function getTickets() {
  return prisma.ticket.findMany({ orderBy: { createdAt: "desc" } });
}
