import { ConceptExplainerForm } from '@/components/concept-explainer-form';

export default function ConceptExplainerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Concept Explainer</h1>
        <p className="text-lg text-muted-foreground">
         Offer explanations of complex AI/ML concepts using analogies and varying levels of depth.
        </p>
      </div>
      <ConceptExplainerForm />
    </div>
  );
}
