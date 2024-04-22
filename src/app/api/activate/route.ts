import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { token } = await req.json();
  console.log(token);
  try {
    const existingToken = await db.activateToken.findFirst({
      where: {
        token: token as string,
      },
    });
    if (!existingToken) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }

    await db.user.update({
      where: {
        id: existingToken.userId,
      },
      data: { active: true },
    });

    await db.activateToken.update({
      where: { token: token as string },
      data: {
        activedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "User activated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error activating user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 }
    );
  }
}
