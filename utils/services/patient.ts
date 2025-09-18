import db from "@/lib/db";
export async function getPatientById(id: string) {
  try {
    const patient = await db.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return {
        success: false,
        message: "Patient data not found",
        status: 200,
        data: null,
      };
    }

    return { success: true, data: patient, status: 200 };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getPatientDashboardStatistics(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        message: "No data found",
        data: null,
      };
    }

    type PatientVitals = {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  img: string;
  sbp: number | null;
  dbp: number | null;
  heart_rate: number | null;
  respiration_rate: number | null;
  blood_pressure: string | null;
  oxygen_saturation: number | null;
  body_temperature: number | null;
  ri: number | null;
  si: number | null;
  pi: number | null;
  activity_level: number | null;
};

   const data = await db.patient.findUnique({
  where: { id },
  select: {
    id: true,
    first_name: true,
    last_name: true,
    gender: true,
    img: true,
     VitalSigns: {
      orderBy: { created_at: "desc" },
      take: 1, // get latest vital signs
      select: {
       
        heart_rate: true,
        respiratory_rate: true,
        oxygen_saturation: true,
        body_temperature: true,
        sbp: true,
        dbp: true,
        ri: true,
        si: true,
        pi: true,
        blood_pressure:true,
        activity_level: true,
      },
      },
  },
  
});





    if (!data) {
      return {
        success: false,
        message: "Patient not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Patient dashboard data retrieved",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
}


export async function getPatientFullDataById(id: string) {
  try {
    const patient = await db.patient.findFirst({
      where: {
        OR: [
          { id },
          { email: id },
        ],
      },
      // No `include: { appointments: true }` here, so appointments won't be fetched
    });

    return patient;
  }catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
}