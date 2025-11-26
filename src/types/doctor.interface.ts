
export interface IDoctor {
    id?: string;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender: "MALE" | "FEMALE";
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    specialties?: string[];
    profilePhoto?: File | string;
    removeSpecialties?: string[];
    isDeleted?: boolean;
    averageRating?: number;
    createdAt?: string;
    updatedAt?: string;
    doctorSpecialties?: Array<{
        specialitiesId: string;
        specialties?: {
            id: string;
            title: string;
            icon?: string;
        };
    }>;
}