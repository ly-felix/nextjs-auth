import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import ResetNameForm from "@/components/form/ResetNameForm";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import Dashboard from "@/components/form/Dashborad";
import ResendEmailButton from "@/components/ResendEmailButton";
import { db } from "@/lib/db";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user.username) {
      const existingUserByUsername = await db.user.findUnique({
        where: { username: session?.user.username },
      });
      if (!existingUserByUsername?.active) {
        return (
          <>
            <h2>
              Email&Password User {session?.user.username}, please check your
              email and verify!
            </h2>
            <ResendEmailButton email={session?.user.email} />
          </>
        );
      } else {
        return (
          <>
            <h2>
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
          <h2>Hello, Google User {session?.user.name}!</h2>
          <h2>Your email is {session?.user.email}</h2>
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
