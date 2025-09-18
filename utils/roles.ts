// lib/utils.ts
// utils/roles.ts

import { auth } from "@clerk/nextjs/server";
import { Roles } from "@/types/global";

type SessionMetadata = {
  role?: Roles;
};

// Checks if the current user has a specific role
export const checkRole = async (expectedRole: Roles): Promise<boolean> => {
  const { sessionClaims } = await auth();

  const metadata = sessionClaims?.metadata as SessionMetadata | undefined;
  const userRole = metadata?.role?.toLowerCase();

  return userRole === expectedRole.toLowerCase();
};

// Returns the user's role, defaults to "patient" if undefined
export const getRole = async (): Promise<Roles> => {
  const { sessionClaims } = await auth();

  const metadata = sessionClaims?.metadata as SessionMetadata | undefined;
  const role = metadata?.role?.toLowerCase() as Roles | undefined;

  return role ?? "patient";
};


// export const getRole = async () => {
//   const { sessionClaims } = await auth();

//   const role = sessionClaims as metadata.role!?.toLowerCase() || "patient";

//   return role;
// };