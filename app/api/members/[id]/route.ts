import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const member = await storage.updateMember(params.id, body);
    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await storage.deleteMember(params.id);
    if (!success) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
