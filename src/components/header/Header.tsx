import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';
import { ContactLinks } from './ContactLinks';
import { Button } from '../ui/button';
import { Coffee } from 'lucide-react';
import type { SocialLinks } from '../../types/site';
import { normalizeExternalUrl } from '../../utils/urls';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  socials: SocialLinks;
}

export function Header({ isDark, toggleTheme, activeSection, onNavigate, socials }: HeaderProps) {
  const kofiUrl = normalizeExternalUrl(socials.kofi);
  const buymeacoffeeUrl = normalizeExternalUrl(socials.buymeacoffee);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="px-6 h-16 flex items-center justify-between">
        <Navigation activeSection={activeSection} onNavigate={onNavigate} />
        
        <div className="flex items-center gap-4">
          <ContactLinks linkedin={socials.linkedin} github={socials.github} />
          {kofiUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a
                href={kofiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                Ko-fi
              </a>
            </Button>
          ) : null}
          {buymeacoffeeUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a
                href={buymeacoffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                Buy me a coffee
              </a>
            </Button>
          ) : null}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
