// app/(protected)/admin/nurses/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Nurse = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAvailable: boolean;
};

export default function NurseManagement() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;

  const fetchNurses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/nurse/Nurse/table?search=${search}&page=${page}&limit=${pageSize}`);
      const data = await res.json();
      setNurses(data.nurses);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, [search, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset page on new search
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Nurses Management</h2>

      <div className="flex mb-4 gap-2">
        <Input
          placeholder="Search by mobile number..."
          value={search}
          onChange={handleSearchChange}
          className="flex-1"
        />
        <Button onClick={fetchNurses}>Search</Button>
      </div>

      {loading ? (
        <p className="text-center">Loading nurses...</p>
      ) : nurses.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No nurses found.</p>
      ) : (
        <>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Availability</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((n) => (
                <tr key={n.id} className="bg-white border-b dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{n.name}</td>
                  <td className="px-6 py-4">{n.email}</td>
                  <td className="px-6 py-4">{n.phone || '-'}</td>
                  <td className="px-6 py-4">
                    {n.isAvailable ? (
                      <span className="text-green-600 font-semibold">Available</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Busy</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/nurse/Nurse-Table`}
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <span className="px-2 py-1 text-gray-700 dark:text-gray-200">{page} / {totalPages}</span>
            <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
