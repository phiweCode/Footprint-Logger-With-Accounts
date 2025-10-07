import {createBrowserRouter} from 'react-router';
import Home, { homeLoader } from './pages/home';
import Activities, { activitiesAction, activitiesLoader } from './pages/Activities';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import Reports, { reportsLoader } from './pages/Reports';
import Leaderboard, { leaderboardLoader } from './pages/Leaderboard';
import App, { appLoader } from './App';
import AuthLayout from './pages/auth/authLayout';
import SignIn, { signInAction } from './pages/auth/SignIn';
import SignUp, { signUpAction } from './pages/auth/SignUp';
import { authMiddleware } from './middleware/authMiddleware';
import ProtectedLayout from './pages/protected/ProtectedLayout';
import { appMiddleware } from './middleware/sessionMiddleware';
import ErrorBoundary from './pages/errors';
import profilePage from './pages/profile/profilePage';
import Profile from './pages/profile';
import ProfileLayout from './pages/profile/profileLayout';

const router = createBrowserRouter([
    {   
        loader: appLoader, 
        Component: App,
        middleware: [appMiddleware], 
        children: [
            {
                index: true,
                path: "/",
                errorElement: ErrorBoundary , 
                Component: Home,
                loader: homeLoader,
            }, {
                Component: ProtectedLayout,
                middleware: [authMiddleware],
                children: [
                    {
                        path: '/activities',
                        Component: Activities,
                        loader: activitiesLoader,
                        action: activitiesAction,
                        errorElement: Home, 

                    },
                    {
                        index: true,
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
                    }, {
                        Component: ProfileLayout
                    }, 
                    {
                        path: "profile", 
                        Component: profilePage, 
                        middleware: [authMiddleware]

                     }
                ]
            },
        ]
    },
    {
        Component: AuthLayout,
        children: [
            {
                index: true,
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