import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const founder = await storage.updateFounder(params.id, body);
    if (!founder) {
      return NextResponse.json(
        { error: "Founder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(founder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update founder" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await storage.deleteFounder(params.id);
    if (!success) {
      return NextResponse.json(
        { error: "Founder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete founder" },
      { status: 500 }
    );
  }
}
