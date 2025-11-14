import { PatientSignupForm } from "@/components/auth/patient-signup-form";

export default function PatientSignupPage() {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
            <PatientSignupForm />
        </div>
    );
}
