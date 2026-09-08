const artwork = {
  horizontal: { file: 'ajob-horizontal-original.png', x: 54, y: 855, width: 1848, height: 313 },
  symbol: { file: 'ajob-symbol-original.png', x: 361, y: 470, width: 1234, height: 1130 },
};

/** Crop only transparent padding. Original pixels, lettering and white band stay untouched. */
export default function BrandMark({ variant, className = '', label = '' }: {
  variant: keyof typeof artwork;
  className?: string;
  label?: string;
}) {
  const art = artwork[variant];
  return <span className={`brand-mark ${className}`.trim()} style={{ aspectRatio: `${art.width} / ${art.height}` }}>
    <img
      src={`/assets/brand/${art.file}`}
      width={2000}
      height={2000}
      alt={label}
      aria-hidden={label ? undefined : true}
      style={{ width: `${2000 / art.width * 100}%`, left: `${-art.x / art.width * 100}%`, top: `${-art.y / art.height * 100}%` }}
    />
  </span>;
}
