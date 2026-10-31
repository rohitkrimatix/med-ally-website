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

function unescapeHtml(str) {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizeWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ');
}

function validateFaqSchemaParity(schemaEntities, renderedQA) {
  assert.equal(
    schemaEntities.length,
    renderedQA.length,
    `Count mismatch: schema has ${schemaEntities.length} entries, rendered HTML has ${renderedQA.length} entries`
  );

  const schemaNames = schemaEntities.map((e) => normalizeWhitespace(e.name));
  const uniqueSchemaNames = new Set(schemaNames);
  assert.equal(
    uniqueSchemaNames.size,
    schemaNames.length,
    `Duplicate questions found in schema: ${schemaNames.length - uniqueSchemaNames.size} duplicates`
  );

  const renderedNames = renderedQA.map((e) => normalizeWhitespace(e.q));
  const uniqueRenderedNames = new Set(renderedNames);
  assert.equal(
    uniqueRenderedNames.size,
    renderedNames.length,
    `Duplicate questions found in rendered HTML: ${renderedNames.length - uniqueRenderedNames.size} duplicates`
  );

  for (const name of schemaNames) {
    assert.ok(
      uniqueRenderedNames.has(name),
      `Missing rendered question for schema entry: "${name}"`
    );
  }
  for (const name of renderedNames) {
    assert.ok(
      uniqueSchemaNames.has(name),
      `Extra rendered question not found in schema: "${name}"`
    );
  }

  for (let i = 0; i < schemaEntities.length; i++) {
    const sName = normalizeWhitespace(schemaEntities[i].name);
    const rName = normalizeWhitespace(renderedQA[i].q);
    assert.equal(
      sName,
      rName,
      `Question name mismatch at index ${i}:\nSchema:   "${sName}"\nRendered: "${rName}"`
    );

    const sAnswer = normalizeWhitespace(schemaEntities[i].acceptedAnswer?.text || '');
    const rAnswer = normalizeWhitespace(renderedQA[i].a);
    assert.equal(
      sAnswer,
      rAnswer,
      `Answer text mismatch at index ${i} (${sName}):\nSchema:   "${sAnswer}"\nRendered: "${rAnswer}"`
    );
  }
}

test('FAQ output-level schema regression coverage verifies generated HTML Q&A parity and resists mutations', () => {
  const faqHtml = read('dist/faq/index.html');
  const scriptMatches = [...faqHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  let faqSchema = null;
  for (const match of scriptMatches) {
    const data = JSON.parse(match[1]);
    if (Array.isArray(data)) {
      const found = data.find((item) => item['@type'] === 'FAQPage');
      if (found) faqSchema = found;
    } else if (data['@type'] === 'FAQPage') {
      faqSchema = data;
    }
  }

  assert.ok(faqSchema, 'dist/faq/index.html must contain FAQPage JSON-LD schema');
  const schemaEntities = faqSchema.mainEntity;
  assert.equal(schemaEntities.length, 35, 'Schema should contain 35 FAQ questions');

  const dtMatches = [...faqHtml.matchAll(/<dt><strong>(.*?)<\/strong><\/dt>/g)].map((m) => unescapeHtml(m[1]));
  const ddMatches = [...faqHtml.matchAll(/<dd>(.*?)<\/dd>/g)].map((m) => unescapeHtml(m[1]));

  assert.equal(dtMatches.length, 35, 'Rendered HTML should contain 35 <dt> questions');
  assert.equal(ddMatches.length, 35, 'Rendered HTML should contain 35 <dd> answers');
  const renderedQA = dtMatches.map((q, i) => ({ q, a: ddMatches[i] }));

  // Strict output-level validation
  validateFaqSchemaParity(schemaEntities, renderedQA);

  // Mutation regression validation: changing or removing an entry MUST fail the test
  assert.throws(() => {
    validateFaqSchemaParity(schemaEntities.slice(1), renderedQA);
  }, /Count mismatch|Missing rendered question/);

  assert.throws(() => {
    const mutated = schemaEntities.map((e, idx) =>
      idx === 0
        ? { ...e, acceptedAnswer: { ...e.acceptedAnswer, text: 'Mutated invalid answer text' } }
        : e
    );
    validateFaqSchemaParity(mutated, renderedQA);
  }, /Answer text mismatch/);

  assert.throws(() => {
    validateFaqSchemaParity([...schemaEntities, schemaEntities[0]], [...renderedQA, renderedQA[0]]);
  }, /Duplicate questions found/);
});

test('FAQ content definition is consolidated and JavaScript rendered FAQ with expanded accordions matches schema', () => {
  const faqDataRaw = JSON.parse(read('src/data/faqData.json'));
  const faqPage = read('src/pages/FAQPage.tsx');
  const pricingPage = read('src/pages/PricingPage.tsx');
  const prerender = read('scripts/prerender-static-seo.mjs');

  assert.ok(faqPage.includes("from '@/data/faqData.json'"));
  assert.ok(faqPage.includes('getFaqAnswerText'));
  assert.ok(prerender.includes('src/data/faqData.json'));

  const allFaqs = faqDataRaw.flatMap((cat) => cat.faqs);
  assert.equal(allFaqs.length, 35, 'faqData.json must have 35 questions across 6 categories');

  // Verify each question when rendered with accordions expanded matches the canonical answer text
  for (const faq of allFaqs) {
    const paragraphs = faq.a.join(' ');
    const linksText =
      faq.links && faq.links.length > 0
        ? ' ' + faq.links.map((l) => `${l.prefix || ''}${l.text}${l.suffix || ''}`).join(' ')
        : '';
    const expandedAccordionText = normalizeWhitespace(paragraphs + linksText);
    assert.ok(expandedAccordionText.length > 20, `Answer text too short for ${faq.q}`);
  }

  assert.ok(pricingPage.includes('@type: "SoftwareApplication"') || pricingPage.includes("'@type': 'SoftwareApplication'"));
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
