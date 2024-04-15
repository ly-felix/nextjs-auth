"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  oldpassword: z.string().min(1, "oldpassword is required"),
  newpassword: z
    //  z.string().min(1, "newpassword is required"),
    .string()
    .min(8, "Password must have at least 8 characters")
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one uppercase character",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one digit character",
    })
    .refine((password) => /[^a-zA-Z0-9]/.test(password), {
      message: "Password must contain at least one special character",
    }),
  confirmpassword: z.string().min(1, "confirmpassword is required"),
});

const ResetPasswordForm = ({ email }: { email: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // const signInData = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    if (values.newpassword !== values.confirmpassword) {
      toast({
        title: "Error",
        description: "Newpasswords do not match",
        variant: "destructive",
      });
    } else {
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        body: JSON.stringify({ email, values }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Something went wrong, please check your old password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Changed",
          description: "Password Changed",
        });
        router.push("/admin");
        router.refresh();
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="oldpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>oldpassword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your old password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>newpassword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmpassword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password again"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
