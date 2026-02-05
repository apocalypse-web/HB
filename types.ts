
export type DoraemonMood = 'neutral' | 'peek' | 'sad' | 'worried' | 'happy' | 'cake';

export interface Memory {
  id: number;
  image?: string;
  video?: string;
  caption: string;
  x: number;
  y: number;
}

export interface Reason {
  id: number;
  title: string;
  description: string;
}

export enum AppStep {
  LANDING = 'landing',
  SORRY = 'sorry',
  MEMORIES = 'memories',
  REASONS = 'reasons',
  FINAL = 'final'
}
