// // E:\Projects\patient monitor\patient monitor\my-app\app\api\doctor\getdoctor\routes.ts
// import { NextResponse } from "next/server";
// import prisma from '@/lib/db';

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json({ msg: "Email is required" }, { status: 400 });
//     }

//     const doctor = await prisma.doctor.findUnique({
//       where: { email },
//       include: {
//         Patient: true, // optional — if you want patients included
//       },
//     });

//     if (!doctor) {
//       return NextResponse.json({ msg: "Doctor not found" }, { status: 404 });
//     }

//     return NextResponse.json({ doctor }, { status: 200 });
//   } catch (err) {
//     console.error("Error fetching doctor:", err);
//     return NextResponse.json(
//       { msg: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


/*
//E:\Projects\patient-monitor\my-app\app\api\doctor\new-doc\route.ts
"use server";

import db from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


// Transform Doctor data to match Prisma
function transformDoctorData(doctorData: any) {
  return {
    id: doctorData.id, // only when updating
    name: doctorData.name,
    email: doctorData.email,
    specialization: doctorData.specialization,
    license_number: doctorData.license_number,
    phone: doctorData.phone,
    address: doctorData.address,
    department: doctorData.department,
    img: doctorData.img,
    colorCode: doctorData.colorCode,
    availability_status: doctorData.availability_status,
    type: doctorData.type,
    updated_at: new Date(), // ✅ required

  };
}


// POST /api/doctor/new-doc
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { data, did } = body; // Expecting { data: {...}, did: "..." }

// // Create new Doctor
export async function createNewDoctor(data: any, did: string) {
  try {
    let doctor_id = did;
    const client = await clerkClient();

    if (did === "new-doctor") {
      const user = await client.users.createUser({
        emailAddress: [data.email],
        password: data.phone,
        firstName: data.name,
        publicMetadata: { role: "doctor" },
      });

      doctor_id = user.id;
    } else {
      await client.users.updateUser(did, {
        publicMetadata: { role: "doctor" },
      });
    }

    await db.doctor.create({
      data: {
        ...transformDoctorData(data),
        id: doctor_id,
      },
    });

    return { success: true, error: false, msg: "Doctor created successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}

// Update existing Doctor
export async function updateDoctor(data: any, did: string) {
  try {
    // const body = await req.json();
    // const { data, did } = body; 

   
    const client = await clerkClient();
    await client.users.updateUser(did, {
      firstName: data.name,
    });

    await db.doctor.update({
      data: transformDoctorData(data),
      where: { id: did },
    });

    return { success: true, error: false, msg: "Doctor info updated successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}
 */

//E:\\my-app\app\api\doctor\getdoctor\route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const adminEmail = searchParams.get("email"); // email of the logged-in admin

    if (!adminEmail) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    // Get all doctors assigned to this admin
    const doctors = await prisma.doctor.findMany({
      where: { adminid: admin.id },
    });

    return NextResponse.json({ doctors }, { status: 200 });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
