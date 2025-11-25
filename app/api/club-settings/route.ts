import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db";

export async function GET() {
  try {
    const settings = await storage.getClubSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch club settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { logoUrl, heroBannerUrl } = await request.json();
    const settings = await storage.updateClubSettings({ logoUrl, heroBannerUrl });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update club settings" },
      { status: 400 }
    );
  }
}
