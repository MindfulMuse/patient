import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, phone } = await req.json();

    if (!id || !name || !email) {
      return NextResponse.json(
        { success: false, msg: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if nurse already exists
    const existing = await prisma.nurse.findUnique({
      where: { id },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, msg: 'Nurse already registered' },
        { status: 400 }
      );
    }

    const nurse = await prisma.nurse.create({
      data: {
        id, // Clerk userId
        name,
        email,
        phone,
      },
    });

    return NextResponse.json({ success: true, nurse });
  } catch (error) {
    console.error('register-nurse error:', error);
    return NextResponse.json(
      { success: false, msg: 'Something went wrong' },
      { status: 500 }
    );
  }
}


//after upgrading twilio 

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';
// import twilio from 'twilio';

// const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

// export async function POST(req: NextRequest) {
//   try {
//     const { id, name, email, phone } = await req.json();

//     if (!id || !name || !email || !phone) {
//       return NextResponse.json(
//         { success: false, msg: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Check if nurse already exists
//     const existing = await prisma.nurse.findUnique({ where: { id } });
//     if (existing) {
//       return NextResponse.json(
//         { success: false, msg: 'Nurse already registered' },
//         { status: 400 }
//       );
//     }

//     const nurse = await prisma.nurse.create({
//       data: { id, name, email, phone },
//     });

//     // Send a welcome SMS immediately 🚀
//     await client.messages.create({
//       body: `Welcome ${name}, you are now registered to receive alerts.`,
//       from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
//       to: phone,
//     });

//     return NextResponse.json({ success: true, nurse });
//   } catch (error) {
//     console.error('register-nurse error:', error);
//     return NextResponse.json(
//       { success: false, msg: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }
