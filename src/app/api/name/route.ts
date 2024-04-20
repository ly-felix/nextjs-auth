import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
/**
 * @swagger
 * /api/name: 
 *   post:
 *     description: Returns user name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Returns user name
 *       500:
 *         description: Returns error message
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    
    // console.dir("what post got", body);
    const {email} = body
    const rep = await db.user.findUnique({
      where: { email: email },
    });

    return NextResponse.json({ message: "name got", data: {rep} }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
