import { Card } from '../ui/card';
import { SectionTitle } from '../ui/SectionTitle';
import type { ExperienceData } from '../../types/site';
import { resolveAssetUrl } from '../../utils/urls';

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section
      id="experience"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-center py-20"
    >
      <div className="section-content max-w-4xl w-full mx-auto px-6">
        <SectionTitle title={data.title} className="mb-8" />
        
        <div className="flex flex-col">
          {data.items.map((exp, idx) => {
            const logoUrl = resolveAssetUrl(exp.logo);
            const isLast = idx === data.items.length - 1;
            return (
              <Card key={idx} className={`p-6 w-full${isLast ? '' : ' mb-6'}`}>
                <div className="flex gap-6">
                  <div className="logo-pill-wrap">
                    {logoUrl ? (
                      <div className="logo-pill">
                        <img 
                          src={logoUrl} 
                          alt={exp.company}
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <h3 className="item-title mb-1">{exp.company}</h3>
                    <p className="text-muted-foreground mb-1">{exp.role}</p>
                    <p className="text-sm text-muted-foreground mb-3">{exp.dates}</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
