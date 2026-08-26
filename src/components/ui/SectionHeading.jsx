import React from 'react';

/**
 * SectionHeading UI Component
 * Editorial serif title (Cormorant Garamond, font-normal) and functional sans-serif subtitle (Manrope)
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
        <Component id={id} className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F6EFE7] leading-[1.1] tracking-tight">
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
