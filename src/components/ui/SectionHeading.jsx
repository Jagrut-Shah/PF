import React from 'react';

/**
 * SectionHeading — Bodoni Moda Title in Very Dark Cream #DAC29F + Manrope Eyebrow & Subhead.
 * Designed for Cherry and Black luxury environments.
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

  const eyebrowColor = isDark ? 'text-[#DAC29F]/90' : 'text-[#0A3282]';
  const titleColor = 'text-[#DAC29F]';
  const subtitleColor = isDark ? 'text-[#DAC29F]/80' : 'text-[#A89A8B]';

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
