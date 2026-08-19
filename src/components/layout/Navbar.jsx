import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';

/**
 * Official WhatsApp Brand Outline Icon matching reference image
 */
function WhatsAppIcon({ className = "w-[19px] h-[19px]" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

/**
 * ÉLAVA Navbar Component
 * Desktop: Brand Left, Navigation Center, Search & WhatsApp Right
 * Mobile: Hamburger Left, Brand Center, Search & WhatsApp Right
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'MEN', path: '/category/men' },
    { label: 'WOMEN', path: '/category/women' },
    { label: 'UNISEX', path: '/category/unisex' },
    { label: 'BESTSELLERS', path: '/category/bestsellers' },
  ];

  const whatsAppUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent("Hello ÉLAVA, I'd like to explore your collection.")}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-elava-ivory border-b border-elava-border transition-colors duration-200">
      <MainContainer>
        <div className="h-[74px] sm:h-[80px] flex items-center justify-between">
          
          {/* MOBILE: Hamburger Button (Left) */}
          <div className="flex items-center md:hidden w-20">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 -ml-2 text-elava-charcoal hover:text-elava-stone transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-charcoal"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>

          {/* BRAND LOGO: Left on Desktop, Center on Mobile */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex flex-col items-center md:items-start group select-none py-1"
              aria-label="ÉLAVA Home"
            >
              <span className="font-serif text-[22px] sm:text-[24px] tracking-[0.26em] font-normal leading-none text-elava-charcoal">
                ÉLAVA
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.36em] font-medium leading-none text-elava-stone mt-1 text-center md:text-left">
                PERFUMES
              </span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION: Center */}
          <nav
            className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-sans text-[12px] lg:text-[13px] uppercase tracking-[0.18em] font-medium py-1 relative text-[#171717] ${
                    isActive
                      ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#B89B62]'
                      : 'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B89B62] hover:after:w-full after:transition-all after:duration-250 after:ease-out'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ACTIONS: Right (Search & WhatsApp) */}
          <div className="flex items-center justify-end space-x-3 sm:space-x-5 w-20 md:w-auto">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="p-2 text-elava-charcoal hover:text-elava-stone transition-colors duration-250 focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-charcoal"
              aria-label="Search collection"
            >
              <Search className="w-[19px] h-[19px] stroke-[1.5]" />
            </button>

            {/* WhatsApp Direct Link */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-elava-charcoal hover:text-elava-stone transition-colors duration-250 focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-charcoal"
              aria-label="Connect on WhatsApp"
            >
              <WhatsAppIcon className="w-[19px] h-[19px]" />
            </a>
          </div>

        </div>

        {/* SEARCH BAR (Quiet In-Navbar Drawer) */}
        {isSearchOpen && (
          <div className="py-3 border-t border-elava-border/60 animate-fadeIn">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center max-w-lg mx-auto"
            >
              <Search className="w-4 h-4 stroke-[1.5] text-elava-stone absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes, notes, or moods..."
                className="w-full pl-9 pr-8 py-2 bg-transparent border-b border-elava-stone/40 text-xs sm:text-sm font-sans tracking-wide text-elava-charcoal placeholder:text-elava-stone/70 focus:outline-none focus:border-elava-charcoal transition-colors duration-200"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-elava-stone hover:text-elava-charcoal p-1 text-xs"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* MOBILE NAVIGATION DRAWER */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-elava-border py-6 px-2 bg-elava-ivory animate-fadeIn">
            <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-sans text-xs uppercase tracking-[0.22em] py-2 px-1 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#171717] font-semibold border-l-2 border-[#B89B62] pl-3'
                        : 'text-[#171717] hover:text-[#171717] font-medium'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </MainContainer>
    </header>
  );
}
