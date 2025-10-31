
// "use client";

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
// import React, { useEffect, useState } from "react";

// const TemperatureChart = () => {
//   const [data, setData] = useState<{ date: string; temperature: number }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("/api/temperature/trends");
//       const json = await res.json();
//       setData(json);
//     };

//     fetchData();

//     // Optional: poll for new data every 5s
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//     <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data.body_temperature}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis domain={[97, 101]} />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="temperature"
//             stroke="#8884d8"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>


//  <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data.respiration_rate}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis domain={[97, 101]} />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="respiration rate "
//             stroke="#8884d8"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>

//      <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data.heart_rate}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis domain={[97, 101]} />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="Heart rate "
//             stroke="#8884d8"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>

// </div>


//   );
// };

// export default TemperatureChart;


// "use client";

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
// import React, { useEffect, useState } from "react";

// // ✅ TypeScript-friendly interface
// interface VitalDataPoint {
//   date: string;
//   temperature: number;
//   heart_rate: number;
//   respiratory_rate: number;
// }

// const TemperatureChart = () => {
//   const [data, setData] = useState<VitalDataPoint[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("/api/temperature/trends");
//       const json = await res.json();
//       setData(json);
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
// <div className="container mx-auto px-4">
//   {/* <div className="py-6 px-8 flex flex-col xl:flex-row gap-6 rounded-xl"> */}

//           {/* <h2 className=" text-lg my-3 mx-2 xl:text-1xl font-semibold">Demographics</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-5">
//       {/* Temperature Chart */}{/*
//       <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis domain={[35, 40]} />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="temperature"
//               stroke="#ff7300"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//    </div> */}

//       <div className="bg-white rounded-xl p-4 h-full w-[75%] max-w-4xl min-w-[20rem] m-7 border-black shadow-lg">
//   <div className="flex justify-between items-center">
//     <h1 className="text-lg font-semibold m-3 mb-4 border-gray-300 rounded  bg-gray-100 px-3 py-1">Temperature</h1>
//   </div>

//   <ResponsiveContainer width="100%" height={250}>
//     <LineChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" />
//       <YAxis domain={[35, 40]} />
//       <Tooltip />
//       <Legend />
//       <Line
//         type="monotone"
//         dataKey="temperature"
//         stroke="#ff7300"
//         strokeWidth={2}
//         dot={{ r: 4 }}
//         activeDot={{ r: 6 }}
//       />
//     </LineChart>
//   </ResponsiveContainer>
// {/* </div> */}
// </div>

// {/*    
//       {/* Respiration Rate Chart */}{/*
//       <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="respiratory_rate"
//               stroke="#387908"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
// /*}
//       {/* Heart Rate Chart */}
//       {/* <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="heart_rate"
//               stroke="#8884d8"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div> */} 

//   {/* <div className=" flex flex-col rounded-xl xl:flex-row gap-6"> */}
//       {/* <div className="bg-white rounded-xl p-4 h-full"> */}
//       <div className="bg-white rounded-xl p-4 h-full w-[75%] max-w-4xl min-w-[20rem] m-7 border-black shadow-lg">
//   <div className="flex justify-between items-center">
//     <h1 className="text-lg font-semibold m-3">Respiration Rate</h1>
//   </div>

//   <ResponsiveContainer width="100%" height={250}>
//     <LineChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line
//         type="monotone"
//         dataKey="respiratory_rate"
//         stroke="#1e90ff"
//         strokeWidth={2}
//         dot={{ r: 4 }}
//         activeDot={{ r: 6 }}
//       />
//     </LineChart>
//   </ResponsiveContainer>
// </div>
// {/* </div> */}

//       <div className="bg-white rounded-xl p-4 h-full w-[75%] max-w-4xl min-w-[20rem] m-7 border-black shadow-lg">
//   <div className="flex justify-between items-center">
//     <h1 className="text-lg font-semibold mb-3">Heart Rate</h1>
//   </div>

