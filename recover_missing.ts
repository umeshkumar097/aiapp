import prisma from "./lib/prisma";

async function run() {
  const pendingOrders = await prisma.pendingOrder.findMany({
    where: {
      status: "CREATED"
    }
  });

  let recoveredCount = 0;

  for (const order of pendingOrders) {
    const existingLead = await prisma.lead.findUnique({
      where: { orderId: order.orderId }
    });

    if (!existingLead) {
      const formData: any = order.formData;
      await prisma.lead.create({
        data: {
          fullName: formData.fullName || "Unknown",
          phone: formData.phone || "Unknown",
          email: formData.email || "Unknown",
          company: formData.company || null,
          businessName: formData.businessName || null,
          projectName: formData.projectName || null,
          projectDescription: formData.projectDescription || null,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          platform: formData.platform || "both",
          paymentStatus: "PENDING",
          orderId: order.orderId,
          isVerified: false,
          createdAt: order.createdAt // keep original date!
        }
      });
      recoveredCount++;
      console.log(`Recovered: ${formData.fullName} (${formData.phone})`);
    }
  }

  console.log(`Successfully recovered ${recoveredCount} missing leads.`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
