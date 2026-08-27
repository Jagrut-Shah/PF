import React from 'react';

/**
 * SectionHeading UI Component — Bodoni Moda Display Title (400) + Manrope Subtitle (400)
 * Black & Red Palette: Warm White #F5F2EE title + Muted Gray #B8B3AF subtitle.
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
        <Component id={id} className="font-serif text-[32px] sm:text-[42px] md:text-[52px] font-normal text-[#F5F2EE] leading-[1.02] tracking-tight">
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#B8B3AF] mt-2 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
