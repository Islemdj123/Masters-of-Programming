import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertFounderSchema } from "@/shared/schema";

export async function GET() {
  try {
    const founders = await storage.getAllFounders();
    return NextResponse.json(founders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch founders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertFounderSchema.parse(body);
    const founder = await storage.createFounder(validatedData);
    return NextResponse.json(founder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
