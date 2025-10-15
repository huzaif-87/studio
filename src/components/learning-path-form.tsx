'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generatePersonalizedLearningPath } from '@/ai/flows/generate-personalized-learning-path';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  skillLevel: z.enum(['Beginner', 'Intermediate', 'Pro']),
  goals: z.string().min(10, {
    message: 'Please describe your goals in at least 10 characters.',
  }),
});

export function LearningPathForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillLevel: 'Beginner',
      goals: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult('');
    try {
      const response = await generatePersonalizedLearningPath(values);
      setResult(response.learningPath);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Pro">Pro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How would you rate your current expertise?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I want to build a career in Natural Language Processing', or 'I want to learn how to use TensorFlow for computer vision projects.'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What do you want to achieve? Be as specific as possible.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Learning Path
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
            <h2 className="font-headline text-2xl font-bold mb-4">Your Personalized Learning Path</h2>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={result} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
