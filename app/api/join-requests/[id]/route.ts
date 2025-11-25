import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await storage.deleteJoinRequest(params.id);
    if (!success) {
      return NextResponse.json(
        { error: "Join request not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete join request" },
      { status: 500 }
    );
  }
}
