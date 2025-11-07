import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function DELETE(req: Request) {
  try {
    const { nurseEmail } = await req.json();

    if (!nurseEmail) {
      return NextResponse.json(
        { success: false, msg: 'Missing nurseEmail' },
        { status: 400 }
      );
    }

    // Find the nurse by email
    const nurse = await prisma.nurse.findUnique({
      where: { email: nurseEmail },
    });

    if (!nurse) {
      return NextResponse.json(
        { success: false, msg: 'Nurse not found' },
        { status: 404 }
      );
    }

    // Delete all nurse assignments
    const deleted = await prisma.nurseAssignment.deleteMany({
      where: { nurseid: nurse.id },
    });

    return NextResponse.json({
      success: true,
      msg: `Deleted ${deleted.count} assignment(s) for ${nurseEmail}`,
    });
  } catch (error) {
    console.error('❌ Error deleting assignments:', error);
    return NextResponse.json(
      { success: false, msg: 'Error deleting assignments' },
      { status: 500 }
    );
  }
}
