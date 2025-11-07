// // app/protected/doctor/patient-data/[email]/layout.tsx

// import { ReactNode } from "react";

// export default function PatientLayout({
//   children,
//   params,
// }: {
//   children: ReactNode;
//   params: { email: string };
// }) {
//   const decodedEmail = decodeURIComponent(params.email);

//   return (
//     <div className="relative">
//       {children}

//       <div data-dial-init className="fixed end-6 bottom-6 group z-50">
//         <div id="speed-dial-menu-default" className="flex flex-col items-center hidden mb-4 space-y-2">
//           <a
//             href={`/doctor/patient-data/${encodeURIComponent(decodedEmail)}/trends`}
//             className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
//           >
//             📈
//           </a>

//         </div>

//         <button
//           type="button"
//           data-dial-toggle="speed-dial-menu-default"
//           aria-controls="speed-dial-menu-default"
//           aria-expanded="false"
//           className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
//         >
//           <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//           </svg>
//           <span className="sr-only">Open actions menu</span>
//         </button>
//       </div>
//     </div>
//   );
// }

//E:\Projects\patient-monitor\patient-monitor\my-app\app\(protected)\admin\doctor-table\[email]\patient-data\[Patient_email]\layout.tsx
// "use client"; // Important for layout to be interactive

// import { ReactNode, useState } from "react";
// import {LayoutDashboardIcon, List, Pill}  from "lucide-react";

// // interface LayoutProps {
// //   children: ReactNode;
// //   params: {
// //     email: string;
// //     Patient_email: string;
// //   };
// // }

// interface LayoutProps {
//   children: ReactNode;
//   params: Promise<{
//     email: string;
//     Patient_email: string;
//   }>;
// }

// export default async function Layout({ children, params }: LayoutProps) {
//   const { email, Patient_email } = await params;

//   const doctorEmail = decodeURIComponent(email);
//   const patientEmail = decodeURIComponent(Patient_email);


// // export default async function Layout({ children, params }: LayoutProps) {
// //   const { email, Patient_email } = await params;
// //   const doctorEmail = decodeURIComponent(email);
// //   const patientEmail = decodeURIComponent(Patient_email);

//   // export default function Layout({ children, params }: LayoutProps) {
//   // const doctorEmail = decodeURIComponent(params.email);
//   // const patientEmail = decodeURIComponent(params.Patient_email);

   
//   console.log("doctmail",doctorEmail,"patient",patientEmail)

//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="relative">
//       {children}

//       {/* Floating Speed Dial Menu */}
//       <div className="fixed end-6 bottom-6 group z-50">
//         {/* Buttons appear when menu is open
//         E:\doctor-table\[email]\patient-data\[Patient_email]\prescribe\page.tsx */}
//         <div className={`flex flex-col items-center mb-4 space-y-2 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
//           <a
//             href={`/doctor/patient-data/${encodeURIComponent(patientEmail)}/trends`}
//             className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
//           >
//             📈
//           </a>

//           <a
//   href={`/doctor/patient-data/${encodeURIComponent(patientEmail)}/history`}
//   className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
// >
//   🕒
// </a>

// <a  href={`/doctor/patient-data/${encodeURIComponent(patientEmail)}/prescribe`}
//   className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
// >
// <Pill className="w-5 h-5" />
// </a>

//    <a
//   href={`/doctor/patient-data/${encodeURIComponent(patientEmail)}/patient-page`}
//   className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
// >
// <LayoutDashboardIcon className="w-5 h-5" />
// </a>

//   <a
//   href={`/doctor/patient-data/${encodeURIComponent(patientEmail)}/records`}
//   className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
// >
// <List className="w-5 h-5" />
// </a>

//           {/* Add more buttons here */}
//         </div>

//         {/* Toggle Button */}
//         <button
//           type="button"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-expanded={menuOpen}
//           className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
//         >
//           <svg
//             className={`w-5 h-5 transform transition-transform duration-300 ${menuOpen ? "rotate-45" : ""}`}
//             aria-hidden="true"
//             fill="none"
//             viewBox="0 0 18 18"
//           >
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//           </svg>
//           <span className="sr-only">Open actions menu</span>
//         </button>
//       </div>
//     </div>
//   );
// }


// //new design
// "use client"; // Important for layout to be interactive

