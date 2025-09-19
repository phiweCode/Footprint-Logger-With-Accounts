import { NavLink, redirect, useActionData } from 'react-router';  
import { useForm } from 'react-hook-form'; 
import { useSubmit } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';  
import axios from 'axios'; 



const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

const formSchema = z.object({ 
  email: z.email({ 
    message: "PLease enter a valid email."
  }), 
  password: z.string().min(8, { 
    message: "Password must be atleast 8 characters long."
  })
})

export const signInAction = async ({ params, request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(
      `${BACKEND_URL}auth/sign_in`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    );

    return  redirect('/dashboard')

  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

function SignIn() { 

  const actionData = useActionData(); 
  const signInSubmit = useSubmit();  

  console.log(actionData)

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
  } = useForm({ 
    resolver: zodResolver(formSchema)
  }); 

  const onSubmit = (data) =>{ 
    const formData = new FormData(); 
    Object.entries(data).forEach(([k,v])=>{ 
      formData.append(k,v)
    })
    signInSubmit(formData, { action: "/sign_in", method: "post"})
  } 



  return (
    <section className='flex items-center justify-center bg-green-600 h-screen '>
      <div className="grid grid-rows-15 card-container lg:h-[60vh] bg-white min-w-[25vw] rounded-[5px] p-2 "> 
        <div className="row-span-2 card-details"> 
          <h1 className="cart-title text-4xl text-center">
            Sign In
          </h1>
          <p className="card-description text-center pt-4">
            welcome back to footprint logger !
          </p>
        </div> 
        
        <div className="row-span-10 flex items-center w-full h-full card-content justify-center"> 
          <form action=" " className='grid grid-rows-10 w-full p-15' onSubmit={handleSubmit(onSubmit)}>

            <article className="flex flex-col  items-start  gap-2 row-span-4" > 
            <label htmlFor="email">
              Email 
            </label>
            <input type="email"  {...register("email")}  placeholder='Enter your email' className='border border-blue-900 p-2 w-full' />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </article>
           
            <article className="flex flex-col  items-start  gap-2 row-span-4" > 
            <label htmlFor="password">
              Password
            </label>
            <input type="password" {...register("password")} placeholder='Enter your password' className='border border-blue-900 p-2 w-full' /> 
               {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
               {!actionData?.success && <p className='text-red-600'>{actionData?.message}</p>}
            </article> 


            <article className="row-span-2 button-wrapper flex justify-center h-full pt-2">
              <button type='submit' className='bg-black text-white w-full h-8'> 
                    Sign In
              </button>
            </article>
          </form>
        </div>

        <div className="row-span-3 text-center card-footer">
          Don&apos;t have an account? <NavLink to="/sign_up">Sign Up</NavLink> 
        </div>
      </div>

    </section>
  )
}

export default SignIn
