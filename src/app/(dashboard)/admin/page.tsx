import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import ResetNameForm from "@/components/form/ResetNameForm";
import { useSession } from 'next-auth/react'

const page = async () => {
  const session = await getServerSession(authOptions);
  // const {data : session} = useSession()

  if (session?.user) {
    if (session?.user.username) {
      const existingUserByUsername = await db.user.findUnique({
        where: { username: session?.user.username },
      });
      if (false) { //!existingUserByUsername?.emailVerified
        return (
          <h2 className="text-2xl">
            Email&Password User {session?.user.username}, please check your
            email and verify!
          </h2>
        );
      } else {
        return (
          <>
            <h2 className="text-2xl">
              Hello, Email&Password User {session?.user.username}!{" "}
            </h2>
            <h2 className="text-2xl">Your email is {session?.user.email}</h2>
            <h2 className="text-2xl">Your name is {session?.user.name? session?.user.name : `not yet assigned` }</h2>
            <ResetNameForm />
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
          <h2 className="text-2xl">Your name is {session?.user.name} </h2>
          <ResetNameForm />
        </>
      );
    }
  }
  //   console.log(session);
  return <h2>Please login to see this admin page</h2>;
};

export default page;
