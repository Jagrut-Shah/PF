import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';
import DEMO_COMPANY_INFO from '../../data/companyInfo';

const SHOP = [
  { label: 'Bestsellers', to: '/category/bestsellers' },
  { label: 'For Him', to: '/category/men' },
  { label: 'For Her', to: '/category/women' },
  { label: 'Unisex', to: '/category/unisex' },
];

const HELP = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Returns & Refunds', to: '/returns' },
];

const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent('Hi ÉLAVA, I would like to learn more about your fragrances.')}`;
const instagramUrl = 'https://instagram.com/elavaperfumes';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#E4405F" strokeWidth="2.2" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#E4405F" strokeWidth="2.2" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#E4405F" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const linkCls = 'block font-manrope text-[13px] text-[#A89A8B] hover:text-[#FBF8F2] transition-colors duration-150 py-1 font-normal';
const headingCls = 'font-manrope text-[11px] font-semibold tracking-[0.09em] uppercase text-[#FBF8F2] mb-3';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#FBF8F2]/10">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-3 focus:outline-none"
      >
        <span className={headingCls.replace('mb-3', '')}>{title}</span>
        {open
          ? <Minus size={12} className="text-[#A89A8B] shrink-0" aria-hidden="true" />
          : <Plus  size={12} className="text-[#A89A8B] shrink-0" aria-hidden="true" />}
      </button>
      <div className={`overflow-hidden transition-all duration-200 ease-out ${open ? 'max-h-48 pb-3' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

/**
 * Footer Component — Dark Espresso #2A211F background for strong premium ending.
 * Warm cream/white typography. LOCKED logo preserved.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A211F] border-t border-[#FBF8F2]/10 text-[#FBF8F2]" aria-label="Site footer">

      {/* DESKTOP */}
      <div className="hidden md:block">
        <MainContainer>
          <div className="py-10 grid grid-cols-12 gap-8">

            {/* Brand Column */}
            <div className="col-span-4 flex flex-col justify-between pr-4">
              <div>
                {/* LOCKED Original Logo Emblem */}
                <Link
                  to="/"
                  className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-xs mb-3"
                  aria-label="ÉLAVA Home"
                >
                  <div className="bg-[#0D2D1B] text-[#C8A45A] px-3 py-1 flex items-center justify-center border-r border-[#C8A45A]/40">
                    <span className="font-serif text-[16px] tracking-[0.24em] font-medium leading-none text-[#C8A45A] uppercase">
                      ÉLAVA
                    </span>
                  </div>
                  <div className="bg-[#8B1E1E] text-[#F3EDE3] px-2.5 py-1 flex items-center justify-center">
                    <span className="font-sans text-[8.5px] tracking-[0.26em] font-bold leading-none uppercase text-[#F3EDE3]">
                      PERFUMES
                    </span>
                  </div>
                </Link>
                <p className="font-manrope text-[13px] text-[#A89A8B] leading-[1.6] mb-4 font-normal">
                  Artisanal Eau de Parfum signatures crafted for memorable presence across India.
                </p>
              </div>
            </div>

            {/* Shop Column */}
            <div className="col-span-2">
              <p className={headingCls}>Shop</p>
              <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Help Column */}
            <div className="col-span-3">
              <p className={headingCls}>Help</p>
              <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Customer Care Column */}
            <div className="col-span-3">
              <p className={headingCls}>Customer Care</p>
              <div className="space-y-2 text-[13px] font-manrope text-[#A89A8B] font-normal">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FBF8F2] hover:text-[#25D366] transition-colors font-semibold"
                >
                  <WhatsAppIcon />
                  <span>Connect on WhatsApp</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FBF8F2] hover:text-[#E4405F] transition-colors font-semibold"
                >
                  <InstagramIcon />
                  <span>Connect on Instagram</span>
                </a>
                <p className="text-[12px] pt-1">Email: {DEMO_COMPANY_INFO.supportEmail}</p>
                <p className="text-[12px]">Hours: {DEMO_COMPANY_INFO.customerCareHours}</p>
              </div>
            </div>

          </div>
        </MainContainer>

        {/* Bottom Bar */}
        <div className="border-t border-[#FBF8F2]/10">
          <MainContainer>
            <div className="py-3.5 flex items-center justify-between font-manrope text-[12px] text-[#A89A8B]">
              <p>© {year} ÉLAVA Perfumes. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-[#FBF8F2] transition-colors font-normal">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#FBF8F2] transition-colors font-normal">Terms & Conditions</Link>
              </div>
            </div>
          </MainContainer>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <MainContainer>
          <div className="pt-6 pb-2">
            <div className="mb-4">
              <Link
                to="/"
                className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-xs mb-3"
                aria-label="ÉLAVA Home"
              >
                <div className="bg-[#0D2D1B] text-[#C8A45A] px-2.5 py-1 flex items-center justify-center border-r border-[#C8A45A]/40">
                  <span className="font-serif text-[14px] tracking-[0.24em] font-medium leading-none text-[#C8A45A] uppercase">
                    ÉLAVA
                  </span>
                </div>
                <div className="bg-[#8B1E1E] text-[#F3EDE3] px-2 py-1 flex items-center justify-center">
                  <span className="font-sans text-[7.5px] tracking-[0.26em] font-bold leading-none uppercase text-[#F3EDE3]">
                    PERFUMES
                  </span>
                </div>
              </Link>
              <p className="font-manrope text-[13px] text-[#A89A8B] leading-[1.5] font-normal">
                Artisanal Eau de Parfum for memorable presence.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <Accordion title="Shop">
                <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Help">
                <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Customer Care">
                <div className="space-y-2 pt-1 text-[12px] font-manrope text-[#A89A8B]">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FBF8F2] font-semibold">
                    <WhatsAppIcon /> Connect on WhatsApp
                  </a>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FBF8F2] font-semibold">
                    <InstagramIcon /> Connect on Instagram
                  </a>
                  <p className="text-[11px] pt-1">Email: {DEMO_COMPANY_INFO.supportEmail}</p>
                </div>
              </Accordion>
            </nav>
          </div>
        </MainContainer>

        <div className="border-t border-[#FBF8F2]/10 mt-2">
          <MainContainer>
            <div className="py-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-manrope text-[11px] text-[#A89A8B]">
              <p>© {year} ÉLAVA Perfumes.</p>
              <Link to="/privacy" className="hover:text-[#FBF8F2]">Privacy Policy</Link>
              <span className="text-[#A89A8B]/40">·</span>
              <Link to="/terms" className="hover:text-[#FBF8F2]">Terms & Conditions</Link>
            </div>
          </MainContainer>
        </div>
      </div>

    </footer>
  );
}
