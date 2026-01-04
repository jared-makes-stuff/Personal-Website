import type { CSSProperties } from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
  style?: CSSProperties;
}

export function SectionTitle({ title, className, style }: SectionTitleProps) {
  const titleClass = className
    ? `section-title section-title-inline ${className}`
    : 'section-title section-title-inline';
  return (
    <h1 className={titleClass} style={style}>
      {title}
    </h1>
  );
}
