import { redirect } from "react-router";
import { userContext } from "../context/context";
import { getUserId } from "../lib/utils"; 
import Cookies from "js-cookie";

export const authMiddleware = async ({ context }) => {  

    const userId = await getUserId(); 
    console.log("User ID in middleware", userId)
    if(!userId) { 
        throw redirect('/sign_in'); 
    }  

    const userData = { 
        userId, 
        token: Cookies.get('jwt')
    }

    context.set(userContext, userData)
}