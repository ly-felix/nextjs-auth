import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
