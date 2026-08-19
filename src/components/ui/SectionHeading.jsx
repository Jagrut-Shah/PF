import React from 'react';

/**
 * SectionHeading UI Component
 * Reusable editorial heading with title and subtitle support.
 */
export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  as: Component = 'h2',
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${alignmentClass} mb-4 sm:mb-5 ${className}`}>
      {title && (
        <Component className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-elava-charcoal leading-tight">
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-sans text-[13px] sm:text-[14px] text-elava-stone mt-1 sm:mt-1.5 font-normal tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
