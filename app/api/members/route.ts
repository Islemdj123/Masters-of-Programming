import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertMemberSchema } from "@/shared/schema";

export async function GET() {
  try {
    const members = await storage.getAllMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertMemberSchema.parse(body);
    const member = await storage.createMember(validatedData);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
