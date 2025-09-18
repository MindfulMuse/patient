//api/temperature/history/route.ts

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔑 Fetch Clerk user's email
  const client = await clerkClient(); // ✅ call the function
  const user = await client.users.getUser(userId); // ✅ now this works
  const email = user.emailAddresses[0].emailAddress;

  // ✅ Find patient by email
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

  return NextResponse.json([patient]); // Returning as array for your table
}
