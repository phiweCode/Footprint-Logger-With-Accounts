import { backendApi } from "../lib/utils";
import { isLoggedIn } from "../context/context";

export const appMiddleware = async ({ context }) => {
    try {
        backendApi.interceptors.request.use(config => {
            const token = config.accessToken ?? backendApi.accessToken;
            config.headers['Authorization'] = `Bearer ${token}`;
            return config
        }) 
        await backendApi("auth/check", { withCredentials: true });
        context.set(isLoggedIn, {session: true})
    } catch (error) { 
           if (error.code === 'ERR_NETWORK') {
            console.log('Target service is down');
            throw new Error(error.message)
        } else {
            context.set(isLoggedIn, {session: false})
            //throw redirect('/sign_in');
        }
        // context.set(isLoggedIn, {session: false}); 
        //  throw redirect('/sign_in');
    }
}

