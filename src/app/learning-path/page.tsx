import { LearningPathForm } from '@/components/learning-path-form';

export default function LearningPathPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Personalized Learning Path</h1>
        <p className="text-lg text-muted-foreground">
          Generate a tailored learning plan for AI, ML, and Data Science based on your skill level and goals.
        </p>
      </div>
      <LearningPathForm />
    </div>
  );
}
