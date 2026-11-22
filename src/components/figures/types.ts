export type BarRow = {
  label: string;
  note?: string;
  value: number;
  display: string;
  tone?: 'mine' | 'muted' | 'caution' | 'default';
};

// owner: 'mine' = I built it, 'shared' = teammate's base with my changes, 'other' = teammate or infrastructure.
export type ArchBox = { name: string; detail: string; owner: 'mine' | 'shared' | 'other' };
export type ArchStage = { stage: string; boxes: ArchBox[] };

export type IntervalRow = {
  label: string;
  value: number;
  lo: number;
  hi: number;
  tone?: 'mine' | 'caution' | 'default';
};
