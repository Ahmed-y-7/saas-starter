import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-slate-500">Manage your account.</p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input defaultValue={session?.user?.name ?? ""} readOnly
              className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input defaultValue={session?.user?.email ?? ""} readOnly
              className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
