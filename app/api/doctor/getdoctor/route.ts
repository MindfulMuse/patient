// E:\Projects\patient monitor\patient monitor\my-app\app\api\doctor\getdoctor\routes.ts
import { NextResponse } from "next/server";
import prisma from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { email },
      include: {
        Patient: true, // optional — if you want patients included
      },
    });

    if (!doctor) {
      return NextResponse.json({ msg: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (err) {
    console.error("Error fetching doctor:", err);
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
