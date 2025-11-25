import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const admin = await storage.updateAdministration(params.id, body);
    if (!admin) {
      return NextResponse.json(
        { error: "Administration not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update administration" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await storage.deleteAdministration(params.id);
    if (!success) {
      return NextResponse.json(
        { error: "Administration not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete administration" },
      { status: 500 }
    );
  }
}
