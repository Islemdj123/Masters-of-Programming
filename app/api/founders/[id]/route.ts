import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const resolvedParams = await params;
    const founder = await storage.updateFounder(resolvedParams.id, body);
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const success = await storage.deleteFounder(resolvedParams.id);
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
