//E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\schedule\[email]\route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// interface Params {
//   params: { email: string };
// }


interface Params {
  email: string; // Can be doctor email or ID for deletion
}

// Get all working days for a doctor (by email)
// export async function GET(_req: Request, { params }: Params) {


// Get all working days for a doctor (by email)

// Get all working days for a doctor (by email)
export async function GET(
  _req: Request,
  context: { params: Promise<Params> }
) {
  try {
    // ✅ Await the params
    const { email } = await context.params;

    const doctor = await prisma.doctor.findUnique({
      where: { email },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const workingDays = await prisma.workingDays.findMany({
      where: { doctor_id: doctor.id },
      orderBy: { day: "asc" },
    });

    return NextResponse.json(workingDays);
  } catch (error) {
    console.error("Error fetching working days:", error);
    return NextResponse.json({ error: "Failed to fetch working days" }, { status: 500 });
  }
}

//  Delete a specific working-day record by its ID
// export async function DELETE(_req: Request, { params }: Params) {
//   try {

// Delete a specific working-day record by its ID
export async function DELETE(
  _req: Request,
  context: { params: Promise<Params> }
) {
  try {
    // ✅ Await the params
    const { email } = await context.params;
    // Here, params.doctorEmail will actually be a numeric ID (e.g., /api/working-days/12)
    const id = parseInt(email, 10);     if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.workingDays.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Working day deleted successfully" });
  } catch (error) {
    console.error("Error deleting working day:", error);
    return NextResponse.json({ error: "Failed to delete working day" }, { status: 500 });
  }
}
