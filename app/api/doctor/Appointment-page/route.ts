import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorEmail = searchParams.get("email");

    if (!doctorEmail) {
      return NextResponse.json({ msg: "Doctor email is required" }, { status: 400 });
    }

    // Find doctor by email (case-insensitive)
    const doctor = await prisma.doctor.findFirst({
      where: { email: { equals: doctorEmail, mode: "insensitive" } },
    });

    if (!doctor) {
      return NextResponse.json({ msg: "Doctor not found" }, { status: 404 });
    }

    // Get all appointments for this doctor
    const appointments = await prisma.appointment.findMany({
      where: { doctorid: doctor.id },
      include: { Patient: true }, // include patient info
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
