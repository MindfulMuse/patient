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
// } from 'recharts';
// import React from 'react';

// const data = [
//   { date: '2025-07-01', temperature: 98.6 },
//   { date: '2025-07-02', temperature: 99.1 },
//   { date: '2025-07-03', temperature: 98.4 },
// ];

// const TemperatureChart = () => {
//   return (
//     <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis domain={[98, 100]} />
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
//   );
// };

// export default TemperatureChart;


"use client";

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
import React, { useEffect, useState } from "react";

const TemperatureChart = () => {
  const [data, setData] = useState<{ date: string; temperature: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/temperature/trends");
      const json = await res.json();
      setData(json);
    };

    fetchData();

    // Optional: poll for new data every 5s
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[97, 101]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
