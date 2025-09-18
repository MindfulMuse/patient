// app/api/vitals/route.ts
// import { NextResponse } from "next/server";
// import { getLatestVitals } from "@/lib/mqtt/mqtt";

// export async function GET() {
//   const vitals = getLatestVitals();

//   if (!vitals) {
//     return NextResponse.json({ message: "No data yet" }, { status: 204 });
//   }

//   return NextResponse.json(vitals);
// }

// lib/mqtt/mqtt.ts
// import mqtt from "mqtt";
// import  prisma  from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";

// const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// client.on("connect", () => {
//   console.log("✅ Connected to MQTT broker");
//   client.subscribe("sensor/vitals");
// });

// client.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());
    
//      const userId = await currentUser();
//     const patient = await prisma.patient.findUnique({ where: { userId } });

//     if (!patient) return console.warn("No patient found for user");

//     await prisma.VitalSigns.create({
//       data: {
//         patientId: patient.id,
//         ...data,   
//       },
//     });

//     console.log("✅ Vital saved");
//   } catch (err) {
//     console.error("❌ MQTT error:", err);
//   }
// });

// app/api/vitals/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs/server";
// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const { userId } =await  auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const latest = await prisma.vitalSigns.findFirst({
//     where: { patient_id: userId },
//     orderBy: { created_at: "desc" },
//   });

//   if (!latest) {
//     return NextResponse.json({ error: "No vitals found" }, { status: 404 });
//   }

//   return NextResponse.json(latest);
// }

// // app/api/vitals/latest/route.ts
// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { getLatestVitals } from "@/lib/mqtt/mqtt";

// export async function GET() {
//   const user = await currentUser();
//   if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

//   const patient = await prisma.patient.findUnique({
//            where: { id: user.id }, // make sure you have this in your schema!
//   });
// const vitalsdata =await getLatestVitals();
//   if (!patient) {
//     return NextResponse.json({ error: "Patient not found" }, { status: 404 });
//   }

//   const vitals = await prisma.vitalSigns.findFirst({
//     where: { patient_id: patient.id },
//     orderBy: { created_at: "desc" },
//   });

  
//     await prisma.vitalSigns.create({
//       data: {
//         patient_id: user.id,
//         medical_id: 1, 
//         body_temperature: vitalsdata.body_temperature ?? 0,
//         systolic: vitalsdata.systolic ?? 0,
//         diastolic:  vitalsdata.diastolic ?? 0,
//         heart_rate:  vitalsdata.heart_rate ?? 0,
//         respiratory_rate:  vitalsdata.respiratory_rate,
//         oxygen_saturation: vitalsdata.oxygen_saturation,
//         pulse_rate: vitalsdata.pulse_rate,
//         activity_level: vitalsdata.activity_level,
//         blood_pressure: vitalsdata.blood_pressure ?? 0,
//         height: vitalsdata.height ?? 0,
//       },
//     });

//   return NextResponse.json({ data: vitals });
// }


// #3
// app/api/vitals/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getLatestVitals } from "@/lib/mqtt/mqtt";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const patient = await prisma.patient.findUnique({
    where: {
      email: user.emailAddresses?.[0]?.emailAddress || undefined,
    },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const vitalsdata = getLatestVitals();
  if (!vitalsdata) {
    return NextResponse.json({ error: "No vitals available" }, { status: 204 });
  }

  const created = await prisma.vitalSigns.create({
    data: {
      patient_id: patient.id,
      // medical_id: 1, // TODO: Replace with dynamic logic
      body_temperature: vitalsdata.body_temperature ?? 0,
        SBP: vitalsdata.SBP ?? 0,
      DBP: vitalsdata.DBP ?? 0,
      heart_rate: vitalsdata.heart_rate ?? 0,
      respiratory_rate: vitalsdata.respiratory_rate,
      oxygen_saturation: vitalsdata.oxygen_saturation,
    RI:  vitalsdata.RI??0,
      SI: vitalsdata.SI??0,
      PI: vitalsdata.PI??0,
      activity_level: vitalsdata.activity_level,
      blood_pressure: vitalsdata.blood_pressure ?? 0,
      height: vitalsdata.height ?? 0,
    },
  });

  return NextResponse.json({ data: created });
}
