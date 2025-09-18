"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
  const { email } = useParams();
  const [data, setData] = useState<VitalsRecord[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/assigning/${encodeURIComponent(email as string)}/records`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch vitals:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [email]);

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
          Showing <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(startIndex + itemsPerPage, filteredData.length)}</strong> of{" "}
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
      </div>
    </div>
  );
}
