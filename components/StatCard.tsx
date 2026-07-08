import type { Stat } from "@/lib/data";

export default function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{stat.label}</p>
      <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
      <p className={stat.positive ? "mt-1 text-sm text-emerald-600" : "mt-1 text-sm text-rose-600"}>
        {stat.change}
      </p>
    </div>
  );
}
