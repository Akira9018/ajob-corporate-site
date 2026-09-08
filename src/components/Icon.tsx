import type { CSSProperties } from 'react';
import type { IconName } from '../iconMap';

/** Decorative by default: adjacent text carries the meaning without duplicate announcements. */
export default function Icon({ name, size = 32, className = '', label = '' }: {
  name: IconName;
  size?: number;
  className?: string;
  label?: string;
}) {
  return <img
    className={`ajob-icon ${className}`.trim()}
    src={`/assets/icons/${name}.svg`}
    width={size}
    height={size}
    alt={label}
    aria-hidden={label ? undefined : true}
    style={{ '--icon-size': `${size}px` } as CSSProperties}
    decoding="async"
  />;
}
