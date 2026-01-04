import { Card } from '../ui/card';
import { ExternalLink, TrendingUp, Code, Flag, CircleDot, Plane } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import type { InterestsData } from '../../types/site';
import { normalizeExternalUrl, resolveAssetUrl } from '../../utils/urls';

const ICONS: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  code: Code,
  flag: Flag,
  "circle-dot": CircleDot,
  plane: Plane,
};

interface InterestProps {
  data: InterestsData;
}

export function Interest({ data }: InterestProps) {
  const interests = data.items;
  const useBalancedGrid = interests.length % 3 === 1 && interests.length > 1;

  return (
    <section
      id="interest"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-center py-20"
    >
      <div className="section-content max-w-6xl mx-auto px-6">
        <SectionTitle title={data.title} className="mb-4" />
        <p className="section-intro text-muted-foreground mb-12">{data.intro}</p>
        
        <div className={`interest-grid${useBalancedGrid ? ' interest-grid-balanced' : ''}`}>
          {interests.map((interest) => {
            const Icon = ICONS[interest.icon] || Code;
            const imageUrl = resolveAssetUrl(interest.imageUrl);
            const linkUrl = normalizeExternalUrl(interest.linkUrl);
            const linkLabel = interest.linkLabel;

            return (
              <Card key={interest.id} className="p-6 interest-card hover:shadow-lg transition-shadow">
                <div className="interest-media">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={interest.title}
                      loading="lazy"
                      className="interest-image"
                    />
                  ) : (
                    <Icon className="interest-icon" />
                  )}
                </div>
                <h3 className="item-title mb-2">{interest.title}</h3>
                <p className="text-muted-foreground mb-4">{interest.description}</p>
                {linkUrl && linkLabel ? (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interest-link"
                  >
                    <span>{linkLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
