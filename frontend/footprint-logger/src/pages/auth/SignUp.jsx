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

function SignUp() {
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
    <section className="flex items-center justify-center bg-green-600 h-screen ">
      <div className="grid grid-rows-15 card-container lg:h-[60vh] bg-white min-w-[25vw] rounded-[5px] p-2 ">
        <div className="row-span-2 card-details">
          <h1 className="cart-title text-4xl text-center">Sign In</h1>
          <p className="card-description text-center pt-4">
            welcome back to footprint logger !
          </p>
        </div>

        <div className="row-span-10 flex items-center w-full h-full card-content justify-center">
          <form
            action=" "
            className="grid grid-rows-18 w-full p-15"
            onSubmit={handleSubmit(onSubmit)}
          >
            <article className="flex flex-col  items-start  gap-2 row-span-4">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Enter your first name."
                className="border border-blue-900 p-2 w-full"
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </article>

            <article className="flex flex-col  items-start  gap-2 row-span-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Enter your last name"
                className="border border-blue-900 p-2 w-full"
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </article>
            <article className="flex flex-col  items-start  gap-2 row-span-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="border border-blue-900 p-2 w-full"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </article>

            <article className="flex flex-col  items-start  gap-2 row-span-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="border border-blue-900 p-2 w-full"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
              {actionData?.success ? actionData?.message : actionData?.message}
            </article>
            <article className="row-span-2 button-wrapper flex justify-center h-full pt-1">
              <button type="submit" className="bg-black text-white w-full h-8">
                Sign In
              </button>
            </article>
          </form>
        </div>

        <div className="row-span-3 text-center card-footer">
          Already have an account? <NavLink to="/sign_in">Sign In</NavLink>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
