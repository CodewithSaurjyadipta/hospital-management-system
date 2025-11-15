'use server';
/**
 * @fileOverview An AI agent for scheduling medical appointments.
 *
 * - scheduleAppointment - A function that handles the appointment scheduling conversation.
 */

import { ai } from '@/ai/genkit';
import { bookAppointment, getDoctorAvailability } from '@/lib/mock-data-tools';
<<<<<<< HEAD
=======
import { mockDoctors } from '@/lib/mock-data';
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
import { z } from 'genkit';
import { format } from 'date-fns';

const ScheduleAppointmentInputSchema = z.object({
  query: z.string().describe('The user\'s request as a text query.'),
});
export type ScheduleAppointmentInput = z.infer<typeof ScheduleAppointmentInputSchema>;

const ScheduleAppointmentOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user.'),
  isBooked: z.boolean().describe('Whether an appointment was successfully booked.'),
});
export type ScheduleAppointmentOutput = z.infer<typeof ScheduleAppointmentOutputSchema>;

<<<<<<< HEAD
const getAvailabilityTool = ai.defineTool(
  {
    name: 'getDoctorAvailability',
    description: 'Get the available appointment slots for a specific doctor on a given date.',
    inputSchema: z.object({
      doctorName: z.string().describe("The name of the doctor, e.g., 'Dr. Emily Carter'"),
=======
const listDoctorsTool = ai.defineTool(
  {
    name: 'listDoctors',
    description: 'Get a list of all available doctors with their specialties. Use this when the user asks about doctors, specialties, or wants to see who is available.',
    inputSchema: z.object({}),
    outputSchema: z.array(z.object({
      name: z.string(),
      specialty: z.string(),
    })),
  },
  async () => {
    return mockDoctors.map(d => ({ name: d.name, specialty: d.specialty }));
  }
);

const getAvailabilityTool = ai.defineTool(
  {
    name: 'getDoctorAvailability',
    description: 'Get the available appointment slots for a specific doctor on a given date. Use this when the user asks about availability or wants to see time slots.',
    inputSchema: z.object({
      doctorName: z.string().describe("The name of the doctor, e.g., 'Dr. Emily Carter' or 'Emily Carter'"),
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
      date: z.string().describe("The date to check for availability in 'YYYY-MM-DD' format."),
    }),
    outputSchema: z.array(z.string()),
  },
  async ({ doctorName, date }) => {
    return getDoctorAvailability(doctorName, date);
  }
);

const bookAppointmentTool = ai.defineTool(
  {
    name: 'bookAppointment',
    description: 'Book an appointment for a patient with a specific doctor at a given date and time.',
    inputSchema: z.object({
      // In a real app, patientId would come from the logged-in user's session
      patientId: z.string().default('pat1').describe("The patient's ID."),
      doctorName: z.string().describe("The name of the doctor."),
      date: z.string().describe("The date of the appointment in 'YYYY-MM-DD' format."),
      time: z.string().describe("The time of the appointment, e.g., '10:00 AM'"),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    return bookAppointment(input);
  }
);


const scheduleAppointmentPrompt = ai.definePrompt({
    name: 'scheduleAppointmentPrompt',
    input: { schema: z.object({ query: z.string(), today: z.string() }) },
    output: { schema: ScheduleAppointmentOutputSchema },
<<<<<<< HEAD
    tools: [getAvailabilityTool, bookAppointmentTool],
    prompt: `You are a friendly and helpful AI assistant for a medical clinic.
    Your goal is to help users schedule appointments with doctors.
    The current date is {{today}}.
    When a user asks for availability, use the getDoctorAvailability tool.
    When a user confirms they want to book a slot, use the bookAppointment tool.
    If a tool call is successful, formulate a natural language response based on the tool's output.
    If a booking is successful, set isBooked to true. Otherwise, keep it false.
    If you don't have enough information (e.g., doctor name, date), ask clarifying questions.
    Be polite and conversational.

=======
    tools: [listDoctorsTool, getAvailabilityTool, bookAppointmentTool],
    prompt: `You are a friendly and helpful AI assistant for MediCare, a medical clinic.
    Your goal is to help users schedule appointments with doctors using natural, conversational language.
    
    The current date is {{today}}.
    
    IMPORTANT GUIDELINES:
    1. When users ask about doctors, specialties, or want to see who's available, use the listDoctors tool first.
    2. When users ask about availability or time slots, use the getDoctorAvailability tool.
    3. When users want to book an appointment, use the bookAppointment tool with the exact details.
    4. Be conversational and friendly - understand natural language like "tomorrow", "next week", "Monday", etc.
    5. If the user says "yes", "book it", "confirm", or similar after you've shown availability, proceed with booking.
    6. Always confirm the appointment details before booking: doctor name, date, and time.
    7. If you don't have enough information, ask ONE clarifying question at a time.
    8. When booking is successful, set isBooked to true and provide a clear confirmation message.
    9. Handle date formats flexibly - convert "tomorrow", "next Monday", etc. to YYYY-MM-DD format.
    10. Be helpful and proactive - suggest alternatives if a time slot isn't available.
    
    EXAMPLES:
    - "I need to see a cardiologist" → Use listDoctors, then ask which date they prefer
    - "Is Dr. Carter available tomorrow?" → Use getDoctorAvailability with tomorrow's date
    - "Book me with Dr. Emily Carter tomorrow at 10 AM" → Use bookAppointment directly
    - "Yes, book it" (after showing availability) → Use bookAppointment with the previously discussed details
    
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
    User query: {{{query}}}
    `,
});

const scheduleAppointmentFlow = ai.defineFlow(
    {
        name: 'scheduleAppointmentFlow',
        inputSchema: ScheduleAppointmentInputSchema,
        outputSchema: ScheduleAppointmentOutputSchema,
    },
    async (input) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const llmResponse = await scheduleAppointmentPrompt({
            ...input,
            today,
        });

        const { output } = llmResponse;
        if (!output) {
            return {
                response: "I'm sorry, I wasn't able to process that request. Can you try rephrasing?",
                isBooked: false,
            };
        }

        return output;
    }
);


export async function scheduleAppointment(
  input: ScheduleAppointmentInput
): Promise<ScheduleAppointmentOutput> {
<<<<<<< HEAD
  return scheduleAppointmentFlow(input);
=======
  // Check if API key is configured
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    return {
      response: "AI service is not configured. Please set GOOGLE_GENAI_API_KEY in your environment variables. Get your API key from https://aistudio.google.com/apikey",
      isBooked: false,
    };
  }
  
  try {
    return await scheduleAppointmentFlow(input);
  } catch (error: any) {
    console.error("Error in scheduleAppointment flow:", error);
    throw error; // Re-throw to be caught by the action handler
  }
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
}