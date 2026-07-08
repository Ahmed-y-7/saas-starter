"use server";

import { revalidatePath } from "next/cache";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

// Returned message is surfaced by the form via useActionState.
export async function login(_prev: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) return "Invalid email or password.";
    throw error; // re-throw the redirect that signIn uses on success
  }
}

export async function register(_prev: string | undefined, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 6) {
    return "Enter a name, a valid email, and a password of at least 6 characters.";
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return "An account with that email already exists.";

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashed } });

  // Sign the new user in immediately.
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

// ---------------------------------------------------------------------------
// Dashboard CRUD — projects & tickets. Each mutation revalidates the pages
// that display the data so the UI (and dashboard stats) refresh immediately.
// ---------------------------------------------------------------------------


async function currentUserId(): Promise<string | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  return user?.id ?? null;
}

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const ownerId = await currentUserId();
  if (!ownerId) return;
  await prisma.project.create({ data: { name, ownerId } });
  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function renameProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) return;
  await prisma.project.update({ where: { id }, data: { name } });
  revalidatePath("/projects");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function createTicket(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  await prisma.ticket.create({ data: { title } });
  revalidatePath("/tickets");
  revalidatePath("/dashboard");
}

export async function toggleTicket(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  if (!ticket) return;
  await prisma.ticket.update({
    where: { id },
    data: { status: ticket.status === "OPEN" ? "CLOSED" : "OPEN" },
  });
  revalidatePath("/tickets");
  revalidatePath("/dashboard");
}

export async function deleteTicket(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.ticket.delete({ where: { id } });
  revalidatePath("/tickets");
  revalidatePath("/dashboard");
}
