// app/api/admin/nurses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { search = '', page = '1', limit = '10' } = Object.fromEntries(req.nextUrl.searchParams);
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    // Build search condition (search by phone)
    const where = search
      ? { phone: { contains: search as string } }
      : {};

    // Count total nurses matching search
    const totalNurses = await prisma.nurse.count({ where });
    const totalPages = Math.ceil(totalNurses / limitNum);

    // Fetch paginated nurses with assignments
    const nurses = await prisma.nurse.findMany({
      where,
      include: { NurseAssignment: true }, // include assignments to compute availability
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: { name: 'asc' },
    });

    // Determine availability: Available if no ongoing assignment
    const nursesData = nurses.map((n) => ({
      id: n.id,
      name: n.name,
      email: n.email,
      phone: n.phone,
      isAvailable: n.NurseAssignment.every((a) => new Date(a.endtime) < new Date()),
    }));

    return NextResponse.json({ nurses: nursesData, totalPages });
  } catch (error) {
    console.error('Error fetching nurses:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
