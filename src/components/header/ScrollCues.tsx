import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollCuesProps {
  prev?: { id: string; label: string };
  next?: { id: string; label: string };
  direction: 'up' | 'down';
  onNavigate: (section: string) => void;
}

export function ScrollCues({ prev, next, direction, onNavigate }: ScrollCuesProps) {
  return (
    <>
      {prev ? (
        <button
          type="button"
          className={`scroll-cue top${direction === 'up' ? ' active' : ''}`}
          onClick={() => onNavigate(prev.id)}
          aria-label={`Previous section: ${prev.label}`}
        >
          <span className="scroll-cue-inner">
            <ChevronUp className="scroll-cue-icon" />
            <span className="scroll-cue-label">Prev: {prev.label}</span>
          </span>
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          className={`scroll-cue bottom${direction === 'down' ? ' active' : ''}`}
          onClick={() => onNavigate(next.id)}
          aria-label={`Next section: ${next.label}`}
        >
          <span className="scroll-cue-inner">
            <ChevronDown className="scroll-cue-icon" />
            <span className="scroll-cue-label">Next: {next.label}</span>
          </span>
        </button>
      ) : null}
    </>
  );
}
