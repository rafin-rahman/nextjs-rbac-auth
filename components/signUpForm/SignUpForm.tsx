"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { signUpFormSchema as formSchema } from "@/lib/zodSchema.js";
import SignUpFormField from "@/components/signUpForm/SignUpFormField";
import signUpAction from "@/app/auth/signup/signUpAction";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      const response = await signUpAction({}, formData);

      if (response) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Notification",
          description: response,
          duration: 2000,
        });
      }
    } catch (err) {
      setLoading(false);
      console.error("Error during sign-up:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        duration: 2000,
      });
    }
  };

  return (
    <div className={"m-4 "}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SignUpFormField
            name={"firstName"}
            label={"First Name"}
            placeholder={"First Name"}
            formControl={form.control}
          />
          <SignUpFormField
            name={"lastName"}
            label={"Last Name"}
            placeholder={"Last Name"}
            formControl={form.control}
          />
          <SignUpFormField
            name={"email"}
            label={"Email"}
            inputType={"email"}
            placeholder={"email"}
            formControl={form.control}
          />
          <SignUpFormField
            name={"password"}
            label={"Password"}
            inputType={"password"}
            placeholder={"password"}
            description={"Password must be at least 6 characters"}
            formControl={form.control}
          />

          <Button type={"submit"} className={"mt-2"} disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
