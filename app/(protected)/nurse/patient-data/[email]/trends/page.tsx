// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";

// interface VitalDataPoint {
//   date: string;
//   body_temperature: number;
//   heart_rate: number;
//   respiratory_rate: number;
//   oxygen_saturation: number;
//   sbp: number;
//   dbp: number;
//   si: number;
//   ri: number;
//   pi: number;
//   blood_pressure: number;
// }

// const vitalOptions = [
//   { key: "body_temperature", label: "Temperature (°C)" },
//   { key: "heart_rate", label: "Heart Rate (bpm)" },
//   { key: "respiratory_rate", label: "Respiratory Rate" },
//   { key: "oxygen_saturation", label: "Oxygen Saturation (%)" },
//   { key: "sbp", label: "Systolic BP" },
//   { key: "dbp", label: "Diastolic BP" },
//   { key: "si", label: "Shock Index (SI)" },
//   { key: "ri", label: "Respiratory Index (RI)" },
//   { key: "pi", label: "Perfusion Index (PI)" },
//   { key: "blood_pressure", label: "Blood Pressure (mmHg)" },
// ];

// export default function VitalDropdownChart() {
//   const [data, setData] = useState<VitalDataPoint[]>([]);
//   const [selected, setSelected] = useState("body_temperature");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const params = useParams();
//   const email = params?.email as string;

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`/api/assigning/${encodeURIComponent(email)}/trends`);
//       const json = await res.json();
//       setData(json);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, [email]);

//   const current = vitalOptions.find((v) => v.key === selected);

//   return (
// //     <div className="m-8">
// //       {/* Dropdown Button */}
// //       <div className="relative inline-block text-left">
// //         <button
// //           id="dropdownDefaultButton"
// //           onClick={() => setDropdownOpen(!dropdownOpen)}
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
// //           type="button"
// //         >
// //           {current?.label}
// //           <svg
// //             className="w-2.5 h-2.5 ms-3"
// //             aria-hidden="true"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 10 6"
// //           >
// //             <path
// //               stroke="currentColor"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth="2"
// //               d="m1 1 4 4 4-4"
// //             />
// //           </svg>
// //         </button>

// //         {dropdownOpen && (
// //           <div className="absolute z-10 bg-white rounded-lg shadow w-44 mt-2">
// //             <ul className="py-2 text-sm text-gray-700">
// //               {vitalOptions.map((option) => (
// //                 <li key={option.key}>
// //                   <button
// //                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
// //                     onClick={() => {
// //                       setSelected(option.key);
// //                       setDropdownOpen(false);
// //                     }}
// //                   >
// //                     {option.label}
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>

// //       <div className="bg-white rounded-xl p-4 mt-6 h-full w-[75%] max-w-4xl min-w-[20rem] shadow-lg">
// //         <h1 className="text-lg font-semibold mb-4">{current?.label}</h1>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={data}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="date" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line
// //               type="monotone"
// //               dataKey={current?.key}
// //               stroke="#007bff"
// //               strokeWidth={2}
// //               dot={{ r: 3 }}
// //               activeDot={{ r: 5 }}
// //             />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>

// <div className="m-8">
//   {/* Dropdown Button and Chart Title Row */}
//   <div className="flex items-center justify-between w-[75%] max-w-4xl min-w-[20rem] mb-4">
//     <h1 className="text-lg font-semibold">{current?.label}</h1>

//     {/* Dropdown Button */}
//     <div className="relative inline-block text-left">
//       <button
//         id="dropdownDefaultButton"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-2"
//         type="button"
//       >
//         <span>{current?.label}</span>
//         <svg
//           className="w-2.5 h-2.5"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 10 6"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="m1 1 4 4 4-4"
//           />
//         </svg>
//       </button>

//       {/* Dropdown Menu */}
//       {dropdownOpen && (
//         <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 mt-2">
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//             {vitalOptions.map((option) => (
//               <li key={option.key}>
//                 <button
//                   className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={() => {
//                     setSelected(option.key);
//                     setDropdownOpen(false);
//                   }}
//                 >
//                   {option.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   </div>

//   {/* Chart Container */}
//   <div className="bg-white rounded-xl p-4 h-full w-[75%] max-w-4xl min-w-[20rem] border-black shadow-lg">
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey={current?.key}
//           stroke={current?.color || "#007bff"}
//           strokeWidth={2}
//           dot={{ r: 3 }}
//           activeDot={{ r: 5 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// </div>
// );
// }

// Same X-Axis

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface VitalDataPoint {
//   date: string;
//   body_temperature: number;
//   heart_rate: number;
//   respiratory_rate: number;
//   oxygen_saturation: number;
//   sbp: number;
//   dbp: number;
//   si: number;
//   ri: number;
//   pi: number;
//   blood_pressure: number;
// }

// const vitalOptions = [
//   { key: "body_temperature", label: "Temperature (°C)", color: "#FF5733" },
//   { key: "heart_rate", label: "Heart Rate (bpm)", color: "#007bff" },
//   { key: "respiratory_rate", label: "Respiratory Rate", color: "#28a745" },
//   { key: "oxygen_saturation", label: "Oxygen Saturation (%)", color: "#6f42c1" },
//   { key: "sbp", label: "Systolic BP", color: "#e83e8c" },
//   { key: "dbp", label: "Diastolic BP", color: "#20c997" },
//   { key: "si", label: "Shock Index (SI)", color: "#fd7e14" },
//   { key: "ri", label: "Respiratory Index (RI)", color: "#6610f2" },
//   { key: "pi", label: "Perfusion Index (PI)", color: "#17a2b8" },
//   { key: "blood_pressure", label: "Blood Pressure (mmHg)", color: "#343a40" },
// ];

// export default function VitalDropdownChart() {
//   const [data, setData] = useState<VitalDataPoint[]>([]);
//   const [selectedKeys, setSelectedKeys] = useState<string[]>(["body_temperature"]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const params = useParams();
//   const email = params?.email as string;

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`/api/assigning/${encodeURIComponent(email)}/trends`);
//       const json = await res.json();
//       setData(json);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, [email]);

