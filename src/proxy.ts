import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import path from 'path';
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

//   const token = request.cookies.get('token')?.value;
  const token = request.cookies.get('accessToken')?.value;
//   console.log("proxy accessToken:", accessToken)
  console.log("proxy Token:", token)

  const {pathname} = request.nextUrl;

  const protectedPaths = ['/dashboard/*','appointments', '/profile/*', 'settings/*']
  const authPaths = ['/login','/register', '/forgot-password']

  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if( isProtectedPath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if( isAuthPath && token){
    return NextResponse.redirect(new URL('/', request.url))
  }

  
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}