export interface IPatient {
    id?: string;
    email: string;
    name: string;
    profilePhoto?: string | null;
    contactNumber: string;
    address: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    patientHealthData?: IPatientHealthData;
    medicalReport?: IMedicalReport[];
}

export interface IPatientHealthData {
    id: string;
    patientId: string;
    gender: "MALE" | "FEMALE";
    dateOfBirth: string;
    bloodGroup: "A_POSITIVE" | "A_NEGATIVE" | "B_POSITIVE" | "B_NEGATIVE" | "AB_POSITIVE" | "AB_NEGATIVE" | "O_POSITIVE" | "O_NEGATIVE";
    hasAllergies?: boolean;
    hasDiabetes?: boolean;
    height: string;
    weight: string;
    smokingStatus?: boolean;
    dietaryPreferences?: string;
    pregnancyStatus?: boolean;
    mentalHealthHistory?: string;
    immunizationStatus?: string;
    hasPastSurgeries?: boolean;
    recentAnxiety?: boolean;
    recentDepression?: boolean;
    maritalStatus?: "MARRIED" | "UNMARRIED";
    createdAt: string;
    updatedAt: string;
}

export interface IMedicalReport {
    id: string;
    patientId: string;
    reportName: string;
    reportLink: string;
    createdAt: string;
    updatedAt: string;
}