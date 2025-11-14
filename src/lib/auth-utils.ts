// user role base access control added here
export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'GUEST';

export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
}


export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    pattern: []
}

export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin/], // matches /admin and any sub routes /admin/*
    exact: []
}


export const doctorProtectedRoutes: RouteConfig = {
    pattern: [/^\/doctor/], // matches /doctor and any sub routes /doctor/*
    exact: []
}


export const patientProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard/], // matches /dashboard and any sub routes /dashboard/*
    exact: []
}


export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route) => route === pathname);
}


export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }

    return routes.pattern.some((pattern) => pattern.test(pathname))

}


export const getRouteOwnerRole = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    }

    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    return null;
}



export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === 'ADMIN') {
        return '/admin/dashboard';
    }

    if (role === 'DOCTOR') {
        return '/doctor/dashboard';
    }

    if (role === 'PATIENT') {
        return "/dashboard";
    }

    return '/';
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwnerRole(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}
