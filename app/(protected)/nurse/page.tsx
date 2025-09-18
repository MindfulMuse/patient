// //E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\nurse\page.tsx
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Nurse, Patient } from "@/lib/generated/prisma";

// export default function NurseTable() {

//       const decodedEmail = decodeURIComponent(params.email);
//       const [doctor, setDoctor] = useState<Doctor | null>(null);
//       const [loading, setLoading] = useState(true);
//       const [patients, setPatients] = useState<Patient[]>([]);
//       const [ Nurses,  setNurses] = useState<Nurse[]>([]);
//       const [isAddOpen, setIsAddOpen] = useState(false);
//     const [formData, setFormData] = useState<FormDataType>({
//       first_name: '',
//       last_name: '',
//       // age: '',
//       phone: '',
//       email: '', 
//     });
//       const [searchTerm, setSearchTerm] = useState('');
//       const [currentPage, setCurrentPage] = useState(1);
//       const itemsPerPage = 5;

//       const handleAddNurse = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const res = await fetch('/api/nurse/add-nurse', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: formData.email,
//         name: formData.name,
//         phone: formData.phone,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok && data.success) {
//       alert('✅ Nurse added successfully!');
//       setNurses([data.nurse, ...nurses]);
//       setFormData({ name: '', email: '', phone: '' });
//       setIsAddOpen(false);
//     } else {
//       alert(`❌ ${data.msg}`);
//     }
//   } catch (err) {
//     console.error(err);
//     alert('🚨 Error adding nurse.');
//   }
// };

//   return (
//     <div>
//       Nurse Dashboard
//     </div>
//   );
// }

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/dist/server/api-utils';

// type Assignment = {
//   id: string;
//   patient: {
//     id: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//   };
//   startTime: string;
//   endTime: string;
// };

// export default function NurseDashboard() {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [loading, setLoading] = useState(true);
  
//     const user = await currentUser();
  
//     const nurseEmail = user?.emailAddresses?.[0]?.emailAddress;
//   // Assume nurse email is available (from auth context / session)
//   // const nurseEmail = "nurse1@gmail.com"; // ⚡ Replace with real nurse email from session

  
//     if (!nurseEmail) {
//       redirect("/nurse/registration");
//     }
  
//   useEffect(() => {
//     async function fetchAssignments() {
//       try {
//         const res = await fetch(`/api/nurse/get-assignment?nurseEmail=${nurseEmail}`);
//         const data = await res.json();
//         if (res.ok) {
//           setAssignments(data.assignments);
//         }
//       } catch (err) {
//         console.error('Failed to fetch assignments:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAssignments();
//   }, [nurseEmail]);

//   if (loading) {
//     return <p className="text-center mt-10">Loading assignments...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
//         My Assigned Patients
//       </h2>

//       {assignments.length === 0 ? (
//         <p className="text-center text-gray-500 dark:text-gray-400">
//           No patients assigned yet.
//         </p>
//       ) : (
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Patient Name</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Shift Start</th>
//               <th className="px-6 py-3">Shift End</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.map((a) => (
//               <tr
//                 key={a.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                   {a.patient.first_name} {a.patient.last_name}
//                 </td>
//                 <td className="px-6 py-4">{a.patient.email}</td>
//                 <td className="px-6 py-4">
//                   {new Date(a.startTime).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   {new Date(a.endTime).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <Link
//                     href={`/doctor/patient-data/${encodeURIComponent(
//                       a.patient.email
//                     )}/trends`}
//                     className="text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

//E:\Projects\my-app\app\(protected)\nurse\page.tsx
'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Assignment = {
  id: string;
  Patient: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  starttime: string;
  endtime: string;
};

export default function NurseDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  const nurseEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    async function checkNurse() {
      if (!nurseEmail) return;

      // Check E:\my-app\app\api\nurse\Nurse\check\route.ts
      const res = await fetch(`/api/nurse/Nurse/check?email=${nurseEmail}`);
      if (res.status === 404) {
        router.push("/nurse/registration");
        return;
      }

      // ✅ Then fetch assignments
      const assignRes = await fetch(`/api/nurse/get-assignment?nurseEmail=${nurseEmail}`);
      const data = await assignRes.json();

      if (assignRes.ok) {
        setAssignments(data.assignments);
      }

      setLoading(false);
    }

    checkNurse();
  }, [nurseEmail, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading assignments...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        My Assigned Patients
      </h2>

      {assignments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No patients assigned yet.
        </p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Patient Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Shift Start</th>
              <th className="px-6 py-3">Shift End</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="bg-white border-b dark:bg-gray-800">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {a.Patient.first_name} {a.Patient.last_name}
                </td>
                <td className="px-6 py-4">{a.Patient.email}</td>
                <td className="px-6 py-4">{new Date(a.starttime).toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(a.endtime).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Link
                  //E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\doctor\patient-data\[email]\patient-page\page.tsx
                    href={`nurse/patient-data/${encodeURIComponent(a.Patient.email)}/patient-page`}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
