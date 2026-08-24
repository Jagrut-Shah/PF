import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import NavbarSearch from './NavbarSearch';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';
import { getCartTotals } from '../../utils/cart';

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
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Synchronize cart count
  useEffect(() => {
    const updateCount = () => {
      const { itemCount } = getCartTotals();
      setCartCount(itemCount);
    };

    updateCount();
    window.addEventListener('cart-updated', updateCount);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('cart-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

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
    <header className="sticky top-0 z-50 w-full px-2 sm:px-4 pt-2 pb-1 bg-transparent">
      {/* Boxed Premium Dark Container */}
      <div className="max-w-7xl mx-auto bg-[#0A0A0C] border border-[rgba(241,238,242,0.14)] rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-200">
        <MainContainer>
          <div className="h-[58px] sm:h-[64px] md:h-[72px] flex items-center justify-between">
            
            {/* MOBILE: Hamburger Button (Left) */}
            <div className="flex items-center md:hidden w-12">
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsMobileMenuOpen((prev) => !prev);
                }}
                className="p-2 -ml-2 text-[#F1EEF2] hover:text-[#D62F4F] transition-colors duration-200 focus:outline-none"
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

            {/* BRAND LOGO: Modern Sleek Boxed Wordmark */}
            <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
              <Link
                to="/"
                className="inline-flex items-stretch border border-[#D62F4F] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-sm"
                aria-label="ÉLAVA Home"
              >
                <div className="bg-[#111116] text-[#F1EEF2] px-2.5 sm:px-3 py-1 flex items-center justify-center border-r border-[#D62F4F]/40">
                  <span className="font-serif text-[14px] sm:text-[16px] tracking-[0.24em] font-bold leading-none text-[#F1EEF2] uppercase">
                    ÉLAVA
                  </span>
                </div>
                <div className="bg-[#D62F4F] text-[#FFFFFF] px-2 sm:px-2.5 py-1 flex items-center justify-center">
                  <span className="font-sans text-[7.5px] sm:text-[8.5px] tracking-[0.26em] font-bold leading-none uppercase text-[#FFFFFF]">
                    PERFUMES
                  </span>
                </div>
              </Link>
            </div>

            {/* DESKTOP NAVIGATION: Center (HOME, MEN, WOMEN, UNISEX, BESTSELLERS) */}
            <nav
              className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4"
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
                      `font-sans text-[12px] lg:text-[12.5px] uppercase tracking-[0.18em] font-semibold px-3.5 py-2 rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'text-[#D62F4F] font-bold bg-[rgba(241,238,242,0.06)]'
                          : 'text-[#F1EEF2] hover:text-[#D62F4F] hover:bg-[rgba(241,238,242,0.06)]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* ACTIONS: Right (Search, Cart & WhatsApp) */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-2 w-auto">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen((prev) => !prev);
                }}
                className="p-2 text-[#F1EEF2] hover:text-[#D62F4F] transition-colors duration-200 focus:outline-none"
                aria-label="Search collection"
              >
                <Search className="w-[19px] h-[19px] stroke-[1.5]" />
              </button>

              {/* Cart Drawer Trigger Button */}
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event('open-cart-drawer'));
                }}
                className="p-2 text-[#F1EEF2] hover:text-[#D62F4F] transition-colors duration-200 focus:outline-none relative"
                aria-label="View shopping cart"
                id="navbar-cart-btn"
              >
                <ShoppingBag className="w-[19px] h-[19px] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#D62F4F] text-[#FFFFFF] text-[9.5px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center leading-none shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Direct Link */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#F1EEF2] hover:text-[#25D366] transition-colors duration-200 focus:outline-none"
                aria-label="Connect on WhatsApp"
              >
                <WhatsAppIcon className="w-[19px] h-[19px]" />
              </a>
            </div>

          </div>

          {/* SEARCH OVERLAY */}
          <NavbarSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </MainContainer>
      </div>

      {/* COMPACT FLOATING MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Subtle translucent backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Navigation Card/Panel (Background #111116, Border rgba(241,238,242,0.16)) */}
          <aside
            className="fixed top-3 left-3 bottom-3 w-[78vw] max-w-[340px] bg-[#111116] border border-[rgba(241,238,242,0.16)] rounded-2xl shadow-2xl z-50 flex flex-col justify-between p-5 text-[#F1EEF2] transition-transform duration-200 ease-out"
            aria-label="Mobile Navigation Panel"
          >
            {/* Panel Header */}
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(241,238,242,0.10)] mb-3">
                <span className="font-serif text-xs tracking-[0.2em] font-bold text-[#D62F4F] uppercase">
                  ÉLAVA NAVIGATION
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#A7A3AA] hover:text-[#F1EEF2] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname === link.path;

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={
                        `w-full text-left font-sans text-xs uppercase tracking-[0.2em] h-[48px] px-5 flex items-center border-b border-[rgba(241,238,242,0.10)] transition-colors ${
                          isActive
                            ? 'text-[#D62F4F] font-bold bg-[rgba(241,238,242,0.04)]'
                            : 'text-[#F1EEF2] hover:bg-[rgba(241,238,242,0.06)] hover:text-[#D62F4F] font-medium'
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
            <div className="pt-3 border-t border-[rgba(241,238,242,0.10)] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full text-left flex items-center gap-3 px-5 h-[46px] rounded-xl bg-[#18181E] text-xs font-sans font-semibold uppercase tracking-wider text-[#F1EEF2] hover:text-[#D62F4F] border border-[rgba(241,238,242,0.12)] transition-colors"
              >
                <Search className="w-4 h-4 text-[#D62F4F] shrink-0" />
                <span>SEARCH COLLECTION</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left flex items-center gap-3 px-5 h-[46px] rounded-xl bg-[#111116] border border-[rgba(241,238,242,0.14)] text-xs font-sans font-bold uppercase tracking-wider text-[#F1EEF2] hover:border-[#D62F4F]/50 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WHATSAPP SUPPORT</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
