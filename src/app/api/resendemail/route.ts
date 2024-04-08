import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import sendEmail from "@/lib/sendemail";

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
    const sendText = `Hello ${user?.username}, please activate your account by clicking this link: http://localhost:3000/activate/${token.token}`;
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
