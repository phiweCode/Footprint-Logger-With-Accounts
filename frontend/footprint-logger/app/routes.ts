import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route('dashboard', "routes/dashboard.tsx"), 
    route('activities', 'routes/activities.tsx'), 
    route('leaderboard', 'routes/leaderboard.tsx'), 
    route('sign_in', 'routes/login.tsx'), 
    route('sign_up', 'routes/sign_up.tsx')
] satisfies RouteConfig;
