// /app/api/doctor/get-doctors/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

    const adminEmail = user.emailAddresses[0].emailAddress;

    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail },
      include: { Doctor: true },
    });

    if (!admin) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ doctors: admin.Doctor });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
