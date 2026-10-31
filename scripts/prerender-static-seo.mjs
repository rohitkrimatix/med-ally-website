import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://www.medally.ai';
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const shell = readFileSync(join(distDir, 'index.html'), 'utf8');

const commonLinks = [
  ['Home', '/'],
  ['AI Clinical Documentation', '/clinical-documentation-ai'],
  ['AI Medical Scribe', '/ai-medical-scribe'],
  ['Clinical Workflow Software', '/clinical-workflow-software'],
  ['AI Clinical Decision Support', '/ai-clinical-decision-support'],
  ['AI Medical Coding', '/ai-medical-coding'],
  ['Features', '/features'],
  ['How It Works', '/how-it-works'],
  ['Benefits', '/benefits'],
  ['ROI Calculator', '/roi-calculator'],
  ['FAQ', '/faq'],
  ['Pricing', '/pricing'],
  ['Best AI Medical Scribes', '/resources/best-ai-medical-scribes'],
  ['About', '/about-us'],
  ['Contact', '/contact'],
];

const commonSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'MedAlly',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.svg`,
    sameAs: [
      'https://twitter.com/medAllyAI',
      'https://www.linkedin.com/company/medally-ai',
      'https://www.facebook.com/profile.php?id=491843437354106',
      'https://www.instagram.com/medally_saas',
      'https://www.youtube.com/@Med-Ally',
    ],
    description:
      'MedAlly is a clinical AI platform and physician AI assistant for documentation, clinical decision support, coding, and workflow automation.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: 'MedAlly',
    publisher: { '@id': `${siteUrl}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteUrl}/#software`,
    name: 'MedAlly',
    applicationCategory: 'HealthcareApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/`,
    featureList: [
      'AI clinical documentation',
      'SOAP note automation',
      'Clinical decision support',
      'Medical coding automation',
      'EHR workflow integration',
    ],
  },
];

const scribeFaqs = [
  {
    q: 'What documentation format can MedAlly produce?',
    a: "MedAlly's current product experience includes structured SOAP-style clinical documentation prepared from encounter context for physician review.",
  },
  {
    q: 'How does a physician review the MedAlly note?',
    a: 'The physician reviews the generated draft, makes any needed edits, validates the content, and approves what moves forward in the workflow.',
  },
  {
    q: 'How does the approved note reach the clinical record?',
    a: 'MedAlly is designed to move physician-approved work into the practice workflow, including the EHR workflow where supported by the specific deployment. Exact integration depth can vary, so practices and health systems should confirm support for their environment during evaluation.',
  },
  {
    q: 'What is included in the Forever Free plan?',
    a: 'The Forever Free plan includes 10 free encounters per month. View Pricing for current plan details and included capabilities.',
  },
  {
    q: 'What happens after I use the 10 free encounters?',
    a: 'The free allowance is 10 encounters per month. View Pricing for the current options available after the monthly allowance is used.',
  },
  {
    q: 'Is MedAlly only an AI medical scribe?',
    a: 'No. AI-assisted documentation is one part of MedAlly. The broader platform also organizes encounter context, surfaces reviewable decision-support information, prepares coding context, and supports workflow handoffs.',
  },
  {
    q: 'Does MedAlly replace physician review?',
    a: 'No. Physicians remain responsible for reviewing, editing, validating, approving, and making final clinical decisions.',
  },
  {
    q: 'What should I verify about privacy and security?',
    a: "Before deployment, healthcare organizations should review MedAlly's current privacy and security documentation and confirm the requirements relevant to their organization, including any needed contractual, data-handling, retention, encryption, and governance details.",
  },
];

const clinicalDocFaqs = [
  {
    q: 'What is AI clinical documentation?',
    a: 'AI clinical documentation uses artificial intelligence to help create, organize, and structure clinical notes from patient-encounter information. MedAlly prepares documentation for physician review rather than treating AI output as a final clinical record.',
  },
  {
    q: 'How does MedAlly help with clinical notes?',
    a: 'MedAlly organizes encounter context and prepares structured clinical documentation, including SOAP-style documentation. Physicians review, edit, validate, and approve the work.',
  },
  {
    q: 'Is AI clinical documentation the same as an AI medical scribe?',
    a: 'Not exactly. An AI medical scribe primarily describes capturing a clinical encounter and drafting a note from the conversation. AI clinical documentation is the broader process of creating, structuring, reviewing, approving, and moving documentation through the clinical workflow.',
  },
  {
    q: 'Does MedAlly generate SOAP notes?',
    a: 'Yes. MedAlly prepares SOAP-style clinical documentation from encounter context for physician review. The clinician should review and edit the draft before approval.',
  },
  {
    q: 'Can physicians edit AI-generated clinical documentation?',
    a: 'Yes. MedAlly is designed around physician review. The clinician reviews and edits AI-prepared work as needed before approving it.',
  },
  {
    q: 'Does MedAlly provide coding information with the documentation?',
    a: 'MedAlly prepares ICD-10/CPT coding context around the encounter for review. Coding output should be reviewed and validated before use.',
  },
  {
    q: 'What happens after a physician approves the documentation?',
    a: 'After review and approval, the documentation is ready for the next step in the practice workflow. The exact handoff depends on the MedAlly deployment.',
  },
  {
    q: 'Is MedAlly free to try?',
    a: "Yes. MedAlly's Forever Free plan includes 10 encounters per month.",
  },
  {
    q: 'Does MedAlly replace physician judgment?',
    a: 'No. MedAlly prepares information for review. Physicians remain responsible for validating clinical documentation, coding context, and clinical decisions before approval or use.',
  },
];

