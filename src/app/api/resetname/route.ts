import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * @swagger
 * /api/resetname:
 *   post:
 *     description: Reset user's name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User's name reset successfully
 *       500:
 *         description: Something went wrong
 */
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const {email, name} = data
    const result = await db.user.update({
      where: { email: email },
      data: { name: name },
    });

    return NextResponse.json({ message: "name resetted" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
