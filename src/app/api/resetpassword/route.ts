import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import * as z from "zod";

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

    const hashedoldpassword = await hash(oldpassword, 10);
    const hashedNewPassword = await hash(newpassword, 10);
    if (hashedoldpassword !== (existingUserByEmail?.password as string)) {
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
