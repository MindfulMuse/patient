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


// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ email: string }> } //  NEW TYPE for latest Next.js
// ) {
//   const { email } = await context.params; //  Must await params (since it's now async)

xport async function GET(
  req: NextRequest,
  { params }: { params: { email: string } } // Changed: Remove Promise wrapper
) {
  const { email } = params; // Changed: Direct access, no await needed
  const decodedEmail = decodeURIComponent(email);

// const decodedEmail = decodeURIComponent(email);

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
