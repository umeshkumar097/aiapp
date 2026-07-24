const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function recover() {
  const pendingOrders = await prisma.pendingOrder.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  console.log("=== PENDING ORDERS ===");
  console.log(JSON.stringify(pendingOrders, null, 2));
  
  console.log("=== LEADS ===");
  console.log(JSON.stringify(leads, null, 2));
}

recover().catch(console.error).finally(() => prisma.$disconnect());
