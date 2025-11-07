//E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\schedule\working-days\[doctorEmail]\route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Params {
  doctorEmail: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { doctorEmail } = params;

    // Find doctor
    const doctor = await prisma.doctor.findUnique({
      where: { email: doctorEmail },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Get working days for this doctor
    const workingDays = await prisma.workingDays.findMany({
      where: { doctor_id: doctor.id },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(workingDays);
  } catch (error) {
    console.error("❌ Error fetching working days:", error);
    return NextResponse.json({ error: "Failed to fetch working days" }, { status: 500 });
  }
}
