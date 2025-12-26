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

// // app/api/doctor/add-doctor/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function POST(req: NextRequest) {
//   try {
//     const { email, adminid } = await req.json();

//     if (!email || !adminid) {
//       return NextResponse.json({ success: false, msg: 'Missing email or adminId' }, { status: 400 });
//     }

//     const doctor = await prisma.doctor.findFirst({
//       where: { email },
//     });

//     if (!doctor) {
//       return NextResponse.json({ success: false, msg: 'Doctor not found' }, { status: 404 });
//     }

//     const updatedDoctor = await prisma.doctor.update({
//       where: { id: doctor.id },
//       data: { adminid,
//     updated_at: new Date(),
//        },

//     });

//     return NextResponse.json({ success: true, doctor: updatedDoctor });
//   } catch (error) {
//     console.error('assign-doctor-to-admin error:', error);
//     return NextResponse.json({ success: false, msg: 'Something went wrong' }, { status: 500 });
//   }
// }


// claude 2.01
// app/api/doctor/add-doctor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, specialization, adminEmail } = await req.json();

    // Validate input
    if (!name || !email || !specialization || !adminEmail) {
      return NextResponse.json(
        { success: false, msg: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, msg: 'Admin not found' },
        { status: 404 }
      );
    }

    // Check if doctor already exists in database
    const existingDoctor = await prisma.doctor.findUnique({
      where: { email },
    });

    if (existingDoctor) {
      return NextResponse.json(
        { success: false, msg: 'Doctor with this email already exists' },
        { status: 409 }
      );
    }

    // Create user in Clerk with doctor role - AWAIT clerkClient()
    let clerkUser;
    try {
      const clerk = await clerkClient();
      clerkUser = await clerk.users.createUser({
        emailAddress: [email],
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        publicMetadata: {
          role: 'doctor',
          specialization: specialization,
        },
        skipPasswordChecks: true, // They'll set password via invitation
      });
    } catch (clerkError: any) {
      console.error('Clerk user creation error:', clerkError);
      return NextResponse.json(
        { 
          success: false, 
          msg: `Failed to create user in Clerk: ${clerkError.message || 'Unknown error'}` 
        },
        { status: 500 }
      );
    }

    // Create doctor in database with all required fields
    const newDoctor = await prisma.doctor.create({
      data: {
        id: clerkUser.id, // Use Clerk ID as primary key
        name,
        email,
        specialization,
        license_number: '', // Provide default or prompt user
        phone: '', // Provide default or prompt user
        address: '', // Provide default or prompt user
        department: specialization, // Use specialization as department
        img: null,
        colorCode: null,
        availability_status: 'AVAILABLE',
        type: 'FULL',
        adminid: admin.id,
        clerkId: clerkUser.id,
        created_at: new Date(),
        updated_at: new Date(),
        Patient_email: null,
      },
    });

    // Optionally: Send invitation email to doctor
    try {
      const clerk = await clerkClient();
      await clerk.users.updateUser(clerkUser.id, {
        publicMetadata: {
          ...clerkUser.publicMetadata,
          invitedBy: adminEmail,
          invitedAt: new Date().toISOString(),
        },
      });
    } catch (inviteError) {
      console.warn('Failed to update invitation metadata:', inviteError);
      // Non-critical error, continue
    }

    return NextResponse.json(
      {
        success: true,
        doctor: newDoctor,
        message: 'Doctor created successfully in both Clerk and database',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('add-doctor error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, msg: 'Doctor with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        msg: `Server error: ${error.message || 'Something went wrong'}` 
      },
      { status: 500 }
    );
  }
}