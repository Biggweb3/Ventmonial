'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating realistic and human-like testimonial drafts based on user-provided product/service details.
 *
 * - generateRealisticTestimonial - A function that takes product/service details as input and returns a realistic testimonial draft.
 * - GenerateRealisticTestimonialInput - The input type for the generateRealisticTestimonial function.
 * - GenerateRealisticTestimonialOutput - The return type for the generateRealisticTestimonial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRealisticTestimonialInputSchema = z.object({
  productOrServiceDetails: z
    .string()
    .describe(
      'Comprehensive details about the product or service for which the testimonial is being generated.'
    ),
});
export type GenerateRealisticTestimonialInput = z.infer<typeof GenerateRealisticTestimonialInputSchema>;

const GenerateRealisticTestimonialOutputSchema = z.object({
  testimonialDraft: z
    .string()
    .describe('A realistic and human-like testimonial draft based on the input details.'),
});
export type GenerateRealisticTestimonialOutput = z.infer<typeof GenerateRealisticTestimonialOutputSchema>;

export async function generateRealisticTestimonial(
  input: GenerateRealisticTestimonialInput
): Promise<GenerateRealisticTestimonialOutput> {
  return generateRealisticTestimonialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRealisticTestimonialPrompt',
  input: {schema: GenerateRealisticTestimonialInputSchema},
  output: {schema: GenerateRealisticTestimonialOutputSchema},
  prompt: `You are an expert copywriter specializing in crafting realistic and human-like testimonials.

  Based on the following details about the product or service, generate a compelling testimonial draft.

  Product/Service Details: {{{productOrServiceDetails}}}
  `,
});

const generateRealisticTestimonialFlow = ai.defineFlow(
  {
    name: 'generateRealisticTestimonialFlow',
    inputSchema: GenerateRealisticTestimonialInputSchema,
    outputSchema: GenerateRealisticTestimonialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
