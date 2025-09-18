"use client"
import React from "react";
// import { Pagination } from "@/components/pagination"

// import { ActionDialog } from "@/components/action-dialog";
// import { ActionOptions, ViewAction } from "@/components/action-options";

// // import { ProfileImage } from "@/components/profile-image";
// import SearchInput from "@/components/ui/sear";
import { Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SearchParamsProps } from "@/types";
// import { calculateAge } from "@/utils";
import { checkRole } from "@/utils/roles";
// import { DATA_LIMIT } from "@/utils/seetings";
// // import { getAllPatients } from "@/utils/services/patient";
import Patient  from "@prisma/client";
import { Users, UserPen } from "lucide-react";
import { getPatientById } from "@/utils/services/patient";
import { auth } from "@clerk/nextjs/server";
import { useEffect,useState } from "react";

const columns = [
//   { header: "Patient Name", key: "name" },
//   { header: "Gender", key: "gender", className: "hidden md:table-cell" },
//   { header: "Phone", key: "contact", className: "hidden md:table-cell" },
//   { header: "Email", key: "email", className: "hidden lg:table-cell" },
//   { header: "Address", key: "address", className: "hidden xl:table-cell" },
  { header: "Respiration Rate", key: "respiration_rate", className: "hidden lg:table-cell" },
  { header: "Temperature", key: "temperature", className: "hidden xl:table-cell" },
  { header: "Heart Rate", key: "heart_rate", className: "hidden 2xl:table-cell" },
  { header: "Actions", key: "action" },
];

// const PatientList = async (props: SearchParamsProps) => {
//   const searchParams = await props.searchParams;
//   const page = (searchParams?.p || "1") as string;
//   const searchQuery = (searchParams?.q || "") as string;

//   const { data, totalPages, totalRecords, currentPage } = await getAllPatients({
//     pa
//  const user = await auth();
//   const isAdmin = await checkRole("ADMIN");
//   const [data, setData] = useState([]);
//   const { data: patientData, success } = await getPatientDashboardStatistics(user.id);

//   if (!success || !patientData) {
//     return <p>No data available.</p>;
//   }

//   const {
//     first_name,
//     last_name,
//     img,
//     gender,
//     vitalSigns: [vitals] = [],
//   } = patientData;

//   if (!data) return null;

//   const renderRow = (item: patient) => {
//     const name = item?.first_name + " " + item?.last_name;

    
//       useEffect(() => {
//         const fetchData = async () => {
//           const res = await fetch("/api/temperature/records");
//           const json = await res.json();
//           setData(json);
//         };
    
//         fetchData();
    
//         // Optional: poll for new data every 5s
//         const interval = setInterval(fetchData, 5000);
//         return () => clearInterval(interval);
//       }, []);
 
//   if (!data.length) return <p className="p-4">No vitals available.</p>;

//     return (
    //   <tr
    //     key={item?.id}
    //     className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-slate-50"
    //   >
        /* <td className="flex items-center gap-4 p-4">
         
            url={item?.img!}
            name={name}
            bgColor={item?.colorCode!}
            textClassName="text-black"
          />
          <div>
            <h3 className="uppercase">{name}</h3>
            <span className="text-sm capitalize">
              {calculateAge(item?.date_of_birth)}
            </span>
          </div>
        </td>
        <td className="hidden md:table-cell">{item?.gender}</td>
        <td className="hidden md:table-cell">{item?.phone}</td>
        <td className="hidden lg:table-cell">{item?.email}</td>
        <td className="hidden xl:table-cell">{item?.address}</td>
        <td className="hidden lg:table-cell">{item?.blood_pressure ?? "-"}</td>
        <td className="hidden xl:table-cell">{item?.temperature ?? "-"}</td>
        <td className="hidden 2xl:table-cell">{item?.oxygen_level ?? "-"}</td>
        <td></td> */

        
    //         <Table className="min-w-full divide-y divide-gray-200 text-sm">
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="px-4 py-2 text-left">Date</TableHead>
    //       <TableHead className="hidden md:table-cell">Heart Rate</TableHead>
    //       <TableHead className="hidden lg:table-cell">Temperature (°C)</TableHead>
    //       <TableHead className="hidden xl:table-cell">Respiration Rate</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {data.map((item, index) => (
    //       <TableRow key={index}>
    //         <TableCell className="px-4 py-2">
    //           {new Date(item.created_at).toLocaleString()}
    //         </TableCell>
    //         <TableCell className="hidden md:table-cell">
    //           {item.heart_rate ?? '-'}
    //         </TableCell>
    //         <TableCell className="hidden lg:table-cell">
    //           {item.body_temperature ?? '-'}
    //         </TableCell>
    //         <TableCell className="hidden xl:table-cell">
    //           {item.respiratory_rate ?? '-'}
    //         </TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
    

    // )


    
