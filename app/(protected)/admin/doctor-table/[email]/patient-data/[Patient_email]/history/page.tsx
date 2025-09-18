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
};

export default async function Patient_History({
  params,
}: {
  params: { email: string; Patient_email: string };
}) {
  const awaitedParams = await params;

  const doctorEmail = decodeURIComponent(awaitedParams.email);
  const patientEmail = decodeURIComponent(awaitedParams.Patient_email);

  const { email } = useParams();
  const [history, setHistory] = useState<AdmissionHistoryRecord[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`/api/assigning/${encodeURIComponent( patientEmail as string)}/history`);
      const json = await res.json();
      setHistory(json);
    };

    fetchHistory();
  }, [ patientEmail]);

  if (!history.length) return <p className="p-4">No history available.</p>;

  return (
    <Table className="min-w-full divide-y divide-gray-200 text-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left">Admission Date</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="hidden md:table-cell">Medical History</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
