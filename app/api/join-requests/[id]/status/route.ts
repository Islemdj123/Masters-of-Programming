import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const req = await storage.updateJoinRequestStatus(params.id, status);
    if (!req) {
      return NextResponse.json(
        { error: "Join request not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(req);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update join request status" },
      { status: 400 }
    );
  }
}
