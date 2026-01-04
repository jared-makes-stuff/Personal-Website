import { Linkedin, Github } from 'lucide-react';
import { normalizeExternalUrl } from '../../utils/urls';

interface ContactLinksProps {
  linkedin?: string;
  github?: string;
}

export function ContactLinks({ linkedin, github }: ContactLinksProps) {
  const links = [
    { href: normalizeExternalUrl(linkedin), label: 'LinkedIn', Icon: Linkedin },
    { href: normalizeExternalUrl(github), label: 'GitHub', Icon: Github },
  ].filter((link) => Boolean(link.href));

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
