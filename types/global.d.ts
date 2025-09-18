export {}; 

import { Role } from "@prisma/client";

export type Roles = Role;

declare global {
  namespace Clerk {
    interface SessionClaims {
      metadata?: {
        role?: Roles;
      };
    }
  }
}

