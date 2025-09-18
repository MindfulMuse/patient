//E:\patient monitor\my-app\app\api\patient\get-patient\route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { created_at  : 'desc' }, // optional: latest first
    });

    return NextResponse.json({ patients });
  } catch (err) {
    console.error('Error fetching patients:', err);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
