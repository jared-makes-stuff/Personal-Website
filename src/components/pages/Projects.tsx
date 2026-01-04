import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { SectionTitle } from '../ui/SectionTitle';
import { ExternalLink, Github } from 'lucide-react';
import { useState, type PointerEvent, type CSSProperties } from 'react';
import type { ProjectsData } from '../../types/site';
import { normalizeExternalUrl, resolveAssetUrl } from '../../utils/urls';

interface ProjectsProps {
  data: ProjectsData;
}

export function Projects({ data }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projects = data.items;
  const titleColor = activeProject ? 'hsl(var(--background))' : 'hsl(var(--foreground))';
  const introColor = activeProject
    ? 'hsl(var(--background))'
    : 'hsl(var(--muted-foreground))';

  const handleCardPointerDown = (
    event: PointerEvent<HTMLDivElement>,
    projectId: string,
  ) => {
    if (event.pointerType !== 'touch') {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target?.closest('a,button')) {
      return;
    }
    setActiveProject((current) => (current === projectId ? null : projectId));
  };

  return (
    <section
      id="projects"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-start py-20 relative overflow-hidden"
      style={{ '--section-title-color': titleColor } as CSSProperties}
    >
      {/* Background images - fade in/out based on hover */}
      {projects.map((project) => {
        const backgroundUrl = resolveAssetUrl(project.imageUrl);
        if (!backgroundUrl) {
          return null;
        }
        return (
          <div
            key={project.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: activeProject === project.id ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundUrl})` }}
            />
            <div className="absolute inset-0 bg-background/50" />
          </div>
        );
      })}

      {/* Content */}
      <div className="section-content w-full px-6">
        <SectionTitle
          title={data.title}
          className="mb-4 transition-colors duration-700"
        />
        <p 
          className="section-intro mb-8 transition-colors duration-700"
          style={{ color: introColor }}
        >
          {data.intro}
        </p>
        
        <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide" data-no-snap>
          {projects.map((project) => {
            const isHovered = activeProject === project.id;
            const githubUrl = normalizeExternalUrl(project.githubUrl);
            const demoUrl = normalizeExternalUrl(project.demoUrl);
            
            return (
              <Card
                key={project.id}
                className="bg-foreground/90 text-background backdrop-blur-md border-foreground/30 transition-all duration-300 hover:bg-foreground overflow-hidden origin-left relative"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                onPointerDown={(event) => handleCardPointerDown(event, project.id)}
                style={{
                  height: isHovered ? '180px' : '60px',
                  width: isHovered ? '700px' : '280px',
                }}
              >
                <h3 
                  className="item-title text-background absolute transition-all duration-300 z-10"
                  style={{
                    top: isHovered ? '16px' : '50%',
                    left: isHovered ? '16px' : '16px',
                    transform: isHovered ? 'translateY(0)' : 'translateY(-50%)',
                  }}
                >
                  {project.title}
                </h3>
                
                <div 
                  className="h-full flex flex-col transition-opacity duration-300"
                  style={{ 
                    opacity: isHovered ? 1 : 0,
                    transitionDelay: isHovered ? '200ms' : '0ms',
                    pointerEvents: isHovered ? 'auto' : 'none',
                    paddingTop: '56px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingBottom: '16px',
                  }}
                >
                  <p className="text-background mb-3 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="bg-background/20 text-background border-background/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      {githubUrl ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-background/10 text-background border-background/30 hover:bg-background/20"
                          asChild
                        >
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      ) : null}
                      {demoUrl ? (
                        <Button 
                          size="sm" 
                          className="bg-background text-foreground hover:bg-background/90"
                          asChild
                        >
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      ) : null}
                    </div>
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
