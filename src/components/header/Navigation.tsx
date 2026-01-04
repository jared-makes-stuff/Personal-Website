import { useState, useRef } from 'react';
import { NAV_ITEMS } from './navItems';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={navRef}
      className="relative py-2"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <nav className="flex gap-1">
        {NAV_ITEMS.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => onNavigate(item.id)}
              className={`h-9 px-4 py-2 rounded-md transition-colors ${
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          </div>
        ))}
      </nav>

      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)`,
          }}
        >
          <nav className="flex gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative">
                <div className="h-9 px-4 py-2 relative">
                  <span className="invisible">{item.label}</span>
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary"
                    style={{
                      width: 'calc(100% - 2rem)',
                      boxShadow: `0 0 15px 3px rgba(var(--primary-rgb, 3, 2, 19), 0.6)`,
                      filter: 'blur(0.3px)',
                    }}
                  />
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
