// Chart data, copied from each repository's committed results. The source link
// on every figure points at the file these numbers come from.
import type { BarRow, IntervalRow } from '../components/figures/types';
import { sources } from './site';

// Argus v2 trace-driven benchmark: slowdown vs ideal at 15 nodes, 300 s checkpoints.
export const argusSlowdown: BarRow[] = [
  { label: 'No protection', value: 4.25, display: '4.25×', tone: 'muted' },
  { label: 'React to the 2-min notice', value: 4.25, display: '4.25×', tone: 'muted' },
  { label: 'Old model alarms', value: 2.48, display: '2.48×', tone: 'muted' },
  { label: 'Periodic (Young–Daly)', value: 1.34, display: '1.34×' },
  { label: 'Retrained model alarms', value: 1.14, display: '1.14×', tone: 'mine' },
  { label: 'Oracle, 5-min warning', note: 'upper bound', value: 1.03, display: '1.03×', tone: 'muted' },
];
export const argusSlowdownSource = { href: sources.argus.trace, label: 'trace_benchmark_result.md' };

// Argus: real reclaims from the sensor fleet (315 instances, 152 reclaimed). AUROC, 95% CI resampled by hour.
export const argusReclaims: IntervalRow[] = [
  { label: 'Price-history model', value: 0.53, lo: 0.47, hi: 0.6, tone: 'caution' },
  { label: 'AWS placement score', value: 0.74, lo: 0.69, hi: 0.8 },
  { label: 'Instance age (control)', value: 0.75, lo: 0.67, hi: 0.8 },
  { label: 'Logistic: placement, age, price risk', value: 0.77, lo: 0.71, hi: 0.83, tone: 'mine' },
  { label: 'Pool reclaim rate in other hours', value: 0.85, lo: 0.81, hi: 0.89 },
];
export const argusReclaimsSource = { href: sources.argus.model, label: 'wide_model_result.md §7b' };

// BharatHealth: exact-answer accuracy by question category (200-question benchmark).
export const bharatCategories: BarRow[] = [
  { label: 'Factual lookup', note: 'n = 59', value: 100, display: '100%' },
  { label: 'Correlation', note: 'n = 21', value: 81.0, display: '81.0%' },
  { label: 'Ranking and aggregation', note: 'n = 52', value: 66.7, display: '66.7%' },
  { label: 'Trend, before routing fix', note: 'n = 38', value: 54.4, display: '54.4%', tone: 'muted' },
  { label: 'Trend, after routing fix', note: 'full re-run, n = 38', value: 84.5, display: '84.5%', tone: 'mine' },
  { label: 'State comparison', note: 'n = 30', value: 35.8, display: '35.8%', tone: 'caution' },
];
export const bharatSource = { href: sources.bharat.readme, label: 'README · results' };

// Obscuron: held-out-family AUROC (903 Pfam families) and the negative result.
export const obscuronAuroc: BarRow[] = [
  { label: 'ESM-2, layer 22', note: 'protein model, leakage-clean', value: 0.962, display: '0.962', tone: 'mine' },
  { label: 'ESM-2, last layer', value: 0.786, display: '0.786' },
  { label: 'Genos-m, layer 9', note: 'genome model', value: 0.665, display: '0.665', tone: 'muted' },
  { label: 'Novelty → characterised next', note: 'a different question', value: 0.47, display: '0.47', tone: 'caution' },
];
export const obscuronSource = { href: sources.obscuron.readme, label: 'README · results' };

// CALIBER: coverage on CT under operator shift, nominal target 0.90.
export const caliberCoverage: BarRow[] = [
  { label: 'Naive transfer', note: 'calibrated on one operator', value: 0.69, display: '0.69', tone: 'caution' },
  { label: 'Group-conditional', note: 'calibrated per operator group', value: 0.9, display: '≥ 0.90' },
];
export const caliberSource = { href: sources.caliber.pinned, label: 'CALIBER repository' };
