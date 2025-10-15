import { CodeGeneratorForm } from '@/components/code-generator-form';

export default function CodeGeneratorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Code Generator</h1>
        <p className="text-lg text-muted-foreground">
          Provide well-documented code snippets in Python for various AI/ML tasks, explaining each step.
        </p>
      </div>
      <CodeGeneratorForm />
    </div>
  );
}
