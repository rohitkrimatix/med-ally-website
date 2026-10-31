export interface FaqLink {
  prefix?: string;
  text: string;
  href: string;
  suffix?: string;
  isExternal?: boolean;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string[];
  links?: FaqLink[];
}

export interface FaqCategoryData {
  id: string;
  title: string;
  description: string;
  icon: string;
  faqs: FaqItem[];
}

/**
 * Normalizes and formats the complete visible text for an FAQ answer,
 * including paragraphs and supplementary action/reference links,
 * collapsing redundant whitespace to standard single spaces.
 */
export function getFaqAnswerText(faq: { a: string[]; links?: FaqLink[] }): string {
  const paragraphs = faq.a.join(' ');
  const linksText =
    faq.links && faq.links.length > 0
      ? ' ' + faq.links.map((l) => `${l.prefix || ''}${l.text}${l.suffix || ''}`).join(' ')
      : '';
  return `${paragraphs}${linksText}`.trim().replace(/\s+/g, ' ');
}
