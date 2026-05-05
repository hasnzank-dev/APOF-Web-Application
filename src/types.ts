export interface Category {
  id: string;
  letter: string;
  headline: string;
  subtitle: string;
  subtext: string;
  color: 'accent' | 'cyan' | 'amber' | 'emerald';
  checklist: string[];
}

export interface ClassificationResult {
  level: 'none' | 'excellent' | 'good' | 'moderate' | 'low';
  label: string;
  recommendation: string;
  color: string;
}

export interface Scores {
  audience: number;
  product: number;
  offer: number;
  funnel: number;
}

export interface ActionItems {
  audience: string;
  product: string;
  offer: string;
  funnel: string;
}
