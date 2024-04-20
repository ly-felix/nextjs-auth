import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import sendEmail from "@/lib/sendemail";

/**
 * @swagger
 * /api/resendemail:
 *   post:
 *     description: Resend activation email
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
 *         description: Email resent successfully
 *       500:
 *         description: Something went wrong
 */
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const {email} = data
    const user = await db.user.findUnique({
      where: { email: email },
    });
    const token = await db.activateToken.create({
      data: {
        userId: user?.id as string,
        token: `${randomUUID()}${randomUUID()}`,
      },
    });
    // https://vercel.com/docs/projects/environment-variables/system-environment-variables VERCEL_URL
    const sendText = `Hello ${user?.username}, please activate your account by clicking this link: https://nextjs-auth-pink-two.vercel.app/activate/${token.token}`;
    const res = await sendEmail(user?.email as string, sendText);

    return NextResponse.json({ message: "Email resent" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
