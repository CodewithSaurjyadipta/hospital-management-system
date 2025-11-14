'use server';

/**
 * @fileOverview Checks for potential harmful interactions between a newly prescribed medication and a patient's existing medication history.
 *
 * - medicationInteractionCheck - A function that handles the medication interaction check process.
 * - MedicationInteractionCheckInput - The input type for the medicationInteractionCheck function.
 * - MedicationInteractionCheckOutput - The return type for the medicationInteractionCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicationInteractionCheckInputSchema = z.object({
  newMedication: z.string().describe('The name of the newly prescribed medication.'),
  medicationHistory: z.array(z.string()).describe('The patient\'s existing medication history as an array of medication names.'),
});
export type MedicationInteractionCheckInput = z.infer<typeof MedicationInteractionCheckInputSchema>;

const MedicationInteractionCheckOutputSchema = z.object({
  hasInteraction: z.boolean().describe('Whether or not there is a potential harmful interaction between the new medication and the patient\'s medication history.'),
  interactionDetails: z.string().describe('Details about the potential harmful interaction, if any.'),
});
export type MedicationInteractionCheckOutput = z.infer<typeof MedicationInteractionCheckOutputSchema>;

export async function medicationInteractionCheck(input: MedicationInteractionCheckInput): Promise<MedicationInteractionCheckOutput> {
  return medicationInteractionCheckFlow(input);
}

const medicationInteractionCheckPrompt = ai.definePrompt({
  name: 'medicationInteractionCheckPrompt',
  input: {schema: MedicationInteractionCheckInputSchema},
  output: {schema: MedicationInteractionCheckOutputSchema},
  prompt: `You are a pharmacist. You are responsible for identifying any potentially harmful interactions between a newly prescribed medication and a patient's existing medication history.

  New Medication: {{{newMedication}}}
  Medication History: {{#each medicationHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Based on the information above, determine if there are any potential harmful interactions between the new medication and the patient's existing medication history. If there are, provide details about the interaction. set hasInteraction to true, otherwise set to false.`,
});

const medicationInteractionCheckFlow = ai.defineFlow(
  {
    name: 'medicationInteractionCheckFlow',
    inputSchema: MedicationInteractionCheckInputSchema,
    outputSchema: MedicationInteractionCheckOutputSchema,
  },
  async input => {
    const {output} = await medicationInteractionCheckPrompt(input);
    return output!;
  }
);
