// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function GET() {
//   const vitals = await prisma.vitalSigns.findMany({
//     orderBy: { created_at: "desc" },
//     take: 6,
//     select: {
//       body_temperature: true,
//        heart_rate: true,
//       respiratory_rate: true,
//       created_at: true,
//     },
//   });
  


//   const formatted = vitals.reverse().map((v) => ({
//     date: v.created_at.toISOString().split("T")[0],
//     temperature: v.body_temperature,
//     heart_rate: v.heart_rate,
//     respiratory_rate: v.respiratory_rate,
//   }));
//   return NextResponse.json(formatted);
// }

//api/tempertaure/trends/route.tsx
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const vitals = await prisma.vitalSigns.findMany({
    orderBy: { created_at: "desc" },
    take: 6, // optional: increase to show more trend
    select: {
      created_at: true,
      body_temperature: true,
      heart_rate: true,
      respiratory_rate: true,
      oxygen_saturation: true,
      sbp: true,
      dbp: true,
      si: true,
      ri: true,
      pi: true,
      blood_pressure: true,
    },
  });

  const formatted = vitals.reverse().map((v) => ({
    date: v.created_at.toISOString().split("T")[0],
    body_temperature: v.body_temperature,
    heart_rate: v.heart_rate,
    respiratory_rate: v.respiratory_rate,
    oxygen_saturation: v.oxygen_saturation,
    sbp: v.sbp,
    dbp: v.dbp,
    si: v.si,
    ri: v.ri,
    pi: v.pi,
    blood_pressure: v.blood_pressure,
  }));

  return NextResponse.json(formatted);
}
