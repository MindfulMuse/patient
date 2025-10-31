//E:\Projects\patient monitor\my-app\app\api\assigning\[email]\records\route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/db";


// export async function GET(
//   req: Request,
//   { params }: { params: { email: string } }
// ) {
//   const email = decodeURIComponent(params.email);


export async function GET(
  req: NextRequest,
  props: { params: Promise<{ email: string }> }
) {
  const params = await props.params;
  const email = decodeURIComponent(params.email);
  const patient = await prisma.patient.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const vitals = await prisma.vitalSigns.findMany({
    where: { patient_id: patient.id },
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
