/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
    try {
        const verifiedAccessToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        return {
            success: true,
            message: "Token is valid",
            payload: verifiedAccessToken,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Invalid token",
        };
    }
};