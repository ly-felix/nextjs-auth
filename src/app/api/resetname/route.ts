import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, name } = req.json();;

    const existingUserByEmail = await db.user.update({
      where: { email: email }, data : {name: name}
    });

    return NextResponse.json({ message: "name reseted"}, {status: 201});
  } catch (error) {
    return NextResponse.json({ message: "something went wrong"}, {status: 500});
  }
}