/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import { loginUser } from "./loginUser";
import { toast } from "sonner";
import { serverFetch } from "@/lib/server.fetch";

const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});


export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        console.log(formData.get("address"));
        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        const validatedFields = registerValidationZodSchema.safeParse(validationData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                }
                )
            }
        }

        const registerData = {
            password: formData.get('password'),
            patient: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));
        console.log("append formData:", newFormData)

        const res = await serverFetch.post("http://localhost:5000/api/v1/users", {
            body: newFormData,
        })


        const result = await res.json();


        if (result.success) {
            return await loginUser(_currentState, formData);
        }

        
        return result;


    } catch (error: any) {
        // IMPORTANT ⬇️
        if (typeof error?.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
          throw error;
        }

        console.error("register Error:", error);
        return { success: false, message:`${process.env.NODE_ENV === 'development' ? error : 'Registration failed, please try again later'}`};
    }
}