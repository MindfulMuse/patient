
import { getRole } from "@/utils/roles";
import React from "react";
import {
  Bell,
  CalendarCheckIcon,
  GitGraphIcon,
  LayoutDashboard,
  Library,
  List,
  ListOrdered,
  Logs,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  SquareActivity,
  TicketCheckIcon,
  User,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import AppointmentScheduler from "@/app/(protected)/doctor/list/page";


// import { LogoutButton } from "./logout-button";

// export const Sidebar =()=>{
// return (
// <div>
// Sidebar</div>
// );
// };


const ACCESS_LEVELS_ALL = [
  "admin",
  "doctor",
  "nurse",
  "lab technician",
  "patient",
];

const SidebarIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon className="size-6 lg:size-5" />;
};

export const Sidebar = async () => {
  const role = await getRole();

  const SIDEBAR_LINKS = [
    {
      label: "MENU",
      links: [
          {
          name: "Dashboard",
          href: "/patient",
          access: ["patient"],
          icon: LayoutDashboard,
        },
                  {
          name: "Patients",
          href: "/doctor",
          access: ["doctor"],
          icon: UsersRound,
        },
        // E:\my-app\app\(protected)\doctor\appointment\page.tsx

         {
          name: "Appointment",
          href: "/doctor/appointment",
          access: ["doctor"],
          icon: UsersRound,
        },
        // {
        //   name: "Profile",
        //   href: "/patient/self",
        //   access: ["patient"],
        //   icon: User,
        // },
      ],
    },
    {
      label: "Manage",
      links: [
        // {
        //   name: "Users",
        //   href: "/record/users",
        //   access: ["admin"],
        //   icon: Users,
        // },
        
        {
          name: "Doctors",
          href: "/admin",
          access: ["Doctor"],
          icon: CalendarCheckIcon,
        },
        {
          //E:\Projects\patient monitor\patient monitor\my-app\app\(protected)\admin\nurse\Nurse-Table\page.tsx
          name: "Staffs",
          href: "/admin/nurse",
          access: ["admin", "doctor"],
          icon: UserRound,
        },
        // { name: "Patient List",
        //   href: "/doctor/list",
        //   access: ["doctor"],
        //   icon: Receipt,},
        {
          //E:\admin\appointment\page.tsx
          name: "Appointment",
          href: "/admin/schedule/appointment",
          access: ["admin", "nurse"],
          icon: CalendarCheckIcon,
        },
        
   
        {
          name: "Patient Management",
          href: "/nurse/patient-management",
          access: ["nurse"],
          icon: Users,
        },
         {
          name: "Prescription",
          href: "/patient/prescribe",
          access: ["patient"],
          icon: Pill,
        },
        {
          name: "Administer Medications",
          href: "/doctor/prescript",
          access: ["admin", "doctor", "nurse"],
          icon: Pill,
        },
 
        {
          name: "Records",
          href: "/patient/record",
          access: ["patient"],
          icon: List,
        },
        {
          name: "History",
          href: "/patient/Manage/history",
          access: ["patient"],
          icon: Library,
        },  
        {
          name: "Trends",
          href: "/patient/Manage/trends",
          access: ["patient"],
          icon: GitGraphIcon,
        },
         {
          //E:\patient\appointment
          name: "Appointment",
          href: "/patient/appointment",
          access: ["patient"],
          icon: CalendarCheckIcon,
        },

      ],
    },
    {
      label: "System",
      links: [
        {
          name: "Notifications",
          href: "/notifications",
          access: ACCESS_LEVELS_ALL,
          icon: Bell,
        },
        {
          name: "Audit Logs",
          href: "/admin/audit-logs",
          access: ["admin"],
          icon: Logs,
        },
        {
          name: "Settings",
          href: "/admin/system-settings",
          access: ["admin"],
          icon: Settings,
        },
      ],
    },
  ];

    return (
    <div className="w-full p-4 flex flex-col justify-between gap-4 bg-white overflow-y-scroll min-h-full">
      <div className="">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <div className="p-1.5 rounded-md bg-blue-600 text-white">
            <SquareActivity size={22} />
          </div>
          <Link
            href={"/"}
            className="hidden lg:flex text-base 2xl:text-xl font-bold"
          >
           Care+
          </Link>
        </div>

        <div className="mt-4 text-sm">
          {SIDEBAR_LINKS.map((el) => (
            <div key={el.label} className="flex flex-col gap-2">
              <span className="hidden uppercase lg:block text-gray-400 font-bold my-4">
                {el.label}
              </span>

              {el.links.map((link) => {
                if (link.access.includes(role.toLowerCase())) {
                  return (
                    <Link
                      href={link.href}
                      className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-600/10"
                      key={link.name}
                    >
                      <SidebarIcon icon={link.icon} />
                      <span className="hidden lg:block">{link.name}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      <LogoutButton />
    </div>
  );
};