import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcryptjs'
import * as z from 'zod';

// export async function GET() {
//     return NextResponse.json({ message: 'Hello, World!'})
// }

// Define a schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

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