//   <ResponsiveContainer width="100%" height={250}>
//     <LineChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line
//         type="monotone"
//         dataKey="heart_rate"
//         stroke="#d946ef"
//         strokeWidth={2}
//         dot={{ r: 4 }}
//         activeDot={{ r: 6 }}
//       />
//     </LineChart>
//   </ResponsiveContainer>
// </div>

//     </div>
//   );
// };

// export default TemperatureChart;

"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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
  { key: "body_temperature", label: "Temperature (°C)", color: "#ff6384" },
  { key: "heart_rate", label: "Heart Rate (bpm)", color: "#36a2eb" },
  { key: "respiratory_rate", label: "Respiratory Rate", color: "#4bc0c0" },
  { key: "oxygen_saturation", label: "Oxygen Saturation (%)", color: "#9966ff" },
  { key: "sbp", label: "Systolic BP", color: "#ff9f40" },
  { key: "dbp", label: "Diastolic BP", color: "#ffcd56" },
  { key: "si", label: "Shock Index (SI)", color: "#00b894" },
  { key: "ri", label: "Respiratory Index (RI)", color: "#0984e3" },
  { key: "pi", label: "Perfusion Index (PI)", color: "#6c5ce7" },
  { key: "blood_pressure", label: "Blood Pressure (mmHg)", color: "#d63031" },
];


// const vitalOptions = [
//   { key: "body_temperature", label: "Temperature (°F)" },
//   { key: "heart_rate", label: "Heart Rate (bpm)" },
//   { key: "respiratory_rate", label: "Respiratory Rate" },
//   { key: "oxygen_saturation", label: "Oxygen Saturation (%)" },
//   { key: "sbp", label: "Systolic BP" },
//   { key: "dbp", label: "Diastolic BP" },
//   { key: "si", label: "Shock Index (SI)" },
//   { key: "ri", label: "Respiratory Index (RI)" },
//   { key: "pi", label: "Perfusion Index (PI)" },
//   { key: "blood_pressure", label: "MAP (mmHg)" },
// ];

export default function VitalDropdownChart() {
  const [data, setData] = useState<VitalDataPoint[]>([]);
  const [selected, setSelected] = useState("body_temperature");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["body_temperature"]);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/temperature/trends");
      const json = await res.json();
      setData(json);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  
  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const current = vitalOptions.find((v) => v.key === selected);

  return (
    // Only dropdown no checkbox

  //   <div className="m-8">
  //     {/* Dropdown Button */}
  //     <div className="relative inline-block text-left">
  //       <button
  //         id="dropdownDefaultButton"
  //         onClick={() => setDropdownOpen(!dropdownOpen)}
  //         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
  //         type="button"
  //       >
  //         {current?.label}
  //         <svg
  //           className="w-2.5 h-2.5 ms-3"
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
  //         <div
  //           id="dropdown"
  //           className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 mt-2"
  //         >
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

  //     {/* Chart Container */}
  //     <div className="bg-white rounded-xl p-4 mt-6 h-full w-[75%] max-w-4xl min-w-[20rem] border-black shadow-lg">
  //       <h1 className="text-lg font-semibold mb-4">
  //         {current?.label}
  //       </h1>
  //       <ResponsiveContainer width="100%" height={300}>
  //         <LineChart data={data}>
  //           <CartesianGrid strokeDasharray="3 3" />
  //           <XAxis dataKey="date" />
  //           <YAxis />
  //           <Tooltip />
  //           <Legend />
  //           <Line
  //             type="monotone"
  //             dataKey={current?.key}
  //             stroke={current?.color}
  //             strokeWidth={2}
  //             dot={{ r: 3 }}
  //             activeDot={{ r: 5 }}
  //           />
  //         </LineChart>
  //       </ResponsiveContainer>
  //     </div>
  //   </div>

  // Dropdown with checkbox
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