const bestScribesFaqs = [
  {
    q: 'What is the best AI medical scribe?',
    a: 'There is no universal best option. The right choice depends on practice size, specialty, note requirements, EHR workflow, pricing, and whether you need capabilities beyond documentation.',
  },
  {
    q: 'What should I look for in an AI medical scribe?',
    a: "Compare note quality and structure, clinician review controls, customization, specialty fit, EHR workflow, pricing, coding or other post-note capabilities, and the product's stated limitations.",
  },
  {
    q: 'Are free AI medical scribes available?',
    a: "Yes. Some vendors offer free plans or trials, but the limits vary. MedAlly's Forever Free plan includes 10 clinical encounters per month. Other vendors should be checked directly for their current free-plan or trial terms.",
  },
  {
    q: 'Is an ambient AI scribe the same as an AI medical scribe?',
    a: 'The terms overlap heavily in the market. "Ambient" usually emphasizes capturing the natural patient-clinician conversation in the background of the encounter, while "AI medical scribe" is the broader product category used for software that helps generate clinical documentation.',
  },
  {
    q: 'Should physicians review AI-generated notes?',
    a: 'Yes. AI-generated clinical documentation should be reviewed for accuracy, completeness, and appropriateness before it becomes part of the clinical record.',
  },
  {
    q: 'Do all AI medical scribes integrate with EHRs the same way?',
    a: 'No. Integration depth varies substantially. Buyers should confirm whether a product copies text, pushes notes, works inside the EHR, supports structured fields, stages orders, or provides another workflow.',
  },
  {
    q: 'Can an AI medical scribe help with coding?',
    a: 'Some platforms include coding support, but the scope differs by vendor and plan. Coding output should be reviewed and validated before use.',
  },
];

const clinicalWorkflowFaqs = [
  {
    q: 'What should a practice evaluate before choosing clinical workflow software?',
    a: 'Start with the workflow problem, then ask vendors to demonstrate the actual process: what enters the system, what the software prepares, what clinicians must review, how exceptions are handled, and how approved work reaches the next step.',
  },
  {
    q: 'How is encounter documentation different from workflow coordination?',
    a: 'Encounter documentation focuses on capturing and structuring the clinical note. Workflow coordination is broader and can include review responsibilities, follow-up, task or status management, coding, handoff, integration, and other steps surrounding the encounter.',
  },
  {
    q: 'Is healthcare workflow software the same as clinical workflow software?',
    a: 'Not always. The terms can overlap, but healthcare workflow software may include broader administrative and operational processes in addition to clinician-facing clinical workflows.',
  },
  {
    q: 'What should a practice confirm about EHR handoff?',
    a: 'Confirm the exact transfer method, which systems are supported, what requires clinician approval, what setup is needed, and which behaviors vary by deployment. Do not assume that "EHR integration" means automatic chart commitment.',
  },
  {
    q: 'How can a practice test whether software fits its workflow?',
    a: 'Use a realistic fictional or de-identified scenario and ask the vendor to demonstrate the complete path from input through review, edits, exceptions, approval, and downstream handoff.',
  },
  {
    q: 'Where does MedAlly fit within clinical workflow software?',
    a: 'MedAlly focuses on the physician encounter workflow: encounter listening, SOAP-style documentation, reviewable clinical information, treatment/follow-up support, ICD-10/CPT and billing-related information, physician review, and the next workflow step after approval.',
  },
  {
    q: 'Does MedAlly replace physician review?',
    a: 'No. MedAlly prepares and organizes information for review. Clinical judgment and final clinical decisions remain with the physician.',
  },
  {
    q: 'Can MedAlly support an EHR-connected workflow?',
    a: 'MedAlly can support practice / EHR workflow handoff after physician review and approval. The exact integration and handoff method vary by deployment.',
  },
];

const decisionSupportFaqs = [
  {
    q: 'What is AI clinical decision support?',
    a: 'AI clinical decision support uses artificial intelligence to help organize, synthesize, or surface information that may be relevant to clinical review and decision-making. The exact functionality varies by product.',
  },
  {
    q: 'Is AI clinical decision support the same as a clinical decision support system?',
    a: 'AI clinical decision support is part of the broader CDS category. A clinical decision support system can use AI, rule-based logic, reference content, alerts, or a combination of approaches. "AI clinical decision support" describes the use of AI within that broader decision-support workflow.',
  },
  {
    q: 'Does MedAlly provide clinical decision-support information?',
    a: "Yes. MedAlly's Diagnostic Assessment workspace can organize risk factors, clinical indicators, clinical findings, risk assessment, differential considerations, diagnostic planning, evidence context, treatment planning, and related review information around the encounter.",
  },
  {
    q: 'Does MedAlly make diagnoses for physicians?',
    a: 'MedAlly can display an initial diagnosis and ranked differential considerations with ICD-10 codes, but those outputs are for clinician review. The physician remains responsible for the final diagnosis, clinical interpretation, and clinical decisions.',
  },
  {
    q: 'Does MedAlly work with lab-related information?',
    a: 'Yes. MedAlly brings lab-related information into the encounter review workflow so the physician can consider it alongside the other information connected to the visit.',
  },
  {
    q: 'Does MedAlly provide treatment-planning support?',
    a: 'Yes. MedAlly can present a step-by-step treatment implementation plan with timing, responsible-role labels, step details, success and failure metrics, and next-step context. Treatment decisions and clinical actions remain with the physician.',
  },
  {
    q: 'Does MedAlly support follow-up?',
    a: 'Yes. Follow-up information can appear in the SOAP Plan and treatment workflow, including monitoring, timing, next-step context, and patient-education information. The physician determines the appropriate follow-up.',
  },
  {
    q: 'Is MedAlly an autonomous clinical decision-making system?',
    a: 'No. MedAlly is designed around physician review. It prepares and organizes information, while clinical judgment and final clinical decisions remain with the physician.',
  },
  {
    q: 'How does MedAlly connect decision support to clinical documentation?',
    a: 'MedAlly keeps decision-support information connected to the encounter workflow that also produces SOAP-style clinical documentation, allowing the physician to review clinical context around the same visit.',
  },
  {
    q: 'Can MedAlly support an EHR-connected workflow?',
    a: 'Yes. After physician review and approval, MedAlly can support the next practice or EHR workflow step. The exact handoff method varies by deployment.',
  },
];

