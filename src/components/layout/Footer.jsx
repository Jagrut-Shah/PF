import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';

/**
 * ÉLAVA Footer — Stage 1F
 * Desktop : 4-column compact layout
 * Mobile  : Brand + accordion (Shop / Help / Connect)
 */

const SHOP = [
  { label: 'Men',         to: '/category/men' },
  { label: 'Women',       to: '/category/women' },
  { label: 'Unisex',      to: '/category/unisex' },
  { label: 'Bestsellers', to: '/category/bestsellers' },
];
const HELP = [
  { label: 'FAQ',                 to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Returns & Refunds',   to: '/returns' },
];
const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent('Hi ÉLAVA, I would like to learn more about your fragrances.')}`;

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" className="w-3.5 h-3.5 shrink-0 fill-[#25D366] text-[#25D366]" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
  </svg>
);

// Instagram SVG icon
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const CONNECT = [
  { label: 'WhatsApp', href: waUrl, Icon: WhatsAppIcon },
  { label: 'Instagram', href: 'https://instagram.com/', Icon: InstagramIcon },
];

const linkCls = 'block font-sans text-[12px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150 leading-none py-1';
const connectLinkCls = 'inline-flex items-center gap-1.5 font-sans text-[12px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150 leading-none py-1';
const headingCls = 'font-sans text-[9.5px] font-semibold tracking-[0.22em] uppercase text-elava-charcoal mb-3.5';

// ── Mobile accordion ──────────────────────────────────────────────────────
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-elava-border">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-elava-charcoal"
      >
        <span className={headingCls.replace('mb-2.5', '')}>{title}</span>
        {open
          ? <Minus size={13} className="text-elava-stone shrink-0" aria-hidden="true" />
          : <Plus  size={13} className="text-elava-stone shrink-0" aria-hidden="true" />}
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
    <footer className="border-t border-elava-border" aria-label="Site footer">

      {/* ── DESKTOP ───────────────────────────────── */}
      <div className="hidden md:block">
        <MainContainer>
          <div className="py-8 grid grid-cols-[2fr_1fr_1fr_1fr] gap-8">

            {/* Brand */}
            <div className="flex flex-col justify-between">
              <div>
                <Link to="/" aria-label="ÉLAVA Home" className="inline-flex flex-col mb-2 select-none">
                  <span className="font-serif text-[20px] tracking-[0.26em] leading-none text-elava-charcoal">ÉLAVA</span>
                  <span className="font-sans text-[7.5px] tracking-[0.36em] font-medium leading-none text-elava-stone mt-1">PERFUMES</span>
                </Link>
                <p className="font-sans text-[11.5px] text-elava-stone leading-snug">
                  Premium fragrances crafted for every moment.
                </p>
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className={headingCls}>Shop</p>
              <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Help */}
            <div>
              <p className={headingCls}>Help</p>
              <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
            </div>

            {/* Connect */}
            <div>
              <p className={headingCls}>Connect</p>
              <ul>{CONNECT.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={connectLinkCls}>
                    <Icon />{label}
                  </a>
                </li>
              ))}</ul>
            </div>

          </div>
        </MainContainer>

        {/* Legal */}
        <div className="border-t border-elava-border">
          <MainContainer>
            <div className="py-4 flex items-center justify-between">
              <p className="font-sans text-[10.5px] text-elava-stone">© {year} ÉLAVA Perfumes. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="font-sans text-[10.5px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150">Privacy Policy</Link>
                <Link to="/terms"   className="font-sans text-[10.5px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150">Terms & Conditions</Link>
              </div>
            </div>
          </MainContainer>
        </div>
      </div>

      {/* ── MOBILE ────────────────────────────────── */}
      <div className="md:hidden">
        <MainContainer>
          <div className="pt-6 pb-1">

            {/* Brand */}
            <div className="mb-5">
              <Link to="/" aria-label="ÉLAVA Home" className="inline-flex flex-col mb-2 select-none">
                <span className="font-serif text-[18px] tracking-[0.26em] leading-none text-elava-charcoal">ÉLAVA</span>
                <span className="font-sans text-[7px] tracking-[0.36em] font-medium leading-none text-elava-stone mt-1">PERFUMES</span>
              </Link>
              <p className="font-sans text-[11.5px] text-elava-stone leading-snug">
                Premium fragrances crafted for every moment.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <Accordion title="Shop">
                <ul>{SHOP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Help">
                <ul>{HELP.map(i => <li key={i.to}><Link to={i.to} className={linkCls}>{i.label}</Link></li>)}</ul>
              </Accordion>
              <Accordion title="Connect">
                <ul>{CONNECT.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={connectLinkCls}>
                      <Icon />{label}
                    </a>
                  </li>
                ))}</ul>
              </Accordion>
            </nav>

          </div>
        </MainContainer>

        {/* Legal */}
        <div className="border-t border-elava-border mt-1">
          <MainContainer>
            <div className="py-3.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-sans text-[10.5px] text-elava-stone">© {year} ÉLAVA Perfumes.</p>
              <Link to="/privacy" className="font-sans text-[10.5px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150">Privacy Policy</Link>
              <span className="text-elava-stone/40 text-[10px]">·</span>
              <Link to="/terms"   className="font-sans text-[10.5px] text-elava-stone hover:text-elava-charcoal transition-colors duration-150">Terms & Conditions</Link>
            </div>
          </MainContainer>
        </div>
      </div>

    </footer>
  );
}
