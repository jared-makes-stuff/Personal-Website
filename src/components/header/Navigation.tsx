import { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS } from './navItems';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setMenuOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setMenuOpen(false);
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      ref={navRef}
      className="relative py-2"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="nav-desktop">
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
            className="nav-hover-overlay absolute inset-0 pointer-events-none transition-opacity duration-300"
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

      <div className="nav-mobile">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="nav-toggle-icon" /> : <Menu className="nav-toggle-icon" />}
          <span className="nav-toggle-label">Menu</span>
        </button>
        <div
          id="primary-nav-menu"
          className={`nav-menu${menuOpen ? ' open' : ''}`}
          role="menu"
        >
          <nav className="nav-menu-list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`nav-menu-item${activeSection === item.id ? ' active' : ''}`}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
