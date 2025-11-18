import { UserRole } from "@/lib/auth-utils";

export interface IUserInfo {
    name: string;
    email: string;
    role: UserRole
}



