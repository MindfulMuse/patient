import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ msg: "Missing email" }, { status: 400 });
    }

    const nurse = await prisma.nurse.findUnique({
      where: { email },
    });

    if (!nurse) {
      return NextResponse.json({ msg: "Nurse not registered" }, { status: 404 });
    }

    return NextResponse.json({ nurse }, { status: 200 });
  } catch (err: any) {
    console.error("Error checking nurse:", err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
