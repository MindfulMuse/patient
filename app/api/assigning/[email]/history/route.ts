//E:\Projects\my-app\app\api\assigning\[email]\history\route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GET /api/doctor/patient-history/[email]
// export async function GET(
//   req: Request,
//   { params }: { params: { email: string } }
// ) {
//   const email = decodeURIComponent(params.email);


export async function GET(
  req: NextRequest,
  context: { params: { email: string } }
) {
  const email = decodeURIComponent(context.params.email);

  const patient = await prisma.patient.findUnique({
    where: { email },
    select: {
      last_admission_date: true,
      last_admitted_hospital: true,
      admission_reason: true,
      medical_history: true,
      Prescription: {
        select: {
          next_appointment_date: true,
          next_appointment_time: true,
        },
        orderBy: { date: "desc" },
      },
    },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json([patient]); // still returning array for consistency
}
