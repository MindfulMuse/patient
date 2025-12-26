// import React from "react";

// const AdminDashboard = async () => {
// return <div>
//     AdminDashboard
// </div>
// }
// export default AdminDashboard;


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type Doctor = {
//   id: string;
//   name: string;
//   email: string;
//   specialization: string;
// };

// type AddDoctorProps = {
//   adminId: string; // pass adminId as a prop to associate doctor with admin
// };


// export default function DoctorTable() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isAddOpen, setIsAddOpen] = useState(false);
  
//   const itemsPerPage = 5;
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//         specialization: "",
//   })

  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);



//    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const res = await fetch("/api/add-doctor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, adminId }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Failed to add doctor");
//       }

//       setSuccess(true);
//       setForm({
//         name: "",
//         email: "",
//         specialization: "",})

//          } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch("/api/get-doctor/doctable");
//         const data = await res.json();
//         if (res.ok) setDoctors(data.doctors);
//       } catch (err) {
//         console.error("Error fetching doctors", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const filteredDoctors = doctors.filter((d) =>
//     d.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

//   const handleView = (doctor: Doctor) => {
//     router.push(`/admin/doctor-data/${encodeURIComponent(doctor.email)}/doctor-page`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <div className="flex items-center justify-between pb-4">
//         <input
//           type="text"
//           placeholder="Search doctors"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border rounded-lg"
//         />

//          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

//       <input
//         required
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Name"
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <input
//         required
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <input
//         required
//         name="specialization"
//         value={form.specialization}
//         onChange={handleChange}
//         placeholder="Specialization"
//         className="mb-2 p-2 border rounded w-full"
//       />
//        <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
//       >
//         {loading ? "Saving..." : "Add Doctor"}
//       </button>

//       {error && <p className="text-red-600 mt-2">{error}</p>}
//       {success && <p className="text-green-600 mt-2">Doctor added successfully!</p>}
//     </form>
//       </div>

//       <table className="w-full text-sm text-left">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3">Name</th>
//             <th className="px-6 py-3">Email</th>
//             <th className="px-6 py-3">Specialization</th>
//             <th className="px-6 py-3">Phone</th>
//             <th className="px-6 py-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedDoctors.map((doctor) => (
//             <tr key={doctor.id} className="border-b hover:bg-gray-50">
//               <td className="px-6 py-4">{doctor.name}</td>
//               <td className="px-6 py-4">{doctor.email}</td>
//               <td className="px-6 py-4">{doctor.specialization}</td>
//               <td className="px-6 py-4">{doctor.phone}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleView(doctor)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {filteredDoctors.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center text-red-500 p-4">
//                 No doctors found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between mt-4">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';

// type Doctor = {
//   id: string;
//   name: string;
//   email: string;
//   specialization: string;
// };

// type FormDataType = {
//   name: string;
//   email: string;
//   specialization: string;
// };

// type DoctorTableProps = {
//   adminId: string;
// };

// export default function DoctorTable({ adminId }: DoctorTableProps) {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [formData, setFormData] = useState<FormDataType>({
//     name: "",
//     email: "",
//     specialization: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const itemsPerPage = 5;
//   const router = useRouter();
  
   
//   // Fetch doctors associated with this admin
//   useEffect(() => {
//     async function fetchDoctors() {
//       try {
//         const res = await fetch(`/api/doctor/get-doctors?adminId=${adminId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setDoctors(data.doctors);
//         } else {
//           console.error("Failed to fetch doctors:", data.error);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctors:", err);
//       }
//     }
//     fetchDoctors();
//   }, [adminId]);

  
  
// const handleView = (patient: Doctor) => {
//   const encodedEmail = encodeURIComponent(patient.email); // assuming you use email in query
//   // router.push(`/patient?email=${encodedEmail}`);
// router.push(`/doctor/patient-data/${encodeURIComponent(patient.email)}/patient-page`);
// };
  
//   const handleAddDoctor = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check duplicates by email
//     const alreadyExists = doctors.some(
//       (d) => d.email.toLowerCase() === formData.email.toLowerCase()
//     );
//     if (alreadyExists) {
//       alert("❌ Doctor with this email already exists.");
//       return;
//     }

//     const [isAddOpen, setIsAddOpen] = useState(false);

//     const assignDoctorToAdmin = async (email:string, doctorId: string) => {
//     const newDoctor = {
//       id: Date.now().toString(),
//       name:formData.name,
//       specialization: formData.specialization,
//       email:formData.email,
//     };
     

