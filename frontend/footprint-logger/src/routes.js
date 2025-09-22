import { 
    createBrowserRouter,
} from 'react-router';   
import Home, { homeLoader } from './pages/home';
import Activities, { activitiesAction, activitiesLoader } from './pages/Activities';
import Dashboard, { dashboardLoader } from './pages/Dashboard'; 
import Reports, { reportsLoader } from './pages/Reports';
import Leaderboard, { leaderboardLoader } from './pages/Leaderboard';
import App from './App';
import AuthLayout from './pages/auth/authLayout';
import SignIn, { signInAction } from './pages/auth/SignIn';
import SignUp, { signUpAction } from './pages/auth/SignUp';
import { authMiddleware } from './middleware/authMiddleware';

const router = createBrowserRouter([
    {
        Component:App,
        middleware: [authMiddleware],
        children: [ 
            {  
                index: true, 
                Component: Home, 
                loader: homeLoader
            },
            { 
                path: '/activities', 
                Component: Activities, 
                loader: activitiesLoader,
                action: activitiesAction, 

            },
            {
                path: 'dashboard', 
                Component: Dashboard,
                loader: dashboardLoader
            }, 
            { 
                path: 'reports', 
                Component: Reports, 
                loader: reportsLoader
            }, 
            { 
                path: 'leaderboard', 
                Component: Leaderboard, 
                loader: leaderboardLoader
            }
        ]
    }, { 
                Component: AuthLayout, 
                children: [
                    {   
                        index: true,
                        middleware: [authMiddleware],
                        path: 'sign_in', 
                        Component: SignIn, 
                        action: signInAction
                    }, 
                    { 
                        path: 'sign_up', 
                        Component: SignUp, 
                        action: signUpAction
                    }
                ]
            }
]) 

export default router; 