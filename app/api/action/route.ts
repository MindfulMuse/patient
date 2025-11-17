// // actions.ts or wherever your server actions are defined

// // ✅ Utility: Remove undefined keys from an object
// function removeUndefined<T extends object>(obj: T): Partial<T> {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, value]) => value !== undefined)
//   ) as Partial<T>;
// }

// // ⬇ Your existing imports
// import db from "@/lib/db";
// import { PatientFormSchema } from "@/lib/schema";
// import { clerkClient } from "@clerk/nextjs/server";

// // ✅ Now use it inside create/update functions:
// export async function createNewPatient(data: any, pid: string) {
//   try {
//     const validateData = PatientFormSchema.safeParse(data);
//     if (!validateData.success) {
//       return { success: false, error: true, msg: "Provide all required fields" };
//     }

//     const patientData = validateData.data;
//     let patient_id = pid;

//     const client = await clerkClient();
//     if (pid === "new-patient") {
//       const user = await client.users.createUser({
//         emailAddress: [patientData.email],
//         password: patientData.phone,
//         firstName: patientData.first_name,
//         lastName: patientData.last_name,
//         publicMetadata: { role: "patient" },
//       });
//       patient_id = user?.id;
//     } else {
//       await client.users.updateUser(pid, {
//         publicMetadata: { role: "patient" },
//       });
//     }

//     await db.patient.create({
//       data: {
//         ...removeUndefined(patientData), // ✅ safely strip undefined
//         id: patient_id,
//       },
//     });


// #try and catch block 
//     return { success: true, error: false, msg: "Patient created successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { success: false, error: true, msg: error?.message };
//   }
// }

//E:\Projects\patient monitor\my-app\app\api\action\patient.ts
"use server";

import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";

function transformPatientData(patientData: any) {
  return {
    id: patientData.id, // only when needed
    first_name: patientData.first_name,
    last_name: patientData.last_name,
    date_of_birth: patientData.date_of_birth,
    gender: patientData.gender,
    phone: patientData.phone,
    email: patientData.email,
    marital_status: patientData.marital_status,
    address: patientData.address,
    emergency_contact_name: patientData.emergency_contact_name,
    emergency_contact_number: patientData.emergency_contact_number,
    relation: patientData.relation,
    blood_group: patientData.blood_group,
    allergies: patientData.allergies,
    medical_conditions: patientData.medical_conditions,
    medical_history: patientData.medical_history,
    last_admitted_hospital : patientData.last_admitted_hospital,
    last_admission_date : patientData.last_admission_date,
    admission_reason : patientData.admission_reason ,
    privacy_consent: patientData.privacy_consent,
    service_consent: patientData.service_consent,
    medical_consent: patientData.medical_consent,
    img: patientData.img,
  };
}


export async function updatePatient(data: any, pid: string) {
  try {
    const validateData = PatientFormSchema.safeParse(data);

    if (!validateData.success) {
      return {
        success: false,
        error: true,
        msg: "Provide all required fields",
      };
    }

    const patientData = validateData.data;

    const client = await clerkClient();
    await client.users.updateUser(pid, {
      firstName: patientData.first_name,
      lastName: patientData.last_name,
    });

    await db.patient.update({
      // data: {
      //   ...patientData,
      // },
      data: transformPatientData(patientData),

      where: { id: pid },
    });

    return {
      success: true,
      error: false,
      msg: "Patient info updated successfully",
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}
export async function createNewPatient(data: any, pid: string) {
  try {
    const validateData = PatientFormSchema.safeParse(data);
     
    if (!validateData.success) {
      return {
        success: false,
        error: true,
        msg: "Provide all required fields",
      };
    }

    const patientData = validateData.data;
    let patient_id = pid;

    const client = await clerkClient();
    if (pid === "new-patient") {
      const user = await client.users.createUser({
        emailAddress: [patientData.email],
        password: patientData.phone,
        firstName: patientData.first_name,
        lastName: patientData.last_name,
        publicMetadata: { role: "patient" },
      });

      patient_id = user?.id;
    } else {
      await client.users.updateUser(pid, {
        publicMetadata: { role: "patient" },
      });
    }

    await db.patient.create({
      data: {
       ...transformPatientData(patientData),
        // clerk_user_id: pid,
        id: patient_id,
         updated_at: new Date(),
      },

      
    });

  //   await db.patient.update({
  // data: transformPatientData(patientData),
  // where: { id: pid },
// });


    return { success: true, error: false, msg: "Patient created successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}