"use client";
import { Button } from "./ui/button";
import React, { useState } from "react";

const ResendEmailButton: any = ({ email }: { email: any }) => {
  const [message, setMessage] = useState(""); 

  const resendHandler: any = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await fetch("/api/resendemail", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setMessage("Email has been sent successfully."); 
    }
  };

  return (
    <>
    <Button onClick={resendHandler} className="w-full">
      Resend Activation Email
    </Button>
    {message && <p>{message}</p>}
    </>
  );
};

export default ResendEmailButton;
