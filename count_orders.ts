import prisma from "./lib/prisma";

async function run() {
  const pendingCount = await prisma.pendingOrder.count();
  const leadCount = await prisma.lead.count();

  console.log(`Total PendingOrders in DB: ${pendingCount}`);
  console.log(`Total Leads in DB: ${leadCount}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
