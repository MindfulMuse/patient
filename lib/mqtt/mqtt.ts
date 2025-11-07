
// // lib/mqttServer.js
// import mqtt from "mqtt";
// import prisma from "@/lib/db";

// interface VitalsData {
//     patientId: string;
//   body_temperature: number | null;
//   systolic: number | null;
//   diastolic: number | null;
//   heart_rate: number | null;
//   respiratory_rate: number | null;
//   blood_pressure: number | null;
//   oxygen_saturation: number | null;
//   pulse_rate: number | null;
//   activity_level: string | null;
//   height: number | null;
// }

// let latestVitals: VitalsData | null = null;

// const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// client.on("connect", () => {
//   console.log("✅ MQTT connected");
//   client.subscribe("sensor/vitals");
// });
// client.on("message", async (topic, message) => {
//     console.log("📩 Received MQTT message:", message.toString());

//   try {
//     const data = JSON.parse(message.toString()) as VitalsData;
//     latestVitals = data;

//     if (!data.patientId) return console.warn("No patientId in payload");
//     else{console.log("✅ Found patient in DB:", data.patientId);}

//     const patient = await prisma.patient.findUnique({
//     where: { id: data.patientId },
//     });

//     if (!patient) return console.warn("No patient found for patientId:", data.patientId);

//     await prisma.vitalSigns.create({
//       data: {
//         patient_id: patient.id, // ✅ schema expects `patient_id` foreign key
//         medical_id: 1, // ❗ You MUST replace with real value or fetch it
//         body_temperature: data.body_temperature ?? 0,
//         systolic: data.systolic ?? 0,
//         diastolic: data.diastolic ?? 0,
//         heart_rate: data.heart_rate ?? 0,
//         respiratory_rate: data.respiratory_rate,
//         oxygen_saturation: data.oxygen_saturation,
//         pulse_rate: data.pulse_rate,
//         activity_level: data.activity_level,
//         blood_pressure: data.blood_pressure ?? 0,
//         height: data.height ?? 0,
//       },
//     });

//     console.log("✅ Vital signs saved to DB");
//   } catch (err) {
//     console.error("❌ MQTT error:", err);
//   }
// });


// export function getLatestVitals(): VitalsData | null {
//   return latestVitals;
// }



// // lib/mqtt/mqtt.ts
// import mqtt from "mqtt";
// import prisma from "@/lib/db";
// import twilio from "twilio";


// interface VitalsData {
//     // patientId: string;
//   body_temperature: number | null;
//    sbp  : number | null;
//    dbp: number | null;
//   heart_rate: number | null;
//   respiratory_rate: number | null;
//   blood_pressure: number | null;
//   oxygen_saturation: number | null;
//   ri: number | null;
//   si: number | null;
//   pi: number | null;
//   activity_level: string | null;
//   height: number | null;

// }

// let latestVitals: VitalsData | null = null;

// const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
//  clientId: "clientId-ENPYbaDKSY";


 
// // Setup Twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioClient = twilio(accountSid, authToken);

// const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER!;
// const ALERT_TO = process.env.ALERT_PHONE_NUMBER!; // Your number

// client.on("connect", () => {
//   console.log("✅ MQTT connected");
//   client.subscribe("sensor/vitals", (err) => {
//     if (err) {
//       console.error("❌ Failed to subscribe:", err);
//     } else {
//       console.log("📡 Subscribed to sensor/vitals");
//     }
//   });
// });

// client.on("message", async (topic, message) => {
//   console.log("📩 Received MQTT message:", message.toString());


  
//   try {
//     const data = JSON.parse(message.toString()) as VitalsData;
//     latestVitals = data;

//     // if (!data.patientId) {
//     //   console.warn("❗ Missing patientId in payload");
//     //   return;
//     // }


// //     const patient = await prisma.patient.findUnique({
// //       where: { id: data.patientId }, // ✅ assuming you're using real DB id
// //         // where: { clerk_user_id: data.patientId },
// //     });
// //       //  console.log("✅ Found patient in DB:", patient.id);
// // console.log("Resolved patient ID:", patient?.id);
// //     if (!patient) {
// //       console.warn("❌ No patient found for id:", data.patientId);
// //       return;
// //     }

// //  ;

//     //  await prisma.vitalSigns.create({
//     //   data: {
//     //    patient_id: patient.id,
//     //    medical_id: 1, // ⚠️ TODO: Replace with real medical_id logic
//     //    body_temperature: data.body_temperature ?? 0,
//     //    systolic: data.systolic ?? 0,
//     //    diastolic: data.diastolic ?? 0,
//     //    heart_rate: data.heart_rate ?? 0,
//     //    respiratory_rate: data.respiratory_rate,
//     //    oxygen_saturation: data.oxygen_saturation,
//     //     pulse_rate: data.pulse_rate,
//     //    activity_level: data.activity_level,
//     //     blood_pressure: data.blood_pressure ?? 0,
//     //      height: data.height ?? 0,
//     //   },
//     // });


