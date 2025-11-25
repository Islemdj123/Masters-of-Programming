import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertAdministrationSchema } from "@/shared/schema";

export async function GET() {
  try {
    const administration = await storage.getAllAdministration();
    return NextResponse.json(administration);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch administration" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertAdministrationSchema.parse(body);
    const admin = await storage.createAdministration(validatedData);
    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
