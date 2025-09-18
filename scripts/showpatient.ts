// scripts/showPatients.ts
import prisma from "@/lib/db";

(async () => {
  const patients = await prisma.patient.findMany({ select: { id: true, first_name: true } });
  console.log("Available patients:\n", patients);
})();

// import mqtt from "mqtt";

// const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// client.on("connect", () => {
//   console.log("✅ Connected!");
// });

// client.on("error", (err) => {
//   console.error("❌ Connection error:", err);
// });

// client.subscribe("sensor/vitals", () => {
//   console.log("📡 Subscribed to sensor/vitals");
// });

// client.on("message", (topic, msg) => {
//   console.log("📩 Received message:", msg.toString());
// });


const vitals = await prisma.vitalSigns.findMany({
  where: { patient_id: patient.id },
  orderBy: { created_at: "desc" },
});
