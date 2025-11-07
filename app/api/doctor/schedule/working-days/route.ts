// // app/api/working-days/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const { doctor_email, day, start_time, close_time } = await req.json();

//     if (!doctor_email || !day || !start_time || !close_time) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Find doctor by email
//     const doctor = await prisma.doctor.findUnique({
//       where: { email: doctor_email },
//     });

//     if (!doctor) {
//       return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
//     }

//     // Check if the same day already exists for this doctor
//     const existing = await prisma.workingDays.findFirst({
//       where: { doctor_id: doctor.id, day },
//     });

//     let result;
//     if (existing) {
//       // Update existing schedule
//       result = await prisma.workingDays.update({
//         where: { id: existing.id },
//         data: { start_time, close_time, updated_at: new Date() },
//       });
//     } else {
//       // Create new schedule
//       result = await prisma.workingDays.create({
//         data: {
//           doctor_id: doctor.id,
//           day,
//           start_time,
//           close_time,
//           updated_at: new Date()

//         },
//       });
//     }

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error saving working hours:", error);
//     return NextResponse.json({ error: "Failed to save working hours" }, { status: 500 });
//   }
// }

//E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\schedule\working-days\route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { doctor_email, day, start_time, close_time, is_leave } = await req.json();

    if (!doctor_email || !day) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find doctor by email
    const doctor = await prisma.doctor.findUnique({
      where: { email: doctor_email },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Check if schedule exists for this day
    const existing = await prisma.workingDays.findFirst({
      where: { doctor_id: doctor.id, day },
    });

    let result;
    if (existing) {
      // Update existing
      result = await prisma.workingDays.update({
        where: { id: existing.id },
        data: { 
          start_time: is_leave ? null : start_time, 
          close_time: is_leave ? null : close_time,
          is_leave: is_leave || false,
          updated_at: new Date() 
        },
      });
    } else {
      // Create new
      result = await prisma.workingDays.create({
        data: {
          // doctor_id: doctor.id,
          day,
          start_time: is_leave ? null : start_time,
          close_time: is_leave ? null : close_time,
          is_leave: is_leave || false,
          updated_at: new Date(),
          Doctor: {
      connect: { id: doctor.id }, // ✅ Properly connect to doctor by id
    }
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving working hours:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}