// // 1. Define your data shape
// type VitalsRecord = {
//   created_at: string;
//   heart_rate: number | null;
//   body_temperature: number | null;
//   respiratory_rate: number | null;
// };

// export default function PatientList() {
//   const [data, setData] = useState<VitalsRecord[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/api/temperature/records');
//       const json = await res.json();
//       setData(json);
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!data.length) return <p className="p-4">No vitals available.</p>;

//   return (
//     <Table className="min-w-full divide-y divide-gray-200 text-sm">
//       <TableHeader>
//         <TableRow>
//           <TableHead className="px-4 py-2 text-left">Date</TableHead>
//           <TableHead className="hidden md:table-cell">Heart Rate</TableHead>
//           <TableHead className="hidden lg:table-cell">Temperature (°C)</TableHead>
//           <TableHead className="hidden xl:table-cell">Respiration Rate</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell className="px-4 py-2">
//               {new Date(item.created_at).toLocaleString()}
//             </TableCell>
//             <TableCell className="hidden md:table-cell">
//               {item.heart_rate ?? '-'}
//             </TableCell>
//             <TableCell className="hidden lg:table-cell">
//               {item.body_temperature ?? '-'}
//             </TableCell>
//             <TableCell className="hidden xl:table-cell">
//               {item.respiratory_rate ?? '-'}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }


// import { useEffect, useState } from 'react';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

type VitalsRecord = {
  created_at: string;
  heart_rate: number | null;
  body_temperature: number | null;
  respiratory_rate: number | null;
   oxygen_saturation: number| null;
  sbp: number| null;
  dbp: number| null;
  si: number| null;
  ri: number| null;
  pi: number| null;
  blood_pressure: number| null;
};

export default function PatientVitalsTable() {
  const [data, setData] = useState<VitalsRecord[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch + poll data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/temperature/records');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch vitals:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter by search
  const filteredData = data.filter((item) =>
    new Date(item.created_at)
      .toLocaleString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (!data.length) return <p className="p-4">No vitals available.</p>;

  return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    {/* <div className="max-w-sm sm:max-w-md md:max-w-2xl lg: max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md"> */}
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Patient Vitals</h2>

      <input
        type="text"
        placeholder="Search by date..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full max-w-sm"
      />

      <div className="overflow-x-auto">
    
        <Table className="min-w-[1200px] divide-y divide-gray-200 text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left">Date</TableHead>
              <TableHead>Heart Rate</TableHead>
              <TableHead>Temperature (°C)</TableHead>
              <TableHead>Respiration Rate</TableHead>
              <TableHead>Oxygen Saturation</TableHead>
              <TableHead>SBP  </TableHead>
              <TableHead>DBP  </TableHead>
              <TableHead>SI   </TableHead>
              <TableHead>RI  </TableHead>
              <TableHead>PI  </TableHead>
              <TableHead>MAP </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2">
                  {new Date(item.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{item.heart_rate ?? "-"}</TableCell>
                <TableCell>{item.body_temperature ?? "-"}</TableCell>
                <TableCell>{item.respiratory_rate ?? "-"}</TableCell>
                <TableCell>{item.oxygen_saturation ?? "-"}</TableCell>
                <TableCell>{item.sbp ?? "-"}</TableCell>
                <TableCell>{item.dbp ?? "-"}</TableCell>
                <TableCell>{item.si ?? "-"}</TableCell>
                <TableCell>{item.ri ?? "-"}</TableCell>
                <TableCell>{item.pi ?? "-"}</TableCell>
                <TableCell>{item.blood_pressure ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
 
      <div className="flex items-center justify-between mt-4 text-sm text-gray-700 dark:text-gray-300">
        <span>
          Showing{' '}
          <strong>{startIndex + 1}</strong> to{' '}
          <strong>{Math.min(startIndex + itemsPerPage, filteredData.length)}</strong> of{' '}
          <strong>{filteredData.length}</strong> entries
        </span>
        <div className="inline-flex gap-2">
          <Button onClick={handlePrev} disabled={currentPage === 1} variant="secondary">
            Prev
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            variant="secondary"
          >
            Next
          </Button>
        </div>
        {/*
      <div className="flex flex-col items-center mt-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(startIndex + itemsPerPage, filteredData.length)}
          </span>{' '}
          of <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span> Entries
        </span>

        <div className="inline-flex mt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50"
          >
            Next
          </button>
        </div>
       */}
      </div>
    </div>
   
  );
}
