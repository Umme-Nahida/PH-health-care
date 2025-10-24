
// export interface IUserInfo {
//     name: string;
//     email: string;
//     role: UserRole
// }

import { UserRole } from "@/lib/auth-utils";
import { IDoctor } from "./doctor.interface";
import { IAdmin } from "./admin.interface";
import { IPatient } from "./patient.interface";
// import { IPatient } from "./patient.interface";

export interface IUserInfo {
    id?: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange?: boolean;
    status?: "ACTIVE" | "BLOCKED" | "DELETED";
    admin?: IAdmin;
    patient?: IPatient;
    doctor?: IDoctor;
    createdAt?: string;
    updatedAt?: string;
}



