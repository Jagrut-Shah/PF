import React from 'react';

/**
 * StarRating UI Component
 * Renders fractional partial star fills matching exact numeric ratings
 * (e.g. 4.8 = 4 full stars + 80% 5th star fill).
 */
export default function StarRating({
  rating = 5,
  size = 14,
  className = '',
  starColor = '#CFA838',
  emptyColor = '#DCD8CF',
}) {
  const numericRating = Math.max(0, Math.min(5, Number(rating) || 5));

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rating: ${numericRating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fillFraction = Math.max(0, Math.min(1, numericRating - index));
        const fillPercent = (fillFraction * 100).toFixed(1);
        const gradientId = `elava-star-grad-${index}-${fillPercent.replace('.', '-')}`;

        return (
          <svg
            key={index}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="shrink-0"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillPercent}%`} stopColor={starColor} />
                <stop offset={`${fillPercent}%`} stopColor={emptyColor} />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#${gradientId})`}
            />
          </svg>
        );
      })}
    </div>
  );
}
