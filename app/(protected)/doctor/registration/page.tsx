// import { NewDoctor } from "../../../../components/new-doctor";
// import { getDoctorById } from "../../../../utils/service/doctor";
// import { auth } from "@clerk/nextjs/server";
// import React from "react";

// const DoctorRegistration = async () => {
//   const { userId } = await auth();
//   const { data } = await getDoctorById(userId!);

//   return (
//     <div className="w-full h-full flex justify-center">
//       <div className="max-w-6xl w-full relative pb-10">
//         <NewDoctor
//           userId={userId!}
//           data={data!}
//           type={!data ? "create" : "update"}
//         />
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;

//E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\doctor\registration\page.tsx
import { NewDoctor } from "../../../../components/new-doctor";
import { getDoctorById } from "../../../../utils/service/doctor";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const DoctorRegistration = async () => {
  const { userId } = await auth();
  const { data } = await getDoctorById(userId!);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-6xl w-full relative pb-10">
        <NewDoctor
          userId={userId!}
          data={data!}
          type={!data ? "create" : "update"}
        />
      </div>
    </div>
  );
};

export default DoctorRegistration;
