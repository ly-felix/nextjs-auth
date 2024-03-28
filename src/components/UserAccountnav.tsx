"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAcountnav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant="destructive"
    >
      Sign out
    </Button>
  );
};

export default UserAcountnav;
