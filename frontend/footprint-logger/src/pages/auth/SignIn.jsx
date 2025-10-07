import { NavLink, redirect, useActionData } from 'react-router';  
import { useForm } from 'react-hook-form'; 
import { useSubmit } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';  
import { backendApi } from '../../lib/utils';
import { LoginForm } from '@/components/login-form';
import { userContext } from '@/src/context/context';

const formSchema = z.object({ 
  email: z.email({ 
    message: "PLease enter a valid email."
  }), 
  password: z.string().min(8, { 
    message: "Password must be atleast 8 characters long."
  })
})

export const signInAction = async ({ params, request, context }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await backendApi.post(
      `auth/sign_in`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    ); 

    const  accessToken = res?.data?.accessToken 
    const  userData = res?.data?.user 

    console.log("From login, ", userData)

    if(accessToken){ 
      backendApi.accessToken = accessToken; 

      backendApi.interceptors.request.use(config=>{ 
        const token = config.accessToken ?? backendApi.accessToken; 
        config.headers['Authorization'] = `Bearer ${token}`;
        return config
      })
    } 

    context.set(userContext, userData)

    //const contextData =  context.get(userContext); 

   // console.log("Context data from login", contextData); 



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
    <section className='flex items-center justify-center h-screen '>
      <LoginForm actionData={actionData} errors={errors} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    </section>
  )
}

export default SignIn
