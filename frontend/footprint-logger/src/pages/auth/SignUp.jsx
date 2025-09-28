import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, redirect, useActionData, useSubmit } from "react-router";
import { z } from "zod";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please enter a valid first name.",
  }),
  lastName: z.string().min(2, {
    message: "please enter a valid last name.",
  }),
  email: z.email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Your password must have at least 8 characters.",
  }),
});

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(
      `${BACKEND_URL}auth/sign_up`,
      {firstName, lastName, email, password},
      {headers: { "Content-Type": "application/json" }, withCredentials: true}
    );

    return redirect('/sign_in')

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: true,
      message: error.response?.data?.message || error.message,
    };
  }
};

function SignUp({ className, ...props }) {
  const actionData = useActionData();
  const signUpSubmit = useSubmit();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v);
    });

    signUpSubmit(formData, { action: "/sign_up", method: "post" });
  };

  return (
    <section className="flex items-center justify-center  h-screen ">


          <div className={cn("flex flex-col gap-6 lg:min-w-[20vw]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  {...register("firstName")}
                  placeholder="e.g, Thabo"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  {...register("lastName")}
                  placeholder="e.g, Mngoma"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {!actionData?.success && (
                  <p className="text-red-600">{actionData?.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink to="/sign_in" className="underline underline-offset-4">
                Sign In
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </section>
  );
}

export default SignUp;
