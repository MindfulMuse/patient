//E:\Projects\patient monitor\my-app\db.ts

// import { PrismaClient } from "./lib/generated/prisma"; 

// // Create an instance
// const prisma = new PrismaClient();
// console.log("running")
// async function checkDB() {
//   try {
//     const res = await prisma.$queryRaw<
//       { db: string; user: string; host: string }[]
//     >`SELECT current_database() as db, current_user as user, inet_server_addr() as host;`;

//     console.log("✅ Connected to:", res[0]);
//   } catch (err) {
//     console.error("❌ DB error:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// checkDB();

// // E:\Projects\patient monitor\patient monitor\my-app\db.ts

// import { PrismaClient } from "./lib/generated/prisma/index.js"; 

// const prisma = new PrismaClient();

// async function checkDB() {
//   try {
//     const res = await prisma.$queryRaw<
//       { db: string; user: string; host: string }[]
//     >`SELECT current_database() as db, current_user as user, inet_server_addr() as host;`;

//     console.log("✅ Connected to:", res[0]);
//   } catch (err) {
//     console.error("❌ DB error:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// checkDB();
// import { Client } from "pg";

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// async function main() {
//   await client.connect();
//   console.log("Connected to DB!");
//   // You can add queries here
// }

// main().catch((err) => {
//   console.error("Error connecting to DB:", err);
// });


// E:\Projects\patient monitor\patient monitor\my-app\db.ts

// import { PrismaClient } from "./lib/generated/prisma/index.js"; 

// const prisma = new PrismaClient();

// async function checkDB() {
//   try {
//     const res = await prisma.$queryRaw<
//       { db: string; user: string; host: string }[]
//     >`SELECT current_database() as db, current_user as user, inet_server_addr() as host;`;

//     // Also log DATABASE_URL to compare
//     console.log("✅ Connected to:", res[0]);
//     console.log("🔗 DATABASE_URL host:", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0]);
//   } catch (err) {
//     console.error("❌ DB error:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// checkDB();
// check-db.ts (put in project root)
// import { PrismaClient } from "./lib/generated/prisma/index.js"; // keep your current path

// const prisma = new PrismaClient();

// (async () => {
//   try {
//     console.log("▶️ process.env.DATABASE_URL");
//     console.log(process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":<REDACTED>@")); // hides password but shows host
//     const info = await prisma.$queryRaw<{ db: string; host: string }[]>`
//       SELECT current_database() as db, inet_server_addr() as host;
//     `;
//     console.log("✅ DB result:", info[0]);
//   } catch (e) {
//     console.error("❌ Check DB error:", e);
//   } finally {
//     await prisma.$disconnect();
//   }
// })();


// import { PrismaClient } from './lib/generated/prisma'; // adjust path
// const prisma = new PrismaClient();

// async function main() {
//   // Fetch all patients with their doctor info
//   const patientsWithDoctors = await prisma.patient.findMany({
//     include: {
//       Doctor: true, // include doctor info
//     },
//   });

//   console.log(patientsWithDoctors);
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import prisma from "./lib/db";

// async function main() {
//   const patientVitals = await prisma.patient.findMany();
//   console.log(patientVitals);
// }

// main()
//   .catch(console.error)
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


// delete Prescription
// db.ts
// import prisma from "./lib/db";


// async function main() {
//   const prescriptionId = 7; // <-- change as needed

//   // delete child rows first
//   const meds = await prisma.medication.deleteMany({
//     where: { prescriptionid: prescriptionId },
//   });

//   // then delete the parent
//   const prescription = await prisma.prescription.delete({
//     where: { id: prescriptionId },
//   });

//   console.log(`Deleted ${meds.count} medication(s) and prescription #${prescription.id}`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


// //Delete VitalSigns

// import prisma from '@/lib/db';

// async function deleteVitalSign(vitalSignId: number) {
//   try {
//     await prisma.vitalSigns.delete({
//       where: { id: vitalSignId },
//     });
//     console.log('✅ VitalSigns deleted successfully');
//   } catch (err: any) {
//     if (err.code === 'P2025') {
//       console.error('❌ VitalSigns with this ID not found');
//     } else {
//       console.error('❌ Error deleting VitalSigns:', err);
//     }
//   } finally {
//     await prisma.$disconnect(); // close DB connection
//   }
// }

// // Call the function
// deleteVitalSign(3);


// db.ts
// db.ts
// import prisma from "@/lib/db";

// async function migrateDoctorAvailability() {
//   try {
//     console.log("🚀 Updating Doctor.availability_status to enum with default...");

//     // Use one command at a time (Postgres rejects multi-statements in Prisma)
//     await prisma.$executeRawUnsafe(`
//       ALTER TABLE "Doctor" 
//       ALTER COLUMN availability_status DROP DEFAULT;
//     `);

//     await prisma.$executeRawUnsafe(`
//       ALTER TABLE "Doctor" 
//       ALTER COLUMN availability_status TYPE "AvailabilityStatus" 
//       USING availability_status::text::"AvailabilityStatus";
//     `);

//     await prisma.$executeRawUnsafe(`
//       ALTER TABLE "Doctor" 
//       ALTER COLUMN availability_status SET DEFAULT 'AVAILABLE';
//     `);

//     await prisma.$executeRawUnsafe(`
//       UPDATE "Doctor" 
//       SET availability_status = 'AVAILABLE' 
//       WHERE availability_status IS NULL;
//     `);

//     console.log("✅ Migration complete!");
//   } catch (err) {
//     console.error("❌ Error running migration:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// migrateDoctorAvailability();


// db-migrate.ts
import prisma from "@/lib/db";

async function main() {
  console.log("🚀 Connecting to Neon database...");

  // Make start_time and close_time nullable
  const sql = `
    ALTER TABLE "WorkingDays"
    ALTER COLUMN "start_time" DROP NOT NULL,
    ALTER COLUMN "close_time" DROP NOT NULL;
  `;

  await prisma.$executeRawUnsafe(sql);
  console.log("✅ Made start_time and close_time nullable successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Error running migration:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
