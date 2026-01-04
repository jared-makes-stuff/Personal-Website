import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { SectionTitle } from '../ui/SectionTitle';
import type { AboutData, SkillsData, TargetsData, HighlightsData } from '../../types/site';

interface AboutMeProps {
  data: AboutData;
  skills: SkillsData;
  targets?: TargetsData;
  highlights?: HighlightsData;
}

export function AboutMe({ data, skills, targets, highlights }: AboutMeProps) {
  return (
    <section
      id="about"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-center py-20"
    >
      <div className="section-content max-w-4xl mx-auto px-6">
        <SectionTitle title={data.title} className="mb-8" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="subsection-title mb-4">{data.storyTitle}</h3>
            {data.storyParagraphs.map((paragraph, index) => (
              <p key={`story-${index}`} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div>
            <h3 className="subsection-title mb-4">{data.workTitle}</h3>
            {data.workParagraphs.map((paragraph, index) => (
              <p key={`work-${index}`} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {targets && (
          <Card className="p-6 mb-6">
            <h3 className="subsection-title mb-6">{targets.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {targets.items.map((target) => (
                <div key={target.id} className="border-l-4 border-primary pl-4">
                  <h4 className="item-title mb-3">{target.title}</h4>
                  <ul className="space-y-2">
                    {target.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

        {highlights && (
          <Card className="p-6 mb-6">
            <h3 className="subsection-title mb-6">{highlights.title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.items.map((highlight) => (
                <div key={highlight.id} className="border-l-4 border-primary pl-4">
                  <h4 className="item-title mb-3">{highlight.title}</h4>
                  <ul className="space-y-2">
                    {highlight.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-muted-foreground text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h3 className="subsection-title mb-4">Software Engineering Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.software.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="subsection-title mb-4">Other Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.other.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
