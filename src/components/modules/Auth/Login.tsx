/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import loginUser from "@/utility/login";
import checkAuthStatus from "@/utility/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setIsLoading(true);
    setError(null);

    //Hashed string for "super@admin": $2b$10$Yd4pQGXKFP5opoELqSdE1uBhcXwTc74u3/D7lag8XHGXJ4S5ZQeLS
    try {
      const res = await loginUser(data.email, data.password); //{success: true, message: 'User loggedin successfully!', data: {needPasswordChange: false}}

      if (res.success) {
        const authStatus = await checkAuthStatus();

        if(authStatus.isAuthenticated && authStatus.user){
          const {role} = authStatus.user;

          switch(role){
            case "ADMIN":
              router.push("/dashboard/admin");
              break;
            case "DOCTOR":
              router.push("/dashboard/doctor");
              break;
            case "PATIENT":
              router.push("/dashboard/patient");
              break;
            default:
              router.push("/");
              break;
          }
        }else{
          setError("Failed to retrieve user information after login.");
        }
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4">
      <div className="text-center mb-4">
        <Link href="/">
          <span className="text-3xl font-bold text-primary cursor-pointer">
            PH Health Care
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
              <CardDescription>
                Sign in to access your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {error && (
                <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">
                  {error}
                </p>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-2">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
              <button className="text-center text-sm text-muted-foreground">
                <Link href="/" className="underline">
                  back to home
                </Link>
              </button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}