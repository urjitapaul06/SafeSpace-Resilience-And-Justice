
export interface UserProfile {
  name: string;
  email: string;
  gender: string;
  age: number;
  profession: string;
  photo?: string;
  contact: string;
  parentContact: string;
  guardianName: string;
  guardianContact: string;
  peerName: string;
  peerContact: string;
  aadhar: string;
  pan?: string;
  isRegistered: boolean;
  // Gamification
  points: number;
  badges: string[];
  // Privacy & Settings
  privacySettings: {
    shareTraumaAnalysisWithPolice: boolean;
    shareTraumaAnalysisWithGuardian: boolean;
    anonymousModeDefault: boolean;
  };
  customApiKey?: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface DischargeLog {
  id: number;
  date: string;
  location: string;
  type: string;
  notes: string;
  timestamp: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
}
