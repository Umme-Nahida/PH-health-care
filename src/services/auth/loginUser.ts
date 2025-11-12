/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import cookie, { parse } from "cookie";
import { cookies } from "next/headers";

const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {

        let accessTokenObject = null;
        let refreshTokenObject = null;
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        const validatedFields = loginValidationZodSchema.safeParse(loginData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                })
            }
        }

        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const result = await res.json()


        const setHeaderCookie = res.headers.getSetCookie();

        if(setHeaderCookie){
            setHeaderCookie.forEach((cookie: string) => {
                console.log("string cookie:", cookie)
                const parseCookies = parse(cookie);
                console.log("parseCookies",parseCookies)

                if (parseCookies['accessToken']) {
                    // accessTokenObject = {
                    //     token: parseCookies['accessToken'],
                    //     expires: parseCookies['accessTokenExpires'],
                    // }
                    accessTokenObject = parseCookies;
                }
             if (parseCookies['refreshToken']) {
                    // refreshTokenObject = {
                    //     token: parseCookies['refreshToken'],
                    //     expires: parseCookies['refreshTokenExpires'],
                    // }
                    refreshTokenObject = parseCookies;
                }

            })
        }else{
            throw new Error("No cookies set in response");
        }

        if(!accessTokenObject || !refreshTokenObject){
            throw new Error("Tokens not found in cookies");
        }
        

        let cookieStores = await cookies();

        cookieStores.set('accessToken', accessTokenObject['accessToken'], {
            secure: true, 
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 3600,
            path: accessTokenObject['Path'] || '/'
        })
        
        cookieStores.set('refreshToken', refreshTokenObject['refreshToken'], {
            secure: true, 
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 604800,
            path: refreshTokenObject['Path'] || '/'
        })



        console.log("cookie",accessTokenObject, refreshTokenObject);
        // console.log("set-cookie",setHeaderCookie);
        console.log({
            res,
            result
        })


        return result;

    } catch (error) {
        console.log(error);
        return { error: "Login failed" };
    }
}