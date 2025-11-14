// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import {jwtDecode} from 'jwt-decode';


// interface userPayload {
//     id: string;
//     name: string;
//     email: string;
//     role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'guest';
//     iat: number;
//     exp: number;
// }

// const authRoutes = ["/login", "/register", "/forgot-password"];

// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {

//   const accessToken = request.cookies.get('accessToken')?.value;
//   const refreshToken = request.cookies.get('refreshToken')?.value;
// //   console.log("proxy accessToken:", accessToken)

//   const {pathname} = request.nextUrl;


//   if(!accessToken && !refreshToken && !authRoutes.includes(pathname)){
//     return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
//   }

//   let user;

//   if(accessToken){
//     try{
//       user = jwtDecode(accessToken)
//     return NextResponse.redirect(new URL('/', request.url))
//     }catch(err){
//       console.log(err)
//     }
//   }


//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//    matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
// }

// sorry my dear 











///////////////////-------------------next auth middleware example-----------------///////////////////////////
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { get } from 'http';
import { getDefaultDashboardRoute, getRouteOwnerRole, isAuthRoute, UserRole } from './lib/auth-utils';




// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookiesStore = await cookies();

    const accessToken = request.cookies.get('accessToken')?.value;

    let userRole: UserRole | null = null

    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string);

        if (typeof verifiedToken === 'string') {
            cookiesStore.delete('accessToken');
            cookiesStore.delete('refreshToken');
            return NextResponse.redirect(new URL(`/login`, request.url))
        }

        userRole = verifiedToken.role;
    }


    const routeOwnerRole = getRouteOwnerRole(pathname);

    const isAuth = isAuthRoute(pathname);

    // if user is not authenticated
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    if (routeOwnerRole === null) {
        // public route, allow access
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginURL = new URL(`/login`, request.url);
        loginURL.searchParams.set('redirect', pathname)

        return NextResponse.redirect(new URL(loginURL))
        // return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
    }

    if (routeOwnerRole === 'COMMON') {
        return NextResponse.next();
    }

    // route is protected and has owner role
    if (routeOwnerRole === 'ADMIN' || routeOwnerRole === 'DOCTOR' || routeOwnerRole === 'PATIENT') {
        if (userRole !== routeOwnerRole) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    console.log("pathsname", request.nextUrl.pathname)
    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}