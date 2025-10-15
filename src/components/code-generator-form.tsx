'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateAndExplainCodeSnippets } from '@/ai/flows/generate-and-explain-code-snippets';

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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

const formSchema = z.object({
  task: z.string().min(10, {
    message: 'Please describe the task in at least 10 characters.',
  }),
  libraries: z.string().min(2, {
    message: 'Please specify at least one library.',
  }),
});

export function CodeGeneratorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ codeSnippet: string; explanation: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      libraries: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await generateAndExplainCodeSnippets(values);
      setResult(response);
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
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Train a simple linear regression model' or 'Perform sentiment analysis on a piece of text'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the AI or ML task you want code for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="libraries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Libraries</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'scikit-learn, pandas' or 'tensorflow, numpy'"
                        className="min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What Python libraries should be used? (comma-separated)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Code
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
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="font-headline text-2xl font-bold mb-4">Generated Code Snippet</h2>
              <div className="prose dark:prose-invert max-w-none rounded-md bg-background">
                <MarkdownRenderer content={`\`\`\`python\n${result.codeSnippet}\n\`\`\``} />
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="font-headline text-2xl font-bold mb-4">Explanation</h2>
              <div className="prose dark:prose-invert max-w-none">
                <MarkdownRenderer content={result.explanation} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
