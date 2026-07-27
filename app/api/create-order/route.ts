import { NextResponse } from "next/server";

// Payment flow has been removed. This endpoint is no longer in use.
export async function POST() {
  return NextResponse.json(
    { error: "Payment flow is no longer active." },
    { status: 410 }
  );
}
