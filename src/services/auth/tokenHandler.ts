import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

  export const setCookie = async(key:string, value:string, options: Partial<ResponseCookie>)=>{
      const cookieStore = await cookies()

      cookieStore.set(key, value, options)
  }
  
  export const getCookie = async(key:string)=>{
      const cookieStore = await cookies()

      cookieStore.get(key)
  }

  export const deleteCookie = async(key:string)=>{
        const cookieStore = await cookies()
        cookieStore.delete(key)
  }