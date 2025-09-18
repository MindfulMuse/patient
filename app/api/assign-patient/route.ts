import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { phone, doctorId } = await req.json();

    // Step 1: Find patient by phone
    const patient = await prisma.patient.findFirst({
      where: { phone },
    });

    if (!patient) {
      return NextResponse.json({ success: false, msg: 'Patient not found' }, { status: 404 });
    }

    // Step 2: Assign patient to doctor
    const updatedPatient = await prisma.patient.update({
      where: { id: patient.id },
      data: { doctorId },
    });

    return NextResponse.json({ success: true, patient: updatedPatient });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, msg: 'Something went wrong' }, { status: 500 });
  }
}
