import { backendApi } from "../lib/utils";
import { isLoggedIn, userContext } from "../context/context";

export const appMiddleware = async ({ context }) => {
    try {
        backendApi.interceptors.request.use(config => {
            const token = config.accessToken ?? backendApi.accessToken;
            config.headers['Authorization'] = `Bearer ${token}`;
            return config
        })
        await backendApi("auth/check", { withCredentials: true });
        context.set(isLoggedIn, { session: true });

        const userProfileData = await backendApi('auth/profile', {withCredentials: true}); 
        const profileData = {...userProfileData.data} 
        context.set(userContext, profileData)

    } catch (error) {
        if (error.code === 'ERR_CONNECTION_REFUSED') {
            console.log('Target service is down');
            throw new Error(error.message)
        } else {
            context.set(isLoggedIn, { session: false })
        }
    }
}

