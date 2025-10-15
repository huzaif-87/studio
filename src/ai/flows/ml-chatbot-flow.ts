'use server';

/**
 * @fileOverview A flow for the Advanced AI Assistant chatbot.
 *
 * - mlChatbotFlow - A function that provides a response for the chatbot.
 * - MlChatbotFlowInput - The input type for the mlChatbotFlow function.
 * - MlChatbotFlowOutput - The return type for the mlChatbotFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MlChatbotFlowInputSchema = z.object({
  message: z.string().describe("The user's message to the AI assistant."),
});
export type MlChatbotFlowInput = z.infer<typeof MlChatbotFlowInputSchema>;

const MlChatbotFlowOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});
export type MlChatbotFlowOutput = z.infer<typeof MlChatbotFlowOutputSchema>;

export async function mlChatbotFlow(
  input: MlChatbotFlowInput
): Promise<MlChatbotFlowOutput> {
  const prompt = `You are a helpful AI assistant that provides informative, accurate, and educational responses on any topic. Format your responses with simple HTML for better readability. Use <p>, <ul>, <li>, <strong>, <em> tags as needed. For definitions, wrap them in <span class="definition">...</span>. For examples, use <span class="example">...</span>. For tips, use <span class="tip">...</span>.

User's question: "${input.message}"`;

  const {output} = await ai.generate({
    prompt: prompt,
    output: {
      schema: z.object({
        response: z.string(),
      }),
    },
  });

  return output!;
}
