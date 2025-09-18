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

type AdmissionHistoryRecord = {
  last_admission_date: string;
  last_admitted_hospital: string;
  admission_reason: string;
  medical_history: string;
  Prescription?: { next_appointment_date: string; next_appointment_time: string }[];

};

export default function PatientHistoryTable() {
  const { email } = useParams();
  const [history, setHistory] = useState<AdmissionHistoryRecord[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`/api/assigning/${encodeURIComponent(email as string)}/history`);
      const json = await res.json();
      setHistory(json);
    };

    fetchHistory();
  }, [email]);

  if (!history.length) return <p className="p-4">No history available.</p>;

  return (
       <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">

    <div className="overflow-x-auto">
    <Table className="min-w-full divide-y divide-gray-200 text-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left">Admission Date</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="hidden md:table-cell">Medical History</TableHead>
                    <TableHead>Next Appointment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="px-4 py-2">
              {new Date(item.last_admission_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.last_admitted_hospital}</TableCell>
            <TableCell>{item.admission_reason}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.medical_history}
            </TableCell>
            <TableCell>
  {item.Prescription?.[0]?.next_appointment_date
    ? `${new Date(item.Prescription[0].next_appointment_date).toLocaleDateString()} at ${item.Prescription[0].next_appointment_time}`
    : "No follow-up"}
</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
  );
}
