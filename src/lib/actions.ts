'use server';

import { medicationInteractionCheck } from "@/ai/flows/medication-interaction-check";
import { scheduleAppointment } from "@/ai/flows/appointment-scheduler-flow";
import { speechToText } from "@/ai/flows/speech-to-text-flow";
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


const AiSchedulerSchema = z.object({
  query: z.string().min(1, "Query cannot be empty."),
});

export async function getAiSchedulerResponse(prevState: any, formData: FormData) {
    try {
        const validatedFields = AiSchedulerSchema.safeParse({
            query: formData.get("query"),
        });

        if (!validatedFields.success) {
            return {
                response: "Invalid query.",
                isBooked: false,
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }
        
        const result = await scheduleAppointment(validatedFields.data);

        return result;

<<<<<<< HEAD
    } catch (error) {
        console.error("Error in AI Scheduler action:", error);
        return {
            response: "An unexpected error occurred. Please try again.",
=======
    } catch (error: any) {
        console.error("Error in AI Scheduler action:", error);
        const errorMessage = error?.message || error?.toString() || "Unknown error";
        
        // Check if it's an API key error
        if (errorMessage.includes('API') || errorMessage.includes('key') || errorMessage.includes('GOOGLE')) {
            return {
                response: "AI service is not configured. Please set up your Google AI API key in the environment variables (GOOGLE_GENAI_API_KEY).",
                isBooked: false,
                error: true,
            };
        }
        
        return {
            response: `Error: ${errorMessage}. Please check the console for more details.`,
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
            isBooked: false,
            error: true,
        };
    }
}

const TranscribeAudioSchema = z.object({
  audio: z.string().min(1, "Audio data cannot be empty."),
});

export async function transcribeAudio(prevState: any, formData: FormData) {
    try {
        const validatedFields = TranscribeAudioSchema.safeParse({
            audio: formData.get("audio"),
        });

        if (!validatedFields.success) {
            return {
                text: null,
                error: "Invalid audio data.",
            };
        }
        
        const result = await speechToText({ audio: validatedFields.data.audio });

        return { text: result.text, error: null };

    } catch (error) {
        console.error("Error in transcribeAudio action:", error);
        return {
            text: null,
            error: "An unexpected error occurred during transcription. Please try again.",
        };
    }
}
