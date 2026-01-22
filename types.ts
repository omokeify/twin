export interface UserData {
  birthDate: string; // YYYY-MM-DD
  name: string;
  personalityTraits: string[];
  preference: 'living' | 'deceased' | 'all';
  genderPreference: 'male' | 'female' | 'any';
  regionPreference: 'africa' | 'asia' | 'europe' | 'north_america' | 'south_america' | 'oceania' | 'global';
}

export interface AlignmentTrait {
  trait: string;
  connection: string;
}

export interface NameAnalysis {
  origin: string; // Specific country, culture, or ethnicity
  meaning: string;
  soulVibration: string; // A mystical one-liner about the name
}

export interface LifeLesson {
  mistake: string;
  lesson: string;
}

export interface CelebrityMatch {
  id: string; // unique id for selection
  name: string;
  birthDate: string;
  occupation: string;
  status: 'living' | 'deceased';
  eraContext?: string; // Brief note about the era
  matchReason: string;
  alignmentTraits: AlignmentTrait[];
  destinyPrediction: string; // Poetic reason
  predictedLegacyYear: number; // The year
  legacyLabel: string; // e.g., "Age of Ascendance" or "Golden Zenith"
  lifeLessons: LifeLesson[]; // Educational content regarding mistakes
  spiritualNemesis: string; // The specific force fighting their potential
  nemesisManifestation: string; // How this force operates
  funFacts: string[]; // List of at least 5 lesser-known, engaging facts
}

export interface MatchResponse {
  analysis: NameAnalysis;
  matches: CelebrityMatch[];
}

export enum AppStep {
  WELCOME = 'WELCOME',
  DATE_INPUT = 'DATE_INPUT',
  PERSONALITY = 'PERSONALITY',
  PREFERENCE = 'PREFERENCE',
  LOADING = 'LOADING',
  SELECTION = 'SELECTION',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface PersonalityTrait {
  id: string;
  label: string;
  icon: string;
}