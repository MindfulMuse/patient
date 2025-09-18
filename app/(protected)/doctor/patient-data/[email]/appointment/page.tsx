"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

type Medication = {
  id: string;
  name: string;
  dosage: string;
};

type Prescription = {
  id: number;
  name: string;
  date: string;
  medications: Medication[];
  next_appointment_date?: string | null; // ISO datetime string
  next_appointment_time?: string | null;
  instructions: string;
};
// type AppointmentRecord = {
//   id: string;
//   name: string;
//   date: string;
//   next_appointment_date: string;
//   next_appointment_time: string;
//   instructions: string;
//   medications: Medication[];
// };

export default function AppointmentTable() {
  const [data, setData] = useState<Prescription[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

    const { email } = useParams();
  
    
      const [formData, setFormData] = useState<{
      name: string;
      email:string;
      instructions: string;
    }>({
      name: '',
      email:'',
      instructions: '',
    });

    
     useEffect(() => {
      if (!email) return;
    
      fetch(`/api/assigning/${encodeURIComponent(email as string)}/prescribe`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("Error fetching prescriptions:", err));
    }, [email]);

const filteredData = data.filter((item) =>
  item.date.toLowerCase().includes(search.toLowerCase())
);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (!data.length) return <p className="p-4">No appointments available.</p>;

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Appointments</h2>

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
              <TableHead>Next Appointment Date</TableHead>
              <TableHead>Next Appointment Time</TableHead>
              <TableHead>Instructions</TableHead>
              {/* <TableHead>Medications</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-2">
                  {new Date(item.date).toLocaleString()}
                </TableCell>
                <TableCell>{item.next_appointment_date || "-"}</TableCell>
                <TableCell>{item.next_appointment_time || "-"}</TableCell>
                <TableCell>{item.instructions || "-"}</TableCell>
                {/* <TableCell>
                  {item.medications.length > 0
                    ? item.medications.map((med) => `${med.name} (${med.dosage})`).join(", ")
                    : "-"}
                </TableCell> */}
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