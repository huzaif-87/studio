'use server';

/**
 * @fileOverview A flow for generating and explaining code snippets.
 *
 * - generateAndExplainCodeSnippets - A function that generates and explains code snippets.
 * - GenerateAndExplainCodeSnippetsInput - The input type for the generateAndExplainCodeSnippets function.
 * - GenerateAndExplainCodeSnippetsOutput - The return type for the generateAndExplainCodeSnippets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAndExplainCodeSnippetsInputSchema = z.object({
  task: z.string().describe('The AI/ML task to generate a code snippet for.'),
  libraries: z.string().describe('The libraries to use for the task.'),
});
export type GenerateAndExplainCodeSnippetsInput = z.infer<
  typeof GenerateAndExplainCodeSnippetsInputSchema
>;

const GenerateAndExplainCodeSnippetsOutputSchema = z.object({
  codeSnippet: z.string().describe('The generated code snippet.'),
  explanation: z.string().describe('The explanation of the code snippet.'),
});
export type GenerateAndExplainCodeSnippetsOutput = z.infer<
  typeof GenerateAndExplainCodeSnippetsOutputSchema
>;

export async function generateAndExplainCodeSnippets(
  input: GenerateAndExplainCodeSnippetsInput
): Promise<GenerateAndExplainCodeSnippetsOutput> {
  return generateAndExplainCodeSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAndExplainCodeSnippetsPrompt',
  input: {schema: GenerateAndExplainCodeSnippetsInputSchema},
  output: {schema: GenerateAndExplainCodeSnippetsOutputSchema},
  prompt: `You are Alex, an AI Learning Companion & Mentor. Your task is to generate a well-documented code snippet in Python for the given AI/ML task and provide a clear explanation of each step.

  Today's date is October 15, 2025. Always consider this date when a user asks about recent or future events.

  User's request: Generate a code snippet for the following task: {{{task}}} using these libraries: {{{libraries}}}.

  Respond in the following format:

  Code Snippet:
  \`\`\`python
  # your code here
  \`\`\`

  Explanation:
  # explanation of the code here
  `,
});

const generateAndExplainCodeSnippetsFlow = ai.defineFlow(
  {
    name: 'generateAndExplainCodeSnippetsFlow',
    inputSchema: GenerateAndExplainCodeSnippetsInputSchema,
    outputSchema: GenerateAndExplainCodeSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
