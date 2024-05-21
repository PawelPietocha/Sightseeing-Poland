
export interface SignUp {
    email: string | null;
    password: string | null;
    displayName: string | null;
    dateOfBirth: Date | null;
    gender: number | null;
    voivodeshipId: number | null;
    acceptTerms: boolean | null;
}