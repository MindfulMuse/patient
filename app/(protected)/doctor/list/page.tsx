// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// // Dummy data
// const patients = [
//   { id: "user_2zMK8EoQsFZyRiGGtJQM8NRyEyG", name: "Patient1", mobile: "1234567890" ,email:"patient1@gmail.com"},
// ];

// export default function Ptable() {
//   const router = useRouter();

//   const handleView = (email: string) => {
// router.push(`/patient?email=${encodeURIComponent(email)}`);
//   };

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//       {/* Search */}
//       <div className="flex items-center justify-between flex-wrap md:flex-row pb-4 bg-white dark:bg-gray-900">
//         <div className="relative">
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//             </svg>
//           </div>
//           <input
//             type="text"
//             id="table-search-users"
//             className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//             placeholder="Search for patients"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-between flex-wrap md:flex-row pb-4 bg-white dark:bg-gray-900">
//   <div className="relative">
//     {/* Search input */}
//     ...
//   </div>    
//      {/* <label htmlFor="table-search" className="sr-only">Search</label>
//         <div className="relative">
//           <input
//             type="text"
//             id="table-search-users"
//             className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//             placeholder="Search for patients"
//           />*/}
       
//       </div> 

//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th className="px-6 py-3">Patient Name</th>
//             <th className="px-6 py-3">Patient ID</th>
//             <th className="px-6 py-3">Mobile</th>
//             <th className="px-6 py-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((patient) => (
//             <tr key={patient.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//               <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{patient.name}</td>
//               <td className="px-6 py-4">{patient.id}</td>
//               <td className="px-6 py-4">{patient.mobile}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleView(patient.email)}
//                   className="text-blue-600 dark:text-blue-500 hover:underline"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const products = [
//   { id: 1, name: 'Alice', Heart_rate: '233', Body_Temperature: '78', Blood_pressure: '99' },
//   { id: 2, name: 'Michael', Heart_rate: '273', Body_Temperature: '65', Blood_pressure: '59' },
//   { id: 3, name: 'David', Heart_rate: '293', Body_Temperature: '60', Blood_pressure: '89' },
//   { id: 4, name: 'Sophia', Heart_rate: '210', Body_Temperature: '98.2', Blood_pressure: '115/75' },
//   { id: 5, name: 'Emma', Heart_rate: '250', Body_Temperature: '98.7', Blood_pressure: '125/82' },
//   { id: 6, name: 'James', Heart_rate: '225', Body_Temperature: '99.0', Blood_pressure: '118/76' },
//   { id: 7, name: 'Olivia', Heart_rate: '240', Body_Temperature: '98.4', Blood_pressure: '122/78' },
//   { id: 8, name: 'Liam', Heart_rate: '260', Body_Temperature: '97.8', Blood_pressure: '117/73' },
//   { id: 9, name: 'Noah', Heart_rate: '255', Body_Temperature: '98.9', Blood_pressure: '121/79' },
//   { id: 10, name: 'Isabella', Heart_rate: '245', Body_Temperature: '98.5', Blood_pressure: '119/77' },
//   { id: 11, name: 'Ethan', Heart_rate: '235', Body_Temperature: '98.1', Blood_pressure: '116/74' },
//   { id: 12, name: 'Ava', Heart_rate: '215', Body_Temperature: '97.6', Blood_pressure: '114/72' },
//   { id: 13, name: 'Mason', Heart_rate: '220', Body_Temperature: '98.3', Blood_pressure: '123/81' },
// ];

// export default function ProductTableCard() {
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const router = useRouter();

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Patient Records</h2>

//       <input
//         type="text"
//         placeholder="Search patients..."
//         className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//       />

//       <div className="relative overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3">Patient Name</th>
//               <th className="px-6 py-3">Heart Rate</th>
//               <th className="px-6 py-3">Body Temperature</th>
//               <th className="px-6 py-3">Blood Pressure</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((product) => (
//               <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
//                 <td className="px-6 py-4">{product.Heart_rate}</td>
//                 <td className="px-6 py-4">{product.Body_Temperature}</td>
//                 <td className="px-6 py-4">{product.Blood_pressure}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => router.push(`/prescription/ptable`)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {currentItems.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-6 py-4 text-center text-red-500">
//                   No patients found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

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