const medicalCodingFaqs = [
  {
    q: 'What is AI medical coding?',
    a: 'AI medical coding uses artificial intelligence to help identify, organize, or prepare coding information from clinical documentation and encounter context. The exact degree of automation varies by product.',
  },
  {
    q: 'What is AI medical coding software?',
    a: 'AI medical coding software is software that uses AI within a medical coding workflow. Products can differ significantly in what they analyze, what coding information they produce, how users review that information, and how approved work moves downstream.',
  },
  {
    q: 'Is AI medical coding the same as automated medical coding?',
    a: 'Not necessarily. AI medical coding is a broad category. Automated medical coding usually implies that one or more coding steps are automated. Practices should confirm exactly which steps are automated and where human review is required.',
  },
  {
    q: 'Which coding systems does MedAlly support?',
    a: 'MedAlly supports ICD-10, ICD-11, DRG Codes, CPT Codes, HCPCS Codes, and Modifier Codes as configurable coding preferences for documentation and billing. Coding information is prepared for physician review and validation before use.',
  },
  {
    q: 'Does MedAlly automatically finalize medical codes?',
    a: 'No. MedAlly does not automatically finalize medical codes. It prepares coding information for physician review and validation before use, and the physician controls what moves forward.',
  },
  {
    q: 'Does MedAlly support billing-related work?',
    a: 'Yes. MedAlly prepares billing-related information around the encounter in addition to ICD-10/CPT coding information. Physicians should review and validate billing-related information before use.',
  },
  {
    q: 'How does MedAlly connect coding to documentation?',
    a: 'MedAlly keeps ICD-10/CPT coding information connected to the same encounter workflow that produces SOAP-style clinical documentation, so the physician can review the coding information alongside the encounter context.',
  },
  {
    q: 'Can MedAlly support an EHR-connected coding workflow?',
    a: 'MedAlly can support practice / EHR workflow handoff after physician review and approval. The exact integration and handoff method vary by deployment.',
  },
  {
    q: 'Does AI medical coding replace physician or coding review?',
    a: 'AI can prepare or organize coding information, but the appropriate review responsibility depends on the workflow and organization. In MedAlly, coding information is prepared for review and validation before use.',
  },
  {
    q: 'Is MedAlly free to try?',
    a: 'Yes. Forever Free includes 10 clinical encounters per month.',
  },
];

const pricingFaqs = [
  {
    q: 'What MedAlly plans are available?',
    a: 'MedAlly offers Forever Free, Professional, Ultimate, and Enterprise.',
  },
  {
    q: 'How much is Forever Free?',
    a: 'Forever Free is $0 USD and includes 10 clinical encounters per month.',
  },
  {
    q: 'How much is Professional?',
    a: 'Professional is $49 USD/mo per clinician and includes unlimited encounters, Advanced multilingual scribe, Medical coding maps (ICD-10), and Basic HIPAA storage.',
  },
  {
    q: 'How much is Ultimate?',
    a: 'Ultimate is $99 USD/mo per clinician and includes all Professional features, plus Predictive clinical support, 200+ guideline scans, Treatment plan assistance, and Priority AI latency.',
  },
  {
    q: 'How much is Enterprise?',
    a: 'Enterprise uses custom pricing and is designed for clinical teams and custom systems.',
  },
  {
    q: 'What counts as a MedAlly encounter?',
    a: 'One MedAlly session counts as one encounter.',
  },
  {
    q: 'Do the 10 free encounters renew every month?',
    a: 'Yes. Forever Free renews with 10 free encounters every month.',
  },
  {
    q: 'What happens after I use all 10 free encounters?',
    a: 'A Professional, Ultimate, or Enterprise subscription is required to start additional encounters before the next monthly renewal. If you remain on Forever Free, your allowance renews to 10 free encounters at the next monthly reset.',
  },
  {
    q: 'Are Professional and Ultimate monthly subscriptions?',
    a: 'Yes. Professional is $49 USD/mo per clinician and Ultimate is $99 USD/mo per clinician.',
  },
  {
    q: 'Can I cancel Professional or Ultimate?',
    a: 'Yes. Professional and Ultimate use flexible monthly agreements and can be canceled anytime. For the exact cancellation effective date or billing treatment, follow the current checkout/billing terms. Enterprise uses custom commercial terms.',
  },
  {
    q: 'What is the difference between Professional and Ultimate?',
    a: 'Professional includes unlimited encounters and the Professional feature set. Ultimate includes all Professional features and adds Predictive clinical support, 200+ guideline scans, Treatment plan assistance, and Priority AI latency.',
  },
  {
    q: 'Who is Enterprise for?',
    a: 'Enterprise is for clinical teams and custom systems that need a tailored deployment, including the Enterprise capabilities listed above.',
  },
];

const rawFaqData = JSON.parse(
  readFileSync(fileURLToPath(new URL('../src/data/faqData.json', import.meta.url)), 'utf8')
);

function getFaqAnswerText(faq) {
  const paragraphs = faq.a.join(' ');
  const linksText =
    faq.links && faq.links.length > 0
      ? ' ' + faq.links.map((l) => (l.prefix || '') + l.text + (l.suffix || '')).join(' ')
      : '';
  return (paragraphs + linksText).trim().replace(/\s+/g, ' ');
}

const generalFaqHubQuestions = rawFaqData.flatMap((category) =>
  category.faqs.map((faq) => ({
    q: faq.q,
    a: getFaqAnswerText(faq),
  }))
);

