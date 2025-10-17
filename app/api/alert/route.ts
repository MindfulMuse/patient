// lib/twilio/twilio.ts

// //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\alert\route.ts
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioClient = twilio(accountSid, authToken);

// const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER!;
// const ALERT_TO = process.env.ALERT_PHONE_NUMBER!;

// export async function sendBPAlert(sbp: number, dbp: number) {
//   try {
//     await twilioClient.messages.create({
//       body: `⚠️ High BP Alert! Systolic: ${sbp}, Diastolic: ${dbp}. Please check the patient immediately.`,
//       from: TWILIO_FROM,
//       to: ALERT_TO,
//     });
//     console.log("✅ SMS alert sent successfully");
//   } catch (err) {
//     console.error("❌ Failed to send SMS:", err);
//   }
// }


// lib/alerts/sendBPAlert.ts
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER!;
const ALERT_TO = process.env.ALERT_PHONE_NUMBER!;

export async function sendBPAlert(sbp: number, dbp: number) {
  await client.messages.create({
    body: `⚠️ High BP Alert! Systolic: ${sbp}, Diastolic: ${dbp}. Please check the patient immediately.`,
    from: TWILIO_FROM,
    to: ALERT_TO,
  });
}
