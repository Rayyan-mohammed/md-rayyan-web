import { sources } from './site';
import type { Link } from './work';

export type Paper = {
  id: string;
  status: 'Presented' | 'Preprint' | 'Ongoing';
  date: string;
  title: string;
  authors: { name: string; me?: boolean }[];
  authorsNote?: string;
  venue: string;
  summary: string;
  part: string;
  note?: string;
  links: Link[];
  bibtex?: string;
};

export const papers: Paper[] = [
  {
    id: 'obscuron',
    status: 'Presented',
    date: 'Oct 2026',
    title:
      'Calibrated Novelty Detection for Microbial Dark Matter via Leakage-Controlled Retrospective Validation',
    authors: [
      { name: 'A. Chakravertty' },
      { name: 'MD Rayyan', me: true },
      { name: 'N. Vurukonda' },
      { name: 'D. Dey' },
    ],
    venue:
      'Proc. IEEE Int. Conf. on Advanced Engineering for Sustainable and Integrated Systems (ICAESIS-2026), Mohan Babu University, Tirupati, India. Paper ID 1273.',
    summary:
      'We grade a novelty detector for uncharacterised proteins by freezing reference databases at a 2021–22 snapshot and checking against a later one. A kNN score in ESM-2 embedding space, calibrated with an extreme-value tail fit, reaches 0.962 mean held-out-family AUROC across 903 Pfam families. Novelty itself does not predict which proteins get characterised next (AUROC 0.47), and the paper says so.',
    part: 'Track 2, implementation and experiments: ingestion and snapshot differencing, embedding extraction, the extreme-value scorer’s implementation, immune-layer sweeps, full-scale flagging and reproducibility tooling.',
    links: [
      { label: 'Code', href: sources.obscuron.repo },
      { label: 'Project page', href: sources.obscuron.page },
      { label: 'Decision log', href: sources.obscuron.decisions },
      { label: 'Case study', href: '/work/obscuron' },
    ],
  },
  {
    id: 'argus',
    status: 'Preprint',
    date: 'Sep 2026',
    title: 'Argus: A Real-EKS Study of When Predicting Spot Interruptions Beats Simple Checkpointing',
    authors: [{ name: 'A. Chakravertty' }, { name: 'MD Rayyan', me: true }],
    venue: 'arXiv:2609.39067 [cs.LG]. 8 pages, 5 figures, 3 tables.',
    summary:
      "Reacting to AWS's 2-minute Spot notice stops protecting a job once interruptions arrive faster than the notice, and prediction pays only with the right lead time. On real EKS, a drained job checkpointed on SIGTERM and resumed from that checkpoint, losing only the in-progress epoch.",
    part: 'The ML layer: feature pipeline, risk models, the FastAPI prediction service, the PyTorch training job, the benchmark harness and trace simulator, and the real-reclaim sensor campaign.',
    note: 'A revised version in the repository adds a trace-driven benchmark and 152 real reclaims, where price history has no predictive skill (AUROC 0.53) and AWS’s placement score does (0.74).',
    links: [
      { label: 'arXiv', href: sources.argus.paper },
      { label: 'PDF', href: sources.argus.pdf },
      { label: 'Code', href: sources.argus.repo },
      { label: 'Project page', href: sources.argus.page },
      { label: 'Case study', href: '/work/argus' },
    ],
    bibtex: `@misc{chakravertty2026argus,
  title         = {Argus: A Real-EKS Study of When Predicting Spot Interruptions Beats Simple Checkpointing},
  author        = {Chakravertty, Angshuman and Rayyan, MD},
  year          = {2026},
  eprint        = {2609.39067},
  archivePrefix = {arXiv},
  primaryClass  = {cs.LG},
  url           = {https://arxiv.org/abs/2609.39067}
}`,
  },
  {
    id: 'caliber',
    status: 'Ongoing',
    date: '2026',
    title: 'CALIBER: operator-shift-robust conformal hallucination flagging for image reconstruction',
    authors: [{ name: 'Three-track team' }],
    authorsNote: 'My part: Track 3, theory.',
    venue: 'Preprint in preparation.',
    summary:
      'Conformal certificates for generative image reconstruction assume a fixed acquisition operator. CALIBER shows the guarantee breaks when the operator shifts between calibration and deployment, restores it with group-conditional calibration, and bounds the coverage gap as a function of operator distance, on accelerated MRI and sparse-view and limited-angle CT.',
    part: 'The non-exchangeable conformal review, the coverage-gap stability bound and its revisions, the ill-posedness scaling analysis, and the numerical-verification harness and tests.',
    links: [{ label: 'Code', href: sources.caliber.repo }],
  },
];
