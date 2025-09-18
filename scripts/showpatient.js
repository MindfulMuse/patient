"use strict";
// scripts/showPatients.ts
// import prisma from "@/lib/db";
Object.defineProperty(exports, "__esModule", { value: true });
// (async () => {
//   const patients = await prisma.patient.findMany({ select: { id: true, first_name: true } });
//   console.log("Available patients:\n", patients);
// })();
var mqtt_1 = require("mqtt");
var client = mqtt_1.default.connect("wss://broker.hivemq.com:8884/mqtt");
client.on("connect", function () {
    console.log("✅ Connected!");
});
client.on("error", function (err) {
    console.error("❌ Connection error:", err);
});
client.subscribe("sensor/vitals", function () {
    console.log("📡 Subscribed to sensor/vitals");
});
client.on("message", function (topic, msg) {
    console.log("📩 Received message:", msg.toString());
});
