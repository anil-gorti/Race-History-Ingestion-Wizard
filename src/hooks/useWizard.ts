import { useState } from 'react';
import { WizardStep, AthleteResult, Race, GmailRace } from '../lib/types';
import {
  POPULAR_RACES,
  MOCK_GMAIL_RACES,
  MOCK_FETCHED_RESULTS } from
'../lib/mockData';

export function useWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('gmail-connect');
  const [rawInput, setRawInput] = useState('');
  const [matchedRaces, setMatchedRaces] = useState<Race[]>([]);
  const [results, setResults] = useState<AthleteResult[]>([]);
  const [gmailRaces, setGmailRaces] = useState<GmailRace[]>([]);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);

  // Calculate credibility score based on verified results (only confirmed ones)
  const confirmedResults = results.filter((r) => r.status === 'confirmed');
  const credibilityScore = Math.min(
    100,
    Math.round(
      confirmedResults.filter((r) => r.confidence === 'verified').length * 25 +
      confirmedResults.filter((r) => r.confidence === 'link-backed').length *
      15 +
      confirmedResults.filter((r) => r.confidence === 'activity-backed').
      length *
      10 +
      confirmedResults.filter((r) => r.confidence === 'self-reported').
      length *
      5
    )
  );

  const handleMemoryInput = (input: string) => {
    setRawInput(input);
    const matches = POPULAR_RACES.filter(
      (race) =>
      input.toLowerCase().includes(race.name.toLowerCase()) ||
      input.toLowerCase().includes(race.location?.toLowerCase() || '')
    );
    setMatchedRaces(matches);
  };

  // Gmail connection - simulates scanning emails
  const connectGmail = () => {
    // In real app, this would trigger OAuth and email scanning
    // For now, we just load the mock data
    setGmailRaces(MOCK_GMAIL_RACES);
  };

  // Mark a gmail race as "ran"
  const markRaceAsRan = (id: string) => {
    setGmailRaces((prev) =>
    prev.map((r) => r.id === id ? { ...r, status: 'ran' as const } : r)
    );
  };

  // Mark a gmail race as "did not run"
  const markRaceAsDidNotRun = (id: string) => {
    setGmailRaces((prev) =>
    prev.map((r) =>
    r.id === id ? { ...r, status: 'did-not-run' as const } : r
    )
    );
  };

  const updateGmailRaceBib = (id: string, bib: string) => {
    setGmailRaces((prev) => prev.map((r) => r.id === id ? { ...r, bib } : r));
  };

  // Generate results from gmail races marked as 'ran'
  const generateResultsFromGmail = () => {
    const ranRaces = gmailRaces.filter((r) => r.status === 'ran');
    const newResults: AthleteResult[] = ranRaces.map((race) => {
      const fetchedData = MOCK_FETCHED_RESULTS[race.id];
      return {
        id: `result-${race.id}`,
        ...fetchedData,
        status: 'draft' as const
      };
    });
    setResults(newResults);
  };

  const addResult = (result: AthleteResult) => {
    setResults((prev) => [...prev, result]);
  };

  const updateResult = (id: string, updates: Partial<AthleteResult>) => {
    setResults((prev) =>
    prev.map((r) => r.id === id ? { ...r, ...updates } : r)
    );
  };

  const removeResult = (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const claimResult = (id: string) => {
    updateResult(id, { status: 'confirmed' });
  };

  const dismissResult = (id: string) => {
    removeResult(id);
  };

  return {
    currentStep,
    setCurrentStep,
    rawInput,
    setRawInput,
    matchedRaces,
    setMatchedRaces,
    results,
    gmailRaces,
    addResult,
    updateResult,
    removeResult,
    claimResult,
    dismissResult,
    connectGmail,
    markRaceAsRan,
    markRaceAsDidNotRun,
    updateGmailRaceBib,
    generateResultsFromGmail,
    editingResultId,
    setEditingResultId,
    credibilityScore,
    handleMemoryInput
  };
}