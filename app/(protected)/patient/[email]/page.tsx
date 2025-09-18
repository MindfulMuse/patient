export const dynamic = 'force-dynamic';
import { type Metadata } from "next";


import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { getPatientDashboardStatistics } from "@/utils/services/patient";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HeartPulse, Activity, Thermometer, Droplets, Stethoscope,AirVent } from "lucide-react";
import Link from "next/link";
import React from "react";
// import { getLatestVitals } from "@/lib/mqtt/mqtt";
import { getVitals } from "@/lib/db/getvital";
import prisma from "@/lib/db";
import { getLatestVitals } from "@/lib/mqtt/mqtt";
import TemperatureChart from "@/components/charts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// type PatientDashboardProps = {
//   searchParams?: {
//     id?: string;
//   };
// };

interface PatientDashboardProps {
  searchParams: { email?: string };
}


// const PatientDashboard = async () => {
export default async function PatientDashboard({
  searchParams,
}: {
  searchParams: { email?: string };
}) {

  const user = await currentUser();

  const { data } = await getPatientDashboardStatistics(user?.id!);
   const email = user?.emailAddresses?.[0]?.emailAddress;
  // const patient = await prisma.patient.findUnique({ where: { email } });
  
  // const res = await fetch(${process.env.NEXT_PUBLIC_APP_URL}/api/vitals);
  // const Vitaldata = await res.json();
  const Vitaldata = await getLatestVitals();
  if (!user) {
    redirect("/sign-in"); // Or wherever you want to send unauthenticated users
  }
  
  // const patient = await prisma.patient.findUnique({
  //   where: { email: user?.emailAddresses?.[0]?.emailAddress  }, // make sure you have this in your schema!
  // });

  // await fetch(${process.env.NEXT_PUBLIC_APP_URL}/api/vitals);

 
 

  // if (!patient) {
  //   redirect("/patient/registration");
  // }

//  const Vitaldata = await getVitals(patient.id);
 
//   const vitals = await prisma.vitalSigns.findMany({
//   where: { patient_id: patient.id },
//   orderBy: { created_at: "desc" },
// });

// DOCTOR ACCESS
  const { sessionClaims } =await auth();

  //  const role = (sessionClaims?.metadata as { role?: string })?.role ?? "patient";

  // const emailFromQuery =await searchParams?.email;
  // const email1 =
  //   role === "doctor" && emailFromQuery
  //     ? decodeURIComponent(emailFromQuery)
  //     : user.emailAddresses?.[0]?.emailAddress;

  // if (!email1) {
  //   return <div>Email not found</div>;
  // }

    const role = (sessionClaims?.metadata as { role?: string })?.role ?? "patient";

  // const emailFromQuery =  searchParams?.email;
  const emailFromQuery = searchParams?.email ?? null;

  
const targetEmail = role === "doctor" && emailFromQuery
  ? decodeURIComponent(emailFromQuery)
  : user?.emailAddresses?.[0]?.emailAddress;

const patient = await prisma.patient.findUnique({
  where: { email: targetEmail },
});

  console.log("Frontend Patient ID:", patient?.id);

  if (!patient) {
    // If the current user is a patient with no record, redirect them to registration
    if (role === "patient") {
      return redirect("/patient/registration");
    } else {
      return <div>❌ Patient not found</div>;
    }
  }

  // Doctor access restriction: must only view patients assigned to them
  if (role === "doctor") {
    const doctor = await prisma.doctor.findUnique({
      where: { email: user.emailAddresses?.[0]?.emailAddress },
      include: { patients: true },
    });

    const isAssigned = doctor?.patients.some(p => p.email === targetEmail );
    if (!isAssigned) {
      return <div>❌ You are not assigned to this patient.</div>;
    }
  }

  console.log("Vitals ", Vitaldata);
  

  if (user && !data) {
    redirect("/patient/registration");
  }
//   if (Vitaldata && patient?.id) {
//   await prisma.vitalSigns.create({
//     data: {
//       patient_id: patient.id,
//       body_temperature: Vitaldata.body_temperature ?? 0,
//       systolic: Vitaldata.systolic ?? 0,
//       diastolic: Vitaldata.diastolic ?? 0,
//       heart_rate: Vitaldata.heart_rate ?? 0,
//       respiratory_rate: Vitaldata.respiratory_rate,
//       oxygen_saturation: Vitaldata.oxygen_saturation,
//       pulse_rate: Vitaldata.pulse_rate,
//       activity_level: Vitaldata.activity_level,
//       blood_pressure: Vitaldata.blood_pressure ?? 0,
//       height: Vitaldata.height ?? 0,
//     },
//   }).then(() => console.log(" Inserted vitals")).catch(console.error);
// }

  if (!data) return null;
  if (Vitaldata && patient?.id) {
  await prisma.vitalSigns.create({
    data: {
      patient_id: patient.id,
      body_temperature: Vitaldata.body_temperature ?? 0,
      sbp: Vitaldata.sbp ?? 0,
      dbp: Vitaldata.dbp ?? 0,
      heart_rate: Vitaldata.heart_rate ?? 0,
      respiratory_rate: Vitaldata.respiratory_rate,
      oxygen_saturation: Vitaldata.oxygen_saturation,
      ri: Vitaldata.ri??0,
      si: Vitaldata.si??0,
      pi: Vitaldata.pi??0,
      activity_level: Vitaldata.activity_level,
      blood_pressure: Vitaldata.blood_pressure ?? 0,
      height: Vitaldata.height ?? 0,
    },
  }).then(() => console.log("✅ Inserted vitals"))
    .catch(console.error);
}
  // Define vitals
  const vitalsData = [

       {
      title: "Body Temperature",
      // value:  data?.vitalSigns?.[0]?.body_temperature ?? "N/A",
      // value: Vitaldata?.body_temperature ?? "N/A",
      value: Vitaldata?.body_temperature ?? "N/A",
      icon: Thermometer,
      className: "bg-yellow-500/15",
      iconClassName: "bg-yellow-500/25 text-yellow-600",
      note: "°C",
    },
     {
      title: " SBP ",
      // value:  data?.vitalSigns?.[0]?.systolic ?? "N/A",
      value: Vitaldata?.sbp  ?? "N/A",
      icon: HeartPulse,
      className: "bg-red-500/15",
      iconClassName: "bg-red-500/25 text-red-600",
      note: "mmHg",
    },
       {
      title: "DBP",
             // value:  data?.vitalSigns?.[0]?.diastolic?? "N/A",
      value: Vitaldata?.dbp ?? "N/A",
      icon: AirVent,
      className: "bg-red-500/15",
      iconClassName: "bg-red-500/25 text-red-600",
      note: "mmHg",
    },
    {
      title: "Heart Rate",
       // value:  data?.vitalSigns?.[0]?.heart_rate ?? "N/A",
      value:  Vitaldata?.heart_rate ?? "N/A",
      icon: HeartPulse,
      className: "bg-red-500/15",
      iconClassName: "bg-red-500/25 text-red-600",
      note: "Beats/minute",
    },
    {
      title: "Respiration Rate",
      // value:  data?.vitalSigns?.[0]?.respiratory_rate ?? "N/A",
      value:  Vitaldata?.respiratory_rate?? "N/A",
      icon: AirVent,
      className: "bg-blue-500/15",
      iconClassName: "bg-blue-500/25 text-blue-600",
      note: "Breaths/minute",
    },
    {
      title: "Blood Pressure",
                  // value:  data?.vitalSigns?.[0]?.oxygen_saturation ?? "N/A",

      value:  Vitaldata?.blood_pressure ?? "N/A",
      icon: Stethoscope,
      className: "bg-purple-500/15",
      iconClassName: "bg-purple-500/25 text-purple-600",
      note: "mmHg",
    },
    {
      title: "Oxygen Saturation",
      // value:  data?.vitalSigns?.[0]?.oxygen_saturation ?? "N/A",
      value:  Vitaldata?.oxygen_saturation ?? "N/A",
      icon: Droplets,
      className: "bg-green-500/15",
      iconClassName: "bg-green-500/25 text-green-600",
      note: "SpO₂ %",
    },
 
    {
      title: "Pulse Rate",
      // value:  Vitaldata?.vitalSigns?.[0]?.pulse_rate ?? "N/A",
      value:Vitaldata?.ri ?? "N/A",
      icon: HeartPulse,
      className: "bg-orange-500/15",
      iconClassName: "bg-orange-500/25 text-orange-600",
      note: "%",
    },
     {
      title: "SI",
      // value:  Vitaldata?.vitalSigns?.[0]?.pulse_rate ?? "N/A",
      value:Vitaldata?.si ?? "N/A",
      icon: HeartPulse,
      className: "bg-orange-500/15",
      iconClassName: "bg-orange-500/25 text-orange-600",
      note: "m/sec",
    },
     {
      title: "PI",
      // value:  Vitaldata?.vitalSigns?.[0]?.pulse_rate ?? "N/A",
      value:Vitaldata?.pi ?? "N/A",
      icon: HeartPulse,
      className: "bg-orange-500/15",
      iconClassName: "bg-orange-500/25 text-orange-600",
      note: "%",
    },
    {
      title: "Activity Level",
      // value:  data?.vitalSigns?.[0]?.activity_level ?? "N/A",
      value:Vitaldata?.activity_level?? "N/A",
      icon: Activity,
      className: "bg-cyan-500/15",
      iconClassName: "bg-cyan-500/25 text-cyan-600",
      note: "Steps or score",
    },
  ];

  // Split vitals into 2 rows if more than 4
  const firstRowVitals = vitalsData.slice(0, 4);
  const secondRowVitals = vitalsData.slice(4);

  return (
    <div className="py-6 px-3 flex flex-col rounded-xl xl:flex-row gap-6">
      {/* LEFT SECTION */}
      <div className="w-full xl:w-[100%]">
        <div className="bg-white rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg xl:text-2xl font-semibold">
              Welcome {data?.first_name || user?.firstName}
            </h1>

            <div className="space-x-2">
              <Button size={"sm"}>{new Date().getFullYear()}</Button>
              <Button size="sm" variant="outline" className="hover:underline">
                <Link href="/patient/self">View Profile</Link>
              </Button>
            </div>
          </div>

          {/* VITALS ROW 1 */}
          <div className="w-full flex flex-wrap gap-5 mb-5">
            {firstRowVitals.map((el, id) => (
              <StatCard key={id} {...el} link="#" />
            ))}
          </div>

          {/* VITALS ROW 2 (if needed) */}
          {secondRowVitals.length > 0 && (
            <div className="w-full flex flex-wrap gap-5">
              {secondRowVitals.map((el, id) => (
                <StatCard key={id} {...el} link="#" />
              ))}
            </div>
          )}
          {/* <h2 className=" text-lg my-3 mx-2 xl:text-1xl font-semibold">Demographics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-5">
             {/* <h2 className="text-lg xl:text-2xl font-semibold"></h2> */}
          {/* Demographics */}{/*
          < TemperatureChart/></div> */}
        </div>
      </div>
    </div>
  );
};


// export default PatientDashboard;