//     setDoctors([newDoctor, ...doctors]);
//     setFormData({ name: '', email: '', specialization: '' });
//     setIsAddOpen(false);

//     // Assign doctor to admin
//     await assignDoctorToAdmin(newDoctor.id, "550e8400-e29b-41d4-a716-446655440000");
    
    
//     try {
//       const res = await fetch("/api/doctor/add-doctor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, adminId }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setDoctors([data.doctor, ...doctors]);
//         setFormData({ name: "", email: "", specialization: "" });
//         setIsAddOpen(false);
//         alert("✅ Doctor added successfully!");
//       } else {
//         alert("❌ Failed to add doctor: " + data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("🚨 Error adding doctor.");
//     }}
//   };

//   const filteredDoctors = doctors.filter(
//     (d) =>
//       d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedDoctors = filteredDoctors.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//         <div className="flex items-center justify-between pb-4">
//           <input
//             type="text"
//             placeholder="Search doctors by name, email or specialization"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//           />
//           <button
//             onClick={() => setIsAddOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
//           >
//             + Add Doctor
//           </button>
//         </div>

//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Specialization</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedDoctors.map((doctor) => (
//               <tr
//                 key={doctor.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                   {doctor.name}
//                 </td>
//                 <td className="px-6 py-4">{doctor.email}</td>
//                 <td className="px-6 py-4">{doctor.specialization}</td>
//               </tr>
//             ))}
//             {filteredDoctors.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={3}
//                   className="text-center px-6 py-4 text-red-500"
//                 >
//                   No matching doctors found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col items-center mt-4">
//           <span className="text-sm text-gray-700 dark:text-gray-400">
//             Showing{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {startIndex + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {Math.min(startIndex + itemsPerPage, filteredDoctors.length)}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {filteredDoctors.length}
//             </span>{" "}
//             entries
//           </span>

//           <div className="inline-flex mt-2">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Add Doctor */}
//       {isAddOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
//             <div className="flex justify-between items-center border-b pb-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Add New Doctor
//               </h3>
//               <button
//                 onClick={() => setIsAddOpen(false)}
//                 className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
//               >
//                 ×
//               </button>
//             </div>
//             <form className="mt-4 space-y-4" onSubmit={handleAddDoctor}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Specialization
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.specialization}
//                   onChange={(e) =>
//                     setFormData({ ...formData, specialization: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
//               >
//                 Add Doctor
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';

// type Doctor = {
//   id: string;
//   name: string;
//   email: string;
//   specialization: string;
// };

// type FormDataType = {
//   name: string;
//   email: string;
//   specialization: string;
// };

// type DoctorTableProps = {
//   adminId: string;
// };

// export default function DoctorTable({ adminId }: DoctorTableProps) {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [formData, setFormData] = useState<FormDataType>({
//     name: "",
//     email: "",
//     specialization: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const itemsPerPage = 5;
//   const router = useRouter();

//   // Fetch doctors for this admin
//   useEffect(() => {
//     async function fetchDoctors() {
//       try {
//         const res = await fetch(`/api/doctor/get-doctors?adminId=${adminId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setDoctors(data.doctors);
//         } else {
//           console.error("Failed to fetch doctors:", data.error);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctors:", err);
//       }
//     }
//     fetchDoctors();
//   }, [adminId]);

//   const handleView = (doctor: Doctor) => {
//     const encodedEmail = encodeURIComponent(doctor.email);
//     router.push(`/admin/doctor-data/${encodedEmail}/doctor-page`);
//   };

//   const handleAddDoctor = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Duplicate check
//     const alreadyExists = doctors.some(
//       (d) => d.email.toLowerCase() === formData.email.toLowerCase()
//     );
//     if (alreadyExists) {
//       alert("❌ Doctor with this email already exists.");
//       return;
//     }

//     try {
//       // Step 1: Add doctor
//       const res = await fetch("/api/doctor/add-doctor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, adminId }), // send adminId here
//       });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert("❌ Failed to add doctor: " + (data?.error ?? data?.msg ?? 'Unknown error'));
//         return;
//       }

//       const createdDoctor = data.doctor;

//       // // Step 2: Assign doctor to admin (by email, in case add-doctor doesn't set it)
//       // const assignRes = await fetch('/api/admin/assign-doctor', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ email: createdDoctor.email, adminId }),
//       // });
//       // const assignData = await assignRes.json();
//       // if (!assignRes.ok || !assignData.success) {
//       //   console.warn("⚠️ Doctor added but assignment failed:", assignData);
//       // }

