import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const pkg = JSON.parse(read('package.json'));

test('legal pages contain substantive public content', () => {
  const privacy = read('src/pages/PrivacyPolicy.tsx');
  const terms = read('src/pages/TermsOfService.tsx');

  assert.ok(!privacy.includes('Add privacy policy content'));
  assert.ok(!terms.includes('Add terms of service content'));
  assert.ok((privacy.match(/<h2/g) || []).length >= 4);
  assert.ok((terms.match(/<h2/g) || []).length >= 4);
});

test('production dependency manifest excludes test-only packages and pins patched router', () => {
  const deps = pkg.dependencies ?? {};
  const devDeps = pkg.devDependencies ?? {};

  for (const packageName of ['@testing-library/react', '@types/recharts', 'vite-plugin-ssr', 'vitest']) {
    assert.equal(deps[packageName], undefined, `${packageName} should not be a production dependency`);
  }

  assert.equal(deps['react-router-dom'], '6.30.3');
  assert.ok(devDeps.vitest);
});

test('lint script and flat-config dependencies are wired', () => {
  assert.equal(pkg.scripts.lint, 'eslint src --report-unused-disable-directives --max-warnings 0');

  const devDeps = pkg.devDependencies ?? {};
  for (const packageName of ['@eslint/js', 'globals', 'typescript-eslint']) {
    assert.ok(devDeps[packageName], `${packageName} should be installed for eslint.config.js`);
  }
});

test('base HTML leaves route metadata to static prerender and Helmet', () => {
  const indexHtml = read('index.html');

  assert.ok(!indexHtml.includes('<meta name="description"'));
});

test('static SEO prerender covers Ahrefs crawler issue categories', () => {
  const prerender = read('scripts/prerender-static-seo.mjs');
  const landing = read('src/pages/LandingPage.tsx');
  const hero = read('src/components/Hero.tsx');
  const vercel = read('vercel.json');

  for (const route of ['/', '/features', '/how-it-works', '/benefits', '/roi-calculator', '/faq', '/pricing']) {
    assert.ok(prerender.includes(`path: '${route}'`), `${route} should have prerendered SEO HTML`);
  }

  for (const required of [
    '<meta name="description"',
    'property="og:title"',
    'name="twitter:card"',
    'application/ld+json',
    '<h1>',
    '<a href="${href}">',
  ]) {
    assert.ok(prerender.includes(required), `static prerender should include ${required}`);
  }

  assert.ok(!landing.includes('<h1 className="sr-only">MedAlly clinical AI platform for physicians</h1>'));
  assert.ok(hero.includes('<span className="sr-only">MedAlly clinical AI platform for physicians</span>'));
  assert.ok(vercel.includes('"destination": "/features/index.html"'));
});

test('sitemap generation covers public routes and writes generated files to build output', () => {
  const sitemap = read('scripts/generate-sitemap.ts');
  const imageSitemap = read('scripts/generate-image-sitemap.ts');
  const updateSitemaps = read('scripts/update-sitemaps.ts');

  assert.ok(sitemap.includes("'/PrivacyPolicy': '/privacy-policy'"));
  assert.ok(sitemap.includes("'/TermsOfService': '/terms-of-service'"));
  assert.ok(sitemap.includes("'/Contact': '/contact'"));
  assert.ok(sitemap.includes('getSitemapOutputDir()'));
  assert.ok(imageSitemap.includes('getSitemapOutputDir()'));
  assert.ok(updateSitemaps.includes('getSitemapOutputDir()'));
});

test('ROI calculator range controls are labelled accessibly', () => {
  const roiCalculator = read('src/components/ROICalculator.tsx');

  assert.ok(roiCalculator.includes('htmlFor={field.id}'));
  assert.ok(roiCalculator.includes('id={field.id}'));
  assert.ok(roiCalculator.includes('name={field.id}'));
  assert.ok(roiCalculator.includes('aria-valuetext={field.format'));
});

test('contact page does not ship placeholder contact details', () => {
  const contact = read('src/pages/Contact.tsx');

  assert.ok(!contact.includes('XXX'));
  assert.ok(!contact.includes('123 Healthcare Innovation Street'));
  assert.ok(!contact.includes('City, State, ZIP Code'));
  assert.ok(contact.includes('info@calonji.com'));
});