// import { ReactNode, useState } from "react";
// import {LayoutDashboardIcon, List, Pill}  from "lucide-react";



// interface LayoutProps {
//   children: ReactNode;
//   params: Promise<{
//     email: string;
//     Patient_email: string;
//   }>;
// }

// export default async function Layout({ children, params }: LayoutProps) {
//   const { email, Patient_email } = await params;
//   const [menuOpen, setMenuOpen] = useState(false);

//   const doctorEmail = decodeURIComponent(email);
//   const patientEmail = decodeURIComponent(Patient_email);


// // export default async function Layout({ children, params }: LayoutProps) {
// //   const { email, Patient_email } = await params;
// //   const doctorEmail = decodeURIComponent(email);
// //   const patientEmail = decodeURIComponent(Patient_email);

//   // export default function Layout({ children, params }: LayoutProps) {
//   // const doctorEmail = decodeURIComponent(params.email);
//   // const patientEmail = decodeURIComponent(params.Patient_email);

   
//   console.log("doctmail",doctorEmail,"patient",patientEmail)
//  const actions = [
//     {
//       label: "Trends",
//       href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/trends`,
//       icon: "📈",
//     },
//     {
//       label: "History",
//       href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/history`,
//       icon: "🕒",
//     },
//     {
//       label: "Prescribe",
//       href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/prescribe`,
//       icon: <Pill className="w-5 h-5" />,
//     },
//     {
//       label: "Dashboard",
//       href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/patient-page`,
//       icon: <LayoutDashboardIcon className="w-5 h-5" />,
//     },
//     {
//       label: "Records",
//       href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/records`,
//       icon: <List className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="relative">
//       {children}

//       {/* Floating Speed Dial */}
//       <div className="fixed end-6 bottom-6 z-50 flex flex-col items-center">
//         {/* Action Buttons */}
//         <div
//           className={`flex flex-col items-center mb-4 space-y-2 transition-all duration-300 ${
//             menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           {actions.map((action) => (
//             <a
//               key={action.label}
//               href={action.href}
//               className="group relative flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
//             >
//               {action.icon}
//               {/* Tooltip Label */}
//               <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded bg-gray-900 text-white text-xs font-medium px-2 py-1">
//                 {action.label}
//               </span>
//             </a>
//           ))}
//         </div>

//         {/* Toggle Button */}
//         <button
//           type="button"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-expanded={menuOpen}
//           className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-transform duration-300"
//         >
//           <svg
//             className={`w-6 h-6 transform transition-transform duration-300 ${
//               menuOpen ? "rotate-45" : ""
//             }`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//           <span className="sr-only">Open actions menu</span>
//         </button>
//       </div>
//     </div>
//   );
// }


//E:\Projects\patient-monitor\my-app\app\(protected)\admin\doctor-table\[email]\patient-data\[Patient_email]\layout.tsx
"use client"; // client component

import { ReactNode, useState, useEffect } from "react";
import { LayoutDashboardIcon, List, Pill } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  params: {
    email: string;
    Patient_email: string;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  // Decode params on mount
  useEffect(() => {
    setDoctorEmail(decodeURIComponent(params.email));
    setPatientEmail(decodeURIComponent(params.Patient_email));
    console.log("doctmail", params.email, "patient", params.Patient_email);
  }, [params]);

  const actions = [
    {
      label: "Trends",
      href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/trends`,
      icon: "📈",
    },
    {
      label: "History",
      href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/history`,
      icon: "🕒",
    },
    {
      label: "Prescribe",
      href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/prescribe`,
      icon: <Pill className="w-5 h-5" />,
    },
    {
      label: "Dashboard",
      href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/patient-page`,
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
    },
    {
      label: "Records",
      href: `/doctor/patient-data/${encodeURIComponent(patientEmail)}/records`,
      icon: <List className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {children}

      {/* Floating Speed Dial */}
      <div className="fixed end-6 bottom-6 z-50 flex flex-col items-center">
        {/* Action Buttons */}
        <div
          className={`flex flex-col items-center mb-4 space-y-2 transition-all duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="group relative flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            >
              {action.icon}
              {/* Tooltip Label */}
              <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded bg-gray-900 text-white text-xs font-medium px-2 py-1">
                {action.label}
              </span>
            </a>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-transform duration-300"
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              menuOpen ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
    </div>
  );
}
