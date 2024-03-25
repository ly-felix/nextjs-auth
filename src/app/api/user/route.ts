import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcryptjs'

export async function GET() {
    return NextResponse.json({ message: 'Hello, World!'})
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "username already exists" },
        { status: 409 }
      );
    }


    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
          username,
          email,
          password: hashedPassword
      }
    })

    const {password: newUserPassword, ...rest } = newUser
    return NextResponse.json({ user: rest, message: "User created"}, {status: 201});
  } catch (error) {
    return NextResponse.json({ message: "something went wrong"}, {status: 500});
  }
}