test('waitlist form uses React markup without inert injected scripts', () => {
  const waitlist = read('src/components/WaitlistForm.tsx');

  assert.ok(!waitlist.includes('dangerouslySetInnerHTML'));
  assert.ok(!waitlist.includes('<script'));
  assert.ok(waitlist.includes('action="https://medally.us20.list-manage.com/subscribe/post'));
  assert.ok(waitlist.includes('name="EMAIL"'));
});

test('inner pages use shared dark visual primitives and page-specific MedAlly imagery', () => {
  const primitives = read('src/components/PagePrimitives.tsx');
  const featuresPage = read('src/pages/FeaturesPage.tsx');
  const howItWorksPage = read('src/pages/HowItWorksPage.tsx');
  const roiPage = read('src/pages/ROICalculatorPage.tsx');

  for (const exportName of ['PageHero', 'ParallaxImageBand', 'AnswerBlock']) {
    assert.ok(primitives.includes(`export const ${exportName}`), `${exportName} should be exported`);
  }

  assert.ok(
    featuresPage.includes('/images/medally/clinical-hero.webp') ||
      featuresPage.includes('/images/medally/product-ambient-scribe.png')
  );
  assert.ok(featuresPage.includes('/images/medally/product-differential-panel.png') || featuresPage.includes('clinical AI platform'));
  assert.ok(howItWorksPage.includes('/images/medally/brand-two-screens-one-truth.png'));
  assert.ok(roiPage.includes('/images/medally/product-billing-card.png'));
});

test('inner page visible copy targets clinical AI platform SEO and AEO answers', () => {
  const featuresPage = read('src/pages/FeaturesPage.tsx');
  const howItWorksPage = read('src/pages/HowItWorksPage.tsx');
  const benefitsPage = read('src/pages/BenefitsPage.tsx');
  const pricingPage = read('src/pages/PricingPage.tsx');

  assert.ok(
    featuresPage.includes('What are the main MedAlly features?') ||
      featuresPage.includes('What does MedAlly automate?')
  );
  assert.ok(
    howItWorksPage.includes('How Does MedAlly Work?') ||
      howItWorksPage.includes('How does MedAlly fit into a clinical workflow?')
  );
  assert.ok(benefitsPage.includes('How does clinical AI reduce documentation burden?'));
  assert.ok(pricingPage.includes('Which MedAlly plan fits a practice?'));

  for (const content of [featuresPage, howItWorksPage, benefitsPage, pricingPage]) {
    assert.ok(content.includes('clinical AI platform'));
  }
});

test('SEO component supports keywords robots image alt and structured data', () => {
  const seo = read('src/components/SEO.tsx');

  assert.ok(seo.includes('keywords?: string[]'));
  assert.ok(seo.includes('robots?: string'));
  assert.ok(seo.includes('imageAlt?: string'));
  assert.ok(seo.includes('structuredData?: object | object[]'));
  assert.ok(seo.includes('application/ld+json'));
  assert.ok(seo.includes('max-image-preview:large'));
});

test('FAQ page includes visible FAQ schema and pricing includes software offers schema', () => {
  const faqPage = read('src/pages/FAQPage.tsx');
  const pricingPage = read('src/pages/PricingPage.tsx');

  assert.ok(faqPage.includes('@type: \"FAQPage\"') || faqPage.includes("'@type': 'FAQPage'"));
  assert.ok(faqPage.includes('How does MedAlly fit into clinical workflows?'));
  assert.ok(faqPage.includes('Can MedAlly support clinical documentation and decision support?'));

  assert.ok(pricingPage.includes('@type: \"SoftwareApplication\"') || pricingPage.includes("'@type': 'SoftwareApplication'"));
  assert.ok(pricingPage.includes('offers'));
});

test('sitemap scripts use actual public routes and MedAlly image metadata', () => {
  const sitemap = read('scripts/generate-sitemap.ts');
  const imageSitemap = read('scripts/generate-image-sitemap.ts');

  assert.ok(sitemap.includes("'/about-us'"));
  assert.ok(!sitemap.includes("'/case-studies':"));
  assert.ok(imageSitemap.includes('/images/medally/clinical-hero.webp'));
  assert.ok(imageSitemap.includes('MedAlly clinical AI platform'));
  assert.ok(imageSitemap.includes('product-ambient-scribe.png'));
});
