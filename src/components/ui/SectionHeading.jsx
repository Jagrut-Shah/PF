import React from 'react';

/**
 * SectionHeading UI Component — Bodoni Moda Display Title (400) + Manrope Subtitle (400)
 * Follows Section 9 & 41 specifications for responsive major section headings.
 */
export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  as: Component = 'h2',
  id,
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${alignmentClass} mb-6 sm:mb-8 ${className}`}>
      {title && (
        <Component id={id} className="font-serif text-[32px] sm:text-[42px] md:text-[52px] font-normal text-[#F6EFE7] leading-[1.02] tracking-tight">
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#E7C4C5]/85 mt-2 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
