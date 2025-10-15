import { AiGuideChat } from '@/components/ai-guide-chat';

export default function AiGuidePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">AI Guide</h1>
        <p className="text-lg text-muted-foreground">
          Your friendly assistant for all questions about the Zenith Flow concept.
        </p>
      </div>
      <AiGuideChat />
    </div>
  );
}
