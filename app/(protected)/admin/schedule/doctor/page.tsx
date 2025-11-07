// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DoctorScheduleCard() {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [day, setDay] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [workingDays, setWorkingDays] = useState([]);

//   // Fetch doctors
//   useEffect(() => {
//     //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\getdoctor\route.ts
//     axios.get("/api/doctor/getdoctor").then((res) => setDoctors(res.data));
//   }, []);

//   // Fetch working hours when a doctor is selected
//   useEffect(() => {
//     if (selectedDoctor) {
//       axios
//         .get(`/api/working-days/${selectedDoctor}`)
//         .then((res) => setWorkingDays(res.data));
//     }
//   }, [selectedDoctor]);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!selectedDoctor || !day) return alert("Select doctor and day");

//     await axios.post("/api/working-days", {
//       doctor_id: selectedDoctor,
//       day,
//       start_time: startTime,
//       close_time: endTime,
//     });
//     setDay("");
//     setStartTime("");
//     setEndTime("");
//     const { data } = await axios.get(`/api/working-days/${selectedDoctor}`);
//     setWorkingDays(data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`/api/working-days/${id}`);
//     setWorkingDays((prev) => prev.filter((wd) => wd.id !== id));
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//         Edit Doctor Working Hours
//       </h2>

//       {/* Doctor Select */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//           Select Doctor
//         </label>
//         <select
//           value={selectedDoctor}
//           onChange={(e) => setSelectedDoctor(e.target.value)}
//           className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((d) => (
//             <option key={d.id} value={d.id}>
//               {d.name} ({d.phone})
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Add/Edit Working Hours Form */}
//       <form onSubmit={handleSave} className="space-y-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             Day
//           </label>
//           <select
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           >
//             <option value="">Select Day</option>
//             {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
//               <option key={d} value={d}>{d}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             Start Time
//           </label>
//           <input
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             End Time
//           </label>
//           <input
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2"
//         >
//           Save Working Hours
//         </button>
//       </form>

//       {/* Existing Working Days List */}
//       {workingDays.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
//             Current Working Hours
//           </h3>
//           <ul className="space-y-2">
//             {workingDays.map((wd) => (
//               <li
//                 key={wd.id}
//                 className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
//               >
//                 <span className="text-gray-800 dark:text-gray-200 text-sm">
//                   {wd.day}: {wd.start_time} - {wd.close_time}
//                 </span>
//                 <button
//                   onClick={() => handleDelete(wd.id)}
//                   className="text-red-500 hover:text-red-600 text-sm font-medium"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";


// // Types matching your Prisma models
// interface Doctor {
//   id: string;
//   email: string;
//   name: string;
//   phone: string;
//   specialization?: string;
//   availability_status?: string;
// }


// interface WorkingDay {
//   id: number;
//   doctor_id: string;
//   day: string;
//   start_time: string;
//   close_time: string;
//   created_at: string;
//   updated_at: string;
//   is_leave?: boolean;
// }

// interface NewSlot {
//   day: string;
//   start_time: string;
//   close_time: string;
//   is_leave: boolean;
// }


// export default function DoctorScheduleCard() {
// const [doctors, setDoctors] = useState<Doctor[]>([]);
//  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
//   const [day, setDay] = useState<string>("");
//   const [startTime, setStartTime] = useState<string>("");
//   const [endTime, setEndTime] = useState<string>("");
//   const [workingDays, setWorkingDays] = useState<WorkingDay[]>([]);
//   const [isAddingDoctor, setIsAddingDoctor] = useState<boolean>(false);
//   const [newSlots, setNewSlots] = useState<NewSlot[]>([
//     { day: "", start_time: "", close_time: "", is_leave: false },
//   ]);
//   // new doctor fields
//   const [newDoctor, setNewDoctor] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     specialization: "",
//   });
//     // const router = useRouter();
  

//   // Fetch all doctors
//   useEffect(() => {
//     axios.get("/api/get-doctor/doctable").then((res) => setDoctors(res.data));
//   }, []);

//   // Fetch working hours when a doctor is selected
//   useEffect(() => {
//     if (selectedDoctor) {
//       axios
//         .get(`/api/working-days/${selectedDoctor}`)
//         .then((res) => setWorkingDays(res.data))
//         .catch(() => setWorkingDays([]));
//     }
//   }, [selectedDoctor]);

