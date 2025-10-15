import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BrainCircuit, Code2, Lightbulb, BookOpen } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    title: 'Personalized Learning Paths',
    description: 'Generate a tailored learning plan based on your skills and goals.',
    href: '/learning-path',
    icon: BrainCircuit,
    image: PlaceHolderImages[0],
  },
  {
    title: 'Code Generator',
    description: 'Get Python code snippets for various AI/ML tasks with clear explanations.',
    href: '/code-generator',
    icon: Code2,
    image: PlaceHolderImages[1],
  },
  {
    title: 'Project Idea Generator',
    description: 'Brainstorm project ideas that match your skill level and interests.',
    href: '/project-ideas',
    icon: Lightbulb,
    image: PlaceHolderImages[2],
  },
  {
    title: 'Concept Explainer',
    description: 'Understand complex AI/ML concepts with adaptive explanations.',
    href: '/concept-explainer',
    icon: BookOpen,
    image: PlaceHolderImages[3],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center p-8 rounded-lg bg-card border">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Hey there! I'm Alex 🤖
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your personal AI learning companion. I can help you with everything from basic Python to advanced NLP models. Whether you're a beginner or a pro, I'm here to help you learn. What's on your mind today?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {feature.image && (
                   <div className="overflow-hidden rounded-md">
                    <Image
                      src={feature.image.imageUrl}
                      alt={feature.image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={feature.image.imageHint}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
