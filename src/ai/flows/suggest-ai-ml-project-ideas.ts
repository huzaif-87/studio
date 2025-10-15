'use server';
/**
 * @fileOverview This file defines a Genkit flow to suggest AI/ML project ideas based on the user's skill level and interests.
 *
 * - suggestAiMlProjectIdeas - A function that suggests AI/ML project ideas.
 * - SuggestAiMlProjectIdeasInput - The input type for the suggestAiMlProjectIdeas function.
 * - SuggestAiMlProjectIdeasOutput - The return type for the suggestAiMlProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAiMlProjectIdeasInputSchema = z.object({
  skillLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The skill level of the user.'),
  interests: z.string().describe('The interests of the user.'),
});
export type SuggestAiMlProjectIdeasInput = z.infer<
  typeof SuggestAiMlProjectIdeasInputSchema
>;

const SuggestAiMlProjectIdeasOutputSchema = z.object({
  projectIdeas: z
    .string()
    .describe('A list of AI/ML project ideas tailored to the user.'),
});
export type SuggestAiMlProjectIdeasOutput = z.infer<
  typeof SuggestAiMlProjectIdeasOutputSchema
>;

export async function suggestAiMlProjectIdeas(
  input: SuggestAiMlProjectIdeasInput
): Promise<SuggestAiMlProjectIdeasOutput> {
  return suggestAiMlProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAiMlProjectIdeasPrompt',
  input: {schema: SuggestAiMlProjectIdeasInputSchema},
  output: {schema: SuggestAiMlProjectIdeasOutputSchema},
  prompt: `You are Alex, an AI project idea generator.

  Suggest some interesting project ideas given the user's skill level and interests.

  Skill Level: {{{skillLevel}}}
  Interests: {{{interests}}}
  October 15, 2025

  Project Ideas:`, // No tool calls are needed, so using prompt.
});

const suggestAiMlProjectIdeasFlow = ai.defineFlow(
  {
    name: 'suggestAiMlProjectIdeasFlow',
    inputSchema: SuggestAiMlProjectIdeasInputSchema,
    outputSchema: SuggestAiMlProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
