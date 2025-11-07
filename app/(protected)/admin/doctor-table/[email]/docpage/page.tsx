// /app/(protected)/admin/doctor-table/[email]/docpage/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  // age: number;
  phone: string;
  date: string;
  email:string;
};

type Doctor = {
  name: string;
  email: string;
  specialization: string;
};

type FormDataType = {
  first_name: string;
  last_name: string;
  // age: string;
  phone: string;
  email:string;
};

// export default function DocPage({ params }: { params: { email: string } }) {
//   const decodedEmail = decodeURIComponent(params.email);

export default function DocPage() {
  const params = useParams();
 const emailParam = params?.email;

  // Ensure it's a string before decoding
  const decodedEmail =
    typeof emailParam === 'string' ? decodeURIComponent(emailParam) : '';

  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
const [formData, setFormData] = useState<FormDataType>({
  first_name: '',
  last_name: '',
  // age: '',
  phone: '',
  email: '', 
});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  
  // const { user } = useUser();

  const [patient, setPatient] = useState(null);
  // const AdminEmail = user?.primaryEmailAddress?.emailAddress;

  //   useEffect(() => {
  //   const fetchDoctor = async () => {
  //     try {
  //       const res = await fetch(`/api/doctor/getdoctor?email=${decodedEmail}`);
  //       const data = await res.json();

  //       if (res.ok) {
  //         setDoctor(data.doctor);
  //       } else {
  //         console.error(data.msg || 'Failed to fetch doctor');
  //       }
  //     } catch (err) {
  //       console.error('Error fetching doctor:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDoctor();
  // }, [decodedEmail]);

  const { user } = useUser(); // no isLoading here
const AdminEmail = user?.primaryEmailAddress?.emailAddress;


useEffect(() => {
  if (!AdminEmail) {
    console.log("AdminEmail not ready yet", user);
    return; // wait for user to load
  }

  console.log("Logged-in Admin Email:", AdminEmail);

  const fetchDoctorByAdmin = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch(`/api/doctor/getdoctor?email=${encodeURIComponent(AdminEmail)}`);
      const data = await res.json();
      console.log("Fetched doctors:", data);

      if (res.ok && data.doctors && data.doctors.length > 0) {
        setDoctor(data.doctors[0]);
      } else {
        setDoctor(null);
        console.error("No doctor found for this admin");
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctorByAdmin();
}, [AdminEmail, user]); 


  useEffect(() => {
  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patient/get-patient');
      const data = await res.json();

      if (res.ok) {
        setPatients(data.patients); // set data from the DB
      }
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
  };

  fetchPatients();
}, []);

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p className="text-red-500">Doctor not found.</p>;

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicates (by email or phone)
  const alreadyExists = patients.some(
    p => p.email === formData.email || p.phone === formData.phone
  );

  if (alreadyExists) {
    alert('❌ Patient with this email or phone already exists.');
    return;}

    const newPatient: Patient = {
      id: Date.now(),
      first_name: formData.first_name,
      last_name: formData.last_name,
      // age: parseInt(formData.age),
      phone: formData.phone,
      email:formData.email,
      date: new Date().toLocaleDateString(),
    };

    setPatients([newPatient, ...patients]);
    setFormData({ first_name:'',last_name: '',  phone: '' ,email:''});
    setIsAddOpen(false);
    assignPatientToDoctor(newPatient.phone, '45');

  };

//   useEffect(() => {
//   const fetchPatients = async () => {
//     try {
//       const res = await fetch('/api/patient/get-patient');
//       const data = await res.json();

//       if (res.ok) {
//         setPatients(data.patients); // set data from the DB
//       }
//     } catch (err) {
//       console.error('Failed to fetch patients:', err);
//     }
//   };

//   fetchPatients();
// }, []);

  const assignPatientToDoctor = async (phone: string, doctorId: string) => {
  try {
    const res = await fetch('/api/assign-patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, doctorId }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert(`✅ Patient assigned to doctor successfully!`);
      
    } else {
      alert(`❌ Failed: ${data.msg}`);
    }
  } catch (err) {
    console.error(err);
    alert('🚨 Error assigning patient.');
  }
};


const handleView = (patient: Patient) => {
  const encodedEmail = encodeURIComponent(patient.email); // assuming you use email in query
  // router.push(`/patient?email=${encodedEmail}`);
  //E:\admin\doctor-table\[email]\patient-data\[Patient_email]\patient-page\page.tsx
router.push(`/admin/doctor-table/${encodeURIComponent(decodedEmail)}/patient-data/${encodeURIComponent(patient.email)}/patient-page`);
};

  const filteredPatients = patients.filter((p) =>
    p.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-between pb-4">
          <input
            type="text"
            placeholder="Search for patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg"
          >
            + Add Patient
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.map((patient) => (
              <tr
                key={patient.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{patient.first_name}{patient.last_name}</td>
                <td className="px-6 py-4">{patient.email}</td>
                <td className="px-6 py-4">{patient.phone}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(patient)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4 text-red-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(startIndex + itemsPerPage, filteredPatients.length)}
            </span>{' '}
            of <span className="font-semibold text-gray-900 dark:text-white">{filteredPatients.length}</span> Entries
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

      {/* Modal for Add Patient */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Patient</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                ×
              </button>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleAddPatient}>
              <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white">First Name</label>
  <input
    type="text"
    value={formData.first_name}
    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
    required
    className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
  />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
  <input
    type="text"
    value={formData.last_name}
    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
    required
    className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
  />
</div>

        <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
     <input
      type="email"
        value={formData.email}
       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
       required
       className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
     />
     </div>

        {/* age */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>*/}
              <div> 
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Mobile</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add Patient
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

}