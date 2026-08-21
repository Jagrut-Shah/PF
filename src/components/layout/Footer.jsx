import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';
import DEMO_COMPANY_INFO from '../../data/companyInfo';

const SHOP = [
  { label: 'All Fragrances', to: '/category/bestsellers' },
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

const ELAVA_COMPANY = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent('Hi ÉLAVA, I would like to learn more about your fragrances.')}`;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" className="w-3.5 h-3.5 shrink-0 fill-[#25D366] text-[#25D366]" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
  </svg>
);

const linkCls = 'block font-sans text-[12px] text-[#C8C1B5] hover:text-[#F3EBDD] transition-colors duration-150 leading-none py-1';
const headingCls = 'font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#F3EBDD] mb-3.5';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(243,235,221,0.12)]">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-3 focus:outline-none"
      >
        <span className={headingCls.replace('mb-3.5', '')}>{title}</span>
        {open
          ? <Minus size={13} className="text-[#C8C1B5] shrink-0" aria-hidden="true" />
          : <Plus  size={13} className="text-[#C8C1B5] shrink-0" aria-hidden="true" />}
      </button>
      <div className={`overflow-hidden transition-all duration-200 ease-out ${open ? 'max-h-48 pb-3' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#102F38] border-t border-[rgba(243,235,221,0.12)] text-[#F3EBDD]" aria-label="Site footer">

      {/* DESKTOP */}
      <div className="hidden md:block">
        <MainContainer>
          <div className="py-10 grid grid-cols-12 gap-8">

            {/* Brand Column */}
            <div className="col-span-4 flex flex-col justify-between pr-4">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-sm mb-3.5"
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
                <p className="font-sans text-xs text-[#C8C1B5] leading-relaxed mb-4">
                  Artisanal Eau de Parfum signatures crafted for memorable presence across India.
                </p>
              </div>
              <div className="text-xs font-sans text-[#C8C1B5] space-y-1">
                <p>{DEMO_COMPANY_INFO.formattedAddress}</p>
              </div>
            </div>

            {/* Shop Column */}
            <div className="col-span-2">
              <p className={headingCls}>SHOP</p>
              <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Help Column */}
            <div className="col-span-3">
              <p className={headingCls}>HELP & POLICIES</p>
              <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              <ul className="mt-2">{ELAVA_COMPANY.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Customer Care Column */}
            <div className="col-span-3">
              <p className={headingCls}>CUSTOMER CARE</p>
              <div className="space-y-2 text-xs font-sans text-[#C8C1B5]">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F3EBDD] hover:text-[#C5A15A] transition-colors font-semibold"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp Support</span>
                </a>
                <p className="text-[11px]">Email: {DEMO_COMPANY_INFO.supportEmail}</p>
                <p className="text-[11px]">Hours: {DEMO_COMPANY_INFO.customerCareHours}</p>
              </div>
            </div>

          </div>
        </MainContainer>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(243,235,221,0.12)]">
          <MainContainer>
            <div className="py-4 flex items-center justify-between">
              <p className="font-sans text-[11px] text-[#C8C1B5]">© {year} ÉLAVA Perfumes. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="font-sans text-[11px] text-[#C8C1B5] hover:text-[#F3EBDD] transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="font-sans text-[11px] text-[#C8C1B5] hover:text-[#F3EBDD] transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </MainContainer>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <MainContainer>
          <div className="pt-6 pb-2">

            {/* Brand */}
            <div className="mb-5">
              <Link
                to="/"
                className="inline-flex items-stretch border border-[#C8A45A] rounded-sm overflow-hidden select-none group transition-opacity duration-200 hover:opacity-95 shadow-sm mb-3"
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
              <p className="font-sans text-[11.5px] text-[#C8C1B5] leading-snug">
                Artisanal Eau de Parfum signatures crafted for memorable presence.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <Accordion title="Shop">
                <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Help & Policies">
                <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
                <ul className="mt-1">{ELAVA_COMPANY.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Customer Care">
                <div className="space-y-1.5 pt-1 text-xs text-[#C8C1B5]">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#F3EBDD] font-semibold">
                    <WhatsAppIcon /> WhatsApp Support
                  </a>
                  <p className="text-[11px]">Email: {DEMO_COMPANY_INFO.supportEmail}</p>
                </div>
              </Accordion>
            </nav>

          </div>
        </MainContainer>

        {/* Legal Bottom */}
        <div className="border-t border-[rgba(243,235,221,0.12)] mt-2">
          <MainContainer>
            <div className="py-3.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-sans text-[10.5px] text-[#C8C1B5]">© {year} ÉLAVA Perfumes.</p>
              <Link to="/privacy" className="font-sans text-[10.5px] text-[#C8C1B5] hover:text-[#F3EBDD]">Privacy Policy</Link>
              <span className="text-[#C8C1B5]/40 text-[10px]">·</span>
              <Link to="/terms" className="font-sans text-[10.5px] text-[#C8C1B5] hover:text-[#F3EBDD]">Terms & Conditions</Link>
            </div>
          </MainContainer>
        </div>
      </div>

    </footer>
  );
}
