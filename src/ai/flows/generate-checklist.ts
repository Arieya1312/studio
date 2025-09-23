'use server';

/**
 * @fileOverview Generates a preparation checklist based on the course description.
 *
 * - generateChecklist - A function that generates a preparation checklist.
 * - GenerateChecklistInput - The input type for the generateChecklist function.
 * - GenerateChecklistOutput - The return type for the generateChecklist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChecklistInputSchema = z.object({
  courseDescription: z
    .string()
    .describe('The description of the course for which to generate a checklist.'),
});
export type GenerateChecklistInput = z.infer<typeof GenerateChecklistInputSchema>;

const GenerateChecklistOutputSchema = z.object({
  checklistItems: z
    .array(z.string())
    .describe('A list of checklist items for course preparation.'),
});
export type GenerateChecklistOutput = z.infer<typeof GenerateChecklistOutputSchema>;

export async function generateChecklist(input: GenerateChecklistInput): Promise<GenerateChecklistOutput> {
  return generateChecklistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChecklistPrompt',
  input: {schema: GenerateChecklistInputSchema},
  output: {schema: GenerateChecklistOutputSchema},
  prompt: `You are an expert course manager. Generate a checklist of tasks required to prepare for a course, based on the course description.

Course Description: {{{courseDescription}}}

Checklist Items (as a bulleted list):`,
});

const generateChecklistFlow = ai.defineFlow(
  {
    name: 'generateChecklistFlow',
    inputSchema: GenerateChecklistInputSchema,
    outputSchema: GenerateChecklistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
