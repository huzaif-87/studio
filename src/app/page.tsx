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
    className: 'lg:col-span-1',
  },
  {
    title: 'Code Generator',
    description: 'Get Python code snippets for various AI/ML tasks with clear explanations.',
    href: '/code-generator',
    icon: Code2,
    image: PlaceHolderImages[1],
    className: 'lg:col-span-1',
  },
  {
    title: 'Project Idea Generator',
    description: 'Brainstorm project ideas that match your skill level and interests.',
    href: '/project-ideas',
    icon: Lightbulb,
    image: PlaceHolderImages[2],
    className: 'lg:col-span-1',
  },
  {
    title: 'Concept Explainer',
    description: 'Understand complex AI/ML concepts with adaptive explanations.',
    href: '/concept-explainer',
    icon: BookOpen,
    image: PlaceHolderImages[3],
    className: 'lg:col-span-1',
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center p-8 rounded-lg glassmorphism">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
          Zenith Flow
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Navigate Complexity, Achieve Clarity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-2xl group-hover:-translate-y-2 glassmorphism">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="font-headline text-white">{feature.title}</CardTitle>
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
