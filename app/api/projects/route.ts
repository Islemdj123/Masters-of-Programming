import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";
import { insertProjectSchema } from "@/shared/schema";

export async function GET() {
  try {
    const projects = await storage.getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertProjectSchema.parse(body);
    const project = await storage.createProject(validatedData);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }
}
