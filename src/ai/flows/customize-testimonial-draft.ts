'use server';

/**
 * @fileOverview Flow for customizing the tone and length of an AI-generated testimonial draft.
 *
 * Exports:
 *   - `customizeTestimonialDraft`: Function to customize a testimonial draft.
 *   - `CustomizeTestimonialDraftInput`: Input type for `customizeTestimonialDraft`.
 *   - `CustomizeTestimonialDraftOutput`: Output type for `customizeTestimonialDraft`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeTestimonialDraftInputSchema = z.object({
  testimonialDraft: z
    .string()
    .describe('The AI-generated testimonial draft to customize.'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone of the testimonial (e.g., professional, friendly, enthusiastic).'),
  length: z
    .string()
    .optional()
    .describe('The desired length of the testimonial (e.g., short, medium, long).'),
});

export type CustomizeTestimonialDraftInput = z.infer<
  typeof CustomizeTestimonialDraftInputSchema
>;

const CustomizeTestimonialDraftOutputSchema = z.object({
  customizedTestimonial: z
    .string()
    .describe('The customized AI-generated testimonial draft.'),
});

export type CustomizeTestimonialDraftOutput = z.infer<
  typeof CustomizeTestimonialDraftOutputSchema
>;

export async function customizeTestimonialDraft(
  input: CustomizeTestimonialDraftInput
): Promise<CustomizeTestimonialDraftOutput> {
  return customizeTestimonialDraftFlow(input);
}

const customizeTestimonialDraftPrompt = ai.definePrompt({
  name: 'customizeTestimonialDraftPrompt',
  input: {schema: CustomizeTestimonialDraftInputSchema},
  output: {schema: CustomizeTestimonialDraftOutputSchema},
  prompt: `You are an expert at refining testimonial drafts to match a specific tone and length.

  Original Testimonial Draft: {{{testimonialDraft}}}

  Instructions: Customize the provided testimonial draft according to the following instructions. 
  
  Tone: {{{tone}}}
  Length: {{{length}}}
  
  Customized Testimonial Draft:`, // Ensure this is syntactically correct Handlebars.
});

const customizeTestimonialDraftFlow = ai.defineFlow(
  {
    name: 'customizeTestimonialDraftFlow',
    inputSchema: CustomizeTestimonialDraftInputSchema,
    outputSchema: CustomizeTestimonialDraftOutputSchema,
  },
  async input => {
    const {output} = await customizeTestimonialDraftPrompt(input);
    return output!;
  }
);
