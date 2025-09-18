// scripts/publishVitals.ts
import { auth } from "@clerk/nextjs/server";
import mqtt from "mqtt";

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

client.on("connect", async () => {
  console.log("✅ Connected to MQTT broker for publishing");

  try {
    const patient1 ="mock-user-id-123"
    const { userId } = await auth(); // ✅ Correct usage of auth
    if (!userId) {
      console.error("❌ No userId found");
      client.end();
      return;
    }

    const vitals = {
      id: "user_2zMK8EoQsFZyRiGGtJQM8NRyEyG", // ✅ This should match what the backend expects
      body_temperature: 37.2,
      systolic: 120,
      diastolic: 80,
      heart_rate: 75,
      respiratory_rate: 18,
      blood_pressure: 120,
      oxygen_saturation: 98,
      pulse_rate: 72,
      activity_level: "low",
      height: 170,
    };

    client.publish("sensor/vitals", JSON.stringify(vitals));
    console.log("📤 Vitals published");
  } catch (err) {
    console.error("❌ Error publishing vitals:", err);
  } finally {
    client.end();
  }
});
