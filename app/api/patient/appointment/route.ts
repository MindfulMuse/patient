import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const patientEmail = searchParams.get("email");

    if (!patientEmail) {
      return NextResponse.json({ msg: "Patient email is required" }, { status: 400 });
    }

    // Find patient by email
    const patient = await prisma.patient.findUnique({
      where: { email: patientEmail },
    });

    if (!patient) {
      return NextResponse.json({ msg: "Patient not found" }, { status: 404 });
    }

    // Get all appointments for this patient
    const appointments = await prisma.appointment.findMany({
      where: { patientid: patient.id },
      include: {
        Doctor: true,
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
