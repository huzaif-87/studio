'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { zenithFlowAiGuide } from '@/ai/flows/zenith-flow-ai-guide';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Loader2, User, BotMessageSquare, Send } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  message: z.string().min(1, {
    message: 'Message cannot be empty.',
  }),
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AiGuideChat() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  async function callApi(message: string) {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      const response = await zenithFlowAiGuide({ message });
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response.response },
      ]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a response. Please try again.',
      });
      setMessages(prev =>
        prev.filter(msg => msg.role !== 'user' || msg.content !== message)
      );
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await callApi(values.message);
  }

  async function onSummarise() {
    await callApi('[ACTION:SUMMARISE_CONCEPT]');
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        role: 'assistant',
        content:
          'Hello! I am the Zenith Flow AI Guide. You can ask me questions about the Zenith Flow concept, or use the \'Summarise\' button for an overview. How can I help?',
      },
    ]);
  }, []);

  return (
    <Card className="h-[70vh] flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BotMessageSquare className="w-6 h-6 text-primary" />
          <h2 className="font-headline text-xl font-bold">Zenith Flow AI Guide</h2>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <BotMessageSquare className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    <MarkdownRenderer content={message.content} />
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
             {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <BotMessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="rounded-lg p-3 bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className='w-full space-y-2'>
        <Button onClick={onSummarise} variant="outline" size="sm" className="mr-2">Summarise Concept</Button>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 w-full">
          <Input
            {...form.register('message')}
            placeholder="Ask a question about Zenith Flow..."
            autoComplete="off"
            disabled={loading}
          />
          <Button type="submit" disabled={loading} size="icon">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        </div>
      </CardFooter>
    </Card>
  );
}
