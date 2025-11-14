"use server";

import { medicationInteractionCheck } from "@/ai/flows/medication-interaction-check";
import { z } from "zod";

const CheckMedicationInteractionSchema = z.object({
    newMedication: z.string().min(1, "New medication cannot be empty."),
    medicationHistory: z.array(z.string()).min(1, "Medication history is required."),
});

export async function checkMedicationInteraction(prevState: any, formData: FormData) {
    try {
        const validatedFields = CheckMedicationInteractionSchema.safeParse({
            newMedication: formData.get("newMedication"),
            medicationHistory: JSON.parse(formData.get("medicationHistory") as string || "[]"),
        });

        if (!validatedFields.success) {
            return {
                message: "Invalid form data.",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const result = await medicationInteractionCheck(validatedFields.data);

        return {
            message: "Interaction check complete.",
            ...result,
        };

    } catch (error) {
        console.error("Error checking medication interaction:", error);
        return {
            message: "An unexpected error occurred. Please try again.",
            hasInteraction: null,
            interactionDetails: null,
            error: true,
        };
    }
}
