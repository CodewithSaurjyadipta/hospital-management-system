'use server';
/**
 * @fileOverview An AI agent for scheduling medical appointments.
 *
 * - scheduleAppointment - A function that handles the appointment scheduling conversation.
 */

import { ai } from '@/ai/genkit';
import { bookAppointment, getDoctorAvailability } from '@/lib/mock-data-tools';
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

const getAvailabilityTool = ai.defineTool(
  {
    name: 'getDoctorAvailability',
    description: 'Get the available appointment slots for a specific doctor on a given date.',
    inputSchema: z.object({
      doctorName: z.string().describe("The name of the doctor, e.g., 'Dr. Emily Carter'"),
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
  return scheduleAppointmentFlow(input);
}