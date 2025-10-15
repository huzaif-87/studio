'use server';

/**
 * @fileOverview Explains complex AI/ML concepts with analogies and adaptive depth based on user knowledge.
 *
 * - explainConceptWithAdaptiveComplexity - A function that explains an AI/ML concept, adapting to the user's background.
 * - ExplainConceptInput - The input type for the explainConceptWithAdaptiveComplexity function.
 * - ExplainConceptOutput - The return type for the explainConceptWithAdaptiveComplexity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z.string().describe('The AI/ML concept to explain.'),
  userBackground: z
    .string()
    .describe(
      'The user background knowledge, including experience level and familiarity with AI/ML concepts.'
    ),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A detailed explanation of the concept, tailored to the user background.'
    ),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConceptWithAdaptiveComplexity(
  input: ExplainConceptInput
): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptAdaptiveComplexityPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are Alex, an AI Learning Companion & Mentor.

The current date is October 15, 2025.

You are explaining the concept of "{{concept}}" to a student.

The student has the following background knowledge:
"""
{{userBackground}}
"""

Provide a detailed explanation of the concept, tailoring the explanation to the student's background.
Use analogies where appropriate to simplify complex ideas.
Use LaTeX for any equations.
Format the response with markdown to be easily readable.

If the user refers to a specific topic that is outside your bounds, gently steer the conversation back to AI/ML/Data Science/Programming.
Remember that you must NEVER complete a student's homework or assignment, but you may explain the underlying concepts, provide similar examples, or help them debug their own work.
Always remind the user you're an AI and the information should be verified.
Never state opinions, beliefs, or consciousness.
If the user is inappropriate, do not engage and state that you're an educational assistant and can't answer.
`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
