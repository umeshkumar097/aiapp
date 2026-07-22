import { Cashfree, CFEnvironment } from "cashfree-pg";

// Initialize Cashfree client
function getCashfreeClient(): Cashfree {
  const env =
    process.env.CASHFREE_ENV === "PROD"
      ? CFEnvironment.PRODUCTION
      : CFEnvironment.SANDBOX;

  return new Cashfree(
    env,
    process.env.CASHFREE_APP_ID!,
    process.env.CASHFREE_SECRET_KEY!
  );
}

export interface CreateOrderParams {
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerId: string;
  returnUrl: string;
  notifyUrl?: string;
}

export async function createCashfreeOrder(params: CreateOrderParams) {
  const cashfree = getCashfreeClient();

  const response = await cashfree.PGCreateOrder({
    order_id: params.orderId,
    order_amount: params.amount,
    order_currency: params.currency,
    customer_details: {
      customer_id: params.customerId,
      customer_name: params.customerName,
      customer_email: params.customerEmail,
      customer_phone: params.customerPhone,
    },
    order_meta: {
      return_url: params.returnUrl,
      notify_url: params.notifyUrl,
    },
    order_note: "Aiclex Solutions - Project Verification Fee (Refundable)",
  });

  return response.data;
}

export async function verifyCashfreePayment(orderId: string) {
  const cashfree = getCashfreeClient();

  const response = await cashfree.PGOrderFetchPayments(orderId);
  const payments = response.data;

  if (!payments || !Array.isArray(payments) || payments.length === 0) {
    return { success: false, payment: null };
  }

  // Find a successful payment
  const successfulPayment = payments.find(
    (p) => p.payment_status === "SUCCESS"
  );

  if (successfulPayment) {
    return { success: true, payment: successfulPayment };
  }

  return { success: false, payment: payments[0] };
}

export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AICLEX_${timestamp}_${random}`;
}

export function generateCustomerId(email: string): string {
  const sanitized = email.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 40);
  return `CUST_${sanitized}_${Date.now()}`;
}
