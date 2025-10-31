// app/api/PI/prescribe/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    // Find patient by email
    const patient = await prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Get prescriptions for that patient
    const prescriptions = await prisma.prescription.findMany({
      where: { patientid: patient.id },
      include: { medication: true }, // Include medications
      orderBy: { date: "desc" },
    });

    // Transform for frontend (so name comes from Patient table)
    const response = prescriptions.map((p) => ({
      id: p.id,
      name: patient.first_name,
      // date: p.date.toISOString().split("T")[0], 
      // date: p.date.toISOString() || " ",
      date: p.date ? p.date.toISOString() : "",
      next_appointment_date:p.next_appointment_date || "",
      next_appointment_time:p.next_appointment_time|| "",
      instructions: p.instructions || "",
      medications: p.medication,
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
