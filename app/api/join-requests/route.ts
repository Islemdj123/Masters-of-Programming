import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertJoinRequestSchema } from "@/shared/schema";

export async function GET() {
  try {
    const requests = await storage.getAllJoinRequests();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch join requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertJoinRequestSchema.parse(body);
    const req = await storage.createJoinRequest(validatedData);
    return NextResponse.json(req, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
