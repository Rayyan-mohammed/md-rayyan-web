import { sources } from './site';

export type Link = { label: string; href: string };

export type Featured = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  problem: string;
  result: string;
  resultSource: string;
  limit: { label: string; text: string };
  links: Link[];
  caseStudy?: string;
};

// Roles follow the GitHub profile README, which states which part of each team project was mine.
export const featured: Featured[] = [
  {
    slug: 'argus',
    title: 'Argus',
    subtitle: 'Keeping ML training alive through EC2 Spot reclaims',
    role: 'Co-author · owned the ML layer',
    year: '2026',
    problem:
      "Spot capacity costs 60–90% less than on-demand, but AWS can take it back on two minutes' notice. When does predicting that beat plain checkpointing?",
    result:
      'Once a checkpoint no longer fits inside the notice, the retrained model beat periodic checkpointing in a trace-driven benchmark: 1.14× slowdown against 1.34× at 15 nodes. On 152 real reclaims, though, price history had no skill (AUROC 0.53); AWS’s placement score did (0.74).',
    resultSource: sources.argus.readme,
    limit: {
      label: 'What didn’t hold',
      text: 'The benchmark’s interruptions are price spikes, a proxy, and real reclaims do not follow them. We report both.',
    },
    caseStudy: '/work/argus',
    links: [
      { label: 'Case study', href: '/work/argus' },
      { label: 'Paper', href: sources.argus.paper },
      { label: 'Code', href: sources.argus.repo },
    ],
  },
  {
    slug: 'bharathealth',
    title: 'BharatHealth Analyst',
    subtitle: 'An LLM agent for India’s district health data, graded on 200 questions',
    role: 'Sole author',
    year: '2026',
    problem:
      'NFHS-5 publishes data for 706 districts as CSVs and long PDFs. A simple policy question means hand-sorting columns.',
    result:
      '71.1% exact-answer accuracy, 82.0% faithfulness and a 5.0% hallucination rate against computed ground truth, rescored after I found four bugs in my own scorer.',
    resultSource: sources.bharat.readme,
    limit: {
      label: 'Still open',
      text: 'Four of five question categories still reflect the prompt before a routing fix.',
    },
    caseStudy: '/work/bharathealth',
    links: [
      { label: 'Case study', href: '/work/bharathealth' },
      { label: 'Live', href: sources.bharat.live },
      { label: 'Code', href: sources.bharat.repo },
    ],
  },
  {
    slug: 'obscuron',
    title: 'Obscuron',
    subtitle: 'Calibrated novelty detection for proteins no database can name',
    role: 'Co-author · implementation',
    year: '2026',
    problem:
      '22% of the 1.34 million proteins we scanned match no known family, so a novelty detector has nothing to be checked against.',
    result:
      '0.962 mean held-out-family AUROC across 903 Pfam families, graded against what was characterised later. Presented at IEEE ICAESIS-2026.',
    resultSource: sources.obscuron.readme,
    limit: {
      label: 'What didn’t hold',
      text: 'Novelty ranks at chance (AUROC 0.47) for predicting which dark proteins get characterised next.',
    },
    caseStudy: '/work/obscuron',
    links: [
      { label: 'Case study', href: '/work/obscuron' },
      { label: 'Project page', href: sources.obscuron.page },
      { label: 'Code', href: sources.obscuron.repo },
    ],
  },
  {
    slug: 'caliber',
    title: 'CALIBER',
    subtitle: 'When do “hallucination flags” for medical image reconstruction stay valid?',
    role: 'Theory track · ongoing',
    year: '2026',
    problem:
      'Conformal reliability flags for generative MRI and CT reconstruction assume the scanner’s acquisition operator never changes.',
    result:
      'Under operator shift on CT, naively transferred coverage falls to 0.69 against a 0.90 target; group-conditional calibration restores 0.90 or better.',
    resultSource: sources.caliber.pinned,
    limit: {
      label: 'Still open',
      text: 'The coverage-gap bound is still being tested against measured score banks; preprint not yet posted.',
    },
    links: [
      { label: 'Research entry', href: '/research#caliber' },
      { label: 'Code', href: sources.caliber.repo },
    ],
  },
];

export type ArchiveItem = {
  year: string;
  name: string;
  role?: string;
  desc: string;
  links: Link[];
};

export const archive: ArchiveItem[] = [
  {
    year: '2026',
    name: 'Land-Lekha',
    role: 'Smart India Hackathon 2026, team of six',
    desc: 'Scanned Hindi and English land records to validated fields, with calibrated per-field confidence (expected calibration error 0.0245 on 516 held-out fields) and human-review routing.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/Land-Lekha' }],
  },
  {
    year: '2026',
    name: 'Doppel',
    role: 'Evaluation track, team of four',
    desc: 'A benchmark of synthetic health-record generators. A calibrated membership attack found 36% of a diffusion model’s training records at a 1% false-positive rate.',
    links: [
      { label: 'Code', href: 'https://github.com/Angshuman1211/Doppel' },
      { label: 'Dashboard', href: 'https://doppel-six.vercel.app/' },
    ],
  },
  {
    year: '2026',
    name: 'CodeSwitch-Verify',
    role: 'Team of two',
    desc: 'RAG for Hinglish government-scheme questions that checks every claim in an answer against retrieved evidence before it reaches the user.',
    links: [
      { label: 'Code', href: 'https://github.com/Rayyan-mohammed/HinglishRAG-Faith' },
      { label: 'Demo', href: 'https://d1zhxd8az51i27.cloudfront.net' },
    ],
  },
  {
    year: '2026',
    name: 'Parkinson’s voice biomarkers',
    desc: 'Voice-based detection with subject-level cross-validation, wav2vec2 features and SHAP explanations.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/Parkinson' }],
  },
  {
    year: '2026',
    name: 'OptiPrice',
    desc: 'Constrained price optimisation with Monte Carlo A/B simulation and SHAP-explained recommendations.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/OptiPrice' }],
  },
  {
    year: '2026',
    name: 'Urban Route Resilience',
    role: 'Hackathon team',
    desc: 'Road extraction from satellite imagery plus graph-based analysis of how a road network holds up when links fail.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/Urban-Route-Resilience' }],
  },
  {
    year: '2026',
    name: 'DermaAegis',
    role: 'Team project; my part was containerisation',
    desc: 'Seven-class HAM10000 skin-lesion classifier with Grad-CAM and Monte Carlo dropout. A research prototype, not a diagnostic tool.',
    links: [
      { label: 'Code', href: 'https://github.com/Angshuman1211/DermaAegis-SmartHorizon' },
      { label: 'Demo', href: 'https://derma-aegis-smart-horizon.vercel.app/' },
    ],
  },
  {
    year: '2026',
    name: 'DNA sequence compression',
    desc: 'LZ77, Burrows–Wheeler and suffix-tree compression over live NCBI sequences.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/DNA-sequence-compression' }],
  },
  {
    year: '2025',
    name: 'PharmaFlow Pro',
    role: 'Sole author',
    desc: 'Pharmacy ERP on a 31-table MySQL schema: per-action permissions for three roles, constant-time CSRF checks, login throttling and an activity log. Previously ran on Elastic Beanstalk with RDS.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/Pharma-Flow-Pro' }],
  },
  {
    year: '2025',
    name: 'DigiElev8',
    role: 'Hackathon team',
    desc: 'Inventory, sales and budget dashboard for small businesses. Won the NMIMS TechFestia’25 hackathon.',
    links: [{ label: 'Code', href: 'https://github.com/Rayyan-mohammed/DigiElev8' }],
  },
];
