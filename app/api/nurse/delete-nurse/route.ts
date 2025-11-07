import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, msg: 'Missing nurse email' },
        { status: 400 }
      );
    }

    // Find nurse by email
    const nurse = await prisma.nurse.findUnique({ where: { email } });
    if (!nurse) {
      return NextResponse.json(
        { success: false, msg: 'Nurse not found' },
        { status: 404 }
      );
    }

    // Delete related assignments first (to maintain referential integrity)
    await prisma.nurseAssignment.deleteMany({
      where: { nurseid: nurse.id },
    });

    // Then delete the nurse
    await prisma.nurse.delete({ where: { id: nurse.id } });

    return NextResponse.json({ success: true, msg: 'Nurse deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting nurse:', error);
    return NextResponse.json(
      { success: false, msg: 'Error deleting nurse' },
      { status: 500 }
    );
  }
}
