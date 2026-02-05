"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { generateRealisticTestimonial } from "@/ai/flows/generate-realistic-testimonial";
import { customizeTestimonialDraft, CustomizeTestimonialDraftInput } from "@/ai/flows/customize-testimonial-draft";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const generationFormSchema = z.object({
  productOrServiceDetails: z.string().min(20, { message: "Please provide at least 20 characters for better results." }),
});

const customizationFormSchema = z.object({
  tone: z.string(),
  length: z.string(),
});

export function TestimonialGenerator() {
  const [testimonial, setTestimonial] = useState<string>("");
  const [originalTestimonial, setOriginalTestimonial] = useState<string>("");
  const [isGenerating, startGenerating] = useTransition();
  const [isCustomizing, startCustomizing] = useTransition();
  const { toast } = useToast();

  const generationForm = useForm<z.infer<typeof generationFormSchema>>({
    resolver: zodResolver(generationFormSchema),
    defaultValues: { productOrServiceDetails: "" },
  });

  const customizationForm = useForm<z.infer<typeof customizationFormSchema>>({
    resolver: zodResolver(customizationFormSchema),
    defaultValues: {
      tone: "professional",
      length: "medium",
    },
  });

  const onGenerate = (values: z.infer<typeof generationFormSchema>) => {
    startGenerating(async () => {
      setTestimonial("");
      setOriginalTestimonial("");
      customizationForm.reset({ tone: 'professional', length: 'medium' });
      try {
        const result = await generateRealisticTestimonial(values);
        setTestimonial(result.testimonialDraft);
        setOriginalTestimonial(result.testimonialDraft);
      } catch (error) {
        console.error("Error generating testimonial:", error);
        toast({ title: "Error", description: "Failed to generate testimonial.", variant: "destructive" });
      }
    });
  };

  const handleCustomization = () => {
    if (!originalTestimonial) return;

    const values = customizationForm.getValues();
    startCustomizing(async () => {
      try {
        const input: CustomizeTestimonialDraftInput = {
          testimonialDraft: originalTestimonial,
          ...values,
        };
        const result = await customizeTestimonialDraft(input);
        setTestimonial(result.customizedTestimonial);
      } catch (error) {
        console.error("Error customizing testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to customize testimonial.",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (!originalTestimonial) return;

    const subscription = customizationForm.watch((value, { name }) => {
      if (name === 'tone' || name === 'length') {
        handleCustomization();
      }
    });
    return () => subscription.unsubscribe();
  }, [originalTestimonial, customizationForm]);

  const handleCopy = () => {
    if (!testimonial) return;
    navigator.clipboard.writeText(testimonial);
    toast({
      title: "Copied to clipboard!",
    });
  };
  
  const isLoading = isGenerating || isCustomizing;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-8 lg:col-span-3">
          <Form {...generationForm}>
            <form onSubmit={generationForm.handleSubmit(onGenerate)} className="space-y-4">
              <FormField
                control={generationForm.control}
                name="productOrServiceDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">1. Product/Service Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A powerful project management tool that simplifies collaboration and task tracking for remote teams, featuring Kanban boards, Gantt charts, and real-time communication..."
                        className="min-h-[200px] bg-card border-border focus-visible:ring-2 focus-visible:ring-accent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-offset-2 focus-visible:ring-accent">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Testimonial
              </Button>
            </form>
          </Form>

          {originalTestimonial && (
            <div className="animate-in fade-in duration-500">
              <Separator />
              <Form {...customizationForm}>
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">2. Customize</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={customizationForm.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card">
                                <SelectValue placeholder="Select a tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                              <SelectItem value="humorous">Humorous</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={customizationForm.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card">
                                <SelectValue placeholder="Select a length" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="short">Short</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>

        <div className="relative lg:col-span-2">
          <Card className="min-h-[300px] sticky top-8 border-primary/20 bg-card/50 shadow-lg shadow-primary/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Result</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                disabled={!testimonial || isLoading}
                aria-label="Copy testimonial"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="relative">
              {isLoading && (
                 <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-lg -m-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
              )}
              <p className="whitespace-pre-wrap text-card-foreground/80">
                {testimonial || "Your generated testimonial will appear here..."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
