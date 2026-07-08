import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar email={session.user.email ?? ""} />
      <div className="flex-1 px-8 py-8">{children}</div>
    </div>
  );
}
