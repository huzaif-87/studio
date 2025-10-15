'use server';

/**
 * @fileOverview Generates a personalized learning path in AI, ML, and Data Science based on user skill level and goals.
 *
 * - generatePersonalizedLearningPath - A function that handles the generation of a personalized learning path.
 * - GeneratePersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - GeneratePersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedLearningPathInputSchema = z.object({
  skillLevel: z
    .enum(['Beginner', 'Intermediate', 'Pro'])
    .describe('The current skill level of the student.'),
  goals: z.string().describe('The learning goals of the student.'),
});
export type GeneratePersonalizedLearningPathInput = z.infer<
  typeof GeneratePersonalizedLearningPathInputSchema
>;

const GeneratePersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe('A personalized learning path in AI, ML, and Data Science.'),
});
export type GeneratePersonalizedLearningPathOutput = z.infer<
  typeof GeneratePersonalizedLearningPathOutputSchema
>;

export async function generatePersonalizedLearningPath(
  input: GeneratePersonalizedLearningPathInput
): Promise<GeneratePersonalizedLearningPathOutput> {
  return generatePersonalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedLearningPathPrompt',
  input: {schema: GeneratePersonalizedLearningPathInputSchema},
  output: {schema: GeneratePersonalizedLearningPathOutputSchema},
  prompt: `You are Alex, an AI Learning Companion & Mentor. Today's date is October 15, 2025.

You will generate a personalized learning path for a student in AI, ML, and Data Science based on their current skill level and goals. The learning path should be tailored to help the student effectively learn and advance their knowledge. Consider the student's skill level when creating the learning path.

Skill Level: {{{skillLevel}}}
Goals: {{{goals}}}

Learning Path:
`, // Ensure a newline character at the end to prevent run-on sentences
});

const generatePersonalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedLearningPathFlow',
    inputSchema: GeneratePersonalizedLearningPathInputSchema,
    outputSchema: GeneratePersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
