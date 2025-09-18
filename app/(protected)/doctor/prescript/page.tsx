
// 'use client';

// import React, { useState } from 'react';

// interface Prescription {
//   id: number;
//   name: string;
//   date: string;
//   medication: string;
//   dosage: string;
//   instructions: string;
// }

// const dummyPrescriptions: Prescription[] = [
//   {
//     id: 1,
//     name: 'Neil Sims',
//     date: '2025-07-16',
//     medication: 'Paracetamol',
//     dosage: '500mg',
//     instructions: 'Take after meals',
//   },
//   {
//     id: 2,
//     name: 'Bonnie Green',
//     date: '2025-07-14',
//     medication: 'Ibuprofen',
//     dosage: '200mg',
//     instructions: 'Twice daily',
//   },
//   {
//     id: 3,
//     name: 'Jese Leos',
//     date: '2025-07-13',
//     medication: 'Amoxicillin',
//     dosage: '250mg',
//     instructions: 'Three times a day',
//   },
// ];

// export default function Ptable() {
//   const [search, setSearch] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;
//     // const router = useRouter();
  
//   const handleView = (prescription: Prescription) => {
//     setSelectedPrescription(prescription);
//     setIsOpen(true);
//   };

//   const filteredProducts = dummyPrescriptions.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

  
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//   const handlePrev = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };


//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <input
//         type="text"
//         placeholder="Search patients..."
//         className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="relative overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Patient Name</th>
//               <th className="px-6 py-3">Date</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prescription) => (
//               <tr
//                 key={prescription.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                   {prescription.name}
//                 </td>
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
//             {filteredProducts.length === 0 && (
//               <tr>
//                 <td colSpan={3} className="text-center px-6 py-4 text-red-500">
//                   No matching records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isOpen && selectedPrescription && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
//             <div className="flex justify-between items-center border-b border-gray-300 pb-4">
//               <h3 className="text-lg font-semibold">Prescription Details</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-900 text-xl"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="mt-4 space-y-2 text-sm">
//               <div><strong>Patient:</strong> {selectedPrescription.name}</div>
//               <div><strong>Date:</strong> {selectedPrescription.date}</div>
//               <div><strong>Medication:</strong> {selectedPrescription.medication}</div>
//               <div><strong>Dosage:</strong> {selectedPrescription.dosage}</div>
//               <div><strong>Instructions:</strong> {selectedPrescription.instructions}</div>
//             </div>
//           </div>
//         </div>
//       )}

//        {/* Pagination Controls */}
//       <div className="flex flex-col items-center mt-4">
//         <span className="text-sm text-gray-700 dark:text-gray-400">
//           Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
//           <span className="font-semibold text-gray-900 dark:text-white">
//             {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
//           </span>{' '}
//           of <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> Entries
//         </span>

//         <div className="inline-flex mt-2">
//           <button
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//             className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
    
//   );
// }


//E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\doctor\prescript\page.tsx

'use client';

import React, { useState ,useEffect} from 'react';

type Medication = {
  name: string;
  email:string;
  dosage: string;
  timing: string[]; 
  custom: boolean;
  form:  'T' | 'L' | 'IV' | 'S' | 'O'; 
};

type Prescription = {
  id: number;
  name: string;
  date: string;
  medications: Medication[];
  instructions: string;
  nextAppointmentDate?: string;
  nextAppointmentTime?: string;
};

export default function Ptable() {
  // const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showForm, setShowForm] = useState(false);


const [formData, setFormData] = useState<{
  name: string;
  email:string;
  medications: Medication[];
  instructions: string;
  nextAppointmentDate?: string;
  nextAppointmentTime?: string;
   sendSmsToNurse: boolean;
}>({
  name: '',
  email:'',
  medications: [{ name: '', email:'', dosage: '', timing: [], custom: false, form: 'T' }], // Default to Tablet
  instructions: '',
  nextAppointmentDate: '',
  nextAppointmentTime: '',
   sendSmsToNurse: false,
});


  const handleView = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsViewOpen(true);
  };


// Fetch prescriptions when page loads
// Load all prescriptions when page loads
// useEffect(() => {
//   fetch("/api/PI/prescript")
//     .then((res) => res.json())
//     .then((data) => setPrescriptions(data))
//     .catch((err) => console.error("Error loading prescriptions", err));
// }, []);


