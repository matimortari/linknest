import { db } from "@/src/lib/db";
import { iconSchema } from "@/src/lib/schemas";
import { getSessionOrUnauthorized } from "@/src/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Get user social icons
export async function GET() {
  const { error, session, response } = await getSessionOrUnauthorized();
  if (error) return response;

  try {
    const userIcons = await db.userIcon.findMany({
      where: { userId: session?.user.id },
    });
    return NextResponse.json(userIcons, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to retrieve icons", details: String(err) },
      { status: 500 },
    );
  }
}

// Create a new user social icon
export async function POST(req: NextRequest) {
  const { error, session, response } = await getSessionOrUnauthorized();
  if (error) return response;

  try {
    const body = await req.json();
    iconSchema.parse(body);

    const newIcon = await db.userIcon.create({
      data: {
        platform: body.platform,
        url: body.url,
        icon: body.icon,
        userId: session!.user.id,
      },
    });

    return NextResponse.json(newIcon, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create icon", details: String(err) },
      { status: 500 },
    );
  }
}

// Delete a user social icon
export async function DELETE(req: NextRequest) {
  const { error, session, response } = await getSessionOrUnauthorized();
  if (error) return response;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid icon ID" },
      { status: 400 },
    );
  }

  try {
    const existingIcon = await db.userIcon.findUnique({ where: { id } });
    if (!existingIcon || existingIcon.userId !== session?.user.id) {
      return NextResponse.json(
        { error: "Social icon not found or unauthorized" },
        { status: 404 },
      );
    }

    await db.userIcon.delete({ where: { id } });

    return NextResponse.json(
      { message: "Icon deleted successfully", id },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete icon", details: String(err) },
      { status: 500 },
    );
  }
}
