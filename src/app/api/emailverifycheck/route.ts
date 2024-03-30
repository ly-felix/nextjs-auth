import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";

// export async function GET() {
//     return NextResponse.json({ message: 'Hello, World!'})
// }

// Define a schema for input validation
const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();      
    console.log(body)

    const { username } = userSchema.parse(body);

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername?.emailVerified) {
      return NextResponse.json({ message: "yes" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "no" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
