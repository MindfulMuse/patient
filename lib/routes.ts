import { createRouteMatcher } from "@clerk/nextjs/server";

// Optional: type for role matchers
export type Role = "admin" | "patient" | "doctor";

// Exported route matchers object
export const routeMatchers: Record<Role, ReturnType<typeof createRouteMatcher>> = {
  admin: createRouteMatcher([
    "/admin(.*)",
    "/patient(.*)",
    "/record/users",
    "/record/doctors(.*)",
    "/record/doctors",
    "/record/staffs",
    "/record/patients",
  ]),
  patient: createRouteMatcher([
    "/patient(.*)",
    "/patient/registrations",
  ]),
  doctor: createRouteMatcher([
    "/doctor(.*)",
    "/record/doctors(.*)",
    "/record/patients",
    "/patient(.*)",
    "/record/staffs",
  ]),
};