"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

type Patient = {
  first_name: string;
  last_name: string;
};

type Appointment = {
  id: string;
  date: string;
  starttime: string;
  endtime: string;
  status: string;
  Patient: Patient;
};

export default function DoctorAppointments() {
  const { user } = useUser();
  const doctorEmail = user?.primaryEmailAddress?.emailAddress;

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!doctorEmail) return;

    const fetchAppointments = async () => {
      try {
        //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\Appointment-page\route.ts
        const res = await fetch(`/api/doctor/Appointment-page?email=${doctorEmail}`);
        const data = await res.json();
        if (res.ok) setAppointments(data.appointments);
        else console.error(data.msg || "Failed to fetch appointments");
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorEmail]);

  if (loading) return <p className="p-4">Loading...</p>;

  const filteredData = appointments.filter((appt) =>
    appt.Patient.first_name.toLowerCase().includes(search.toLowerCase()) ||
    appt.Patient.last_name.toLowerCase().includes(search.toLowerCase()) ||
    new Date(appt.date).toLocaleDateString().includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const getStatusColor = (dateStr: string) => (new Date(dateStr) >= new Date() ? "bg-green-100" : "bg-red-100");

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">My Appointments</h2>

      <input
        type="text"
        placeholder="Search by patient or date..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full max-w-sm px-3 py-2 border rounded"
      />

      <div className="overflow-x-auto">
        <Table className="min-w-[800px] divide-y divide-gray-200 text-sm">
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((appt) => (
              <TableRow key={appt.id} className={`${getStatusColor(appt.date)} rounded`}>
                <TableCell>{`${appt.Patient.first_name} ${appt.Patient.last_name}`}</TableCell>
                <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                <TableCell>{appt.starttime}</TableCell>
                <TableCell>{appt.endtime}</TableCell>
                <TableCell>{new Date(appt.date) >= new Date() ? "Coming Up" : "Completed"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-700 dark:text-gray-300">
        <span>
          Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredData.length)}</strong> of <strong>{filteredData.length}</strong> entries
        </span>
        <div className="inline-flex gap-2">
          <Button onClick={handlePrev} disabled={currentPage === 1} variant="secondary">Prev</Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} variant="secondary">Next</Button>
        </div>
      </div>
    </div>
  );
}
