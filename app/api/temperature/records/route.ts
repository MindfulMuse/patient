// File: /app/api/vitals/records/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const vitals = await prisma.vitalSigns.findMany({
    orderBy: { created_at: "desc" },
    select: {
      body_temperature: true,
      heart_rate: true,
      respiratory_rate: true,
      oxygen_saturation: true,
      sbp: true,
      dbp: true,
      si: true,
      ri: true,
      pi: true,
      blood_pressure: true,
      created_at: true,
    },
  });

  return NextResponse.json(vitals);
}
