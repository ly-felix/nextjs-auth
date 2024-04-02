import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
