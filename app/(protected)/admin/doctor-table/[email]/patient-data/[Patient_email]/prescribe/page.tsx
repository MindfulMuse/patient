
// E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\patient\prescribe\page.tsx

// 'use client';

// import { useUser } from '@clerk/nextjs';
// import { auth } from '@clerk/nextjs/server';
// import React, { useState ,useEffect} from 'react';

// type Medication = {
//   name: string;
//   email:string;
//   dosage: string;
//   timing: string[]; 
//   custom: boolean;
//   form: 'L' | 'T';
// };

// type Prescription = {
//   id: number;
//   name: string;
//   date: string;
//   medications: Medication[];
//   instructions: string;
// };

// export default function Ptable() {

  
//   const { isLoaded, user } = useUser();

//   const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//   const [isViewOpen, setIsViewOpen] = useState(false);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const prescriptionsPerPage = 5; // ✅ Change this for more/less per page

//     // Pagination logic
//   const indexOfLast = currentPage * prescriptionsPerPage;
//   const indexOfFirst = indexOfLast - prescriptionsPerPage;
//   const currentPrescriptions = prescriptions.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(prescriptions.length / prescriptionsPerPage);

//   const [formData, setFormData] = useState<{
//   name: string;
//   email:string;
//   medications: Medication[];
//   instructions: string;
// }>({
//   name: '',
//   email:'',
//   medications: [{ name: '', email:'', dosage: '', timing: [], custom: false, form: 'T' }], // Default to Tablet
//   instructions: '',
// });


//   const handleView = (prescription: Prescription) => {
//     setSelectedPrescription(prescription);
//     setIsViewOpen(true);
//   };



//  useEffect(() => {
//     if (!isLoaded) return;

//     fetch("/api/PI/prescribe")
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data))
//       .catch((err) => console.error("Error fetching prescriptions:", err));
//   }, [isLoaded]);



//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//         <div className="flex items-center justify-between flex-wrap md:flex-row pb-4 bg-white dark:bg-gray-900">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for patients"
//               className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//             />
//           </div>
         
//         </div>

//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Patient Name</th>
//               <th className="px-6 py-3">Date</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.map((prescription) => (
//               <tr key={prescription.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{prescription.name}</td>
//                 <td className="px-6 py-4">{prescription.date}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleView(prescription)}
//                     className="text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//          {/* Pagination Controls */}
//         <div className="flex justify-center items-center space-x-2 mt-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentPage(idx + 1)}
//               className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
//             >
//               {idx + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>


//         {/* View Modal */}
//         {isViewOpen && selectedPrescription && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
//               <div className="flex justify-between items-center border-b border-gray-300 pb-4">
//                 <h3 className="text-lg font-semibold">Prescription Details</h3>
//                 <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-900">×</button>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <div><strong>Patient:</strong> {selectedPrescription.name}</div>
//                 <div><strong>Date:</strong> {selectedPrescription.date}</div>
//                 <div>
//                   <strong>Medications:</strong>
//                   <ul className="list-disc pl-5 mt-1">
//                     {selectedPrescription.medications.map((med, index) => (
//                       <li key={index} className="mb-1">
//                         <div><strong>{med.name}</strong> – {med.dosage}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-300">
//                           {med.timing.length > 0 ? med.timing.join(', ') : "No timing specified"}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div><strong>Instructions:</strong> {selectedPrescription.instructions}</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

// import { useUser } from '@clerk/nextjs';
// import { auth } from '@clerk/nextjs/server';
import { useParams } from 'next/navigation';
import React, { useState ,useEffect} from 'react';

type Medication = {
  name: string;
  email:string;
  dosage: string;
  timing: string[]; 
  custom: boolean;
  form: 'L' | 'T';
};

type Prescription = {
  id: number;
  name: string;
  date: string;
  medications: Medication[];
  instructions: string;
};

// export default async function DoctorPatientViewPrescribe({
//   params,
// }: {
//   params: { email: string; Patient_email: string };
// }) {
  // const awaitedParams = await params;

  // const doctorEmail = decodeURIComponent(awaitedParams.email);
  // const patientEmail = decodeURIComponent(awaitedParams.Patient_email);


  export default async function Patient_History() {
    const { Demail, Patient_email } = useParams<{ Demail: string; Patient_email: string }>();
   
    const doctorEmail = decodeURIComponent(Demail);
    const patientEmail = decodeURIComponent(Patient_email);
    
   
  
  // const { isLoaded, user } = useUser();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription>({
  id: 0,
  name: '',
  date: '',
  medications: [],
  instructions: ''
});

  // const { email } = useParams();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 5; // ✅ Change this for more/less per page

    // Pagination logic
  const indexOfLast = currentPage * prescriptionsPerPage;
  const indexOfFirst = indexOfLast - prescriptionsPerPage;
  const currentPrescriptions = prescriptions.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(prescriptions.length / prescriptionsPerPage);

  const [formData, setFormData] = useState<{
  name: string;
  email:string;
  medications: Medication[];
  instructions: string;
}>({
  name: '',
  email:'',
  medications: [{ name: '', email:'', dosage: '', timing: [], custom: false, form: 'T' }], // Default to Tablet
  instructions: '',
});


  const handleView = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsViewOpen(true);
  };



 useEffect(() => {
  if (!patientEmail) return;

  fetch(`/api/assigning/${encodeURIComponent(patientEmail as string)}/prescribe`)
    .then((res) => res.json())
    .then((data) => setPrescriptions(data))
    .catch((err) => console.error("Error fetching prescriptions:", err));
}, [patientEmail]);



  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-between flex-wrap md:flex-row pb-4 bg-white dark:bg-gray-900">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for patients"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
         
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Patient Name</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{prescription.name}</td>
                <td className="px-6 py-4">{prescription.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(prescription)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>


        {/* View Modal */}
        {isViewOpen && selectedPrescription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
              <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Prescription Details</h3>
                <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-900">×</button>
              </div>
              <div className="mt-4 space-y-2">
                <div><strong>Patient:</strong> {selectedPrescription.name}</div>
                <div><strong>Date:</strong> {selectedPrescription.date}</div>
                <div>
                  <strong>Medications:</strong>
                  <ul className="list-disc pl-5 mt-1">
                   {selectedPrescription.medications?.map((med) => (
  <li key={med.name + med.dosage} className="mb-1">
                        <div><strong>{med.name}</strong> – {med.dosage}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {med.timing.length > 0 ? med.timing.join(', ') : "No timing specified"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div><strong>Instructions:</strong> {selectedPrescription.instructions}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