//       // Step 3: Update UI
//       setDoctors([createdDoctor, ...doctors]);
//       setFormData({ name: "", email: "", specialization: "" });
//       setIsAddOpen(false);
//       alert("✅ Doctor added successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("🚨 Error adding doctor.");
//     }
//   };

//   const filteredDoctors = doctors.filter(
//     (d) =>
//       d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedDoctors = filteredDoctors.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//         <div className="flex items-center justify-between pb-4">
//           <input
//             type="text"
//             placeholder="Search doctors by name, email or specialization"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//           />
//           <button
//             onClick={() => setIsAddOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
//           >
//             + Add Doctor
//           </button>
//         </div>

//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Specialization</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedDoctors.map((doctor) => (
//               <tr
//                 key={doctor.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                   {doctor.name}
//                 </td>
//                 <td className="px-6 py-4">{doctor.email}</td>
//                 <td className="px-6 py-4">{doctor.specialization}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleView(doctor)}
//                     className="text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredDoctors.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="text-center px-6 py-4 text-red-500"
//                 >
//                   No matching doctors found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col items-center mt-4">
//           <span className="text-sm text-gray-700 dark:text-gray-400">
//             Showing{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {startIndex + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {Math.min(startIndex + itemsPerPage, filteredDoctors.length)}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {filteredDoctors.length}
//             </span>{" "}
//             entries
//           </span>

//           <div className="inline-flex mt-2">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Add Doctor */}
//       {isAddOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
//             <div className="flex justify-between items-center border-b pb-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Add New Doctor
//               </h3>
//               <button
//                 onClick={() => setIsAddOpen(false)}
//                 className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
//               >
//                 ×
//               </button>
//             </div>
//             <form className="mt-4 space-y-4" onSubmit={handleAddDoctor}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Specialization
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.specialization}
//                   onChange={(e) =>
//                     setFormData({ ...formData, specialization: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
//               >
//                 Add Doctor
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//working1
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { currentUser } from '@clerk/nextjs/server';

// type Doctor = {
//   id: number;
//   name: string;
//   email: string;
//   specialization: string;
//   date: string;
// };

// type FormDataType = {
//   name: string;
//   email: string;
//   specialization: string;
// };

// export default function DoctorTable() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [formData, setFormData] = useState<FormDataType>({
//     name: '',
//     email: '',
//     specialization: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const router = useRouter();
// const handleAddDoctor = async (e: React.FormEvent) => {
//   e.preventDefault();

  
//     const user = await currentUser();
  
//      const  Aemail = user?.emailAddresses?.[0]?.emailAddress;
//   // Prevent duplicate email locally (optional check)
//   const alreadyExists = doctors.some(
//     (d) => d.email.toLowerCase() === formData.email.toLowerCase()
//   );
//   if (alreadyExists) {
//     alert('❌ Doctor with this email already exists.');
//     return;
//   }

//   try {
//     const res = await fetch('/api/doctor/add-doctor', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: formData.email,
//         adminid: "550e8400-e29b-41d4-a716-446655440000" // Replace with logged-in admin's ID
//       }),
//     });

//     const data = await res.json();

//     if (res.ok && data.success) {
//       alert('✅ Doctor assigned to admin successfully!');
//       setDoctors([data.doctor, ...doctors]);
//       setFormData({ name: '', email: '', specialization: '' });
//       setIsAddOpen(false);
//     } else {
//       alert(`❌ ${data.msg}`);
//     }
//   } catch (err) {
//     console.error(err);
//     alert('🚨 Error assigning doctor.');
//   }
// };

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch(`/api/doctor/getdoctor?email=${Aemail }`);
//         const data = await res.json();
//         if (res.ok) {
//           setDoctors(data.doctors);
//         }
//       } catch (err) {
//         console.error('Failed to fetch doctors:', err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleView = (doctor: Doctor) => {
//     router.push(`/admin/doctor-table/${encodeURIComponent(doctor.email)}/docpage`);
//   };

//   const filteredDoctors = doctors.filter(
//     (d) =>
//       d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedDoctors = filteredDoctors.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//         <div className="flex items-center justify-between pb-4">
//           <input
//             type="text"
//             placeholder="Search doctors..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <button
//             onClick={() => setIsAddOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
//           >
//             + Add Doctor
//           </button>
//         </div>

