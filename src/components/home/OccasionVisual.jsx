import React from 'react';

/**
 * Editorial Occasion Visual Component
 * Refined, understated SVG illustrations that blend into the card surface.
 */
export default function OccasionVisual({ type, className = "w-12 h-12" }) {
  switch (type) {
    case 'wine':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#8B2D3A]`}
          aria-hidden="true"
        >
          {/* Stem & Base */}
          <path
            d="M32 40V54M22 54H42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Glass Bowl */}
          <path
            d="M18 14C18 28 24 38 32 38C40 38 46 28 46 14H18Z"
            fill="url(#wine-gradient)"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Wine Liquid Surface */}
          <ellipse cx="32" cy="22" rx="11" ry="3.5" fill="#5E1620" opacity="0.9" />
          {/* Glass Highlight */}
          <path
            d="M22 18C21 24 23 30 26 34"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <defs>
            <linearGradient id="wine-gradient" x1="32" y1="14" x2="32" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9E3544" stopOpacity="0.4" />
              <stop offset="0.4" stopColor="#801C2B" stopOpacity="0.8" />
              <stop offset="1" stopColor="#500E19" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'leaves':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#42634B]`}
          aria-hidden="true"
        >
          {/* Main Stem */}
          <path
            d="M20 52C28 44 38 32 44 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Leaves */}
          <path
            d="M44 14C36 17 32 23 36 29C40 25 45 20 44 14Z"
            fill="#5E8368"
            opacity="0.85"
          />
          <path
            d="M32 28C24 28 20 34 25 39C29 36 33 32 32 28Z"
            fill="#4F7359"
            opacity="0.8"
          />
          <path
            d="M37 34C44 33 47 38 44 44C40 42 38 37 37 34Z"
            fill="#699174"
            opacity="0.8"
          />
          <path
            d="M27 41C21 42 19 47 23 51C26 49 29 45 27 41Z"
            fill="#42634B"
            opacity="0.75"
          />
          {/* Leaf vein */}
          <path
            d="M37 22C39 25 42 21 44 14"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      );

    case 'notebook':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#3B5B75]`}
          aria-hidden="true"
        >
          {/* Notebook Back / Shadow */}
          <rect x="18" y="16" width="28" height="36" rx="2" fill="#2C4559" opacity="0.25" />
          {/* Notebook Cover */}
          <rect
            x="16"
            y="14"
            width="28"
            height="36"
            rx="2.5"
            fill="url(#notebook-gradient)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Spine Accent */}
          <path d="M22 14V50" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
          {/* Ribbon Bookmark */}
          <path
            d="M36 14V32L39 29L42 32V14"
            fill="#CFA838"
            opacity="0.9"
          />
          {/* Pen beside notebook */}
          <path
            d="M48 22L50 20C51 19 52 19 53 20L54 21C55 22 55 23 54 24L48 44L45 45L46 42L48 22Z"
            fill="#3B5B75"
            stroke="#2C4559"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="notebook-gradient" x1="16" y1="14" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#50728F" />
              <stop offset="1" stopColor="#314B60" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'discoball':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#6E4B7E]`}
          aria-hidden="true"
        >
          {/* Hanging string */}
          <line x1="32" y1="8" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          {/* Disco Ball Circle */}
          <circle cx="32" cy="34" r="18" fill="url(#disco-gradient)" stroke="currentColor" strokeWidth="1.5" />
          {/* Grid facets */}
          <path
            d="M17 28H47M14 34H50M17 40H47M24 18C28 26 28 42 24 50M32 16V52M40 18C36 26 36 42 40 50"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* Sparkles */}
          <path d="M46 16L47.5 19L50.5 20.5L47.5 22L46 25L44.5 22L41.5 20.5L44.5 19L46 16Z" fill="#CFA838" />
          <path d="M18 42L19 44L21 45L19 46L18 48L17 46L15 45L17 44L18 42Z" fill="#F5D770" opacity="0.9" />
          <defs>
            <linearGradient id="disco-gradient" x1="20" y1="20" x2="44" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9C76AD" />
              <stop offset="0.6" stopColor="#6E4B7E" />
              <stop offset="1" stopColor="#4A2E57" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'trophy':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#A37B1C]`}
          aria-hidden="true"
        >
          {/* Cup Body */}
          <path
            d="M20 16H44V28C44 35 39 40 32 40C25 40 20 35 20 28V16Z"
            fill="url(#trophy-gradient)"
            stroke="#8C6610"
            strokeWidth="1.5"
          />
          {/* Handles */}
          <path
            d="M20 20H14C12 20 10 22 10 25C10 29 14 32 20 32"
            stroke="#A37B1C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M44 20H50C52 20 54 22 54 25C54 29 50 32 44 32"
            stroke="#A37B1C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Stem & Base */}
          <path d="M32 40V48M22 48H42M24 48V52H40V48" stroke="#8C6610" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="22" y="49" width="20" height="4" rx="1" fill="#755208" />
          {/* Highlight Star */}
          <path d="M32 22L33.5 25.5L37 26.5L34.5 29L35 32.5L32 30.5L29 32.5L29.5 29L27 26.5L30.5 25.5L32 22Z" fill="#FFF2BD" />
          <defs>
            <linearGradient id="trophy-gradient" x1="20" y1="16" x2="44" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5D770" />
              <stop offset="0.5" stopColor="#D4A838" />
              <stop offset="1" stopColor="#A37B1C" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return null;
  }
}
