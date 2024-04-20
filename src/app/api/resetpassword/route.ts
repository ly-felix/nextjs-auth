import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash, compare } from "bcryptjs";
import * as z from "zod";

/**
 * @swagger
 * /api/resetpassword:
 *   post:
 *     description: Reset user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               values:
 *                 type: object
 *                 properties:
 *                   oldpassword:
 *                     type: string
 *                   newpassword:
 *                     type: string
 *                   confirmpassword:
 *                     type: string
 *     responses:
 *       201:
 *         description: Password reset successfully
 *       400:
 *         description: Incorrect old password
 *       500:
 *         description: Something went wrong
 */
const FormSchema = z.object({
  oldpassword: z.string().min(1, "oldpassword is required"),
  newpassword: z.string().min(1, "newpassword is required"),
  confirmpassword: z.string().min(1, "confirmpassword is required"),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, values } = body;
    const { oldpassword, newpassword, confirmpassword } =
      FormSchema.parse(values);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    console.log(existingUserByEmail);
    const hashedNewPassword = await hash(newpassword, 10);
    const passwordMatch = await compare(
      oldpassword,
      existingUserByEmail?.password as string 
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "oldpassword is incorrect" },
        { status: 400 }
      );
    } else {
      const respense = await db.user.update({
        where: { email: email },
        data: { password: hashedNewPassword },
      });
    }
    return NextResponse.json({ message: "password resetted" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
