import React from 'react';

/**
 * MainContainer Layout Component
 * Standard layout container (max-w ~1240px) with responsive horizontal padding.
 * Ensures consistent alignment across all desktop and mobile views.
 */
export default function MainContainer({ children, className = '', as = 'div', ...props }) {
  const Component = as;
  return (
    <Component
      className={`w-full max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
