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














///////////////////-------------------next auth middleware example-----------------///////////////////////////
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { get } from 'http';


// user role base access control added here
type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'GUEST';

type RouteConfig = {
   exact: string[];
   pattern: RegExp[];
}


const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    pattern: []
}

const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin/], // matches /admin and any sub routes /admin/*
    exact: []
}


const doctorProtectedRoutes: RouteConfig = {
    pattern: [/^\/doctor/], // matches /doctor and any sub routes /doctor/*
    exact: []
}


const patientProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard/], // matches /dashboard and any sub routes /dashboard/*
    exact: []
}


const isAuthRoute = (pathname: string)=>{
    return authRoutes.some((route)=> route === pathname);
}


const isRouteMatches = (pathname: string, routes: RouteConfig)=>{
    if(routes.exact.includes(pathname)){
        return true;
    }

    return routes.pattern.some((pattern)=> pattern.test(pathname))
   
}


const getRouteOwnerRole = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null =>{
    if(isRouteMatches(pathname, adminProtectedRoutes)){
        return "ADMIN";
    }

    if(isRouteMatches(pathname, doctorProtectedRoutes)){
        return "DOCTOR";
    } 

    if(isRouteMatches(pathname, patientProtectedRoutes)){
        return "PATIENT";
    }

    if(isRouteMatches(pathname, commonProtectedRoutes)){
        return "COMMON";
    }

    return null;
  }
 


  const getDefaultDashboardRoute = (role: UserRole)=>{
     if(role === 'ADMIN'){
        return '/admin/dashboard';
     }

     if(role === 'DOCTOR'){
        return '/doctor/dashboard';
     }

     if(role === 'PATIENT'){  
       return "/dashboard"; 
     }

     return '/';
  }


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookiesStore = await cookies();

  const accessToken = request.cookies.get('accessToken')?.value;

  let userRole: UserRole | null = null

  if(accessToken){
     const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string) ;
     
     if(typeof verifiedToken === 'string'){
         cookiesStore.delete('accessToken');
         cookiesStore.delete('refreshToken');
         return NextResponse.redirect(new URL(`/login`, request.url))
     }

     userRole = verifiedToken.role;
  }


  const routeOwnerRole = getRouteOwnerRole(pathname);

  const isAuth = isAuthRoute(pathname);

  // if user is not authenticated
  if(accessToken && isAuth){
     return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
  }

  if(routeOwnerRole === null){
      // public route, allow access
      return NextResponse.next();
  }

  if(routeOwnerRole === 'COMMON'){
      if(!accessToken){
          return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
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