"use server"

import { IUserInfo } from "@/types/user.interface"
import { getCookie } from "./tokenHandler"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

export const getUserInfo = async (): Promise<IUserInfo | null> => {
   try {
      const accessToken = await getCookie("accessToken")

    if (!accessToken) {
       return null
    }

   const varifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

   if(!varifiedToken){
        return null
   }

   const userInfo: IUserInfo ={
         name: varifiedToken.name || "unknown name",
         email: varifiedToken.email,
         role: varifiedToken.role
   }


    return userInfo;
   }catch (error: any){
     console.log(error)
     return null
   }

}