import { db } from "@/src/lib/db";
import { getSessionOrUnauthorized } from "@/src/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Get user preferences
export async function GET() {
  const { error, session, response } = await getSessionOrUnauthorized();
  if (error) return response;

  try {
    const preferences = await db.userPreferences.findUnique({
      where: { userId: session?.user.id },
    });
    if (!preferences) {
      return NextResponse.json(
        { error: "User preferences not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(preferences, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to retrieve user preferences", details: String(err) },
      { status: 500 },
    );
  }
}

// Update user preferences or reset to default
export async function PUT(req: NextRequest) {
  const { error, session, response } = await getSessionOrUnauthorized();
  if (error) return response;

  try {
    const preferencesData = await req.json();

    const currentPreferences = await db.userPreferences.findUnique({
      where: { userId: session?.user.id },
    });
    if (!currentPreferences) {
      return NextResponse.json(
        { error: "User preferences not found" },
        { status: 404 },
      );
    }

    // Reset by deleting and recreating the preferences
    if (Object.keys(preferencesData).length === 0) {
      await db.userPreferences.delete({ where: { userId: session?.user.id } });
      const newPreferences = await db.userPreferences.create({
        data: { userId: session!.user.id },
      });

      return NextResponse.json(
        {
          message: "User preferences reset to default",
          preferences: newPreferences,
        },
        { status: 200 },
      );
    }

    const updatedPreferences = await db.userPreferences.update({
      where: { userId: session?.user.id },
      data: preferencesData,
    });

    return NextResponse.json(
      {
        message: "User preferences updated successfully",
        preferences: updatedPreferences,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update preferences", details: String(err) },
      { status: 500 },
    );
  }
}
