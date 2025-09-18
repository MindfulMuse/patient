// 'use client';

// import React, { useEffect, useState } from 'react';

// type Medication = {
//   name: string;
//   email:string;
//   dosage: string;
//   timing: string[];
//   form: string;
//   custom: boolean;
// };

// type Prescription = {
//   id: string;
//   name: string;
//   date: string;
//   instructions: string;
//   medications: Medication[];
// };

// export default function PatientDashboard({ patientId }: { patientId: string }) {
//   const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//   const [selected, setSelected] = useState<Prescription | null>(null);

// //   useEffect(() => {
// //     const fetchPrescriptions = async () => {
// //       const res = await fetch(`/api/patient/prescriptions`);
// //       const data = await res.json();
// //       setPrescriptions(data);
// //     };

// //     fetchPrescriptions();
// //   }, [patientId]);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-10">
//       <h2 className="text-xl font-semibold mb-4">Your Prescriptions</h2>

//       {prescriptions.length === 0 ? (
//         <p className="text-gray-600 dark:text-gray-300">No prescriptions found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {prescriptions.map((prescription) => (
//             <li key={prescription.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold">{prescription.name}</h3>
//                   <p className="text-sm text-gray-500">{new Date(prescription.date).toLocaleString()}</p>
//                 </div>
//                 <button
//                   onClick={() => setSelected(prescription)}
//                   className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
//                 >
//                   View
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* View Modal */}
//       {selected && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow max-w-md w-full">
//             <div className="flex justify-between items-center border-b pb-2 mb-4">
//               <h3 className="text-lg font-semibold">Prescription Details</h3>
//               <button onClick={() => setSelected(null)} className="text-xl text-gray-600">&times;</button>
//             </div>
//             <div className="space-y-2 text-sm">
//               <div><strong>Date:</strong> {new Date(selected.date).toLocaleDateString()}</div>
//               <div><strong>Instructions:</strong> {selected.instructions}</div>
//               <div>
//                 <strong>Medications:</strong>
//                 <ul className="list-disc pl-5">
//                   {selected.medications.map((m, i) => (
//                     <li key={i}>
//                       {m.name} - {m.dosage} ({m.form === 'T' ? 'Tablet' : 'Liquid'})
//                       <div className="text-xs text-gray-500">{m.timing.join(', ') || 'No timing set'}</div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\doctor\patient-data\[email]\prescribe\page.tsx

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
  next_appointment_date?: string | null; // ISO datetime string
  next_appointment_time?: string | null;
  instructions: string;
};

export default function Ptable() {

  
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

  const { email } = useParams();
  
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
  if (!email) return;

  fetch(`/api/assigning/${encodeURIComponent(email as string)}/prescribe`)
    .then((res) => res.json())
    .then((data) => setPrescriptions(data))
    .catch((err) => console.error("Error fetching prescriptions:", err));
}, [email]);



  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
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
                        <div><strong>{med.name}</strong> – {med.dosage}
                         <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">
          [{med.form === 'T' ? 'Tablet' : med.form === 'L' ? 'Liquid' : med.form === 'IV' ? 'IV' : med.form === 'S' ? 'Saline' : 'Other'}]
        </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {med.timing.length > 0 ? med.timing.join(', ') : "No timing specified"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                    <div><strong>Next Appointment:</strong>{" "}  
  {selectedPrescription.next_appointment_date
  ? `${new Date(selectedPrescription.next_appointment_date).toLocaleDateString()} at ${selectedPrescription.next_appointment_time || ''}` 
  : "Not scheduled"}
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