useEffect(() => {
  fetch("/api/PI/prescript")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setPrescriptions(data);
      } else {
        console.error("Unexpected prescriptions format:", data);
        setPrescriptions([]); // fallback to empty array
      }
    })
    .catch((err) => {
      console.error("Error loading prescriptions", err);
      setPrescriptions([]); // fallback
    });
}, []);



  const handleAddPrescription = async (e: React.FormEvent) => {
  e.preventDefault();


  const newPrescription: Prescription = {
    id: Date.now(),
    name: formData.name,
    medications: formData.medications.map(({ name,email, dosage, timing, custom, form }) => ({
      name,
      email,
      dosage,
      timing,
      custom,
      form
    })),
    nextAppointmentDate: formData.nextAppointmentDate ,
  nextAppointmentTime: formData.nextAppointmentTime,
    instructions: formData.instructions,
    date: new Date().toLocaleDateString(),
  };

  // const payload = {
  //   // patientId: selectedPatientId,
  //   // name: formData.name,
  //   email: formData.email,
  //   instructions: formData.instructions,
  //   medications: formData.medications,
  // };

  const payload = {
  email: formData.email,
  instructions: formData.instructions,
  medications: formData.medications.map(med => ({
    name: med.name,
    dosage: med.dosage,
    timing: med.timing || [], // ensure array
    form: med.form || 'T',     // default form if missing
    custom: med.custom ?? true,
  })),
   nextAppointmentDate: formData.nextAppointmentDate || null,
  nextAppointmentTime: formData.nextAppointmentTime || null,
  sendSmsToNurse: formData.sendSmsToNurse || null
};


  try {
//E:\Projects\patient monitor\patient monitor\my-app\app\api\PI\prescript\route.ts
    const res = await fetch("/api/PI/prescript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Error creating prescription:", error);
      return;
    }

    // Optional: Get the response from the server if you want to use it
    const data = await res.json();

    setPrescriptions([data, ...prescriptions]);

    setFormData({
      name: '',
      email:'',
      medications: [{ name: '', email:'', dosage: '', timing: [], custom: false, form: 'T' }],
      instructions: '',
      nextAppointmentDate: '',
      nextAppointmentTime: '',
       sendSmsToNurse: false,
    });
    setIsAddOpen(false);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
};


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
          <button
            onClick={() => setIsAddOpen(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
          >
            + Add Prescription
          </button>
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

        {/* Floating Add Button */}
        {/* <button
          onClick={() => setIsAddOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold p-4 rounded-full shadow-lg"
        >
          +
        </button> */}

        {/* Add Modal */}
        {isAddOpen && (
        < div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Prescription</h3>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">×</button>
              </div>
              <form className="mt-4 space-y-4" onSubmit={handleAddPrescription}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Patient Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Patient Email</label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  />
                </div>

                {formData.medications.map((med, index) => (
                  <div key={index} className="mb-4 border p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-white">Medication {index + 1}</label>
                      {formData.medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newMeds = [...formData.medications];
                            newMeds.splice(index, 1);
                            setFormData({ ...formData, medications: newMeds });
                          }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
{/* 
                    <select
                      className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                      value={med.name}
                      onChange={(e) => {
                        const newMeds = [...formData.medications];
                        newMeds[index].name = e.target.value === 'Other' ? '' : e.target.value;
                        newMeds[index].custom = e.target.value === 'Other';
                        setFormData({ ...formData, medications: newMeds });
                      }}
                    >
                      <option value="">Select Medication</option>
                      <option value="Med1">Med1</option>
                      <option value="Med2">Med2</option>
                      <option value="Med3">Med3</option>
                      <option value="Paracetamol">Paracetamol</option>
                      <option value="Ibuprofen">Ibuprofen</option>
                      <option value="Amoxicillin">Amoxicillin</option>
                      <option value="Other">Other</option>
                    </select>

                    {med.custom && (
                      <input
                        type="text"
                        placeholder="Enter custom medication"
                        value={med.name}
                        onChange={(e) => {
                          const newMeds = [...formData.medications];
                          newMeds[index].name = e.target.value;
                          setFormData({ ...formData, medications: newMeds });
                        }}
                        className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                      />
                    )} */}


                    <select
  className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
  value={med.form}
  onChange={(e) => {
    const newMeds = [...formData.medications];
    newMeds[index].form = e.target.value as Medication['form'];
    newMeds[index].name = ''; // reset name when form changes
    newMeds[index].custom = false;
    setFormData({ ...formData, medications: newMeds });
  }}
>
  <option value="T">Tablet</option>
  <option value="L">Liquid</option>
  <option value="IV">IV</option>
  <option value="S">Saline</option>

</select>


{/*tablet and dosage*/}

                  <div className="flex items-center gap-4 mb-2">
  {/* <label className="text-sm text-gray-700 dark:text-white flex items-center gap-1">
    <input
      type="radio"
      name={`form-${index}`}
      value="T"
      checked={med.form === 'T'}
      onChange={() => {
        const newMeds = [...formData.medications];
        newMeds[index].form = 'T';
        setFormData({ ...formData, medications: newMeds });
      }}
      className="accent-blue-600"
    />
    Tablet [T]
  </label>
  <label className="text-sm text-gray-700 dark:text-white flex items-center gap-2">
    <input
      type="radio"
      name={`form-${index}`}
      value="L"
      checked={med.form === 'L'}
      onChange={() => {
        const newMeds = [...formData.medications];
        newMeds[index].form = 'L';
        setFormData({ ...formData, medications: newMeds });
      }}
      className="accent-blue-600"
    />
    Liquid [L]
  </label> */}

{/*  IV and Saline Addded */}
  {med.form === 'T' && (
  <select
    className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
    value={med.name}
    onChange={(e) => {
      const newMeds = [...formData.medications];
      newMeds[index].name = e.target.value === 'Other' ? '' : e.target.value;
      newMeds[index].custom = e.target.value === 'Other';
      setFormData({ ...formData, medications: newMeds });
    }}
  >
    <option value="">Select Tablet</option>
    <option value="Paracetamol">Paracetamol</option>
    <option value="Ibuprofen">Ibuprofen</option>
    <option value="Amoxicillin">Amoxicillin</option>
    <option value="Other">Other</option>
  </select>
)}

{med.form === 'L' && (
  <select
    className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
    value={med.name}
    onChange={(e) => {
      const newMeds = [...formData.medications];
      newMeds[index].name = e.target.value === 'Other' ? '' : e.target.value;
      newMeds[index].custom = e.target.value === 'Other';
      setFormData({ ...formData, medications: newMeds });
    }}
  >
    <option value="">Select Liquid</option>
    <option value="Cough Syrup">Cough Syrup</option>
    <option value="ORS Solution">ORS Solution</option>
    <option value="Other">Other</option>
  </select>
)}

{med.form === 'IV' && (
  <select
    className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
    value={med.name}
    onChange={(e) => {
      const newMeds = [...formData.medications];
      newMeds[index].name = e.target.value === 'Other' ? '' : e.target.value;
      newMeds[index].custom = e.target.value === 'Other';
      setFormData({ ...formData, medications: newMeds });
    }}
  >
    <option value="">Select IV</option>
    <option value="IV Antibiotic">IV Antibiotic</option>
    <option value="IV Painkiller">IV Painkiller</option>
    <option value="Other">Other</option>
  </select>
)}

{med.form === 'S' && (
  <select
    className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
    value={med.name}
    onChange={(e) => {
      const newMeds = [...formData.medications];
      newMeds[index].name = e.target.value === 'Other' ? '' : e.target.value;
      newMeds[index].custom = e.target.value === 'Other';
      setFormData({ ...formData, medications: newMeds });
    }}
  >
    <option value="">Select Saline</option>
    <option value="Normal Saline (NS)">Normal Saline (NS)</option>
    <option value="Ringer's Lactate (RL)">Ringer's Lactate (RL)</option>
    <option value="Dextrose 5%">Dextrose 5%</option>
    <option value="Other">Other</option>
  </select>
)}

{(med.custom ) && (
  <input
    type="text"
    placeholder="Enter custom medication"
    value={med.name}
    onChange={(e) => {
      const newMeds = [...formData.medications];
      newMeds[index].name = e.target.value;
      setFormData({ ...formData, medications: newMeds });
    }}
    className="w-full mb-2 p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
  />
)}

</div>
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => {
                        const newMeds = [...formData.medications];
                        newMeds[index].dosage = e.target.value;
                        setFormData({ ...formData, medications: newMeds });
                      }}
                      className="w-full p-2 text-sm border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    />

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Timing</label>
                      <div className="flex flex-wrap gap-2">
                        {["Before Breakfast", "After Breakfast", "Before Lunch", "After Lunch", "Before Dinner", "After Dinner"].map((label) => (
                          <label key={label} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-white">
                            <input
                              type="checkbox"
                              checked={med.timing.includes(label)}
                             onChange={(e) => {
  const updatedMeds = [...formData.medications];
  const timingList = new Set<string>(updatedMeds[index].timing); // ✅ fix
  if (e.target.checked) {
    timingList.add(label);
  } else {
    timingList.delete(label);
  }
  updatedMeds[index].timing = Array.from(timingList);
  setFormData({ ...formData, medications: updatedMeds });
}}

                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      medications: [...formData.medications, { name: '', email:'', dosage: '', timing: [],form: 'T', custom: false }],
                    })
                  }
                  className="text-sm text-blue-600 hover:underline mb-4"
                >
                  + Add Another Medication
                </button>


{/* Appointment Scheduler inside Add Modal */}
<div className="mt-4">
  <button
    type="button"
    onClick={() => setShowForm(!showForm)}
    className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
               focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
               rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
               dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
               dark:text-white dark:hover:bg-gray-700"
  >
    {formData.nextAppointmentDate && formData.nextAppointmentTime
      ? `Appointment: ${formData.nextAppointmentDate} at ${formData.nextAppointmentTime}`
      : "Schedule Appointment"}
    <svg
      className={`w-4 h-4 ml-auto transform transition-transform ${
        showForm ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showForm && (
    <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border 
                    border-gray-200 dark:border-gray-700">
      {/* Date */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Pick a Date
      </label>
      <input
        type="date"
        value={formData.nextAppointmentDate || ""}
        onChange={(e) =>
          setFormData({ ...formData, nextAppointmentDate: e.target.value })
        }
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
      />

      {/* Time */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Select Time (24h)
      </label>
      <input
        type="time"
        value={formData.nextAppointmentTime || ""}
        onChange={(e) =>
          setFormData({ ...formData, nextAppointmentTime: e.target.value })
        }
        step={1800} // 30 min steps
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
      />

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                     dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setFormData({ ...formData, nextAppointmentDate: "", nextAppointmentTime: "" });
            setShowForm(false);
          }}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none 
                     bg-white rounded-lg border border-gray-200 hover:bg-gray-100 
                     dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 
                     dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

   {/* Checkbox for SMS notification */}
<div className="w-full mb-2 flex items-center p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500">
  <input
    type="checkbox"
    id="sendSms"
    checked={formData.sendSmsToNurse || false}
    onChange={(e) =>
      setFormData({ ...formData, sendSmsToNurse: e.target.checked })
    }
    className="w-3.5 h-3.5 accent-blue-600"
  />
  <label
    htmlFor="sendSms"
    className="ml-2 text-sm text-gray-800 dark:text-white"
  >
    Send SMS to assigned nurse
  </label>
</div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Instructions</label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    rows={3}
                    className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add Prescription
                </button>
              </form>
            </div>
          </div>
        )}

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
                    {selectedPrescription.medications?.map((med, index) => (
                      <li key={index} className="mb-1">
                        <div><strong>{med.name}</strong> – {med.dosage}
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">
          [{med.form === 'T' ? 'Tablet' : med.form === 'L' ? 'Liquid' : med.form === 'IV' ? 'IV' : med.form === 'S' ? 'Saline' : 'Other'}]
        </span></div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {med.timing.length > 0 ? med.timing.join(', ') : "No timing specified"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div><strong>Next Appointment:</strong>{" "} 
  {selectedPrescription.nextAppointmentDate 
  ? `${new Date(selectedPrescription.nextAppointmentDate).toLocaleDateString()} at ${selectedPrescription.nextAppointmentTime || ''}` 
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
