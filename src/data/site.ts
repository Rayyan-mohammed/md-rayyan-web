// Single place for identity, links and the facts shown in more than one spot.
// Every number on the site must trace back to a file linked in `sources`.

export const site = {
  name: 'MD Rayyan',
  url: 'https://rayyan-mohammed.vercel.app',
  role: 'ML systems & evaluation',
  description:
    'MD Rayyan builds machine-learning systems and the evaluations that decide whether to trust them. Co-author of Argus (arXiv) and Obscuron (IEEE ICAESIS-2026).',
  email: 'rayyan1652@gmail.com',
  location: 'Hyderabad, India',
  cv: '/MD_Rayyan_Resume.pdf',
  lastUpdated: '2026-11-23',
};

export const links = {
  github: 'https://github.com/Rayyan-mohammed',
  linkedin: 'https://www.linkedin.com/in/md-rayyan/',
  arxiv: 'https://arxiv.org/abs/2609.39067',
  credly: 'https://www.credly.com/users/rayyan-md/',
  source: 'https://github.com/Rayyan-mohammed/md-rayyan-web',
  coauthor: 'https://github.com/Angshuman1211',
};

const argusRepo = 'https://github.com/Angshuman1211/Argus-Spot_Resilient_ML_Training_Orchestrator';
const obscuronRepo = 'https://github.com/Angshuman1211/Obscuron';
const bharatRepo = 'https://github.com/Rayyan-mohammed/aarogya-lens';
const caliberRepo = 'https://github.com/Angshuman1211/CALIBER';

// Result links are pinned to the commit the quoted numbers were read from (23 Nov 2026),
// so a figure and its source cannot drift apart. Update the SHA when you update a number.
const pin = {
  argus: 'd10c36182df92f25fa2da57fa357fa1e97b1fa69',
  obscuron: '0d7c4c5ba434d8ee457820d54a275b9c21e0bb19',
  bharat: '32e4877ac297a514b74d8450453ae92e7f81fd8b',
  caliber: '23d2ed5ec9b9866afc02ba7713441ee659067f57',
};

export const sources = {
  argus: {
    repo: argusRepo,
    paper: 'https://arxiv.org/abs/2609.39067',
    pdf: 'https://arxiv.org/pdf/2609.39067',
    page: 'https://angshuman1211.github.io/Argus-Spot_Resilient_ML_Training_Orchestrator/',
    decisions: `${argusRepo}/blob/master/docs/problems_and_decisions.md`,
    objective1: `${argusRepo}/blob/${pin.argus}/docs/objective1_result.md`,
    trace: `${argusRepo}/blob/${pin.argus}/docs/trace_benchmark_result.md`,
    model: `${argusRepo}/blob/${pin.argus}/docs/wide_model_result.md`,
    readme: `${argusRepo}/blob/${pin.argus}/README.md#results`,
  },
  bharat: {
    repo: bharatRepo,
    live: 'https://rayyan-mohammed.github.io/aarogya-lens/',
    report: `${bharatRepo}/blob/main/docs/TECHNICAL_REPORT.md`,
    readme: `${bharatRepo}/blob/${pin.bharat}/README.md#results`,
  },
  obscuron: {
    repo: obscuronRepo,
    page: 'https://obscuron-labs.vercel.app/',
    decisions: `${obscuronRepo}/blob/main/docs/problems_and_decisions.md`,
    reproducibility: `${obscuronRepo}/blob/main/docs/reproducibility.md`,
    readme: `${obscuronRepo}/blob/${pin.obscuron}/README.md#results`,
  },
  caliber: {
    repo: caliberRepo,
    pinned: `${caliberRepo}/tree/${pin.caliber}`,
  },
  veo: 'https://github.com/Md-Zeeshan-Ali/vision-error-observatory',
};

export const nav = [
  { key: 'work', href: '/#work', label: 'Work' },
  { key: 'research', href: '/research', label: 'Research' },
  { key: 'about', href: '/#about', label: 'About' },
  { key: 'contact', href: '/#contact', label: 'Contact' },
];
