import React from 'react';

/**
 * SectionHeading UI Component — Bodoni Moda 500-600 Heading + Manrope 500 Subhead
 * Two-Font System: Bodoni Moda for section headings, Manrope for subheads and eyebrows.
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
    <div className={`${alignmentClass} mb-6 sm:mb-8 ${className}`}>
      {eyebrow && (
        <span className="font-manrope font-semibold text-[12px] sm:text-[13px] text-[#B4171E] tracking-[0.09em] uppercase block mb-2">
          {eyebrow}
        </span>
      )}
      {title && (
        <Component id={id} className="font-bodoni text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-medium text-[#F5F2EE] leading-[1.05] tracking-[-0.015em]">
          {title}
        </Component>
      )}
      {subtitle && (
        <p className="font-manrope text-[17px] sm:text-[18px] md:text-[19px] lg:text-[21px] text-[#B8B3AF] mt-2 sm:mt-3 font-medium leading-[1.4]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

