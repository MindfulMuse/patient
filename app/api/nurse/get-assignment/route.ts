// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const nurseEmail = searchParams.get('nurseEmail');

//     if (!nurseEmail) {
//       return NextResponse.json(
//         { success: false, msg: 'Missing nurseEmail' },
//         { status: 400 }
//       );
//     }

//     // Find nurse by email
//     const nurse = await prisma.nurse.findUnique({
//       where: { email: nurseEmail },
//     });

//     if (!nurse) {
//       return NextResponse.json(
//         { success: false, msg: 'Nurse not found' },
//         { status: 404 }
//       );
//     }

//     // Get all assignments for this nurse
//     const assignments = await prisma.nurseAssignment.findMany({
//       where: { nurseid: nurse.id },
//       include: {
//         Patient: {
//           select: {
//             id: true,
//             first_name: true,
//             last_name: true,
//             email: true,
//           },
//         },
//       },
//       orderBy: { starttime: 'asc' },
//     });

//     return NextResponse.json({ success: true, assignments });
//   } catch (error) {
//     console.error('get-assignments error:', error);
//     return NextResponse.json(
//       { success: false, msg: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nurseEmail = searchParams.get('nurseEmail');

    if (!nurseEmail) {
      return NextResponse.json(
        { success: false, msg: 'Missing nurseEmail' },
        { status: 400 }
      );
    }

    // Find nurse by email
    const nurse = await prisma.nurse.findUnique({
      where: { email: nurseEmail },
    });

    if (!nurse) {
      return NextResponse.json(
        { success: false, msg: 'Nurse not found' },
        { status: 404 }
      );
    }

    const now = new Date();

    // Get only active/upcoming assignments
    const assignments = await prisma.nurseAssignment.findMany({
      where: {
        nurseid: nurse.id,
        endtime: { gte: now }, // filter out past assignments
      },
      include: {
        Patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
      orderBy: { starttime: 'asc' },
    });

    return NextResponse.json({ success: true, assignments });
  } catch (error) {
    console.error('get-assignments error:', error);
    return NextResponse.json(
      { success: false, msg: 'Something went wrong' },
      { status: 500 }
    );
  }
}
