import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { ScrollTracker } from './components/header/ScrollTracker';
import { ScrollCues } from './components/header/ScrollCues';
import { NAV_ITEMS } from './components/header/navItems';
import { Home } from './components/pages/Home';
import { AboutMe } from './components/pages/AboutMe';
import { Licenses } from './components/pages/Licenses';
import { Education } from './components/pages/Education';
import { Experience } from './components/pages/Experience';
import { Projects } from './components/pages/Projects';
import { Interest } from './components/pages/Interest';
import { ContactMe } from './components/pages/ContactMe';
import type { SiteData } from './types/site';
import rawSiteData from '../data/site-data.json';

const siteData = rawSiteData as SiteData;

const SECTIONS = NAV_ITEMS.map((item) => item.id);
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [showScrollCues, setShowScrollCues] = useState(false);
  const [cueVisibility, setCueVisibility] = useState({ showPrev: false, showNext: false });

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Track active section on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastDirection = 1;
    let snapTimeout: number | null = null;
    let cueTimeout: number | null = null;
    let snapFrame: number | null = null;
    let isSnapping = false;
    let disableSnapUntil = 0;
    const snapDelay = 140;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    const cancelSnap = () => {
      if (snapFrame !== null) {
        window.cancelAnimationFrame(snapFrame);
        snapFrame = null;
      }
      isSnapping = false;
    };

    const setCuesActive = (shouldShow: boolean) => {
      if (shouldShow) {
        setShowScrollCues(true);
        if (cueTimeout !== null) {
          window.clearTimeout(cueTimeout);
        }
        cueTimeout = window.setTimeout(() => {
          setShowScrollCues(false);
        }, 900);
      } else {
        if (cueTimeout !== null) {
          window.clearTimeout(cueTimeout);
          cueTimeout = null;
        }
        setShowScrollCues(false);
      }
    };

    const isNoSnapTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }
      return Boolean(target.closest('[data-no-snap]'));
    };

    const handlePointerIntent = (event: Event) => {
      if (isNoSnapTarget(event.target)) {
        disableSnapUntil = Date.now() + 600;
      }
      if (isSnapping) {
        cancelSnap();
      }
    };

    const startSnap = (targetY: number) => {
      cancelSnap();
      isSnapping = true;

      let position = window.scrollY;
      let velocity = 0;
      let lastTime: number | null = null;
      const stiffness = 130;
      const damping = 26;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const target = clamp(targetY, 0, Math.max(0, maxScroll));

      const animate = (time: number) => {
        if (lastTime === null) {
          lastTime = time;
        }
        const delta = Math.min(0.04, (time - lastTime) / 1000);
        lastTime = time;

        const displacement = position - target;
        const acceleration = -stiffness * displacement - damping * velocity;
        velocity += acceleration * delta;
        position += velocity * delta;
        position = clamp(position, 0, Math.max(0, maxScroll));
        window.scrollTo(0, position);

        const remaining = target - position;
        if (Math.abs(remaining) < 0.6 && Math.abs(velocity) < 0.6) {
          window.scrollTo(0, target);
          cancelSnap();
          return;
        }

        snapFrame = window.requestAnimationFrame(animate);
      };

      snapFrame = window.requestAnimationFrame(animate);
    };

    const triggerSnap = () => {
      if (isSnapping) {
        return;
      }
      if (Date.now() < disableSnapUntil) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const sections = SECTIONS
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element));

      if (!sections.length) {
        return;
      }

      const viewTop = window.scrollY;
      const viewBottom = viewTop + viewportHeight;
      const headerOffset =
        document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const bounds = sections.map((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        return {
          top,
          bottom: top + height,
          height,
        };
      });

      const snapDownPoint = viewportHeight * 0.3;
      const snapUpPoint = viewportHeight * 0.3;
      let targetY: number | null = null;

      if (lastDirection > 0) {
        const nextCandidate = bounds
          .filter((section) => section.top > viewTop && section.top < viewBottom)
          .sort((a, b) => a.top - b.top)[0];

        if (nextCandidate) {
          const topInView = nextCandidate.top - viewTop;
          if (topInView <= headerOffset + snapDownPoint) {
            targetY = nextCandidate.top - headerOffset;
          }
        }
      } else {
        const prevCandidate = bounds
          .filter((section) => section.bottom > viewTop && section.bottom < viewBottom)
          .sort((a, b) => b.bottom - a.bottom)[0];

        if (prevCandidate) {
          const bottomInView = prevCandidate.bottom - viewTop;
          if (bottomInView >= viewportHeight - snapUpPoint) {
            if (prevCandidate.height >= viewportHeight - headerOffset) {
              targetY = prevCandidate.bottom - viewportHeight;
            } else {
              targetY = prevCandidate.top - headerOffset;
            }
          }
        }
      }

      if (targetY === null || Math.abs(targetY - window.scrollY) < 2) {
        return;
      }

      if (prefersReducedMotion?.matches) {
        window.scrollTo(0, targetY);
        return;
      }

      startSnap(targetY);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const viewportHeight = window.innerHeight;
      let nextActive = SECTIONS[0] ?? 'home';
      let foundActive = false;
      const sectionBounds: Array<{ top: number; bottom: number; height: number }> = [];

      for (const sectionId of SECTIONS) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const bottom = offsetTop + offsetHeight;
          sectionBounds.push({ top: offsetTop, bottom, height: offsetHeight });
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            nextActive = sectionId;
            foundActive = true;
          }
          const rect = element.getBoundingClientRect();
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const maxVisible = Math.min(rect.height, viewportHeight);
          const ratio = maxVisible > 0 ? visibleHeight / maxVisible : 0;
          const progress = clamp(ratio, 0, 1);
          element.style.setProperty('--section-progress', progress.toFixed(3));
        }
      }

      if (foundActive) {
        setActiveSection((current) => (current === nextActive ? current : nextActive));
      }

      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        const nextDirection = currentScrollY > lastScrollY ? 1 : -1;
        if (nextDirection !== lastDirection) {
          lastDirection = nextDirection;
          setScrollDirection(nextDirection === 1 ? 'down' : 'up');
        }
        lastScrollY = currentScrollY;
      }

      if (sectionBounds.length) {
        const viewTop = window.scrollY;
        const viewBottom = viewTop + viewportHeight;
        const nextCandidate = sectionBounds
          .filter((section) => section.top > viewTop && section.top < viewBottom)
          .sort((a, b) => a.top - b.top)[0];
        const prevCandidate = sectionBounds
          .filter((section) => section.bottom > viewTop && section.bottom < viewBottom)
          .sort((a, b) => b.bottom - a.bottom)[0];

        const showNext = lastDirection > 0 && Boolean(nextCandidate);
        const showPrev = lastDirection < 0 && Boolean(prevCandidate);

        setCueVisibility((current) => {
          if (current.showPrev === showPrev && current.showNext === showNext) {
            return current;
          }
          return { showPrev, showNext };
        });

        setCuesActive(showNext || showPrev);
      } else {
        setCuesActive(false);
      }

      if (snapTimeout !== null) {
        window.clearTimeout(snapTimeout);
      }
      snapTimeout = window.setTimeout(() => {
        triggerSnap();
      }, snapDelay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('wheel', handlePointerIntent, { passive: true, capture: true });
    window.addEventListener('touchstart', handlePointerIntent, { passive: true, capture: true });
    window.addEventListener('pointerdown', handlePointerIntent, { passive: true, capture: true });
    handleScroll();

    return () => {
      cancelSnap();
      if (snapTimeout !== null) {
        window.clearTimeout(snapTimeout);
      }
      if (cueTimeout !== null) {
        window.clearTimeout(cueTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', handlePointerIntent, { capture: true } as AddEventListenerOptions);
      window.removeEventListener('touchstart', handlePointerIntent, { capture: true } as AddEventListenerOptions);
      window.removeEventListener('pointerdown', handlePointerIntent, { capture: true } as AddEventListenerOptions);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeSection),
  );
  const prevItem = activeIndex > 0 ? NAV_ITEMS[activeIndex - 1] : undefined;
  const nextItem =
    activeIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[activeIndex + 1] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        socials={siteData.socials}
      />
      <ScrollTracker activeSection={activeSection} onNavigate={handleNavigate} />
      {showScrollCues ? (
        <ScrollCues
          prev={cueVisibility.showPrev ? prevItem : undefined}
          next={cueVisibility.showNext ? nextItem : undefined}
          direction={scrollDirection}
          onNavigate={handleNavigate}
        />
      ) : null}
      
      <main>
        <Home onNavigate={handleNavigate} data={siteData.hero} />
        <AboutMe 
          data={siteData.about} 
          skills={siteData.skills}
          targets={siteData.targets}
          highlights={siteData.highlights}
        />
        <Projects data={siteData.projects} />
        {siteData.experience && <Experience data={siteData.experience} />}
        {siteData.education && <Education data={siteData.education} />}
        {siteData.licenses && <Licenses data={siteData.licenses} />}
        <Interest data={siteData.interests} />
        <ContactMe data={siteData.contact} />
      </main>
    </div>
  );
}
