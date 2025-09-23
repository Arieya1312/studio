'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating course descriptions.
 *
 * - generateCourseDescription - A function that generates a course description based on the course title and other provided data.
 * - GenerateCourseDescriptionInput - The input type for the generateCourseDescription function.
 * - GenerateCourseDescriptionOutput - The return type for the generateCourseDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseDescriptionInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  courseDetails: z.string().optional().describe('Additional details about the course.'),
});
export type GenerateCourseDescriptionInput = z.infer<
  typeof GenerateCourseDescriptionInputSchema
>;

const GenerateCourseDescriptionOutputSchema = z.object({
  courseDescription: z
    .string()
    .describe('A generated description for the course.'),
});
export type GenerateCourseDescriptionOutput = z.infer<
  typeof GenerateCourseDescriptionOutputSchema
>;

export async function generateCourseDescription(
  input: GenerateCourseDescriptionInput
): Promise<GenerateCourseDescriptionOutput> {
  return generateCourseDescriptionFlow(input);
}

const generateCourseDescriptionPrompt = ai.definePrompt({
  name: 'generateCourseDescriptionPrompt',
  input: {schema: GenerateCourseDescriptionInputSchema},
  output: {schema: GenerateCourseDescriptionOutputSchema},
  prompt: `You are an expert course description writer.

  Based on the provided course title and details, create an engaging and informative course description.

  Course Title: {{{courseTitle}}}
  Course Details: {{{courseDetails}}}
  `,
});

const generateCourseDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCourseDescriptionFlow',
    inputSchema: GenerateCourseDescriptionInputSchema,
    outputSchema: GenerateCourseDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCourseDescriptionPrompt(input);
    return output!;
  }
);
