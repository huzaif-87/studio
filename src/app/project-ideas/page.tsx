import { ProjectIdeaForm } from '@/components/project-idea-form';

export default function ProjectIdeasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Project Idea Generator</h1>
        <p className="text-lg text-muted-foreground">
          Suggest AI/ML project ideas based on skill level and interests, from beginner to advanced.
        </p>
      </div>
      <ProjectIdeaForm />
    </div>
  );
}
