// 'use client';

// import React, { useState, useMemo } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   LabelList,
// } from 'recharts';

// type PatientVital = {
//   name: string;
//   Heart_rate: number;
//   Body_Temperature: number;
//   Blood_pressure: number; // Assuming you want to use a single number like pulse
// };

// const patients: PatientVital[] = [
//   { name: 'Alice', Heart_rate: 233, Body_Temperature: 98.7, Blood_pressure: 115 },
//   { name: 'Michael', Heart_rate: 273, Body_Temperature: 99.1, Blood_pressure: 125 },
//   { name: 'David', Heart_rate: 293, Body_Temperature: 100.5, Blood_pressure: 130 },
//   { name: 'Sophia', Heart_rate: 210, Body_Temperature: 98.2, Blood_pressure: 110 },
//   { name: 'Emma', Heart_rate: 250, Body_Temperature: 101.3, Blood_pressure: 135 },
//   { name: 'James', Heart_rate: 225, Body_Temperature: 99.0, Blood_pressure: 118 },
// ];

// const metricOptions = [
//   { label: 'Heart Rate', key: 'Heart_rate' },
//   { label: 'Body Temperature', key: 'Body_Temperature' },
//   { label: 'Blood Pressure', key: 'Blood_pressure' },
// ];

// const BarChartLabel = ({ x = 0, y = 0, value = '' }: any) => {
//   return (
//     <text
//       x={x + 5}
//       y={y - 5}
//       fill="#666"
//       textAnchor="start"
//       fontFamily="Poppins"
//       fontSize={12}
//     >
//       {value}
//     </text>
//   );
// };

// export default function RiskBarChartCard() {
//   const [metric, setMetric] = useState<'Heart_rate' | 'Body_Temperature' | 'Blood_pressure'>(
//     'Heart_rate'
//   );
//   const [topN, setTopN] = useState(3);

//   const sortedData = useMemo(() => {
//     return [...patients]
//       .sort((a, b) => b[metric] - a[metric])
//       .slice(0, topN)
//       .map((item) => ({
//         name: item.name,
//         value: item[metric],
//       }));
//   }, [metric, topN]);

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Top {topN} Patients at Risk</h2>
//         <div className="flex space-x-2">
//           <select
//             className="border px-2 py-1 rounded-md text-sm"
//             value={metric}
//             onChange={(e) => setMetric(e.target.value as any)}
//           >
//             {metricOptions.map((opt) => (
//               <option key={opt.key} value={opt.key}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border px-2 py-1 rounded-md text-sm"
//             value={topN}
//             onChange={(e) => setTopN(Number(e.target.value))}
//           >
//             {[3, 5, patients.length].map((n) => (
//               <option key={n} value={n}>
//                 Top {n}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <BarChart
//         width={400}
//         height={50 * sortedData.length}
//         data={sortedData}
//         layout="vertical"
//         margin={{ left: 60 }}
//       >
//         <XAxis type="number" hide />
//         <YAxis type="category" dataKey="name" width={80} />
//         <Tooltip />
//         <Bar dataKey="value" fill="#B37FEB" barSize={15}>
//           <LabelList content={<BarChartLabel />} position="right" />
//         </Bar>
//       </BarChart>
//     </div>
//   );
// }

'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

type PatientVital = {
  name: string;
  Heart_rate: number;
  Body_Temperature: number;
  Blood_pressure: number;
};

const patients: PatientVital[] = [
  { name: 'Alice', Heart_rate: 233, Body_Temperature: 98.7, Blood_pressure: 115 },
  { name: 'Michael', Heart_rate: 273, Body_Temperature: 99.1, Blood_pressure: 125 },
  { name: 'David', Heart_rate: 293, Body_Temperature: 100.5, Blood_pressure: 130 },
  { name: 'Sophia', Heart_rate: 210, Body_Temperature: 98.2, Blood_pressure: 110 },
  { name: 'Emma', Heart_rate: 250, Body_Temperature: 101.3, Blood_pressure: 135 },
  { name: 'James', Heart_rate: 225, Body_Temperature: 99.0, Blood_pressure: 118 },
];

const metricOptions = [
  { label: 'Heart Rate', key: 'Heart_rate' },
  { label: 'Body Temperature', key: 'Body_Temperature' },
  { label: 'Blood Pressure', key: 'Blood_pressure' },
];

const BarChartLabel = ({ x = 0, y = 0, value = '' }: any) => {
  return (
    <text
      x={x + 5}
      y={y - 5}
      fill="#666"
      textAnchor="start"
      fontFamily="Poppins"
      fontSize={12}
    >
      {value}
    </text>
  );
};

export default function RiskBarChartCard() {
  const [metric, setMetric] = useState<'Heart_rate' | 'Body_Temperature' | 'Blood_pressure'>(
    'Heart_rate'
  );
  const [topN, setTopN] = useState(3);

  const sortedData = useMemo(() => {
    return [...patients]
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, topN)
      .map((item) => ({
        name: item.name,
        value: item[metric],
      }));
  }, [metric, topN]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-md p-5">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Top {topN} Patients at Risk
        </h2>
        <div className="flex gap-2">
          <select
            className="border px-2 py-1 rounded-md text-sm"
            value={metric}
            onChange={(e) => setMetric(e.target.value as any)}
          >
            {metricOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            className="border px-2 py-1 rounded-md text-sm"
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            {[3, 5, patients.length].map((n) => (
              <option key={n} value={n}>
                Top {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800 h-auto">
        <ResponsiveContainer width="100%" height={50 * sortedData.length + 50}>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 70, bottom: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="#B37FEB" barSize={14}>
              <LabelList content={<BarChartLabel />} position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