//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Specialization</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedDoctors.map((doctor) => (
//               <tr
//                 key={doctor.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                   {doctor.name}
//                 </td>
//                 <td className="px-6 py-4">{doctor.email}</td>
//                 <td className="px-6 py-4">{doctor.specialization}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleView(doctor)}
//                     className="text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredDoctors.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center px-6 py-4 text-red-500">
//                   No matching records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col items-center mt-4">
//           <span className="text-sm text-gray-700 dark:text-gray-400">
//             Showing{' '}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {startIndex + 1}
//             </span>{' '}
//             to{' '}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {Math.min(startIndex + itemsPerPage, filteredDoctors.length)}
//             </span>{' '}
//             of{' '}
//             <span className="font-semibold text-gray-900 dark:text-white">
//               {filteredDoctors.length}
//             </span>{' '}
//             Entries
//           </span>

//           <div className="inline-flex mt-2">
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.max(1, prev - 1))
//               }
//               disabled={currentPage === 1}
//               className="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isAddOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
//             <div className="flex justify-between items-center border-b pb-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Add New Doctor
//               </h3>
//               <button
//                 onClick={() => setIsAddOpen(false)}
//                 className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
//               >
//                 ×
//               </button>
//             </div>
//             <form
//               className="mt-4 space-y-4"
//               onSubmit={handleAddDoctor}
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Specialization
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.specialization}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       specialization: e.target.value,
//                     })
//                   }
//                   required
//                   className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
//               >
//                 Add Doctor
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// // what i want  is a preloaded like all the doctors that are under admin and on add doctor 
// // doctor is added like under that admin and that doctor is like also added to db and clerk dashboard 




// }


// claude 2.0

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Import Clerk hook

type Doctor = {
  id: number;
  name: string;
  email: string;
  specialization: string;
  date: string;
};

type FormDataType = {
  name: string;
  email: string;
  specialization: string;
  license_number: string;
  phone: string;
  address: string;
  department: string;
};

export default function DoctorTable() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    specialization: '',
    license_number: '',
    phone: '',
    address: '',
    department: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  
  // Get logged-in admin's email from Clerk
  const { user } = useUser();
  const adminEmail = user?.primaryEmailAddress?.emailAddress;

  // Fetch doctors on component mount and when adminEmail is available
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!adminEmail) return;
      
      setIsLoading(true);
      try {
        const res = await fetch(`/api/doctor/getdoctor?email=${encodeURIComponent(adminEmail)}`);
        const data = await res.json();
        
        if (res.ok && data.doctors) {
          setDoctors(data.doctors);
        } else {
          console.error('Failed to fetch doctors:', data.msg);
        }
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [adminEmail]);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminEmail) {
      alert('❌ Admin email not found. Please log in again.');
      return;
    }

    // Prevent duplicate email locally
    const alreadyExists = doctors.some(
      (d) => d.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (alreadyExists) {
      alert('❌ Doctor with this email already exists in your list.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/doctor/add-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          specialization: formData.specialization,
          license_number: formData.license_number,
          phone: formData.phone,
          address: formData.address,
          department: formData.department || formData.specialization,
          adminEmail: adminEmail, // Pass logged-in admin's email
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('✅ Doctor created and assigned successfully!');
        
        // Add new doctor to the list immediately
        setDoctors([data.doctor, ...doctors]);
        
        // Reset form and close modal
        setFormData({ 
          name: '', 
          email: '', 
          specialization: '',
          license_number: '',
          phone: '',
          address: '',
          department: '',
        });
        setIsAddOpen(false);
      } else {
        alert(`❌ ${data.msg || 'Failed to add doctor'}`);
      }
    } catch (err) {
      console.error(err);
      alert('🚨 Error adding doctor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleView = (doctor: Doctor) => {
    router.push(`/admin/doctor-table/${encodeURIComponent(doctor.email)}/docpage`);
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-between pb-4">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
          >
            + Add Doctor
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Specialization</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDoctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {doctor.name}
                </td>
                <td className="px-6 py-4">{doctor.email}</td>
                <td className="px-6 py-4">{doctor.specialization}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(doctor)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredDoctors.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4 text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'No matching records found.' : 'No doctors assigned yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredDoctors.length > 0 && (
          <div className="flex flex-col items-center mt-4">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(startIndex + itemsPerPage, filteredDoctors.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredDoctors.length}
              </span>{' '}
              Entries
            </span>

            <div className="inline-flex mt-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Doctor
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleAddDoctor}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialization: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  License Number
                </label>
                <input
                  type="text"
                  value={formData.license_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      license_number: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  required
                  rows={2}
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Department (optional)
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      department: e.target.value,
                    })
                  }
                  placeholder="Leave empty to use specialization"
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Doctor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
