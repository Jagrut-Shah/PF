import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import NavbarSearch from './NavbarSearch';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';

/**
 * Official WhatsApp Brand Outline Icon
 */
function WhatsAppIcon({ className = "w-[19px] h-[19px]" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#25D366"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    { label: 'HOME', path: '/' },
    { label: 'MEN', path: '/category/men' },
    { label: 'WOMEN', path: '/category/women' },
    { label: 'UNISEX', path: '/category/unisex' },
    { label: 'BESTSELLERS', path: '/category/bestsellers' },
  ];

  const whatsAppUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent("Hello ÉLAVA, I'd like to explore your collection.")}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] border-b border-[#222222] transition-colors duration-200 relative">
      <MainContainer>
        <div className="h-[62px] sm:h-[68px] md:h-[80px] flex items-center justify-between">
          
          {/* MOBILE: Hamburger Button (Left) */}
          <div className="flex items-center md:hidden w-12">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="p-2 -ml-2 text-white hover:text-[#CFA838] transition-colors duration-200 focus:outline-none"
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

          {/* BRAND LOGO: Two-Part Boxed Wordmark */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link
              to="/"
              className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-sm"
              aria-label="ÉLAVA Home"
            >
              <div className="bg-[#0D2D1B] text-[#C8A45A] px-2.5 sm:px-3 py-1 flex items-center justify-center border-r border-[#C8A45A]/40">
                <span className="font-serif text-[14px] sm:text-[16px] tracking-[0.24em] font-medium leading-none text-[#C8A45A] uppercase">
                  ÉLAVA
                </span>
              </div>
              <div className="bg-[#8B1E1E] text-[#F3EDE3] px-2 sm:px-2.5 py-1 flex items-center justify-center">
                <span className="font-sans text-[7.5px] sm:text-[8.5px] tracking-[0.26em] font-bold leading-none uppercase text-[#F3EDE3]">
                  PERFUMES
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION: Center (HOME, MEN, WOMEN, UNISEX, BESTSELLERS) */}
          <nav
            className="hidden md:flex items-center justify-center space-x-6 lg:space-x-10"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = link.path === '/'
                ? location.pathname === '/'
                : location.pathname === link.path;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={
                    `font-sans text-[12px] lg:text-[13px] uppercase tracking-[0.18em] font-medium py-1 relative text-white hover:text-[#CFA838] transition-colors duration-200 ${
                      isActive
                        ? 'text-[#CFA838] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#CFA838]'
                        : 'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#CFA838] hover:after:w-full after:transition-all after:duration-250 after:ease-out'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* ACTIONS: Right (Search & WhatsApp) */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 w-16 md:w-auto">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen((prev) => !prev);
              }}
              className="p-2 text-white hover:text-[#CFA838] transition-colors duration-250 focus:outline-none"
              aria-label="Search collection"
            >
              <Search className="w-[19px] h-[19px] stroke-[1.5]" />
            </button>

            {/* WhatsApp Direct Link */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white hover:text-[#CFA838] transition-colors duration-250 focus:outline-none"
              aria-label="Connect on WhatsApp"
            >
              <WhatsAppIcon className="w-[19px] h-[19px]" />
            </a>
          </div>

        </div>

        {/* SEARCH OVERLAY */}
        <NavbarSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      </MainContainer>

      {/* COMPACT FLOATING MOBILE MENU PANEL (NOT full-screen black) */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Subtle translucent dark backdrop so the underlying website remains visible */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Navigation Card/Panel (78% width, dark petrol #102F38, subtle border) */}
          <aside
            className="fixed top-3 right-3 bottom-3 w-[78%] max-w-[320px] bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-2xl shadow-2xl z-50 flex flex-col justify-between p-5 text-[#F3EBDD] transition-transform duration-200 ease-out"
            aria-label="Mobile Navigation Panel"
          >
            {/* Panel Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(243,235,221,0.15)] mb-4">
                <span className="font-serif text-sm tracking-[0.2em] font-medium text-[#C5A15A] uppercase">
                  ÉLAVA NAVIGATION
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#C8C1B5] hover:text-[#F3EBDD] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname === link.path;

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={
                        `font-sans text-xs uppercase tracking-[0.2em] py-2.5 px-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#1C4A55] text-[#C5A15A] font-bold border-l-2 border-[#C5A15A]'
                            : 'text-[#F3EBDD] hover:bg-[#1C4A55]/60 hover:text-[#C5A15A] font-medium'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Panel Quick Actions Footer */}
            <div className="pt-4 border-t border-[rgba(243,235,221,0.15)] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#1C4A55] text-xs font-sans font-semibold uppercase tracking-wider text-[#F3EBDD] hover:text-[#C5A15A] transition-colors"
              >
                <Search className="w-4 h-4 text-[#C5A15A]" />
                <span>SEARCH COLLECTION</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#7A2929] text-xs font-sans font-bold uppercase tracking-wider text-[#F3EBDD] hover:bg-[#8C3232] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WHATSAPP SUPPORT</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
