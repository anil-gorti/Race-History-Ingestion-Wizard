export type ConfidenceLevel =
'verified' |
'link-backed' |
'activity-backed' |
'self-reported' |
'pending';

export interface Race {
  id: string;
  name: string;
  year: number;
  date?: string;
  location?: string;
  distance?: string;
  logo?: string;
}

export interface AthleteResult {
  id: string;
  raceId: string;
  raceName: string;
  raceDate: string;
  year: number;
  time?: string;
  bib?: string;
  category?: string;
  timingLink?: string;
  confidence: ConfidenceLevel;
  status: 'draft' | 'confirmed';
  source?: 'manual' | 'strava' | 'search' | 'gmail';
}

export interface GmailRace {
  id: string;
  raceName: string;
  year: number;
  distance: string;
  location: string;
  emailDate: string;
  emailSubject: string;
  bib?: string;
  status: 'pending' | 'ran' | 'did-not-run';
}

export type WizardStep =
'gmail-connect' |
'gmail-races' |
'fetching-results' |
'claim-results' |
'verify-results' |
'bulk-upload' |
'memory-capture' |
'smart-matching' |
'detail-collection' |
'strava-sync' |
'bulk-add' |
'final-review';

export interface WizardState {
  currentStep: WizardStep;
  rawInput: string;
  matchedRaces: Race[];
  results: AthleteResult[];
  gmailRaces: GmailRace[];
  editingResultId: string | null;
  credibilityScore: number;
}