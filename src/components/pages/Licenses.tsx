import { useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { SectionTitle } from '../ui/SectionTitle';
import { ExternalLink } from 'lucide-react';
import type { LicensesData } from '../../types/site';
import { normalizeExternalUrl } from '../../utils/urls';

interface LicensesProps {
  data: LicensesData;
}

export function Licenses({ data }: LicensesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const items = data.items;
  const renderedItems = items.concat(items);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    let frameId = 0;
    let lastTime = 0;
    const speed = 30;

    const step = (time: number) => {
      if (!lastTime) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;

      if (!pauseRef.current) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll > 1) {
          const loopPoint = container.scrollHeight / 2;
          if (loopPoint > 1) {
            positionRef.current += (delta / 1000) * speed;
            if (positionRef.current >= loopPoint) {
              positionRef.current -= loopPoint;
            }
            container.scrollTop = positionRef.current;
          }
        }
      }

      frameId = window.requestAnimationFrame(step);
    };

    pauseRef.current = false;
    container.scrollTop = 0;
    positionRef.current = 0;
    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
  }, [items.length]);

  const pauseAutoScroll = () => {
    pauseRef.current = true;
    if (scrollRef.current) {
      positionRef.current = scrollRef.current.scrollTop;
    }
  };

  const resumeAutoScroll = () => {
    if (scrollRef.current) {
      positionRef.current = scrollRef.current.scrollTop;
    }
    pauseRef.current = false;
  };

  const scheduleResume = () => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      resumeTimeoutRef.current = null;
      resumeAutoScroll();
    }, 1200);
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      resumeAutoScroll();
    }
  };

  return (
    <section
      id="licenses"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-center py-20"
    >
      <div className="section-content max-w-4xl w-full mx-auto px-6">
        <SectionTitle title={data.title} className="mb-4" />
        {data.intro ? (
          <p className="section-intro text-muted-foreground mb-8">{data.intro}</p>
        ) : null}

        <div
          ref={scrollRef}
          className="licenses-scroll scrollbar-hide"
          data-no-snap
          onWheel={() => {
            pauseAutoScroll();
            scheduleResume();
          }}
          onPointerDown={pauseAutoScroll}
          onPointerUp={scheduleResume}
          onPointerCancel={scheduleResume}
          onFocusCapture={pauseAutoScroll}
          onBlurCapture={handleBlurCapture}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={scheduleResume}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={scheduleResume}
        >
          <div className="licenses-list">
            {renderedItems.map((item, idx) => {
              const credentialUrl = normalizeExternalUrl(item.credentialUrl);
              const hasMeta = item.issued || item.credentialId;
              const isClone = idx >= items.length;

              return (
                <Card
                  key={`${item.title}-${item.issuer}-${idx}`}
                  className={`p-6 w-full${isClone ? ' license-clone' : ''}`}
                  aria-hidden={isClone ? true : undefined}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="item-title">{item.title}</h3>
                        <p className="text-muted-foreground">{item.issuer}</p>
                      </div>
                      {credentialUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-hidden={isClone ? true : undefined}
                            tabIndex={isClone ? -1 : undefined}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Show credential
                          </a>
                        </Button>
                      ) : null}
                    </div>
                    {hasMeta ? (
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {item.issued ? <span>Issued {item.issued}</span> : null}
                        {item.credentialId ? (
                          <span>Credential ID {item.credentialId}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
