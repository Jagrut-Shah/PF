import { useEffect } from 'react';

// Single production domain fallback configuration
export const DEFAULT_SITE_URL = 'https://elava-perfumes.vercel.app';

export function getFullUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}${cleanPath}`;
  }
  return `${DEFAULT_SITE_URL}${cleanPath}`;
}

/**
 * SEO Helper Component
 * Dynamically sets document title, meta descriptions, canonical link, Open Graph attributes,
 * and JSON-LD structured data for every route.
 */
export default function SEO({
  title,
  description = 'Discover ÉLAVA luxury artisanal perfumes crafted with exquisite notes.',
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/images/products/row-1-column-1.png',
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title || 'ÉLAVA — Premium Fragrances';
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector, key, value, attr = 'name') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 3. Update Meta Description
    setMetaTag('meta[name="description"]', 'description', description, 'name');

    // 4. Update Open Graph Meta Tags
    const fullCanonicalUrl = getFullUrl(canonicalPath);
    const fullOgImage = ogImage.startsWith('http') ? ogImage : getFullUrl(ogImage);

    setMetaTag('meta[property="og:title"]', 'og:title', fullTitle, 'property');
    setMetaTag('meta[property="og:description"]', 'og:description', description, 'property');
    setMetaTag('meta[property="og:url"]', 'og:url', fullCanonicalUrl, 'property');
    setMetaTag('meta[property="og:type"]', 'og:type', ogType, 'property');
    setMetaTag('meta[property="og:image"]', 'og:image', fullOgImage, 'property');

    // 5. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 6. JSON-LD Structured Data
    let scriptTag = document.getElementById('json-ld-schema');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, ogType, ogImage, jsonLd]);

  return null;
}
