import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import prettier from 'prettier';
const DOMAIN = 'https://www.medally.ai';
const CURRENT_DATE = new Date().toISOString().split('T')[0];
// Page priority mapping
const PAGE_PRIORITIES = {
    '/': { priority: '1.0', changefreq: 'weekly' },
    '/clinical-documentation-ai': { priority: '0.9', changefreq: 'weekly' },
    '/ai-medical-scribe': { priority: '0.9', changefreq: 'weekly' },
    '/clinical-workflow-software': { priority: '0.9', changefreq: 'weekly' },
    '/resources/best-ai-medical-scribes': { priority: '0.9', changefreq: 'weekly' },
    '/ai-clinical-decision-support': { priority: '0.9', changefreq: 'weekly' },
    '/ai-medical-coding': { priority: '0.9', changefreq: 'weekly' },
    '/features': { priority: '0.9', changefreq: 'monthly' },
    '/pricing': { priority: '0.9', changefreq: 'monthly' },
    '/about-us': { priority: '0.8', changefreq: 'monthly' },
    '/how-it-works': { priority: '0.8', changefreq: 'monthly' },
    '/benefits': { priority: '0.8', changefreq: 'monthly' },
    '/roi-calculator': { priority: '0.8', changefreq: 'monthly' },
    '/contact': { priority: '0.8', changefreq: 'monthly' },
    '/faq': { priority: '0.7', changefreq: 'weekly' },
    '/privacy-policy': { priority: '0.5', changefreq: 'monthly' },
    '/terms-of-service': { priority: '0.5', changefreq: 'monthly' },
};
const PAGE_IMAGES = {
    '/': { loc: '/images/medally/clinical-hero.webp', title: 'MedAlly clinical AI platform' },
    '/clinical-documentation-ai': { loc: '/images/medally/clinical-hero.webp', title: 'MedAlly AI clinical documentation for physicians' },
    '/ai-medical-scribe': { loc: '/images/medally/clinical-hero.webp', title: 'MedAlly AI medical scribe for physicians' },
    '/clinical-workflow-software': { loc: '/images/medally/clinical-workflow-real.png', title: 'MedAlly clinical workflow software for physicians' },
    '/resources/best-ai-medical-scribes': { loc: '/images/medally/clinical-hero.webp', title: 'Best AI medical scribes for physicians' },
    '/ai-clinical-decision-support': { loc: '/images/medally/clinical-hero.webp', title: 'MedAlly AI clinical decision support for physicians' },
    '/ai-medical-coding': { loc: '/images/medally/clinical-hero.webp', title: 'MedAlly AI medical coding software for physicians' },
    '/about-us': { loc: '/images/medally/brand-hero-calm-day.png', title: 'MedAlly physician-centered clinical AI' },
    '/how-it-works': { loc: '/images/medally/brand-two-screens-one-truth.png', title: 'MedAlly clinical workflow' },
    '/features': { loc: '/images/medally/features-gpt/features-hero-physician.png', title: 'MedAlly clinical AI platform features' },
    '/benefits': { loc: '/images/medally/workflow-room.png', title: 'MedAlly clinical workflow benefits' },
    '/roi-calculator': { loc: '/images/medally/product-billing-card.png', title: 'MedAlly ROI and coding workflow' },
    '/faq': { loc: '/images/medally/clinical-workflow-real.png', title: 'MedAlly clinical AI FAQ' },
    '/pricing': { loc: '/images/medally/workflow-room.png', title: 'MedAlly pricing and workflow' },
    '/contact': { loc: '/images/medally/clinical-workflow-real.png', title: 'Contact MedAlly clinical AI team' },
    '/privacy-policy': { loc: '/images/medally/clinical-workflow-real.png', title: 'MedAlly privacy-conscious clinical AI workflow' },
    '/terms-of-service': { loc: '/images/medally/workflow-room.png', title: 'MedAlly clinical AI platform terms' },
};
// Define a mapping from file names to actual routes
const PAGE_ROUTES = {
    '/LandingPage': '/',
    '/ClinicalDocumentationAIPage': '/clinical-documentation-ai',
    '/AIMedicalScribePage': '/ai-medical-scribe',
    '/ClinicalWorkflowSoftwarePage': '/clinical-workflow-software',
    '/BestAIMedicalScribesPage': '/resources/best-ai-medical-scribes',
    '/AIClinicalDecisionSupportPage': '/ai-clinical-decision-support',
    '/AIMedicalCodingPage': '/ai-medical-coding',
    '/AboutUsPage': '/about-us',
    '/HowItWorksPage': '/how-it-works',
    '/FeaturesPage': '/features',
    '/BenefitsPage': '/benefits',
    '/ROICalculatorPage': '/roi-calculator',
    '/FAQPage': '/faq',
    '/PricingPage': '/pricing',
    '/PrivacyPolicy': '/privacy-policy',
    '/TermsOfService': '/terms-of-service',
    '/Contact': '/contact'
};
function getSitemapOutputDir() {
    const configuredOutputDir = process.env.SITEMAP_OUTPUT_DIR;
    if (configuredOutputDir) {
        return path.resolve(process.cwd(), configuredOutputDir);
    }
    const buildOutputDir = path.join(process.cwd(), 'dist');
    return fs.existsSync(buildOutputDir) ? buildOutputDir : path.join(process.cwd(), 'public');
}
/**
 * Generates a sitemap for the website including pages and images
 */
