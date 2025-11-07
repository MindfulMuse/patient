// "use client";

// import { useState } from "react";

// export default function BookAppointment() {
//   const [form, setForm] = useState({
//     doctor_email: "",
//     patient_email: "",
//     date: "",
//     starttime: "",
//     endtime: "",
//   });
//   const [message, setMessage] = useState("");

//   async function handleBook() {
//     setMessage("Booking...");
//     const res = await fetch("/api/appointment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     setMessage(data.error || "Appointment booked successfully!");
//   }

//   async function handleDelete(id: string) {
//     const res = await fetch("/api/appointment", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ appointment_id: id }),
//     });
//     const data = await res.json();
//     setMessage(data.error || "Appointment deleted!");
//   }

//   return (
//     <div className="p-8 max-w-md mx-auto space-y-4">
//       <h2 className="text-xl font-semibold">Book Appointment</h2>
//       <input
//         type="email"
//         placeholder="Doctor Email"
//         value={form.doctor_email}
//         onChange={(e) => setForm({ ...form, doctor_email: e.target.value })}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="Patient email"
//         value={form.patient_email}
//         onChange={(e) => setForm({ ...form,  patient_email: e.target.value })}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="date"
//         value={form.date}
//         onChange={(e) => setForm({ ...form, date: e.target.value })}
//         className="w-full border p-2 rounded"
//       />
//       <div className="flex space-x-2">
//         <input
//           type="time"
//           value={form.starttime}
//           onChange={(e) => setForm({ ...form, starttime: e.target.value })}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="time"
//           value={form.endtime}
//           onChange={(e) => setForm({ ...form, endtime: e.target.value })}
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <button
//         onClick={handleBook}
//         className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//       >
//         Book Appointment
//       </button>

//       <p className="text-center text-sm text-gray-600">{message}</p>

//       <button
//         onClick={() => handleDelete(prompt("Enter appointment ID") || "")}
//         className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
//       >
//         Delete Appointment
//       </button>
//     </div>
//   );
// }


"use client";
import { useState } from "react";

export default function BookAppointment() {
  const [form, setForm] = useState({
    doctor_email: "",
    patient_email: "",
    date: "",
    starttime: "",
    endtime: "",
  });
  const [message, setMessage] = useState("");

  async function handleBook() {
    setMessage("Booking...");
    //E:\doctor\booking\booked\route.ts
    const res = await fetch("/api/doctor/booking/booked", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.error || "✅ Appointment booked successfully!");
  }

  async function handleDelete() {
    const appointment_id = prompt("Enter appointment ID to delete:");
    if (!appointment_id) return;

    //E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\booking\booked\route.ts
    const res = await fetch("/api/doctor/booking/booked", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointment_id }),
    });
    const data = await res.json();
    setMessage(data.error || "❌ Appointment deleted successfully!");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Book Appointment</h2>

      {["doctor_email", "patient_email", "date", "starttime", "endtime"].map((field) => (
        <input
          key={field}
          type={field === "date" ? "date" : field.includes("time") ? "time" : "text"}
          placeholder={field.replace("_", " ")}
          value={(form as any)[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="w-full border p-2 rounded"
        />
      ))}

      <button
        onClick={handleBook}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Book
      </button>

      <button
        onClick={handleDelete}
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Delete
      </button>

      <p className="text-center text-sm text-gray-600">{message}</p>
    </div>
  );
}
