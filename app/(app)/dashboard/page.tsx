import { getStats, getActivity } from "@/lib/data";
import StatCard from "@/components/StatCard";

export default async function DashboardPage() {
  const [stats, activity] = await Promise.all([getStats(), getActivity()]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-slate-500">Here is what is happening today.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <ul className="mt-4 divide-y divide-slate-100">
          {activity.map((item, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <span className="text-sm">
                <span className="font-medium">{item.who}</span> {item.action}
              </span>
              <span className="text-xs text-slate-400">{item.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
