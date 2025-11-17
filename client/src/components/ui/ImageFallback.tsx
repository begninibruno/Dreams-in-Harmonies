import React, { useState } from 'react';

type Props = {
  src?: string;
  alt?: string;
  size?: number; // pixels
  name?: string; // usado para gerar iniciais
  className?: string;
};

const computeInitials = (name?: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0]?.toUpperCase() ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0]?.toUpperCase() : '';
  return `${first}${last}` || name.slice(0, 2).toUpperCase();
};

export default function ImageFallback({ src, alt, size = 40, name, className }: Props) {
  const [failed, setFailed] = useState(false);

  const initials = computeInitials(name || alt || '');

  const accent = 'var(--tw-color-accent, #7c3aed)';
  const bg = 'var(--tw-bg-card, #f8f9fb)';

  if (!src || failed) {
    // render minimal SVG placeholder consistent with site palette
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: 'rgba(124,58,237,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={alt}>
          <rect width="100%" height="100%" rx="8" fill="#F5F3FF" />
          <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'" fontSize={Math.floor(size / 2.5)} fill="#7c3aed" fontWeight={700}>
            {initials}
          </text>
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={src}
      alt={alt}
      className={className}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ borderRadius: 8, objectFit: 'cover' }}
    />
  );
}