const pages = [
  {
    path: '/',
    title: 'MedAlly | Clinical AI Platform for Physicians',
    description:
      'MedAlly is a clinical AI platform that helps physicians reduce documentation burden, review clinical context, automate coding support, and keep encounter workflows connected.',
    h1: 'MedAlly clinical AI platform for physicians',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'MedAlly assists physicians across the clinical workday by drafting documentation, organizing encounter context, surfacing reviewable decision-support information, and preparing coding context while the physician stays in control.',
    bullets: ['AI clinical documentation', 'Physician review workflows', 'Clinical decision support', 'Medical coding automation'],
    sections: [
      {
        heading: 'Clinical Workflow Intelligence',
        content:
          'MedAlly connects documentation directly with encounter context, reviewable clinical insights, coding context, and care team handoffs—ensuring physicians remain in full control of every clinical note.',
      },
      {
        heading: 'Interactive Encounter Simulation',
        content:
          'Experience how ambient clinical dialogue is captured, structured into subjective, objective, assessment, and plan (SOAP) drafts, and aligned with recommended ICD-10 and CPT codes for physician validation.',
      },
      {
        heading: 'Forever Free Plan',
        content:
          'Start with 10 free encounters per month with ambient AI documentation, structured SOAP note generation, and clinician review gates.',
      },
    ],
  },
  {
    path: '/clinical-documentation-ai',
    title: 'AI Clinical Documentation for Physicians | MedAlly',
    description:
      'MedAlly helps physicians turn encounter context into structured, reviewable clinical documentation with SOAP-style notes and ICD-10/CPT coding context.',
    h1: 'AI Clinical Documentation for Physicians — Structured, Reviewable Notes',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'AI clinical documentation uses artificial intelligence to help create and structure clinical notes from information captured during a patient encounter. Instead of asking the physician to build the note from a blank page, the system prepares documentation for review while the physician remains responsible for the final clinical record.',
    bullets: [
      'Structured documentation draft preparation',
      'SOAP-style clinical note organization',
      'Encounter context and ICD-10/CPT coding workflow',
      'Physician-controlled review and approval gate',
    ],
    sections: [
      {
        heading: 'From Encounter Context to Reviewable Clinical Documentation',
        content:
          '1. Capture the encounter context. 2. Prepare structured clinical documentation in SOAP format. 3. Review the note and supporting coding context. 4. Prepare approved work for the next workflow step.',
      },
      {
        heading: 'Interactive Review Workspace',
        content:
          'Physicians inspect structured SOAP drafts (Subjective, Objective, Assessment, Plan), test real-time edits, verify ICD-10 and CPT coding context, and approve documentation before it moves forward in the workflow.',
      },
      {
        heading: 'Forever Free Plan — 10 Encounters Per Month',
        content:
          'MedAlly Forever Free includes 10 encounters per month, allowing physicians to evaluate structured clinical documentation before scaling.',
      },
    ],
    faqs: clinicalDocFaqs,
  },
  {
    path: '/clinical-workflow-software',
    title: 'Clinical Workflow Software for Physicians | MedAlly',
    description:
      'Learn what clinical workflow software should support, how to evaluate it, and where MedAlly fits across documentation, review, coding, follow-up, and handoff.',
    h1: 'Clinical Workflow Software for Physicians Across the Patient Encounter',
    image: '/images/medally/clinical-workflow-real.png',
    answer:
      'Clinical workflow software helps coordinate the tasks, information, reviews, and handoffs that make up clinical work. MedAlly focuses on the physician encounter workflow—from listening during the visit through documentation, reviewable clinical information, coding and follow-up work, physician approval, and the next practice or EHR workflow step.',
    bullets: [
      'Encounter documentation and SOAP-style note preparation',
      'Reviewable clinical decision-support and lab information',
      'Treatment planning, follow-up, and ICD-10/CPT coding context',
      'Physician review and practice/EHR workflow handoff',
    ],
    sections: [
      {
        heading: 'What Is Clinical Workflow Software?',
        content:
          'Clinical workflow software helps organize how clinical tasks and information move between people, systems, and stages of care. The category describes a broad landscape that varies by product and setting, including encounter documentation, patient flow, task coordination, clinical review, follow-up, coding, operational handoffs, and EHR connections.',
      },
      {
        heading: 'Where Does MedAlly Fit in the Clinical Workflow Category?',
        content:
          'MedAlly focuses on the physician encounter workflow. It listens during the patient encounter and prepares SOAP-style clinical documentation, decision-support and differential-review information, lab-related context, treatment-planning and follow-up information, ICD-10/CPT coding information, and billing-related information for physician review.',
      },
      {
        heading: 'Physician Review and Approval Gate',
        content:
          'Physicians review and edit AI-prepared work before approval. Clinical judgment remains strictly with the physician. After approval, MedAlly supports the next practice or EHR workflow step, with the exact handoff method varying by deployment.',
      },
      {
        heading: 'Forever Free Plan — 10 Encounters Per Month',
        content:
          'Forever Free includes 10 clinical encounters every month. One MedAlly session counts as one encounter, and the free allowance renews monthly.',
      },
    ],
    faqs: clinicalWorkflowFaqs,
  },
  {
    path: '/ai-medical-scribe',
    title: 'AI Medical Scribe for Physicians | MedAlly',
    description:
      'MedAlly helps physicians turn patient encounters into structured, reviewable clinical notes, then move approved work into the clinical workflow.',
    h1: 'AI Medical Scribe for Physicians — From Encounter to Reviewable Note',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'An AI medical scribe uses artificial intelligence to help turn a clinician-patient encounter into draft clinical documentation. An ambient AI scribe captures clinical conversations to build reviewable notes while connecting to broader clinical workflow intelligence.',
    bullets: [
      'Ambient encounter capture',
      'Structured SOAP draft preparation',
      'Physician review and validation gate',
      'Downstream workflow and coding context',
    ],
    sections: [
      {
        heading: 'Step-by-Step Scribing Workflow',
        content:
          '1. MedAlly listens to the encounter. 2. MedAlly prepares the structured SOAP draft. 3. The physician reviews and edits the draft. 4. Physician-approved work moves forward into practice workflows.',
      },
      {
        heading: 'Illustrative Demonstration Review Workspace',
        content:
          'Inspect structured SOAP output (Subjective, Objective, Assessment, Plan), test inline clinician edits, and explore the clinician verification and approval controls.',
      },
      {
        heading: 'Forever Free Plan — 10 Free Encounters Per Month',
        content:
          'The Forever Free plan includes 10 free encounters per month, giving physicians a practical way to evaluate ambient AI scribing before expanding practice deployment.',
      },
    ],
    faqs: scribeFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: scribeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  },
  {
    path: '/resources/best-ai-medical-scribes',
    title: 'Best AI Medical Scribes for Physicians | MedAlly',
    description:
      'Compare leading AI medical scribes for physicians by documentation workflow, clinical support, coding, integrations, pricing, and practice fit.',
    h1: 'Best AI Medical Scribes for Physicians — 8 Options to Compare in 2026',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'Compare eight leading AI medical scribe solutions for physicians: MedAlly, Abridge, Ambience Healthcare, DeepScribe, Freed, Heidi, Nabla, and Suki. Evaluated across documentation workflows, clinician review controls, beyond-the-note capabilities, verified public pricing, and practice fit.',
    bullets: [
      'Side-by-side comparison of 8 leading AI medical scribes',
      'Research-validated public pricing and trial terms',
      'Evaluation framework across documentation, coding, and EHR handoff',
      'Tailored shortlists for independent practices and specialty physicians',
    ],
    sections: [
      {
        heading: 'How This Comparison Was Researched',
        content:
          'This is a comparison of vendor-published information, not an independent clinical-performance study. Information was validated against official vendor product and pricing pages in October 2026.',
      },
      {
        heading: 'Quick Comparison of AI Medical Scribes',
        content:
          'MedAlly (Forever Free: $0 for 10 encounters/mo, Professional: $49/mo, Ultimate: $99/mo), Abridge (Enterprise, Contact vendor), Ambience Healthcare (Enterprise, Contact vendor), DeepScribe (Specialty/Oncology, Contact vendor), Freed (Starter: $39/mo, Core: $79/mo, Premier: $119/mo), Heidi (Free plan available, paid pricing unconfirmed), Nabla (Try it free, pricing unconfirmed), Suki (Ambient Intelligence, Contact vendor).',
      },
      {
        heading: 'Which AI Medical Scribe Is Best for a Small Practice?',
        content:
          'Small practices should prioritize monthly cost per clinician, free entry plans or trials, fast adoption without large IT implementation, note customization, and post-note coding support. MedAlly, Freed, and Heidi publish accessible entry paths.',
      },
      {
        heading: 'Which AI Medical Scribe Is Best for Specialist Physicians?',
        content:
          'Specialists should look for specialty template adaptation, longitudinal context, pre-encounter information, and deep ICD-10/CPT coding support. DeepScribe, Abridge, Suki, Ambience, Nabla, Heidi, Freed, and MedAlly support diverse specialty workflows.',
      },
      {
        heading: 'Comparison Limitations',
        content:
          'This guide compares what vendors publicly document and does not measure note accuracy head-to-head. Confirm exact plan capabilities, EHR compatibility, encounter caps, and pricing terms directly with each vendor.',
      },
    ],
    faqs: bestScribesFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: bestScribesFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  },
  {
    path: '/ai-clinical-decision-support',
    title: 'AI Clinical Decision Support for Physicians | MedAlly',
    description:
      'See how MedAlly supports AI clinical decision support with differential-review, lab, treatment-planning, and follow-up information for physician review.',
    h1: 'AI Clinical Decision Support for Physicians — Information for Review, Decisions by Clinicians',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'AI clinical decision support helps organize patient and encounter information so clinicians can review relevant context when making care decisions. MedAlly prepares decision-support and differential-review information, brings lab-related context into the encounter review workflow, and keeps treatment-planning and follow-up information connected to the same clinical context while clinicians remain in control.',
    bullets: [
      'Review-assisted CDS architecture',
      'Ranked differential diagnosis review',
      'Lab synthesis and follow-up context',
      'Preserves complete physician clinical judgment',
    ],
    sections: [
      {
        heading: 'What Is AI Clinical Decision Support?',
        content:
          'Clinical decision support provides timely knowledge and person-specific information to inform patient care decisions. MedAlly focuses on a review-assisted CDS architecture where AI prepares reviewable information while clinical decisions remain strictly with clinicians.',
      },
      {
        heading: 'Interactive Diagnostic Workspace',
        content:
          'Physicians explore ranked differential considerations with ICD-10 alignments, test diagnostic planning recommendations, synthesize abnormal lab alerts, and align treatment protocols before finalizing documentation.',
      },
      {
        heading: 'Guiding Clinical Principle',
        content:
          'AI prepares. Clinicians review. Clinicians decide. MedAlly is designed to assist clinical workflows without usurping clinical judgment or physician accountability.',
      },
    ],
    faqs: decisionSupportFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: decisionSupportFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  },
  {
    path: '/clinical-decision-support-ai',
    title: 'AI Clinical Decision Support for Physicians | MedAlly',
    description:
      'See how MedAlly supports AI clinical decision support with differential-review, lab, treatment-planning, and follow-up information for physician review.',
    h1: 'AI Clinical Decision Support for Physicians — Information for Review, Decisions by Clinicians',
    image: '/images/medally/clinical-hero.webp',
    canonical: 'https://www.medally.ai/ai-clinical-decision-support',
    answer:
      'AI clinical decision support helps organize patient and encounter information so clinicians can review relevant context when making care decisions. MedAlly prepares decision-support and differential-review information, brings lab-related context into the encounter review workflow, and keeps treatment-planning and follow-up information connected to the same clinical context while clinicians remain in control.',
    bullets: [
      'Review-assisted CDS architecture',
      'Ranked differential diagnosis review',
      'Lab synthesis and follow-up context',
      'Preserves complete physician clinical judgment',
    ],
    sections: [
      {
        heading: 'What Is AI Clinical Decision Support?',
        content:
          'Clinical decision support provides timely knowledge and person-specific information to inform patient care decisions. MedAlly focuses on a review-assisted CDS architecture where AI prepares reviewable information while clinical decisions remain strictly with clinicians.',
      },
    ],
    faqs: decisionSupportFaqs,
  },
  {
    path: '/ai-medical-coding',
    title: 'AI Medical Coding Software for Physicians | MedAlly',
    description:
      'See how MedAlly supports AI medical coding with configurable coding systems, encounter-linked coding information, physician review, and workflow handoff.',
    h1: 'AI Medical Coding for Physicians — Review Coding in Clinical Context',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'AI medical coding is the use of artificial intelligence to help identify, organize, or prepare medical coding information from clinical documentation and encounter context. MedAlly prepares ICD-10 and CPT coding information around the encounter for review, keeping coding connected to the clinical note while the physician validates all outputs before use.',
    bullets: [
      'Physician-validated coding workflow',
      'ICD-10, CPT & additional coding systems',
      'SOAP encounter alignment',
      'Review-first clinical workflow',
    ],
    sections: [
      {
        heading: 'What Is AI Medical Coding?',
        content:
          'AI medical coding helps turn clinical documentation into coding information that is easier to review in the context of the patient encounter. MedAlly connects ICD-10, CPT, and other configurable systems directly to the clinical note.',
      },
      {
        heading: 'Interactive Coding Workspace',
        content:
          'Clinicians inspect recommended codes with confidence indicators, verify documentation evidence links, customize coding preferences, and validate coding context before EHR handoff.',
      },
      {
        heading: 'Review-First Coding Architecture',
        content:
          'MedAlly does not automatically commit codes without clinician oversight. Every code suggestion remains subject to physician validation and institutional coding policies.',
      },
    ],
    faqs: medicalCodingFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: medicalCodingFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  },
  {
    path: '/features',
    title: 'MedAlly Features | Clinical AI Platform for Physicians',
    description:
      "Explore MedAlly's clinical AI platform for documentation, diagnostics, billing, revenue, workflow operations, patient follow-up, and physician review.",
    h1: 'MedAlly clinical AI platform for the whole workday',
    image: '/images/medally/features-gpt/features-hero-physician.png',
    answer:
      'MedAlly automates clinical documentation, differential review, lab synthesis, treatment planning support, billing context, follow-up tasks, and workflow handoffs from the same encounter context.',
    bullets: ['Documentation and notes', 'Diagnostics and decision support', 'Billing and revenue', 'Workflow and operations'],
  },
  {
    path: '/how-it-works',
    title: 'How MedAlly Works | Clinical AI Workflow for Physicians',
    description:
      'See how MedAlly fits into the clinical workflow from patient conversation to SOAP note automation, clinical review, coding, and EHR handoff.',
    h1: 'How MedAlly fits into a clinical workflow',
    image: '/images/medally/brand-two-screens-one-truth.png',
    answer:
      'MedAlly listens to the encounter, drafts structured notes, organizes clinical context, prepares coding signals, and hands physician-approved outputs back into the practice workflow.',
    bullets: ['Capture encounter context', 'Draft structured clinical notes', 'Review clinical and billing context', 'Move approved work into the EHR workflow'],
  },
  {
    path: '/benefits',
    title: 'MedAlly Benefits | Clinical AI Platform for Better Physician Workflows',
    description:
      'MedAlly helps physicians and practice leaders reduce documentation burden, improve workflow visibility, support clinical review, and protect revenue capture.',
    h1: 'Clinical AI benefits for physicians and practice leaders',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'Clinical AI reduces documentation burden by turning encounter context into reviewable notes, follow-up tasks, care-plan context, and coding support before the clinical day fragments.',
    bullets: ['Less after-hours documentation', 'More consistent review paths', 'Connected follow-up', 'Revenue-aware coding support'],
  },
  {
    path: '/roi-calculator',
    title: 'MedAlly ROI Calculator | Estimate Clinical AI Documentation Savings',
    description:
      'Estimate MedAlly ROI from physician time savings, documentation efficiency, medical coding automation, and better clinical workflow throughput.',
    h1: 'Estimate clinical AI ROI for your practice',
    image: '/images/medally/product-billing-card.png',
    answer:
      'MedAlly ROI is estimated from physician hours saved, documentation reduction, chart completion gains, coding support, and the operational value of faster review workflows.',
    bullets: ['Time saved per physician', 'Documentation hours reduced', 'Potential revenue impact', 'Workflow throughput gains'],
  },
  {
    path: '/faq',
    title: 'MedAlly FAQ | Clinical AI, Scribe, Pricing & Workflow',
    description:
      'Get answers about MedAlly clinical AI, AI medical scribe, SOAP notes, ICD-10/CPT coding, physician review, workflow, pricing, and free encounters.',
    h1: 'Frequently Asked Questions About MedAlly',
    image: '/images/medally/clinical-workflow-real.png',
    answer:
      "Get direct answers about MedAlly's clinical AI workflow, AI medical scribe, clinical documentation, physician review, coding, pricing, and adoption.",
    bullets: [
      'About MedAlly and the Workflow',
      'AI Medical Scribe and Clinical Documentation',
      'Clinical Support, Coding, and Follow-Up',
      'Physician Review and Workflow Handoff',
      'Plans and Pricing',
      'Practice and Enterprise Adoption',
    ],
    sections: [
      {
        heading: 'About MedAlly and the Workflow',
        content:
          'MedAlly is a clinical AI platform for physicians that captures patient encounters, prepares SOAP-style documentation, organizes clinical information, prepares ICD-10/CPT and billing information, supports treatment and follow-up work, and connects approved work into practice workflows.',
      },
      {
        heading: 'AI Medical Scribe and Clinical Documentation',
        content:
          'MedAlly includes an ambient AI medical scribe workflow that listens during patient encounters to draft structured SOAP notes for physician review and editing. The physician remains responsible for reviewing and approving the final clinical record.',
      },
      {
        heading: 'Clinical Support, Coding, and Follow-Up',
        content:
          'MedAlly prepares reviewable decision support, differential reviews, lab synthesis, treatment planning information, follow-up instructions, and ICD-10/CPT coding context to assist physicians throughout the clinical day.',
      },
      {
        heading: 'Physician Review and Workflow Handoff',
        content:
          'MedAlly organizes information for review without replacing physician judgment. Once reviewed and approved, documentation moves into practice and EHR workflows according to deployment capabilities.',
      },
      {
        heading: 'Plans and Pricing',
        content:
          'MedAlly offers Forever Free ($0, 10 encounters/month renewing monthly), Professional ($49/mo, unlimited encounters), Ultimate ($99/mo, comprehensive intelligence and guideline scans), and Enterprise (Custom for clinical teams and custom systems). Flexible monthly agreements, cancel anytime.',
      },
      {
        heading: 'Practice and Enterprise Adoption',
        content:
          'Clinicians can evaluate MedAlly directly with Forever Free or model practice-wide impact using the MedAlly ROI Calculator. Clinical teams and enterprise healthcare systems can contact MedAlly for custom EHR integration and dedicated deployment support.',
      },
    ],
    faqs: generalFaqHubQuestions,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: generalFaqHubQuestions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  },
  {
    path: '/pricing',
    title: 'MedAlly Pricing | Plans for Physicians & Clinical Teams',
    description:
      'Compare MedAlly Forever Free, Professional, Ultimate, and Enterprise plans. Start with 10 free encounters each month or choose a paid plan.',
    h1: 'MedAlly Pricing for Physicians and Clinical Teams',
    image: '/images/medally/product-billing-card.png',
    answer:
      'Choose from Forever Free, Professional, Ultimate, or Enterprise based on how you want to use MedAlly. Start with 10 free encounters every month, move to an unlimited paid plan when you need more usage, or talk with MedAlly about an Enterprise deployment for clinical teams and custom systems. Flexible monthly agreements. Cancel anytime.',
    bullets: [
      'Forever Free: $0 USD — 10 clinical encounters per month',
      'Professional: $49 USD/mo per clinician — Unlimited encounters',
      'Ultimate: $99 USD/mo per clinician — All Professional features plus predictive clinical support',
      'Enterprise: Custom — For clinical teams & custom systems',
    ],
    sections: [
      {
        heading: 'How Much Does MedAlly Cost?',
        content:
          'Forever Free is $0 USD for 10 clinical encounters per month. Professional is $49 USD/mo per clinician for unlimited encounters. Ultimate is $99 USD/mo per clinician for unlimited encounters with predictive clinical support. Enterprise uses custom pricing for clinical teams and custom systems. A MedAlly session counts as one encounter. Forever Free includes 10 encounters per month, and the 10 free encounters renew every month. After all 10 free encounters for the current month are used, a Professional, Ultimate, or Enterprise subscription is required to start additional encounters before the next monthly renewal. If you remain on Forever Free, the allowance renews to 10 free encounters at the next monthly reset.',
      },
      {
        heading: 'Compare MedAlly Plans',
        content:
          'Forever Free ($0 USD): 10 clinical encounters/month, Ambient AI documentation, Basic clinical guidelines, Standard SOAP formats. Professional ($49 USD/mo per clinician): Unlimited encounters, Advanced multilingual scribe, Medical coding maps (ICD-10), Basic HIPAA storage. Ultimate ($99 USD/mo per clinician): All Professional features, Predictive clinical support, 200+ guideline scans, Treatment plan assistance, Priority AI latency. Enterprise (Custom): Custom EPIC/Cerner integration, Dedicated clinical success lead, Whitelabeled interface options, SSO & Advanced Governance.',
      },
      {
        heading: 'Which MedAlly Plan Should I Choose?',
        content:
          'Choose Forever Free if you want to evaluate MedAlly with up to 10 encounters each month. Choose Professional if you need unlimited encounters and the Professional scribe, coding, and storage capabilities. Choose Ultimate if you want all Professional features plus predictive clinical support, 200+ guideline scans, treatment plan assistance, and priority AI latency. Choose Enterprise if you are evaluating MedAlly for a clinical team or custom system and need a tailored deployment.',
      },
    ],
    faqs: pricingFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MedAlly',
      applicationCategory: 'HealthcareApplication',
      operatingSystem: 'Web',
      url: 'https://www.medally.ai/',
      offers: [
        {
          '@type': 'Offer',
          name: 'Forever Free',
          price: '0',
          priceCurrency: 'USD',
          description: '10 clinical encounters per month, renewing monthly',
          url: 'https://app.medally.ai/',
        },
        {
          '@type': 'Offer',
          name: 'Professional',
          price: '49',
          priceCurrency: 'USD',
          description: 'Unlimited encounters, advanced multilingual scribe, medical coding maps (ICD-10), basic HIPAA storage',
          url: 'https://app.medally.ai/',
        },
        {
          '@type': 'Offer',
          name: 'Ultimate',
          price: '99',
          priceCurrency: 'USD',
          description: 'All Professional features plus predictive clinical support, 200+ guideline scans, treatment plan assistance, priority AI latency',
          url: 'https://app.medally.ai/',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: 'Custom',
          priceCurrency: 'USD',
          description: 'For clinical teams & custom systems with custom EPIC/Cerner integration, dedicated clinical success lead, whitelabeled interface options, SSO & advanced governance',
          url: 'https://www.medally.ai/contact',
        },
      ],
    },
  },
  {
    path: '/about-us',
    title: 'About MedAlly | Physician-Centered Clinical AI Platform',
    description:
      'Learn about MedAlly, a physician-centered clinical AI platform built to reduce documentation burden and connect clinical, operational, and billing workflows.',
    h1: 'About MedAlly',
    image: '/images/medally/brand-hero-calm-day.png',
    answer:
      'MedAlly is built for physicians and practice leaders who need clinical AI that assists the workday without removing physician judgment, accountability, or review.',
    bullets: ['Physician-centered AI', 'Practice workflow support', 'Clinical documentation automation', 'Calm review-first design'],
  },
  {
    path: '/contact',
    title: 'Contact MedAlly | Clinical AI Platform',
    description:
      'Contact MedAlly to evaluate clinical AI documentation, physician workflow support, EHR integration, and medical coding automation for your practice.',
    h1: 'Contact MedAlly',
    image: '/images/medally/clinical-workflow-real.png',
    answer:
      'Contact MedAlly to discuss clinical AI workflows, physician adoption, documentation automation, EHR handoff needs, and practice implementation planning.',
    bullets: ['Request a clinical AI demo', 'Discuss workflow fit', 'Review EHR integration needs', 'Plan practice adoption'],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - MedAlly Clinical AI Platform',
    description:
      'Read the MedAlly privacy policy for the clinical AI platform, including privacy-conscious healthcare workflow and data handling information.',
    h1: 'MedAlly Privacy Policy',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'The MedAlly privacy policy explains how privacy-conscious clinical AI workflows, account data, communications, and healthcare platform interactions are handled.',
    bullets: ['Privacy-conscious workflows', 'Data handling practices', 'Healthcare platform use', 'Contact and policy updates'],
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service - MedAlly Clinical AI Platform',
    description:
      'Read the MedAlly terms of service for clinical AI platform use, physician workflow support, account responsibilities, and acceptable use.',
    h1: 'MedAlly Terms of Service',
    image: '/images/medally/clinical-hero.webp',
    answer:
      'The MedAlly terms describe platform use, account responsibilities, acceptable use, service availability, intellectual property, and clinical AI workflow responsibilities.',
    bullets: ['Platform access', 'Account responsibilities', 'Acceptable use', 'Clinical AI workflow terms'],
  },
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const absoluteUrl = (path) => `${siteUrl}${path}`;
const canonicalFor = (path) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path.replace(/\/+$/, '')}`);

function renderHead(page) {
  const canonical = page.canonical || canonicalFor(page.path);
  const image = page.image.startsWith('http') ? page.image : absoluteUrl(page.image);
  const schema = [
    ...commonSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#software` },
      primaryImageOfPage: { '@type': 'ImageObject', url: image, caption: page.h1 },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        ...(page.path === '/'
          ? []
          : [{ '@type': 'ListItem', position: 2, name: page.h1, item: canonical }]),
      ],
    },
    ...(page.schema ? [page.schema] : []),
  ];

  return `
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:alt" content="${escapeHtml(page.h1)}" />
  <meta property="og:site_name" content="MedAlly" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(page.title)}" />
  <meta name="twitter:description" content="${escapeHtml(page.description)}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="${escapeHtml(page.h1)}" />
  <meta name="application-name" content="MedAlly" />
  <meta name="theme-color" content="#00C2B2" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderBody(page) {
  const sectionsHtml = page.sections
    ? page.sections
        .map(
          (sec) => `
      <section>
        <h2>${escapeHtml(sec.heading)}</h2>
        <p>${escapeHtml(sec.content)}</p>
      </section>`
        )
        .join('')
    : '';

  const faqsHtml = page.faqs
    ? `
      <section aria-label="Frequently Asked Questions">
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${page.faqs
            .map(
              (faq) => `
            <dt><strong>${escapeHtml(faq.q)}</strong></dt>
            <dd>${escapeHtml(faq.a)}</dd>`
            )
            .join('')}
        </dl>
      </section>`
    : '';

  return `<div id="root"><main data-static-seo="true">
    <nav aria-label="Primary">${commonLinks.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join(' ')}</nav>
    <article>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.answer)}</p>
      <ul>${page.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>
      ${sectionsHtml}
      ${faqsHtml}
      <p><a href="https://app.medally.ai/">Start free</a> <a href="/contact">Contact Sales</a></p>
    </article>
  </main></div>`;
}

function renderPage(page) {
  let html = shell;
  html = html.replace(/<title>.*?<\/title>/s, renderHead(page));
  html = html.replace(/<div id="root"><\/div>/, renderBody(page));
  return html;
}

for (const page of pages) {
  const renderedHtml = renderPage(page);
  if (page.path === '/') {
    writeFileSync(join(distDir, 'index.html'), renderedHtml);
  } else {
    const dirPath = page.path.replace(/^\//, '');
    const targetDir = join(distDir, dirPath);
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(join(targetDir, 'index.html'), renderedHtml);
    writeFileSync(join(distDir, `${dirPath}.html`), renderedHtml);
  }
}

console.log(`Prerendered SEO HTML for ${pages.length} routes.`);
