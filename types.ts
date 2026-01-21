export interface UserData {
  birthDate: string; // YYYY-MM-DD
  name: string;
  personalityTraits: string[];
}

export interface CelebrityMatch {
  name: string;
  birthDate: string; // Text description e.g. "January 15, 1965"
  occupation: string;
  bio: string;
  matchReason: string;
  destinyPrediction: string;
  predictedLegacyYear: number;
  funFacts: string[];
}

export enum AppStep {
  WELCOME = 'WELCOME',
  DATE_INPUT = 'DATE_INPUT',
  PERSONALITY = 'PERSONALITY',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface PersonalityTrait {
  id: string;
  label: string;
  icon: string;
}