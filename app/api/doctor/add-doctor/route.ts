// // app/api/doctor/add-doctor/route.ts  (Next 13 app router style)
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, specialization, adminid } = await req.json();

//     if (!name || !email || !specialization || !adminid) {
//       return NextResponse.json(
//         { success: false, msg: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Check if doctor with email already exists
//     const existingDoctor = await prisma.doctor.findUnique({
//       where: { email },
//     });

//     if (existingDoctor) {
//       return NextResponse.json(
//         { success: false, msg: 'Doctor with this email already exists' },
//         { status: 400 }
//       );
//     }

//     // Create doctor and assign adminId
//     const doctor = await prisma.doctor.create({
//       data: {
//         name,
//         email,
//         specialization,
//         adminid,
//       },
//     });

//     return NextResponse.json({ success: true, doctor }, { status: 201 });
//   } catch (error) {
//     console.error('Error adding doctor:', error);
//     return NextResponse.json(
//       { success: false, msg: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }

// app/api/doctor/add-doctor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, adminid } = await req.json();

    if (!email || !adminid) {
      return NextResponse.json({ success: false, msg: 'Missing email or adminId' }, { status: 400 });
    }

    const doctor = await prisma.doctor.findFirst({
      where: { email },
    });

    if (!doctor) {
      return NextResponse.json({ success: false, msg: 'Doctor not found' }, { status: 404 });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: doctor.id },
      data: { adminid,
    updated_at: new Date(),
       },

    });

    return NextResponse.json({ success: true, doctor: updatedDoctor });
  } catch (error) {
    console.error('assign-doctor-to-admin error:', error);
    return NextResponse.json({ success: false, msg: 'Something went wrong' }, { status: 500 });
  }
}
