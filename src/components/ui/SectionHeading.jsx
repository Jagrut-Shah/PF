import React from 'react';

/**
 * SectionHeading — Bodoni Moda Title + Manrope Eyebrow & Subhead.
 * Supports light mode (default dark text) and dark mode (Cherry backgrounds with Cream text).
 */
export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  as: Component = 'h2',
  id,
  isDark = true, // Default to true for Cherry backgrounds
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  const eyebrowColor = isDark ? 'text-[#F4EBDD]/90' : 'text-[#8B1E2D]';
  const titleColor = isDark ? 'text-[#F4EBDD]' : 'text-[#2A211F]';
  const subtitleColor = isDark ? 'text-[#F4EBDD]/75' : 'text-[#A89A8B]';

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
