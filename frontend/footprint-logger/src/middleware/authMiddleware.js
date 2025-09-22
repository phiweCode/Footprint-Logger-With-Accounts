import { redirect, useNavigate } from "react-router";
import { backendApi } from "../lib/utils";

export const authMiddleware = async ({ request,  context }) => {

    const navigate = useNavigate()

    try {
        backendApi.interceptors.request.use(config => {
            const token = config.accessToken ?? backendApi.accessToken;
            config.headers['Authorization'] = `Bearer ${token}`;
            return config
        }) 

        console.log("From auth middleware", request.url)

        await backendApi("auth/check", { withCredentials: true });

        if(request.url === "http://localhost:3002/sign_in") navigate('/activities')
    } catch (error) {
        throw redirect('/sign_in');
    }
}