export async function generateSitemap() {
    try {
        console.log('Generating sitemap...');
        // Get all pages (excluding dynamic routes, API routes, etc.)
        const pages = await globby([
            'src/pages/**/*.tsx',
            'src/pages/**/*.ts',
            '!src/pages/_*.tsx',
            '!src/pages/_*.ts',
            '!src/pages/api',
            '!src/pages/404.tsx',
            '!src/pages/500.tsx',
        ]);
        // Create sitemap entries for pages
        const pageEntries = pages
            .map((page) => {
            // Convert file path to route
            const route = page
                .replace('src/pages', '')
                .replace(/\.(tsx|ts)$/, '')
                .replace(/\/index$/, '/');
            // Skip excluded routes
            if (route.includes('[') || route.includes('_document') || route.includes('_app')) {
                return null;
            }
            // Use the route mapping if available, otherwise use the default path
            const mappedPath = PAGE_ROUTES[route];
            // Skip pages that are explicitly excluded (mapped to null)
            if (mappedPath === null) {
                return null;
            }
            const path = route === '/index'
                ? '/'
                : mappedPath || route;
            const { priority, changefreq } = PAGE_PRIORITIES[path] || { priority: '0.5', changefreq: 'monthly' };
            const imageInfo = PAGE_IMAGES[path];
            // Create XML entry
            let entry = `
  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
            // Add image if available
            if (imageInfo) {
                entry += `
    <image:image>
      <image:loc>${DOMAIN}${imageInfo.loc}</image:loc>
      <image:title>${imageInfo.title}</image:title>
    </image:image>`;
            }
            entry += `
  </url>`;
            return entry;
        })
            .filter(Boolean);
        // Add specialty pages
        // Commenting out specialty pages since they don't exist yet
        // const specialties = ['primary-care', 'emergency-medicine', 'internal-medicine', 'pediatrics', 'cardiology'];
        // const specialtyEntries = specialties.map(specialty => `
        //   <url>
        //     <loc>${DOMAIN}/specialties/${specialty}</loc>
        //     <lastmod>${CURRENT_DATE}</lastmod>
        //     <changefreq>monthly</changefreq>
        //     <priority>0.7</priority>
        //   </url>`);
        const specialtyEntries = [];
        // Add app pages - commenting out as requested
        // const appEntries = [`
        //   <url>
        //     <loc>https://app.medally.ai/</loc>
        //     <lastmod>${CURRENT_DATE}</lastmod>
        //     <changefreq>weekly</changefreq>
        //     <priority>0.9</priority>
        //   </url>`,
        // `
        //   <url>
        //     <loc>https://app.medally.ai/login</loc>
        //     <lastmod>${CURRENT_DATE}</lastmod>
        //     <changefreq>monthly</changefreq>
        //     <priority>0.6</priority>
        //   </url>`,
        // `
        //   <url>
        //     <loc>https://app.medally.ai/signup</loc>
        //     <lastmod>${CURRENT_DATE}</lastmod>
        //     <changefreq>monthly</changefreq>
        //     <priority>0.8</priority>
        //   </url>`];
        const appEntries = [];
        // Combine all entries
        const allEntries = [...pageEntries, ...specialtyEntries, ...appEntries];
        // Create sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries.join('')}
</urlset>`;
        // Format XML with prettier
        const formattedSitemap = await prettier.format(sitemap, {
            parser: 'html',
            printWidth: 120,
        });
        // Write sitemap to file
        const outputDir = getSitemapOutputDir();
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), formattedSitemap);
        console.log('Sitemap generated successfully!');
    }
    catch (error) {
        console.error('Error generating sitemap:', error);
    }
}
// Execute the function if this script is run directly
// In ESM, we can check if the current file is the main module by comparing import.meta.url
// against the URL of the current module
if (import.meta.url === import.meta.resolve('./generate-sitemap.js')) {
    generateSitemap();
}
