//E:\Projects\my-app\utils\service\doctor.ts
import db from "@/lib/db";
export async function getDoctorById(id: string) {
  try {
    const doctor = await db.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      return {
        success: false,
        message: "Patient data not found",
        status: 200,
        data: null,
      };
    }

    return { success: true, data:doctor, status: 200 };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}