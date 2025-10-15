'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { explainConceptWithAdaptiveComplexity } from '@/ai/flows/explain-concept-adaptive-complexity';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  concept: z.string().min(3, {
    message: 'Please enter a concept of at least 3 characters.',
  }),
  userBackground: z.string().min(10, {
    message: 'Please describe your background in at least 10 characters.',
  }),
});

export function ConceptExplainerForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: '',
      userBackground: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult('');
    try {
      const response = await explainConceptWithAdaptiveComplexity(values);
      setResult(response.explanation);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate a response. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI/ML Concept</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Transformers', 'Reinforcement Learning', 'GANs'" {...field} />
                    </FormControl>
                    <FormDescription>
                      What concept do you want to understand?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userBackground"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Background</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I am a computer science undergraduate with basic Python knowledge' or 'I am a data analyst familiar with scikit-learn but new to deep learning.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your current knowledge and experience. This helps me tailor the explanation for you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Explain Concept
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card>
          <CardContent className="p-6">
            <h2 className="font-headline text-2xl font-bold mb-4">Explanation of {form.getValues('concept')}</h2>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={result} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
