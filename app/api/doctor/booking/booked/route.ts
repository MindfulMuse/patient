// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// // ✅ BOOK APPOINTMENT
// export async function POST(req: Request) {
//   try {
//     const { doctor_email,  patient_email, date, starttime, endtime } = await req.json();

//     if (!doctor_email || ! patient_email || !date || !starttime || !endtime)
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });

//     // find doctor
//     const doctor = await prisma.doctor.findUnique({ where: { email: doctor_email } });
//     if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

//     // find working day
//     const day = new Date(date).toLocaleString("en-US", { weekday: "long" });
//     const workingDay = await prisma.workingDays.findFirst({
//       where: { doctor_id: doctor.id, day },
//     });

//     if (!workingDay)
//       return NextResponse.json({ error: "Doctor not working on this day" }, { status: 400 });
//     if (workingDay.is_leave)
//       return NextResponse.json({ error: "Doctor is on leave this day" }, { status: 400 });

//     // check time validity
//     if (
//       starttime < (workingDay.start_time || "") ||
//       endtime > (workingDay.close_time || "")
//     ) {
//       return NextResponse.json({ error: "Outside of working hours" }, { status: 400 });
//     }

//     // check if slot already booked
//     const existing = await prisma.appointment.findFirst({
//       where: { doctorid: doctor.id, date: new Date(date), starttime, endtime },
//     });
//     if (existing)
//       return NextResponse.json({ error: "Slot already booked" }, { status: 400 });

//     // create appointment
//     const appointment = await prisma.appointment.create({
//       data: {
//         doctorid: doctor.id,
//         patientid:  patient_email,
//         date: new Date(date),
//         starttime,
//         endtime,
//         dphone: doctor.phone,
//       },
//     });

//     return NextResponse.json({ success: true, appointment });
//   } catch (err) {
//     console.error("Error booking appointment:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// // ✅ DELETE APPOINTMENT
// export async function DELETE(req: Request) {
//   try {
//     const { appointment_id } = await req.json();
//     if (!appointment_id)
//       return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });

//     await prisma.appointment.delete({ where: { id: appointment_id } });
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Error deleting appointment:", err);
//     return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const { doctor_email, patient_email, date, starttime, endtime } = await req.json();

//     if (!doctor_email || !patient_email || !date || !starttime || !endtime) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // 🩺 Find doctor by email
//     const doctor = await prisma.doctor.findUnique({ where: { email: doctor_email } });
//     if (!doctor) {
//       return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
//     }

//     // 👩‍⚕️ Find patient by email
//     const patient = await prisma.patient.findUnique({ where: { email: patient_email } });
//     if (!patient) {
//       return NextResponse.json({ error: "Patient not found" }, { status: 404 });
//     }

//     // 📅 Determine day of week
//     const dayName = new Date(date).toLocaleString("en-US", { weekday: "long" });

//     // 🕒 Check if doctor works on that day
//     const workingDay = await prisma.workingDays.findFirst({
//       where: { doctor_id: doctor.id, day: dayName },
//     });

//     if (!workingDay) {
//       return NextResponse.json({ error: "Doctor not working this day" }, { status: 400 });
//     }

//     if (workingDay.is_leave) {
//       return NextResponse.json({ error: "Doctor is on leave this day" }, { status: 400 });
//     }

//     // ⏰ Validate time inside working hours
//     if (
//       starttime < (workingDay.start_time || "") ||
//       endtime > (workingDay.close_time || "")
//     ) {
//       return NextResponse.json(
//         { error: "Appointment outside working hours" },
//         { status: 400 }
//       );
//     }

//     // 🔁 Check for overlapping bookings
//     const overlapping = await prisma.appointment.findFirst({
//       where: {
//         doctorid: doctor.id,
//         date: new Date(date),
//         OR: [
//           { starttime: { lte: endtime }, endtime: { gte: starttime } },
//         ],
//       },
//     });

//     if (overlapping) {
//       return NextResponse.json({ error: "Time slot already booked" }, { status: 400 });
//     }

//     // ✅ Create appointment
//     const appointment = await prisma.appointment.create({
//       data: {
//         doctorid: doctor.id,
//         patientid: patient.id,
//         date: new Date(date),
//         starttime,
//         endtime,
//         status: "BOOKED",
//         dphone: doctor.phone,
//       },
//     });

//     return NextResponse.json({ success: true, appointment });
//   } catch (error) {
//     console.error("Error booking appointment:", error);
//     return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
//   }
// }

// // ❌ DELETE Appointment
// export async function DELETE(req: Request) {
//   try {
//     const { appointment_id } = await req.json();
//     if (!appointment_id)
//       return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });

//     await prisma.appointment.delete({ where: { id: appointment_id } });
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Error deleting appointment:", err);
//     return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
//   }
// }

//E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\booking\booked\route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Received body:", body);

    const { doctor_email, patient_email, date, starttime, endtime } = body;

    // Validation
    if (!doctor_email || !patient_email || !date || !starttime || !endtime) {
      console.log("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { email: doctor_email },
    });
    console.log("👨‍⚕️ Doctor found:", doctor?.id || "none");

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const patient = await prisma.patient.findUnique({
      where: { email: patient_email },
    });
    console.log("👩‍🦰 Patient found:", patient?.id || "none");

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const dayName = new Date(date).toLocaleString("en-US", { weekday: "long" });
    console.log("📅 Booking day:", dayName);

    const workingDay = await prisma.workingDays.findFirst({
      where: { doctor_id: doctor.id, day: dayName },
    });
    console.log("🕒 Working day record:", workingDay);

    if (!workingDay) {
      return NextResponse.json({ error: "Doctor not working this day" }, { status: 400 });
    }

    if (workingDay.is_leave) {
      return NextResponse.json({ error: "Doctor is on leave this day" }, { status: 400 });
    }

    if (
      starttime < (workingDay.start_time || "") ||
      endtime > (workingDay.close_time || "")
    ) {
      console.log("❌ Time outside working hours");
      return NextResponse.json(
        { error: "Appointment outside working hours" },
        { status: 400 }
      );
    }

    const overlapping = await prisma.appointment.findFirst({
      where: {
        doctorid: doctor.id,
        date: new Date(date),
        OR: [
          {
            starttime: { lte: endtime },
            endtime: { gte: starttime },
          },
        ],
      },
    });

    console.log("🔁 Overlapping appointment:", overlapping);

    if (overlapping) {
      return NextResponse.json({ error: "Time slot already booked" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorid: doctor.id,
        patientid: patient.id,
        date: new Date(date),
        starttime,
        endtime,
        status: "BOOKED",
        dphone: doctor.phone,
      },
    });

    console.log("✅ Appointment created:", appointment.id);
   alert('✅ Appointment created:, appointment.id')
    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("💥 Error booking appointment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
