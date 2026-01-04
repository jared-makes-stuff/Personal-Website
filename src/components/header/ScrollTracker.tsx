import { NAV_ITEMS } from './navItems';

interface ScrollTrackerProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function ScrollTracker({ activeSection, onNavigate }: ScrollTrackerProps) {
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeSection),
  );

  return (
    <div className="scroll-tracker">
      {NAV_ITEMS.map((item, idx) => {
        const isActive = idx === activeIndex;
        const isPast = idx < activeIndex;

        return (
          <div key={item.id} className={`tracker-node${isActive ? ' active' : ''}`}>
            <div className="tracker-marker">
              {isActive ? (
                <span className="tracker-active-title">{item.label}</span>
              ) : (
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`tracker-dot${isPast ? ' past' : ''}`}
                  aria-label={item.label}
                />
              )}
            </div>
            {idx < NAV_ITEMS.length - 1 ? (
              <span className={`tracker-line${isPast ? ' active' : ''}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
