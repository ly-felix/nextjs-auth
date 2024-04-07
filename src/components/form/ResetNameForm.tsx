"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import "@/styles/forms.css";

function ResetNameForm({ email }: { email: any }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const NewNameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/name", {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserName(data.data.rep.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!email) {
    return <div>Loading...</div>;
  }

  async function submitHandler(event: any) {
    // console.dir(session)
    event.preventDefault();
    if (NewNameRef.current?.value) {
      const enteredNewName = NewNameRef.current.value;
      const response = await fetch("/api/resetname", {
        method: "POST",
        body: JSON.stringify({ name: enteredNewName, email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      // console.dir(data);
      toast({
        title: "name changed successful",
        description: "name changed",
      });
      router.push("/admin");
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "please write a name",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {/* <h2 className="text-2xl">Your email is {email}</h2> */}

      <h2 className="text-2xl">
        Your name is {userName ? userName : `not yet assigned`}
      </h2>
      <h2 className="text-2xl">(Name and username are different)</h2>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <label className="control" htmlFor="new-name">
            New Name
          </label>
          <input id="new-name" ref={NewNameRef} />
        </div>
        <div>
          <button className="action">Change Name</button>
        </div>
      </form>
    </>
  );
}

export default ResetNameForm;
