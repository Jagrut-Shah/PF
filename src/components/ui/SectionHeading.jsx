import React from 'react';

/**
 * SectionHeading UI Component
 * Editorial heading with title (#F6EFE7 Cream) and subtitle (#E7C4C5 Soft Blush) over Deep Cherry/Wine canvas.
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
    <div className={`${alignmentClass} mb-4 sm:mb-5 ${className}`}>
      {title && (
        <Component id={id} className="font-serif text-[26px] sm:text-[30px] md:text-[32px] tracking-[0.06em] font-normal uppercase text-[#F6EFE7] leading-tight">
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-sans text-[13px] sm:text-[14px] text-[#E7C4C5]/85 mt-1 sm:mt-1.5 font-normal tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
