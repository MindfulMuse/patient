// import React from "react";
// import {checkRole} from "@/utils/roles";
// import { redirect } from "next/navigation";
// import {getRole} from "@/utils/roles";
// import ProductTableCard from "./doctable/table/page";
// import RiskBarChartCard from "./doctable/risk/page";
// import prisma from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";


// const DoctorDashboard = async() => {
// const isDoctor =await checkRole('DOCTOR')
//  const role = await getRole();
// if (!isDoctor) {
// redirect(`/re`)
// }


// //  const user = await currentUser();

// //   if (!user) {
// //     redirect("/sign-in");
// //   }

// //   const email = user?.emailAddresses?.[0]?.emailAddress;

// //   const doctor = await prisma.doctor.findUnique({
// //     where: { email },
// //   });

// //   if (!doctor) {
// //     redirect("/doctor/registration");
// //   }

// return <div>
//    <RiskBarChartCard />
// </div>
// };
// export default DoctorDashboard;


import React from "react";
import {checkRole} from "@/utils/roles";
import { redirect } from "next/navigation";
import {getRole} from "@/utils/roles";
import ProductTableCard from "./doctable/table/page";
import RiskBarChartCard from "./doctable/risk/page";

const DoctorDashboard = async() => {
const isDoctor =await checkRole('DOCTOR')
 const role = await getRole();
if (!isDoctor) {
redirect(`/${role}`)
}
return <div>
   <ProductTableCard />
</div>
};
export default DoctorDashboard;
