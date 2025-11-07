//E:\Projects\patient-monitor\patient-monitor\my-app\app\(protected)\admin\appointment\page.tsx
"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDoctorList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router=useRouter()

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch("/api/doctor/booking");
      const data = await res.json();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.phone?.includes(searchTerm) ||
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-between pb-4">
          <input
            type="text"
            placeholder="Search for doctors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Specialization</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDoctors.map((doc) => (
              <tr
                key={doc.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{doc.name}</td>
                <td className="px-6 py-4">{doc.email}</td>
                <td className="px-6 py-4">{doc.phone}</td>
                <td className="px-6 py-4">{doc.specialization}</td>
                <td className="px-6 py-4">
                  {doc.availability_status === "AVAILABLE" ? (
                    <span className="text-green-600 font-semibold">Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Available</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={doc.availability_status !== "AVAILABLE"}
                    onClick={() => alert(`Booking appointment with ${doc.name}`)}
                    className={`px-3 py-1 rounded-lg text-white text-sm ${
                      doc.availability_status === "AVAILABLE"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Book
                  </button>
                </td>
               
              <td className="px-6 py-4 text-right">
  <div className="relative inline-block text-left">
    <button
      onClick={() => setOpenDropdown(openDropdown === doc.id ? null : doc.id)}
      className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>

    {openDropdown === doc.id && (
      <div className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-md shadow-lg dark:bg-gray-700">
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <button
 onClick={() => router.push(`/admin/schedule/doctor`)}
               className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              🕒 Edit Schedule
            </button>
          </li>
          <li>
            <button
           onClick={() => router.push(`/admin/schedule/booking`)}
               className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              📅 Book Appointment
            </button>
          </li>
          <li>
            <button
              onClick={() => alert(`Delete bookings for ${doc.name}`)}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              ❌ Delete Booking
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</td>


              </tr>
            ))}
            {filteredDoctors.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center px-6 py-4 text-red-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(startIndex + itemsPerPage, filteredDoctors.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-900 dark:text-white">{filteredDoctors.length}</span>{" "}
            Entries
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
        </div>
      </div>
    </div>
  );
}
