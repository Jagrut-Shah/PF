import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, User } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import NavbarSearch from './NavbarSearch';
import ScrollProgress from '../common/ScrollProgress';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';
import { getCartTotals } from '../../utils/cart';
import { useAuth } from '../../context/AuthContext';

function WhatsAppIcon({ className = "w-[18px] h-[18px]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

/**
 * Navbar — CHERRY-FIRST (#4A1019 background)
 * Cream/Warm White text. LOCKED logo unchanged.
 * Compact scale maintained.
 */
export default function Navbar() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

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
    <header className="sticky top-0 z-50 w-full px-2 sm:px-4 pt-2 pb-1 bg-transparent transition-all duration-300">
      <ScrollProgress />

      {/* CHERRY navbar container — primary brand color */}
      <div className={`max-w-7xl mx-auto bg-[#7F1D2D] border border-[#7F1D2D] rounded-xl sm:rounded-2xl transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(127,29,45,0.35)] border-[#7F1D2D]' : 'shadow-[0_2px_12px_rgba(127,29,45,0.20)]'
      }`}>
        <MainContainer>
          <div className="h-[54px] sm:h-[60px] md:h-[68px] flex items-center justify-between">

            {/* MOBILE: Hamburger */}
            <div className="flex items-center md:hidden w-10">
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsMobileMenuOpen((prev) => !prev);
                }}
                className="p-1.5 -ml-1.5 text-[#2A211F]/80 hover:text-[#2A211F] transition-colors duration-200 focus:outline-none btn-interactive"
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

            {/* BRAND LOGO: LOCKED 2-Part Boxed Logo */}
            <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
              <Link
                to="/"
                className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-all duration-200 hover:opacity-95 shadow-xs"
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

            {/* NAV LINKS — Cream text on Cherry bg */}
            <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname === link.path;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={
                      `font-manrope text-[12px] lg:text-[13px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                        isActive
                          ? 'text-[#2A211F] font-bold bg-[#2A211F]/10 border border-[#2A211F]/20'
                          : 'text-[#2A211F]/80 hover:text-[#2A211F] hover:bg-[#2A211F]/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* ACTION ICONS — Cream on Cherry */}
            <div className="flex items-center justify-end space-x-1 w-auto">
              <Link
                to={user ? "/account" : "/login"}
                className={`p-2 text-[#2A211F]/80 hover:text-[#2A211F] transition-colors duration-200 focus:outline-none btn-interactive ${
                  location.pathname === '/login' || location.pathname === '/account' ? 'text-[#2A211F]' : ''
                }`}
                aria-label={user ? "View Account Profile" : "Login or Sign Up"}
              >
                <User className="w-[17px] h-[17px] stroke-[1.5]" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen((prev) => !prev);
                }}
                className="p-2 text-[#2A211F]/80 hover:text-[#2A211F] transition-colors duration-200 focus:outline-none btn-interactive"
                aria-label="Search collection"
              >
                <Search className="w-[17px] h-[17px] stroke-[1.5]" />
              </button>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-cart-drawer'))}
                className="p-2 text-[#2A211F]/80 hover:text-[#2A211F] transition-colors duration-200 focus:outline-none relative btn-interactive"
                aria-label="View shopping cart"
                id="navbar-cart-btn"
              >
                <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#2A211F] text-[#F3E8D8] text-[8.5px] font-sans font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* CTA: Black surface with Cream text */}
              <Link
                to="/category/bestsellers"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2A211F] hover:bg-[#000000] active:scale-[0.98] text-[#F3E8D8] text-[12px] lg:text-[13px] font-manrope font-bold tracking-[0.01em] transition-all duration-200 shadow-sm ml-2 btn-interactive"
                id="navbar-shop-now-btn"
              >
                <span>Shop Now →</span>
              </Link>
            </div>

          </div>

          <NavbarSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </MainContainer>
      </div>

      {/* MOBILE DRAWER — Deep Cherry sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 bg-[#2A211F]/60 backdrop-blur-xs z-40 transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <aside
            className="fixed top-3 left-3 bottom-3 w-[78vw] max-w-[320px] bg-[#4A1019] border border-[#7F1D2D] rounded-2xl shadow-2xl z-50 flex flex-col justify-between p-4 text-[#FBF8F2] transition-transform duration-200 ease-out"
            aria-label="Mobile Navigation Panel"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#FBF8F2]/15 mb-2">
                <span className="font-sans text-[10px] tracking-wider font-semibold text-[#F4EBDD]/60 uppercase">
                  ÉLAVA NAVIGATION
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#FBF8F2]/60 hover:text-[#FBF8F2] transition-colors btn-interactive"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

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
                        `w-full text-left font-sans text-[11px] uppercase tracking-wider h-[42px] px-3 flex items-center border-b border-[#FBF8F2]/10 transition-colors ${
                          isActive
                            ? 'text-[#F3E8D8] font-bold bg-[#7F1D2D]/50'
                            : 'text-[#FBF8F2]/75 hover:bg-[#7F1D2D]/30 hover:text-[#FBF8F2] font-medium'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}

                <NavLink
                  to={user ? "/account" : "/login"}
                  className={
                    `w-full text-left font-sans text-[11px] uppercase tracking-wider h-[42px] px-3 flex items-center border-b border-[#FBF8F2]/10 transition-colors ${
                      location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/account'
                        ? 'text-[#F3E8D8] font-bold bg-[#7F1D2D]/50'
                        : 'text-[#FBF8F2]/75 hover:bg-[#7F1D2D]/30 hover:text-[#FBF8F2] font-medium'
                    }`
                  }
                >
                  {user ? "ACCOUNT" : "ACCOUNT / SIGN IN"}
                </NavLink>
              </nav>
            </div>

            <div className="pt-3 border-t border-[#FBF8F2]/15 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full text-left flex items-center gap-2.5 px-3 h-[40px] rounded-lg bg-[#7F1D2D]/40 active:scale-[0.98] text-[11px] font-sans font-semibold uppercase tracking-wider text-[#FBF8F2] hover:bg-[#7F1D2D]/60 border border-[#FBF8F2]/10 transition-colors btn-interactive"
              >
                <Search className="w-3.5 h-3.5 text-[#F3E8D8]/70 shrink-0" />
                <span>SEARCH COLLECTION</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left flex items-center gap-2.5 px-3 h-[40px] rounded-lg bg-[#7F1D2D]/40 active:scale-[0.98] border border-[#FBF8F2]/10 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#FBF8F2] hover:bg-[#7F1D2D]/60 transition-colors btn-interactive"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <span>WHATSAPP SUPPORT</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
