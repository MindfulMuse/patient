// lib/db/getvitals.ts
import prisma from "@/lib/db";

// export async function getVitals(patientId: string) {
//   return await prisma.vitalSigns.findFirst({
//     where: { patient_id: patientId },
//     orderBy: { created_at: "desc" },
//   });
// }

// export async function getVitals(patientId: string) {
//   console.log("🧪 Fetching vitals for patientId:", patientId);

//   const data = await prisma.vitalSigns.findFirst({
//     where: { patient_id: patientId },
//     orderBy: { created_at: "desc" },
//   });

//   console.log("🧪 Found vitals:", data);

//   return data;
// }

// export async function getVitals() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vitals`, {
//       cache: "no-store", // SSR-safe
//     });

//     if (!res.ok) {
//       console.error("Vitals fetch failed:", await res.text());
//       return null;
//     }


//     const { data } = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching vitals:", error);
//     return null;
//   }
// }

    export async function getVitals(patientId: string) {
  return prisma.vitalSigns.findFirst({
    where: { patient_id: patientId },
    orderBy: { created_at: "desc" },
  });
}