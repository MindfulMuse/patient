// "use client";
//E:\Projects\my-app\app\(protected)\admin\nurse\Nurse-Table\page.tsx

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Nurse, Patient } from "@/lib/generated/prisma";

// export default function NurseTable() {

    
// type Doctor = {
//   name: string;
//   email: string;
//   specialization: string;
// };

// type FormDataType = {
//   first_name: string;
//   last_name: string;
//   phone: string;
//   email:string;
// };
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

 
//   if (loading) return <p>Loading...</p>;
//   if (!doctor) return <p className="text-red-500">Doctor not found.</p>;

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

//E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\admin\nurse\Nurse-Table\page.tsx

'use client';

import React, { useState, useEffect } from 'react';

type Nurse = {
  id: string;
  name: string;
  email: string;
};

type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export default function AssignNurseForm() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedNurse, setSelectedNurse] = useState('');

// Collapsible sections
const [showNurseForm, setShowNurseForm] = useState(false);
const [showPatientForm, setShowPatientForm] = useState(false);

// Nurse fields
const [selectedNurseName, setSelectedNurseName] = useState('');
const [selectedNurseEmail, setSelectedNurseEmail] = useState('');

// Patient fields
const [selectedPatientName, setSelectedPatientName] = useState('');
const [selectedPatientEmail, setSelectedPatientEmail] = useState('');


  const [selectedPatient, setSelectedPatient] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  // Fetch nurses and patients
  useEffect(() => {
    async function fetchData() {
      try {
        const [nurseRes, patientRes] = await Promise.all([
          fetch('/api/nurse/get-nurses'),
          fetch('/api/patient/get-patients'),
        ]);
        const nursesData = await nurseRes.json();
        const patientsData = await patientRes.json();
        setNurses(nursesData.nurses);
        setPatients(patientsData.patients);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // const handleAssign = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!selectedNurse || !selectedPatient || !startTime || !endTime) {
  //     alert('❌ All fields are required.');
  //     return;
  //   }

  //   try {
  //     const res = await fetch('/api/nurse/assign-shift', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         nurseEmail: selectedNurse,
  //         patientEmail: selectedPatient,
  //         startTime,
  //         endTime,
  //       }),
  //     });

  //     const data = await res.json();
  //     if (res.ok && data.success) {
  //       alert('✅ Nurse assigned to patient successfully!');
  //       // Reset form
  //       setSelectedNurse('');
  //       setSelectedPatient('');
  //       setStartTime('');
  //       setEndTime('');
  //     } else {
  //       alert(`❌ ${data.msg}`);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('🚨 Error assigning nurse.');
  //   }
  // };

  const handleAssign = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedNurseName || !selectedNurseEmail || !selectedPatientName || !selectedPatientEmail || !startTime || !endTime) {
    alert('❌ All fields are required.');
    return;
  }

  try {
    const res = await fetch('/api/nurse/assign-shift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nurseEmail: selectedNurseEmail,
        patientEmail: selectedPatientEmail,
        startTime,
        endTime,
        nurseName: selectedNurseName, // optional: for creating new nurse
        patientName: selectedPatientName, // optional: for creating new patient
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      alert('✅ Nurse assigned to patient successfully!');
      // Reset form
      setSelectedNurseName('');
      setSelectedNurseEmail('');
      setSelectedPatientName('');
      setSelectedPatientEmail('');
      setStartTime('');
      setEndTime('');
    } else {
      alert(`❌ ${data.msg}`);
    }
  } catch (err) {
    console.error(err);
    alert('🚨 Error assigning nurse.');
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Assign Nurse to Patient
      </h2>

      <form onSubmit={handleAssign} className="space-y-4">
        Select Nurse
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Nurse
          </label>
          <select
            value={selectedNurse}
            onChange={(e) => setSelectedNurse(e.target.value)}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Nurse</option>
             <option value="nurse1">Nurse1</option>
            {nurses.map((n) => (
              <option key={n.id} value={n.email}>
                {n.name} ({n.email})
              </option>
            ))}
          </select>
        </div>

        {/* Select Patient */}{/*


        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Patient
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Patient</option>
             
            {patients.map((p) => (
              <option key={p.id} value={p.email}>
                {p.first_name} {p.last_name} ({p.email})
              </option>
            ))}
          </select>
        </div>

        //Nurse and Patient dropdown

        {/* Nurse Selector */}
<div className="mt-4">
  <button
    type="button"
    onClick={() => setShowNurseForm(!showNurseForm)}
    className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
               focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
               rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center 
               dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
               dark:text-white dark:hover:bg-gray-700"
  >
    {selectedNurseName && selectedNurseEmail
      ? `Nurse: ${selectedNurseName} (${selectedNurseEmail})`
      : "Select Nurse"}
    <svg
      className={`w-4 h-4 ml-auto transform transition-transform ${
        showNurseForm ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showNurseForm && (
    <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      {/* Nurse Dropdown */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Select Nurse
      </label>
      <select
        value={selectedNurseEmail}
        onChange={(e) => {
          const nurse = nurses.find((n) => n.email === e.target.value);
          setSelectedNurseEmail(nurse?.email || "");
          setSelectedNurseName(nurse?.name || "");
        }}
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-2"
      >
        <option value="">Select Nurse</option>
        {nurses.map((n) => (
          <option key={n.id} value={n.email}>
            {n.name} ({n.email})
          </option>
        ))}
      </select>

      {/* Nurse Name Input */}
      <input
        type="text"
        value={selectedNurseName}
        onChange={(e) => setSelectedNurseName(e.target.value)}
        placeholder="Nurse Name"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-2"
      />

      {/* Nurse Email Input */}
      <input
        type="email"
        value={selectedNurseEmail}
        onChange={(e) => setSelectedNurseEmail(e.target.value)}
        placeholder="Nurse Email"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />
    </div>
  )}
</div>

{/* Repeat similar block for Patient */}
<div className="mt-4">
  <button
    type="button"
    onClick={() => setShowPatientForm(!showPatientForm)}
    className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
               focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
               rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center 
               dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
               dark:text-white dark:hover:bg-gray-700"
  >
    {selectedPatientName && selectedPatientEmail
      ? `Patient: ${selectedPatientName} (${selectedPatientEmail})`
      : "Select Patient"}
    <svg
      className={`w-4 h-4 ml-auto transform transition-transform ${
        showPatientForm ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showPatientForm && (
    <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      {/* Patient Dropdown */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Select Patient
      </label>
      <select
        value={selectedPatientEmail}
        onChange={(e) => {
          const patient = patients.find((p) => p.email === e.target.value);
          setSelectedPatientEmail(patient?.email || "");
          setSelectedPatientName(`${patient?.first_name || ""} ${patient?.last_name || ""}`);
        }}
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-2"
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.email}>
            {p.first_name} {p.last_name} ({p.email})
          </option>
        ))}
      </select>

      {/* Patient Name Input */}
      <input
        type="text"
        value={selectedPatientName}
        onChange={(e) => setSelectedPatientName(e.target.value)}
        placeholder="Patient Name"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-2"
      />

      {/* Patient Email Input */}
      <input
        type="email"
        value={selectedPatientEmail}
        onChange={(e) => setSelectedPatientEmail(e.target.value)}
        placeholder="Patient Email"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />
    </div>
  )}
</div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Start Time
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            End Time
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div> 

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2"
        >
          Assign Nurse
        </button>
      </form>
    </div>
  );
}

