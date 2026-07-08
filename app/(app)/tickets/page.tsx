import { getTickets } from "@/lib/data";
import { createTicket, toggleTicket, deleteTicket } from "@/app/actions";

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Tickets</h1>
      <p className="mt-1 text-slate-500">Add tickets and toggle them open or closed.</p>

      <form action={createTicket} className="mt-6 flex gap-2">
        <input
          name="title"
          required
          placeholder="Describe the issue"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700">
          Add
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
        {tickets.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No tickets yet. Add one above.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="flex items-center gap-3 p-4">
                <span
                  className={
                    ticket.status === "OPEN"
                      ? "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700"
                      : "rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                  }
                >
                  {ticket.status}
                </span>
                <span className="flex-1 text-sm">{ticket.title}</span>
                <form action={toggleTicket}>
                  <input type="hidden" name="id" value={ticket.id} />
                  <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                    {ticket.status === "OPEN" ? "Close" : "Reopen"}
                  </button>
                </form>
                <form action={deleteTicket}>
                  <input type="hidden" name="id" value={ticket.id} />
                  <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
