"use client";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import "@/styles/forms.css"

function ResetNameForm() {
  const NewNameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { data: session } = useSession();
  async function submitHandler(event: any) {
    const email = session?.user.email;
    console.dir(session)
    event.preventDefault();
    if (NewNameRef.current?.value) {
      const enteredNewName = NewNameRef.current.value;
      const response = await fetch("/api/resetname", {
        method: "POST",
        body: JSON.stringify({ name: enteredNewName, email: email }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
    } else {
      toast({
        title: "Error",
        description: "please write a name",
        variant: "destructive",
      })
    }

  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <div>
        <label className="control" htmlFor="new-name">New Name</label>
        <input id="new-name" ref={NewNameRef} />
      </div>
      <div>
        <button className="action">Change Name</button>
      </div>
    </form>
  );
}

export default ResetNameForm;

// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
// import { db } from "@/lib/db";

// const FormSchema = z.object({
//   newname: z.string().min(1, "New Name is required"),
// });

// const ResetNameForm = () => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       newname: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
//     const {data : session} = useSession()
//     console.dir(session)
//     const existingUserByEmail = await db.user.findUnique({
//       where: { username: session?.user.username },
//     });

//     if (false) {
//       toast({
//         title: "Error",
//         description: "Something went wrong",
//         variant: "destructive",
//       });
//     } else {
//       router.push("/admin");
//       router.refresh();
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <div className="space-y-2">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>New Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="New Name"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button className="w-full mt-6" type="submit">
//           Reset Name
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ResetNameForm;
