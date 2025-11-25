import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertUserSchema } from "@/shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertUserSchema.parse(body);
    
    const user = await storage.createUser(validatedData);
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
