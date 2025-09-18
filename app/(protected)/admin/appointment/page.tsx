"use client";

import { useEffect, useState } from "react";

export default function AdminDoctorList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
               
                {/* 🔹 Actions Dropdown */}
                <td className="px-4 py-3 flex items-center justify-end">
                  <button
                    id={`doctor-${doc.id}-dropdown-button`}
                    data-dropdown-toggle={`doctor-${doc.id}-dropdown`}
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>

                  <div
                    id={`doctor-${doc.id}-dropdown`}
                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby={`doctor-${doc.id}-dropdown-button`}
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Showc
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </div>
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
