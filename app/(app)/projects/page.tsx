import { getProjects } from "@/lib/data";
import { createProject, renameProject, deleteProject } from "@/app/actions";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="mt-1 text-slate-500">Create, rename, and remove projects.</p>

      <form action={createProject} className="mt-6 flex gap-2">
        <input
          name="name"
          required
          placeholder="New project name"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700">
          Add
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
        {projects.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No projects yet. Add one above.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center gap-3 p-4">
                <form action={renameProject} className="flex flex-1 gap-2">
                  <input type="hidden" name="id" value={project.id} />
                  <input
                    name="name"
                    defaultValue={project.name}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                    Save
                  </button>
                </form>
                <span className="w-28 shrink-0 truncate text-xs text-slate-400">
                  {project.owner.name}
                </span>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
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