// "use client"; // if using Next.js App Router
// import { useState } from "react";

// export default function AppointmentModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTime, setSelectedTime] = useState("12-am");

//   const times = [
//     "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
//     "12:00 AM", "12:30 PM", "01:00 PM", "01:30 PM",
//     "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
//   ];

//   return (
//     <>
//       {/* Trigger button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen(true)}
//         className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
//                    focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
//                    rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
//                    dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
//                    dark:text-white dark:hover:bg-gray-700"
//       >
//         <svg
//           className="w-4 h-4 me-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             fillRule="evenodd"
//             d="M2 12C2 6.477 6.477 2 12 2s10 
//               4.477 10 10-4.477 10-10 10S2 17.523 2 
//               12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 
//               .293.707l3 3a1 1 0 0 0 1.414-1.414L13 
//               11.586V8Z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Schedule appointment
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/50 backdrop-blur-sm"
//         >
//           <div className="relative p-4 w-full max-w-[23rem] bg-white rounded-lg shadow-sm dark:bg-gray-800">
//             {/* Modal header */}
//             <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Schedule an appointment
//               </h3>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 
//                            rounded-lg text-sm h-8 w-8 flex items-center justify-center 
//                            dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Modal body */}
//             <div className="p-4 pt-0">
//               <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
//                 Pick your time
//               </label>
//               <ul className="grid w-full grid-cols-3 gap-2 mb-5">
//                 {times.map((time) => {
//                   const id = time.toLowerCase().replace(/[\s:]/g, "-");
//                   return (
//                     <li key={id}>
//                       <input
//                         type="radio"
//                         id={id}
//                         value={time}
//                         checked={selectedTime === id}
//                         onChange={() => setSelectedTime(id)}
//                         className="hidden peer"
//                         name="timetable"
//                       />
//                       <label
//                         htmlFor={id}
//                         className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium 
//                                    text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 
//                                    border rounded-lg cursor-pointer text-gray-500 border-gray-200 
//                                    dark:border-gray-700 peer-checked:border-blue-700 
//                                    dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 
//                                    hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 
//                                    dark:peer-checked:bg-blue-900"
//                       >
//                         {time}
//                       </label>
//                     </li>
//                   );
//                 })}
//               </ul>

//               <div className="grid grid-cols-2 gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     console.log("Saved:", selectedTime);
//                     setIsOpen(false);
//                   }}
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
//                              focus:ring-blue-300 font-medium rounded-lg text-sm 
//                              px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
//                              focus:outline-none dark:focus:ring-blue-800"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 
//                              focus:outline-none bg-white rounded-lg border border-gray-200 
//                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 
//                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
//                              dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
//                              dark:hover:text-white dark:hover:bg-gray-700"
//                 >
//                   Discard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// Calendar and time picker 

// "use client";
// import { useState } from "react";

// export default function AppointmentForm() {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Selected:", date, time);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
//     >
//       <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//         Schedule an appointment
//       </h2>

//       {/* Date */}
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//         Select Date
//       </label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
//       />

//       {/* Time (24-hour) */}
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//         Select Time (24h)
//       </label>
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         step={1800} // increments of 30 minutes
//         className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
//       />

//       <button
//         type="submit"
//         className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
//       >
//         Save
//       </button>
//     </form>
//   );
// }


"use client";
import { useState } from "react";

export default function AppointmentScheduler() {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // simple list of times in 24h format
  const times = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment:", date, time);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Main Dropdown Button */}
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
                   focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
                   rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
                   dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
                   dark:text-white dark:hover:bg-gray-700"
      >
        Schedule Appointment
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

      {/* Dropdown Content (Date + Time Picker) */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border 
                     border-gray-200 dark:border-gray-700"
        >
          {/* Date */}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pick a Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
            required
          />

          {/* Time */}
            {/* Time (24-hour) */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Select Time (24h)
      </label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        step={1800} // increments of 30 minutes
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-4"
      />
          
               {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                         dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none 
                         bg-white rounded-lg border border-gray-200 hover:bg-gray-100 
                         dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 
                         dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