//     const fetchDoctors = async () => {
//         //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\get-doctor\doctable\route.ts
//     const { data } = await axios.get("/api/get-doctor/doctable");
//     setDoctors(data);
//   };
//   // Save or update working hours
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedDoctor || !day) {
//       alert("Please select a doctor and day.");
//       return;
//     }

//     try {
//       await axios.post("/api/working-days", {
//         doctor_email: selectedDoctor,
//         day,
//         start_time: startTime,
//         close_time: endTime,
//       });

//       setDay("");
//       setStartTime("");
//       setEndTime("");

//       const { data } = await axios.get(`/api/working-days/${selectedDoctor}`);
//       setWorkingDays(data);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving working hours.");
//     }
//   };

//   // Add a new doctor
//   const handleAddDoctor = async () => {
//     if (!newDoctor.name || !newDoctor.email || !newDoctor.phone) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       await axios.post("/api/doctor/add", newDoctor);
//       alert("✅ Doctor added successfully!");
//       setNewDoctor({ name: "", email: "", phone: "", specialization: "" });
//       setIsAddingDoctor(false);
//       await fetchDoctors();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error adding doctor.");
//     }
//   };



  
//   // Add new slot row dynamically
//   const addNewSlotRow = () => {
//     setNewSlots((prev) => [
//       ...prev,
//       { day: "", start_time: "", close_time: "", is_leave: false },
//     ]);
//   };

//   // Remove a slot row
//   const removeSlotRow = (index: number) => {
//     setNewSlots((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Handle input change for slot
//   const handleSlotChange = (
//     index: number,
//     field: keyof NewSlot,
//     value: string | boolean
//   ) => {
//     setNewSlots((prev) =>
//       prev.map((slot, i) =>
//         i === index ? { ...slot, [field]: value } : slot
//       )
//     );
//   };

//   // Save all new working slots
//   const handlesave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedDoctor) {
//       alert("Please select a doctor first.");
//       return;
//     }

//     const validSlots = newSlots.filter((s) => s.day);
//     if (validSlots.length === 0) {
//       alert("Please add at least one valid working slot.");
//       return;
//     }

//     try {
//       await Promise.all(
//         validSlots.map((slot) =>
//           axios.post("/api/working-days", {
//             doctor_email: selectedDoctor,
//             day: slot.day,
//             start_time: slot.start_time || null,
//             close_time: slot.close_time || null,
//             is_leave: slot.is_leave,
//           })
//         )
//       );

//       alert("✅ Working hours saved successfully!");

//       // Clear local form and reload
//       setNewSlots([{ day: "", start_time: "", close_time: "", is_leave: false }]);
//       const { data } = await axios.get(`/api/working-days/${selectedDoctor}`);
//       setWorkingDays(data);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error saving working hours.");
//     }
//   };

  
//   // Delete a working day entry
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/working-days/${id}`);
//       setWorkingDays((prev) => prev.filter((wd) => wd.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete working day.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//         Edit Doctor Working Hours
//       </h2>

     
//            {/* Doctor Selector */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//           Select Doctor
//         </label>
//         <select
//           value={selectedDoctor}
//           onChange={(e) => setSelectedDoctor(e.target.value)}
//           className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((d) => (
//             <option key={d.email} value={d.email}>
//               {d.name} ({d.email})
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Multiple Working Hour Slots */}
//       <form onSubmit={handleSave}>
//         <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
//           Add Working Hours / Leave
//         </h3>

//         {newSlots.map((slot, index) => (
//           <div
//             key={index}
//             className="p-3 mb-3 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
//           >
//             <div className="grid grid-cols-2 gap-2 mb-2">
//               <select
//                 value={slot.day}
//                 onChange={(e) => handleSlotChange(index, "day", e.target.value)}
//                 className="p-2 border rounded dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="">Select Day</option>
//                 {[
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                   "Sunday",
//                 ].map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>

//               <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
//                 <input
//                   type="checkbox"
//                   checked={slot.is_leave}
//                   onChange={(e) =>
//                     handleSlotChange(index, "is_leave", e.target.checked)
//                   }
//                 />
//                 <span>Mark as Leave</span>
//               </label>
//             </div>

//             {!slot.is_leave && (
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="time"
//                   value={slot.start_time}
//                   onChange={(e) =>
//                     handleSlotChange(index, "start_time", e.target.value)
//                   }
//                   className="p-2 border rounded dark:bg-gray-700 dark:text-white"
//                 />
//                 <input
//                   type="time"
//                   value={slot.close_time}
//                   onChange={(e) =>
//                     handleSlotChange(index, "close_time", e.target.value)
//                   }
//                   className="p-2 border rounded dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//             )}

//             {newSlots.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeSlotRow(index)}
//                 className="text-red-500 hover:text-red-700 text-xs mt-2"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addNewSlotRow}
//           className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg px-4 py-2 mb-3"
//         >
//           ➕ Add Another Slot
//         </button>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2"
//         >
//           Save All
//         </button>
//       </form>



//       {/* Add/Edit Working Hours Form */}
//       {/* <form onSubmit={handleSave} className="space-y-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             Day
//           </label>
//           <select
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           >
//             <option value="">Select Day</option>
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//               "Sunday",
//             ].map((d) => (
//               <option key={d} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             Start Time
//           </label>
//           <input
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-white">
//             End Time
//           </label>
//           <input
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2"
//         >
//           Save Working Hours
//         </button> */}
//       {/* </form> */}

//       {/* Existing Working Days */}
//       {workingDays.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
//             Current Working Hours
//           </h3>
//           <ul className="space-y-2">
//             {workingDays.map((wd) => (
//               <li
//                 key={wd.id}
//                 className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
//               >
//                 <span className="text-gray-800 dark:text-gray-200 text-sm">
//                   {wd.day}: {wd.start_time} - {wd.close_time}
//                 </span>
//                 <button
//                   onClick={() => handleDelete(wd.id)}
//                   className="text-red-500 hover:text-red-600 text-sm font-medium"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";

interface Doctor {
  id: string;
  email: string;
  name: string;
  phone: string;
  specialization?: string;
}

interface WorkingDay {
  id: number;
  doctor_id: string;
  day: string;
  start_time: string;
  close_time: string;
  is_leave?: boolean;
}

interface DaySchedule {
  day: string;
  start_time: string;
  close_time: string;
  is_leave: boolean;
  existingId?: number;
}

export default function DoctorScheduleManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorEmail, setSelectedDoctorEmail] = useState<string>("");
  const [doctorInfo, setDoctorInfo] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map((day) => ({
      day,
      start_time: "09:00",
      close_time: "17:00",
      is_leave: false,
    }))
  );

  // Fetch all doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\schedule\get-doct\route.ts
      const response = await fetch("/api/doctor/schedule/get-doct");
      const data = await response.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  // Fetch schedule when doctor is selected
  useEffect(() => {
    if (selectedDoctorEmail) {
      const doctor = doctors.find((d) => d.email === selectedDoctorEmail);
      if (doctor) {
        setDoctorInfo({ name: doctor.name, email: doctor.email });
        fetchSchedule();
      }
    } else {
      setDoctorInfo(null);
      resetSchedule();
    }
  }, [selectedDoctorEmail, doctors]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      // E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\appoint\appointed\[id]\route.ts
      const response = await fetch(`/api/doctor/appoint/${selectedDoctorEmail}`);
      const data = await response.json();
      const workingDays: WorkingDay[] = Array.isArray(data) ? data : [];

      // Map existing schedule to week view
      const updatedSchedule = daysOfWeek.map((day) => {
        const existing = workingDays.find((wd) => wd.day === day);
        if (existing) {
          return {
            day,
            start_time: existing.start_time || "09:00",
            close_time: existing.close_time || "17:00",
            is_leave: existing.is_leave || false,
            existingId: existing.id,
          };
        }
        return {
          day,
          start_time: "09:00",
          close_time: "17:00",
          is_leave: false,
        };
      });

      setWeekSchedule(updatedSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      resetSchedule();
    } finally {
      setIsLoading(false);
    }
  };

  const resetSchedule = () => {
    setWeekSchedule(
      daysOfWeek.map((day) => ({
        day,
        start_time: "09:00",
        close_time: "17:00",
        is_leave: false,
      }))
    );
    setEditMode(false);
  };

  const handleScheduleChange = (index: number, field: keyof DaySchedule, value: string | boolean) => {
    setWeekSchedule((prev) =>
      prev.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  const handleSaveSchedule = async () => {
    if (!selectedDoctorEmail) {
      alert("Please select a doctor first.");
      return;
    }

    setIsLoading(true);
    try {
      // Delete all existing schedules for this doctor first
      const deletePromises = weekSchedule
        .filter((s) => s.existingId)
        .map((s) =>
          // my-app\app\api\doctor\appoint\appointed\[id]\route.ts

          fetch(`/api/appoint/appointed/${s.existingId}`, { method: "DELETE" })
        );

      await Promise.all(deletePromises);

      // Create new schedule entries
      const createPromises = weekSchedule.map((schedule) =>
        fetch("/api/doctor/schedule/working-days", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctor_email: selectedDoctorEmail,
            day: schedule.day,
            start_time: schedule.is_leave ? null : schedule.start_time,
            close_time: schedule.is_leave ? null : schedule.close_time,
            is_leave: schedule.is_leave,
          }),
        })
      );

      await Promise.all(createPromises);

      alert("✅ Schedule saved successfully!");
      setEditMode(false);
      await fetchSchedule();
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("❌ Error saving schedule.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    fetchSchedule();
  };

  const handleDeleteSchedule = async () => {
    if (!confirm("Are you sure you want to delete the entire schedule for this doctor?")) {
      return;
    }

    setIsLoading(true);
    try {
      const deletePromises = weekSchedule
        .filter((s) => s.existingId)
        .map((s) =>
          fetch(`/api/doctor/appoint/appointed/${s.existingId}`, { method: "DELETE" })
        );

      await Promise.all(deletePromises);

      alert("✅ Schedule deleted successfully!");
      resetSchedule();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("❌ Failed to delete schedule.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Doctor Schedule Manager
      </h2>

      {/* Doctor Selector */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Select Doctor
        </label>
        <select
          value={selectedDoctorEmail}
          onChange={(e) => setSelectedDoctorEmail(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoading}
        >
          <option value="">-- Select a Doctor --</option>
          {doctors.map((d) => (
            <option key={d.email} value={d.email}>
              {d.name} ({d.email})
            </option>
          ))}
        </select>

        {/* Doctor Info Display */}
        {doctorInfo && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-300 dark:border-blue-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Doctor Name:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{doctorInfo.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{doctorInfo.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Section */}
      {selectedDoctorEmail && doctorInfo && (
        <div className="border-t-2 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Weekly Schedule
            </h3>
            {!editMode ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(true)}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 transition disabled:opacity-50"
                >
                  ✏️ Edit Schedule
                </button>
                <button
                  onClick={handleDeleteSchedule}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-6 py-2 transition disabled:opacity-50"
                >
                  🗑️ Delete Schedule
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSaveSchedule}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-2 transition disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg px-6 py-2 transition disabled:opacity-50"
                >
                  ✕ Cancel
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading schedule...</div>
          ) : (
            <div className="space-y-4">
              {weekSchedule.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className={`p-5 rounded-lg border-2 transition ${
                    editMode
                      ? "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                      : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-32">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {schedule.day}
                        </span>
                      </div>

                      {editMode ? (
                        <>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={schedule.is_leave}
                              onChange={(e) =>
                                handleScheduleChange(index, "is_leave", e.target.checked)
                              }
                              className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Not Available / Leave
                            </span>
                          </label>

                          {!schedule.is_leave && (
                            <div className="flex items-center gap-3 ml-auto">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                  Start Time
                                </label>
                                <input
                                  type="time"
                                  value={schedule.start_time}
                                  onChange={(e) =>
                                    handleScheduleChange(index, "start_time", e.target.value)
                                  }
                                  className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <span className="text-gray-500 mt-5">-</span>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  value={schedule.close_time}
                                  onChange={(e) =>
                                    handleScheduleChange(index, "close_time", e.target.value)
                                  }
                                  className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="ml-auto">
                          {schedule.is_leave ? (
                            <span className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium">
                              ❌ Not Available
                            </span>
                          ) : (
                            <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-medium">
                              ⏰ {schedule.start_time} - {schedule.close_time}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedDoctorEmail && (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">👨‍⚕️</div>
          <p className="text-xl">Please select a doctor to view and edit their schedule</p>
        </div>
      )}
    </div>
  );
}