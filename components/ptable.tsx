
'use client';

import React, { useState } from 'react';

interface Prescription {
  id: number;
  name: string;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
}

const dummyPrescriptions: Prescription[] = [
  {
    id: 1,
    name: 'Neil Sims',
    date: '2025-07-16',
    medication: 'Paracetamol',
    dosage: '500mg',
    instructions: 'Take after meals',
  },
  {
    id: 2,
    name: 'Bonnie Green',
    date: '2025-07-14',
    medication: 'Ibuprofen',
    dosage: '200mg',
    instructions: 'Twice daily',
  },
  {
    id: 3,
    name: 'Jese Leos',
    date: '2025-07-13',
    medication: 'Amoxicillin',
    dosage: '250mg',
    instructions: 'Three times a day',
  },
];

export default function Ptable() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
    // const router = useRouter();
  
  const handleView = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsOpen(true);
  };

  const filteredProducts = dummyPrescriptions.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search patients..."
        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Patient Name</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prescription) => (
              <tr
                key={prescription.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {prescription.name}
                </td>
                <td className="px-6 py-4">{prescription.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(prescription)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center px-6 py-4 text-red-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b border-gray-300 pb-4">
              <h3 className="text-lg font-semibold">Prescription Details</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 text-xl"
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div><strong>Patient:</strong> {selectedPrescription.name}</div>
              <div><strong>Date:</strong> {selectedPrescription.date}</div>
              <div><strong>Medication:</strong> {selectedPrescription.medication}</div>
              <div><strong>Dosage:</strong> {selectedPrescription.dosage}</div>
              <div><strong>Instructions:</strong> {selectedPrescription.instructions}</div>
            </div>
          </div>
        </div>
      )}

       {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
          </span>{' '}
          of <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> Entries
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
    
  );
}
