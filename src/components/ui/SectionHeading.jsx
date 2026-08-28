import React from 'react';

/**
 * SectionHeading — Cherry eyebrow, Espresso title, Taupe subtitle.
 * Corrected scale (no more oversized headings).
 */
export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  as: Component = 'h2',
  id,
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`${alignmentClass} mb-5 sm:mb-7 ${className}`}>
      {eyebrow && (
        <span className="font-manrope font-semibold text-[11px] sm:text-[12px] text-[#F3E8D8] tracking-[0.09em] uppercase block mb-2">
          {eyebrow}
        </span>
      )}
      {title && (
        <Component
          id={id}
          className="font-bodoni text-[22px] sm:text-[28px] md:text-[34px] font-medium text-[#FAF6EF] leading-[1.05] tracking-[-0.015em]"
        >
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-manrope text-[13px] sm:text-[14px] md:text-[15px] text-[#F3E8D8]/70 mt-1.5 font-normal leading-[1.45]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
