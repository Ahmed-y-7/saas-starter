import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.activity.deleteMany();
  await prisma.project.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  // Every seeded user shares this demo password so you can sign in right away.
  const password = await bcrypt.hash("password123", 10);

  const usersData = [
    { email: "sara@example.com", name: "Sara N." },
    { email: "omar@example.com", name: "Omar K." },
    { email: "lena@example.com", name: "Lena R." },
    { email: "diego@example.com", name: "Diego M." },
  ];

  const users = [];
  for (const u of usersData) {
    users.push(await prisma.user.create({ data: { ...u, password } }));
  }

  await prisma.project.createMany({
    data: [
      { name: "Website redesign", ownerId: users[0].id },
      { name: "Mobile app", ownerId: users[1].id },
      { name: "Billing revamp", ownerId: users[0].id },
      { name: "Onboarding flow", ownerId: users[2].id },
    ],
  });

  await prisma.ticket.createMany({
    data: [
      { title: "Login button misaligned", status: "OPEN" },
      { title: "Export to CSV fails", status: "OPEN" },
      { title: "Slow dashboard load", status: "OPEN" },
      { title: "Typo on pricing page", status: "CLOSED" },
      { title: "Password reset email", status: "CLOSED" },
      { title: "Dark mode contrast", status: "CLOSED" },
      { title: "Broken avatar upload", status: "CLOSED" },
    ],
  });

  const minutes = (n: number) => new Date(Date.now() - n * 60000);
  await prisma.activity.createMany({
    data: [
      { userId: users[0].id, action: "upgraded to the Pro plan", createdAt: minutes(12) },
      { userId: users[1].id, action: "invited 3 teammates", createdAt: minutes(60) },
      { userId: users[2].id, action: "closed ticket #4821", createdAt: minutes(180) },
      { userId: users[3].id, action: "created a new project", createdAt: minutes(1500) },
    ],
  });

  console.log("Seeded users (password: password123), projects, tickets, and activity.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
