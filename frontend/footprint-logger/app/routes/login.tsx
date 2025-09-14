import { LoginForm } from "~/components/login-form"; 
import type { Route } from "../+types/root";
import axios from 'axios'; 
import { useActionData, useNavigate } from "react-router";
import { useEffect } from "react";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password)
  try {
    const res = await axios.post('http://localhost:3001/auth/login', { email, password }, { 
      withCredentials: true
    });
    return { success: true, user: res.data };
  } catch (err: any) {
    return { success: false, error: err.response?.data?.message || 'Login failed' };
  }
}


export default function SingIn(){ 
  const ad = useActionData(); 

  const navigate = useNavigate()
  useEffect(() => {
    if (ad?.success) {
      navigate("/activities");
    }
  }, [ad, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm actionData={ad} />
      </div>
    </div>
  )
}