//   const toggleSelect = (key: string) => {
//     setSelectedKeys((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   return (
//     <div className="m-8">
//       {/* Dropdown */}
//       <div className="flex items-center justify-between w-[75%] max-w-4xl min-w-[20rem] mb-4">
//         <h1 className="text-lg font-semibold">Select Vitals</h1>

//         <div className="relative inline-block text-left">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-white bg-blue-700 hover:bg-blue-800 
//                        focus:ring-4 focus:outline-none focus:ring-blue-300 
//                        font-medium rounded-lg text-sm px-5 py-2.5 
//                        inline-flex items-center gap-2"
//           >
//             Choose Vitals
//             <svg
//               className="w-2.5 h-2.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 
//                             rounded-lg shadow-sm w-56 dark:bg-gray-700 mt-2">
//               <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                 {vitalOptions.map((option) => (
//                   <li key={option.key}>
//                     <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedKeys.includes(option.key)}
//                         onChange={() => toggleSelect(option.key)}
//                         className="mr-2"
//                       />
//                       {option.label}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stacked Charts with shared X-axis */}
//       <div className="flex flex-col gap-6 w-[75%] max-w-4xl min-w-[20rem]">
//         {selectedKeys.map((key) => {
//           const current = vitalOptions.find((v) => v.key === key);
//           return (
//             <div
//               key={key}
//               className="bg-white rounded-xl p-4 border shadow-lg"
//             >
//               <h2 className="text-md font-medium mb-2">{current?.label}</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={data} syncId="vitals">
//                   <CartesianGrid strokeDasharray="3 3" />
//                   {/* Shared X axis (only show labels on last chart) */}
//                   <XAxis dataKey="date" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey={key}
//                     stroke={current?.color || "#007bff"}
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           );
//         })}
//       </div>

//       {/* Render one visible X axis at the bottom */}
//       {selectedKeys.length > 0 && (
//         <div className="bg-white rounded-xl p-4 border shadow-lg mt-2">
//           <ResponsiveContainer width="100%" height={50}>
//             <LineChart data={data} syncId="vitals">
//               <XAxis dataKey="date" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }

//checkbox and multiple graphs

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface VitalDataPoint {
  date: string;
  body_temperature: number;
  heart_rate: number;
  respiratory_rate: number;
  oxygen_saturation: number;
  sbp: number;
  dbp: number;
  si: number;
  ri: number;
  pi: number;
  blood_pressure: number;
}

const vitalOptions = [
  { key: "body_temperature", label: "Temperature (°F)", color: "#FF5733" },
  { key: "heart_rate", label: "Heart Rate (bpm)", color: "#007bff" },
  { key: "respiratory_rate", label: "Respiratory Rate", color: "#28a745" },
  { key: "oxygen_saturation", label: "Oxygen Saturation (%)", color: "#6f42c1" },
  { key: "sbp", label: "Systolic BP", color: "#e83e8c" },
  { key: "dbp", label: "Diastolic BP", color: "#20c997" },
  { key: "si", label: "Shock Index (SI)", color: "#fd7e14" },
  { key: "ri", label: "Respiratory Index (RI)", color: "#6610f2" },
  { key: "pi", label: "Perfusion Index (PI)", color: "#17a2b8" },
  { key: "blood_pressure", label: "MAP (mmHg)", color: "#343a40" },
];

export default function VitalDropdownChart() {
  const [data, setData] = useState<VitalDataPoint[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["body_temperature"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const params = useParams();
  const email = params?.email as string;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/assigning/${encodeURIComponent(email)}/trends`);
      const json = await res.json();
      setData(json);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [email]);

  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="m-8">
      {/* Dropdown */}
      <div className="flex items-center justify-between w-[75%] max-w-4xl min-w-[20rem] mb-4">
        <h1 className="text-lg font-semibold">Select Vitals</h1>

        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white bg-blue-700 hover:bg-blue-800 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 
                       font-medium rounded-lg text-sm px-5 py-2.5 
                       inline-flex items-center gap-2"
          >
            Choose Vitals
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 
                            rounded-lg shadow-sm w-56 dark:bg-gray-700 mt-2">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {vitalOptions.map((option) => (
                  <li key={option.key}>
                    <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedKeys.includes(option.key)}
                        onChange={() => toggleSelect(option.key)}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Independent Charts (each with its own X & Y axes) */}
      <div className="flex flex-col gap-6 w-[75%] max-w-4xl min-w-[20rem]">
        {selectedKeys.map((key) => {
          const current = vitalOptions.find((v) => v.key === key);
          return (
            <div
              key={key}
              className="bg-white rounded-xl p-4 border shadow-lg"
            >
              <h2 className="text-md font-medium mb-2">{current?.label}</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />   {/* X axis for this vital */}
                  <YAxis />                  {/* Y axis for this vital */}
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={key}
                    stroke={current?.color || "#007bff"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
