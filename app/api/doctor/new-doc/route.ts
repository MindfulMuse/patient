
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
export async function createNewDoctorPOST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, did } = body; // Expecting { data: {...}, did: "..." }

// // Create new Doctor
// export async function createNewDoctor(data: any, did: string) {
//   try {
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
export async function updateDoctorPUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, did } = body; 
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
