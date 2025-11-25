import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertContactMessageSchema } from "@/shared/schema";

export async function GET() {
  try {
    const messages = await storage.getAllContactMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;
    const validatedData = insertContactMessageSchema.parse({
      firstName,
      lastName,
      email,
      message,
    });
    const newMessage = await storage.createContactMessage(validatedData);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
