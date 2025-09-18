//E:\Projects\my-app\app\api\nurse\assign-shift\route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import Twilio from 'twilio';

const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const { nurseEmail, patientEmail, startTime, endTime } = await req.json();

    if (!nurseEmail || !patientEmail || !startTime || !endTime) {
      return NextResponse.json({ success: false, msg: 'Missing data' }, { status: 400 });
    }

    const nurse = await prisma.nurse.findUnique({ where: { email: nurseEmail } });
    const patient = await prisma.patient.findUnique({ where: { email: patientEmail } });

    if (!nurse || !patient) {
      return NextResponse.json({ success: false, msg: 'Nurse or patient not found' }, { status: 404 });
    }

    const assignment = await prisma.nurseAssignment.create({
      data: {
        nurseid: nurse.id,
        patientid: patient.id,
        starttime: new Date(startTime),
        endtime: new Date(endTime),
      },
    });

  // Send SMS notification to alert number
await client.messages.create({
  body: `Hi ${nurse.name}, you have been assigned to patient ${patient.first_name} ${patient.last_name} from ${new Date(startTime).toLocaleString()} to ${new Date(endTime).toLocaleString()}.`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: process.env.ALERT_PHONE_NUMBER!, // fixed alert number
});



    return NextResponse.json({ success: true, assignment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, msg: 'Something went wrong' }, { status: 500 });
  }
}
