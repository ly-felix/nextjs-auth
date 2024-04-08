import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import React from "react";
import ResetNameForm from "@/components/form/ResetNameForm";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import Dashboard from "@/components/form/Dashborad";
import sendEmail from "@/lib/sendemail";
import { Button } from "@/components/ui/button";
import { randomUUID } from "crypto";



const page = async () => {
  const session = await getServerSession(authOptions);
  // const {data : session} = useSession()

  const resendHandler: any = async () => {
      const token = await db.activateToken.create({
      data: { userId: session?.user.id as string, token: `${randomUUID()}${randomUUID()}` },
    });
    // https://vercel.com/docs/projects/environment-variables/system-environment-variables VERCEL_URL
    const sendText = `Hello ${session?.user.username}, please activate your account by clicking this link: http://localhost:3000/activate/${token.token}`;
    const res = await sendEmail(session?.user.email as string, sendText);
  } 

  if (session?.user) {
    if (session?.user.username) {
      const existingUserByUsername = await db.user.findUnique({
        where: { username: session?.user.username },
      });
      if (!existingUserByUsername?.active) {
        return (
          <>
            <h2 className="text-2xl">
              Email&Password User {session?.user.username}, please check your
              email and verify!
            </h2>
            <Button onClick={resendHandler} className="w-full">
              Resend Email Verification
            </Button>
          </>
        );
      } else {
        return (
          <>
            <h2 className="text-2xl">
              Hello, Email&Password User {session?.user.username}! Your email is{" "}
              {session?.user.email}
            </h2>
            <ResetNameForm email={session?.user.email} />
            <div className="w-full">
              <ResetPasswordForm email={session?.user.email} />
              <Dashboard email={session?.user.email} />
            </div>
          </>
        );
      }
    }

    if (!session?.user.username) {
      // only Google User has a empty "username"

      return (
        <>
          <h2 className="text-2xl">Hello, Google User {session?.user.name}!</h2>
          <h2 className="text-2xl">Your email is {session?.user.email}</h2>
          <ResetNameForm email={session?.user.email} />
          <div className="w-full">
            <ResetPasswordForm email={session?.user.email} />
            <Dashboard email={session?.user.email} />
          </div>
        </>
      );
    }
  }
  //   console.log(session);
  return <h2>Please login to see this admin page</h2>;
};

export default page;
