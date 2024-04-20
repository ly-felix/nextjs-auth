import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/activate:
 *   post:
 *     description: Activate user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: User activated successfully
 *       404:
 *         description: Token not found
 *       500:
 *         description: Something went wrong
 */
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
      { status: 500 }
    );
  }
}
