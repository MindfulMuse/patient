//E:\Projects\patient monitor\patient monitor\my-app\app\api\assigning\[email]\trends\route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Params {
  params: { email: string };
}

export async function GET(req: Request, { params }: Params) {
  const { email } = await params;

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const vitals = await prisma.vitalSigns.findMany({
    where: {
       Patient: {
        email: decodeURIComponent(email),
      },
    },
    orderBy: { created_at: "desc" },
    take: 6,
    select: {
      created_at: true,
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
    },
  });

  const formatted = vitals.reverse().map((v) => ({
    date: v.created_at.toISOString().split("T")[0],
    body_temperature: v.body_temperature,
    heart_rate: v.heart_rate,
    respiratory_rate: v.respiratory_rate,
    oxygen_saturation: v.oxygen_saturation,
    sbp: v.sbp,
    dbp: v.dbp,
    si: v.si,
    ri: v.ri,
    pi: v.pi,
    blood_pressure: v.blood_pressure,
  }));

  return NextResponse.json(formatted);
}
