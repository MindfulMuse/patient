import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ success: false, msg: 'Missing name or email' }, { status: 400 });
    }

    // Check if nurse already exists
    const existingNurse = await prisma.nurse.findUnique({ where: { email } });
    if (existingNurse) {
      return NextResponse.json({ success: false, msg: 'Nurse already exists' }, { status: 400 });
    }

    const nurse = await prisma.nurse.create({
      data: { id: email, name, email, phone },
    });

    return NextResponse.json({ success: true, nurse });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, msg: 'Something went wrong' }, { status: 500 });
  }
}