//       if (
//       (data.sbp && data.sbp > 140) || // High systolic
//       (data.dbp && data.dbp > 90)     // High diastolic
//     ) {
//       console.log("🚨 High blood pressure detected! Sending SMS...");

//       try {
//         await twilioClient.messages.create({
//           body: `⚠️ High BP Alert! Systolic: ${data.sbp}, Diastolic: ${data.dbp}. Please check the patient immediately.`,
//           from: TWILIO_FROM,
//           to: ALERT_TO,
//         });
//         console.log("✅ SMS alert sent successfully");
//       } catch (smsError) {
//         console.error("❌ Failed to send SMS:", smsError);
//       }
//     }
//     console.log("✅ Vital signs saved to DB");

//   } catch (err) {
//     console.error("❌ MQTT error:", err);
//   }
// });

// console.log(latestVitals)

// export function getLatestVitals(): VitalsData | null {
//   return latestVitals;
// }


// // export async function getLatestVitals(patientId: string) {
// //   return await prisma.vitalSigns.findFirst({
// //     where: { patient_id: patientId },
// //     orderBy: { created_at: "desc" },
// //   });
// // }


// // lib/mqtt/mqtt.ts
// import mqtt from "mqtt";
// import { sendBPAlert } from "@/lib/server/twilio/twilio";


// interface VitalsData {
//   body_temperature: number | null;
//   sbp: number | null;
//   dbp: number | null;
//   heart_rate: number | null;
//   respiratory_rate: number | null;
//   blood_pressure: number | null;
//   oxygen_saturation: number | null;
//   ri: number | null;
//   si: number | null;
//   pi: number | null;
//   activity_level: string | null;
//   height: number | null;
// }

// let latestVitals: VitalsData | null = null;

// const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
//   clientId: "clientId-ENPYbaDKSY",
// });

// // client.on("connect", () => {
// //   console.log("✅ MQTT connected");
// //   client.subscribe("sensor/vitals", (err) => {
// //     if (err) console.error("❌ Subscription failed:", err);
// //     else console.log("📡 Subscribed to sensor/vitals");
// //   });
// // });

// // client.on("message", async (topic, message) => {
// //   console.log("📩 Received MQTT message:", message.toString());

// //   try {
// //     const data = JSON.parse(message.toString()) as VitalsData;
// //     latestVitals = data;

// //     // Instead of calling Twilio directly, trigger a server action / API call
// //     if ((data.sbp && data.sbp > 140) || (data.dbp && data.dbp > 90)) {
// //       console.log("🚨 High blood pressure detected! Triggering alert...");
// //       await fetch("/api/alerts/send", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ sbp: data.sbp, dbp: data.dbp }),
// //       });
// //     }
// //   } catch (err) {
// //     console.error("❌ MQTT error:", err);
// //   }
// // });


// client.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());
//     latestVitals = data;

//     if ((data.sbp && data.sbp > 140) || (data.dbp && data.dbp > 90)) {
//       console.log("🚨 High blood pressure detected! Sending SMS...");
//       await sendBPAlert(data.sbp, data.dbp);
//     }
//   } catch (err) {
//     console.error("❌ MQTT error:", err);
//   }
// });

// export function getLatestVitals(): VitalsData | null {
//   return latestVitals;
// }


// lib/mqtt/mqtt.ts
import mqtt from "mqtt";

interface VitalsData {
  body_temperature: number | null;
  sbp: number | null;
  dbp: number | null;
  heart_rate: number | null;
  respiratory_rate: number | null;
  blood_pressure: number | null;
  oxygen_saturation: number | null;
  ri: number | null;
  si: number | null;
  pi: number | null;
  activity_level: string | null;
  height: number | null;
}

let latestVitals: VitalsData | null = null;

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
  clientId: "clientId-ENPYbaDKSY",
    // clientId: "mqtt-server-" + Math.random().toString(16).substr(2, 8),

});

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("sensor/vitals", (err) => {
    if (err) console.error("❌ Subscription failed:", err);
    else console.log("📡 Subscribed to sensor/vitals");
  });
});

client.on("message", async (topic, message) => {
  console.log("📩 Received MQTT message:", message.toString());

  try {
    const data = JSON.parse(message.toString()) as VitalsData;
    latestVitals = data;

    if ((data.sbp && data.sbp > 140) || (data.dbp && data.dbp > 90)) {
      console.log("🚨 High blood pressure detected! Triggering alert...");
      await fetch("/api/alerts/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sbp: data.sbp, dbp: data.dbp }),
      });
    }
  } catch (err) {
    console.error("❌ MQTT error:", err);
  }
});

export function getLatestVitals(): VitalsData | null {
  return latestVitals;
}