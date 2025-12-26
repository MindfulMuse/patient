// // E:\Projects\patient monitor\patient monitor\my-app\app\api\assigning\[email]\prescribe\route.ts
// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ email: string }> }
// ) {
//   try {
//     const email = decodeURIComponent(params.email);

//     // Find patient by email
//     const patient = await prisma.patient.findUnique({
//       where: { email },
//     });

//     if (!patient) {
//       return NextResponse.json({ error: "Patient not found" }, { status: 404 });
//     }

//     // Fetch prescriptions for that patient
//     const prescriptions = await prisma.prescription.findMany({
//       where: { patientid: patient.id },
//       include: { medication: true }, // pull related meds
//       orderBy: { date: "desc" },
//     });

//     if (prescriptions.length === 0) {
//       return NextResponse.json({ error: "No prescriptions found" }, { status: 404 });
//     }

//     // Transform data for frontend
//     const response = prescriptions.map((p) => ({
//       id: p.id,
//       name: patient.first_name,
//       date: p.date ? p.date.toISOString().split("T")[0] : "",
//       medications: p.medication.map((m) => ({
        
//         name: m.name,
//         email: patient.email, // now email exists
//         dosage: m.dosage,
//         timing: m.timing || [],
//         custom: m.custom,
//         form: m.form,
//       })),
//       instructions: p.instructions || "",
//     }));

//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching prescriptions by email:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


// // E:\Projects\patient monitor\patient monitor\my-app\app\api\assigning\[email]\prescribe\route.ts

// app/api/assigning/[email]/prescribe/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ email: string }> }
) {
  try {
    // ✅ Await params to avoid Next.js warning
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);

    // Find patient by email
    const patient = await prisma.patient.findUnique({
      where: { email: decodedEmail },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    // Fetch prescriptions with related medications
    const prescriptions = await prisma.prescription.findMany({
      where: { patientid: patient.id },
      include: { medication: true },
      orderBy: { date: "desc" },
      
    });

    if (prescriptions.length === 0) {
      return NextResponse.json(
        { error: "No prescriptions found" },
        { status: 404 }
      );
    }

    // Transform for frontend
    const response = prescriptions.map((p) => ({
      id: p.id,
      name: patient.first_name,
      date: p.date ? p.date.toISOString().split("T")[0] : "",
      medications: p.medication.map((m) => ({
        id: m.id, // ✅ Include for React key
        name: m.name,
        email: patient.email,
        dosage: m.dosage,
        timing: m.timing || [],
        custom: m.custom ?? false,
        form: m.form,
      })),
      next_appointment_date: p.next_appointment_date || "",
      next_appointment_time: p.next_appointment_time || "",
      instructions: p.instructions || "",
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching prescriptions by email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
