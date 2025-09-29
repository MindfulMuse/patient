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
};

// export default async function DoctorPatientViewRecords({
//   params,
// }: {
//   params: { email: string; Patient_email: string };
// }) {
  // const awaitedParams = await params;

  // const doctorEmail = decodeURIComponent(awaitedParams.email);
  // const patientEmail = decodeURIComponent(awaitedParams.Patient_email);

export default async function Patient_History() {
  const { Demail, Patient_email } = useParams<{ Demail: string; Patient_email: string }>();
 
  const doctorEmail = decodeURIComponent(Demail);
  const patientEmail = decodeURIComponent(Patient_email);
  
 
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
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
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

      <Table className="min-w-full divide-y divide-gray-200 text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-left">Date</TableHead>
            <TableHead className="hidden md:table-cell">Heart Rate</TableHead>
            <TableHead className="hidden lg:table-cell">Temperature (°C)</TableHead>
            <TableHead className="hidden xl:table-cell">Respiration Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-2">
                {new Date(item.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.heart_rate ?? "-"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {item.body_temperature ?? "-"}
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                {item.respiratory_rate ?? "-"}
              </TableCell>
            </TableRow>
          ))}
          {currentItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-red-500">
                No matching results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
