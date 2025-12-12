export type SongInfo = Record<string, string | number>;

export type HitObject = {
  x: number;
  y: number;
  time: number;
  type: number;
  endTime?: number;
};

export type JudgementName = 'Marvelous' | 'Perfect' | 'Great' | 'Good' | 'Okay' | 'Miss';

export type UserData = {
  Keybinds: Record<string, string[]>;
  ManiaWidth: Record<string, string>;
  ManiaHeight: Record<string, string>;
  ScrollSpeed: number;
  ReceptorOffset: string;
  BackgroundBlur: number;
  BackgroundOpacity: number;
  Accuracy: Record<string, number>;
  Life: Record<string, number>;
  Judgment: string;
  MusicSpeed: number;
  MusicVolume: number;
  ScoreValues: Record<JudgementName, number>;
  JudgementWindow: Record<string, Record<JudgementName, number>>;
};

export const JUDGEMENT_NAMES: JudgementName[] = ['Marvelous', 'Perfect', 'Great', 'Good', 'Okay', 'Miss'];

export const createEmptyJudgementCounts = (): Record<JudgementName, number> => ({
  Marvelous: 0,
  Perfect: 0,
  Great: 0,
  Good: 0,
  Okay: 0,
  Miss: 0,
});

export const cloneJudgementCounts = (source: Record<JudgementName, number>): Record<JudgementName, number> => {
  const copy = createEmptyJudgementCounts();
  for (const name of JUDGEMENT_NAMES) {
    copy[name] = source[name];
  }
  return copy;
};

export const calculateAccuracyPercent = (
  counts: Record<JudgementName, number>,
  weights: Record<string, number>,
) => {
  const total = JUDGEMENT_NAMES.reduce((sum, type) => sum + counts[type], 0);
  if (total === 0) return 100;
  const weightedSum = JUDGEMENT_NAMES.reduce((sum, type) => sum + (weights[type] ?? 0) * counts[type], 0);
  return weightedSum / total;
};

