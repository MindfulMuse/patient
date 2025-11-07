//E:\Projects\patient-monitor\patient-monitor\my-app\app\api\doctor\schedule\working-days\[id]\route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Params {
  id: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const deleted = await prisma.workingDays.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("❌ Error deleting working day:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
