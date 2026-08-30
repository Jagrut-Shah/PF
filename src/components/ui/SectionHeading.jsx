import React from 'react';

/**
 * SectionHeading — Bodoni Moda Title in Golden #C6A15B + Manrope Eyebrow & Subhead.
 * Designed for Black + Gold + Cherry luxury palette.
 */
export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  as: Component = 'h2',
  id,
  isDark = true,
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  const eyebrowColor = isDark ? 'text-[#C6A15B]/90' : 'text-[#8B1E2D]';
  const titleColor = 'text-[#C6A15B]';
  const subtitleColor = isDark ? 'text-[#F4EBDD]/80' : 'text-[#A89A8B]';

  return (
    <div className={`${alignmentClass} mb-5 sm:mb-7 ${className}`}>
      {eyebrow && (
        <span className={`font-manrope font-semibold text-[11px] sm:text-[12px] tracking-[0.09em] uppercase block mb-2 ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <Component
          id={id}
          className={`font-bodoni text-[22px] sm:text-[28px] md:text-[34px] font-medium leading-[1.05] tracking-[-0.015em] ${titleColor}`}
        >
          {title}
        </Component>
      )}
      {subtitle && (
        <p className={`font-manrope text-[13px] sm:text-[14px] md:text-[15px] mt-1.5 font-normal leading-[1.45] ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
