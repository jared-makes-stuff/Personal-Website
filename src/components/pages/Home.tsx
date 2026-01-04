import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import type { HeroData } from '../../types/site';
import { resolveAssetUrl } from '../../utils/urls';

interface HomeProps {
  onNavigate: (sectionId: string) => void;
  data: HeroData;
}

export function Home({ onNavigate, data }: HomeProps) {
  const heroImageUrl = resolveAssetUrl(data.imageUrl);

  const handleCtaClick = (target: string) => {
    if (!target) return;
    if (target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:')) {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    const sectionId = target.startsWith('#') ? target.slice(1) : target;
    onNavigate(sectionId);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        {heroImageUrl ? (
          <div className="mb-8 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img
                src={heroImageUrl}
                alt={data.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary">
            {data.badge}
          </span>
        </div>
        <h1 className="hero-title mb-6">
          {data.title}
        </h1>
        <h2 className="hero-subtitle text-muted-foreground mb-8">
          {data.subtitle}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          {data.description}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => handleCtaClick(data.ctas.primary.target)}>
            {data.ctas.primary.label}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCtaClick(data.ctas.secondary.target)}
          >
            {data.ctas.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
