// // pages/api/prescription.ts
// import  prisma  from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

// const defaultMeds = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Med1", "Med2", "Med3"];

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const { patientEmail, medications, instructions } = req.body;

//       // 1️⃣ Find the patient by email
//       const patient = await prisma.patient.findUnique({
//         where: { email: patientEmail }
//       });

//       if (!patient) {
//         return res.status(404).json({ error: "Patient not found" });
//       }
// // app/api/prescription/route.ts
// const prescription = await prisma.prescription.create({
//   data: {
//     patientid: patient.id,
//     instructions,
//     medication: {
//       create: medications.map((med: any) => ({
//         name: med.name,
//         dosage: med.dosage,
//         timing: med.timing,
//         form: med.form,
//         // If not provided, decide custom based on whether it's in default meds list
//         custom: med.custom ?? !defaultMeds.includes(med.name),
   
//     })),
//     },
//   },
//   include: { medication: true },
// });


//       res.status(200).json(prescription);
//     } catch (error) {
//       console.error("Error creating prescription:", error);
//       res.status(500).json({ error: "Failed to create prescription" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

//E:\Projects\patient monitor\patient monitor\my-app\app\api\PI\prescript\route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, medications, instructions,  nextAppointmentDate, nextAppointmentTime , sendSmsToNurse} = body;

    if (!email || !medications || medications.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(medications) || medications.length === 0) {
  return NextResponse.json({ error: "Medications must be a non-empty array" }, { status: 400 });
}


    // 1️⃣ Find patient by email
    const patient = await prisma.patient.findUnique({
      where: { email }
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    type FormType = "T" | "L" | "IV" | "S";


    // Default medication list
    const defaultMeds: Record<FormType, string[]> = {
    T: ["Paracetamol", "Ibuprofen", "Amoxicillin", "Med1", "Med2", "Med3"],
    L: ["Cough Syrup", "ORS Solution"],
    IV: ["IV Antibiotic", "IV Painkiller"],
    S: ["Normal Saline (NS)", "Ringer's Lactate (RL)", "Dextrose 5%"],
   };


    // 2️⃣ Create prescription with linked medications
    const newPrescription = await prisma.prescription.create({
      data: {
        patientid: patient.id,
        instructions,
          date: new Date(),
        next_appointment_date: body.nextAppointmentDate ? new Date(body.nextAppointmentDate) : null,
        next_appointment_time: body.nextAppointmentTime || null, 
        medication: {
          create: medications.map((med: any) => ({
            name: med.name,
            dosage: med.dosage,
            timing: med.timing,
            form: med.form,
            email: patient.email,
            custom: med.custom ?? !defaultMeds[med.form as FormType]?.includes(med.name),
          }))
        }
      },
      include: { medication: true }
    });


        // 3️⃣ If SMS checkbox checked → notify nurse
    if (sendSmsToNurse) {
      // lookup assigned nurse (simplest: first assignment for patient)
      const assignment = await prisma.nurseAssignment.findFirst({
        where: { patientid: patient.id },
        include: { Nurse: true },
      });

      if (assignment?.Nurse?.phone) {
        try {
          await client.messages.create({
            body: `New prescription for ${patient.first_name}: ${instructions || "Check details in system."}`,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: process.env.ALERT_PHONE_NUMBER!, // Nurse phone number from DB
          });
          console.log(`SMS sent to nurse ${assignment.Nurse.email}`);
        } catch (smsErr) {
          console.error("Failed to send SMS:", smsErr);
        }
      }
    }

    return NextResponse.json(newPrescription, { status: 201 });

  } catch (error) {
    console.error("Error creating prescription:", error);
    return NextResponse.json({ error: "Failed to create prescription" }, { status: 500 });
  }
}

// GET - get all prescriptions for a patient by email
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const patient = await prisma.patient.findUnique({
//       where: { email },
//     });

//     if (!patient) {
//       return NextResponse.json({ error: "Patient not found" }, { status: 404 });
//     }

//     const prescriptions = await prisma.prescription.findMany({
//       where: { patientid: patient.id },
//       include: { medication: true },
//       orderBy: { date: "desc" },
//     });

//     return NextResponse.json(prescriptions, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching prescriptions:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

//E:\Projects\patient monitor\patient monitor\my-app\app\api\PI\prescript\route.ts

// GET - get all prescriptions
export async function GET() {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: {
        Patient: true,
        medication: true,
      },
      orderBy: { date: "desc" },
    });

      return NextResponse.json(
      prescriptions.map((p) => ({
         id: p.id,
        name: p.Patient?.first_name ?? "Unknown",  // <- match frontend
        date: p.date?.toISOString(),
        nextAppointmentDate: p.next_appointment_date
        ? p.next_appointment_date.toISOString().split("T")[0]
        : null,
       nextAppointmentTime: p.next_appointment_time ?? null,
        instructions: p.instructions,
        medications: p.medication ?? [], // always send an array
      }))
    );

  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
