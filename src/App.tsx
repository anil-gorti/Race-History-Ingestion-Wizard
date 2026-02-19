import React, { useState, memo } from 'react';
import { WizardLayout } from './components/WizardLayout';
import { GmailConnect } from './components/steps/GmailConnect';
import { GmailRaces } from './components/steps/GmailRaces';
import { FetchingResults } from './components/steps/FetchingResults';
import { ClaimResults } from './components/steps/ClaimResults';
import { BulkUpload } from './components/steps/BulkUpload';
import { MemoryCapture } from './components/steps/MemoryCapture';
import { SmartMatching } from './components/steps/SmartMatching';
import { DetailCollection } from './components/steps/DetailCollection';
import { StravaSync } from './components/steps/StravaSync';
import { BulkAdd } from './components/steps/BulkAdd';
import { FinalReview } from './components/steps/FinalReview';
import { VerifyResults } from './components/steps/VerifyResults';
import { useWizard } from './hooks/useWizard';
import { Race } from './lib/types';
export function App() {
  const wizard = useWizard();
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const renderStep = () => {
    switch (wizard.currentStep) {
      case 'gmail-connect':
        return (
          <GmailConnect
            onConnect={() => {
              wizard.connectGmail();
              wizard.setCurrentStep('gmail-races');
            }}
            onSkip={() => wizard.setCurrentStep('bulk-upload')} />);


      case 'gmail-races':
        return (
          <GmailRaces
            races={wizard.gmailRaces}
            onMarkRan={wizard.markRaceAsRan}
            onMarkDidNotRun={wizard.markRaceAsDidNotRun}
            onUpdateBib={wizard.updateGmailRaceBib}
            onContinue={() => wizard.setCurrentStep('fetching-results')} />);


      case 'fetching-results':
        return (
          <FetchingResults
            gmailRaces={wizard.gmailRaces}
            onComplete={() => {
              wizard.generateResultsFromGmail();
              wizard.setCurrentStep('claim-results');
            }} />);


      case 'claim-results':
        return (
          <ClaimResults
            results={wizard.results}
            onClaim={wizard.claimResult}
            onDismiss={wizard.dismissResult}
            onContinue={() => wizard.setCurrentStep('verify-results')} />);


      case 'verify-results':
        return (
          <VerifyResults
            results={wizard.results}
            onUpdateResult={wizard.updateResult}
            onContinue={() => wizard.setCurrentStep('bulk-upload')} />);


      case 'bulk-upload':
        return (
          <BulkUpload
            onContinue={() => wizard.setCurrentStep('memory-capture')}
            onSkip={() => wizard.setCurrentStep('memory-capture')} />);


      case 'memory-capture':
        return (
          <MemoryCapture
            onNext={(input) => {
              wizard.handleMemoryInput(input);
              wizard.setCurrentStep('smart-matching');
            }} />);


      case 'smart-matching':
        return (
          <SmartMatching
            matches={wizard.matchedRaces}
            onSelect={(race) => {
              setSelectedRace(race);
              wizard.setCurrentStep('detail-collection');
            }}
            onNoneFound={() => {
              setSelectedRace({
                id: 'custom-' + Date.now(),
                name: wizard.rawInput,
                year: new Date().getFullYear(),
                location: 'Unknown'
              });
              wizard.setCurrentStep('detail-collection');
            }} />);


      case 'detail-collection':
        return selectedRace ?
        <DetailCollection
          race={selectedRace}
          onComplete={(result) => {
            wizard.addResult(result);
            if (
            wizard.results.filter((r) => r.status === 'confirmed').
            length === 0)
            {
              wizard.setCurrentStep('strava-sync');
            } else {
              wizard.setCurrentStep('final-review');
            }
          }} /> :

        null;
      case 'strava-sync':
        return (
          <StravaSync
            onComplete={(results) => {
              results.forEach((r) => wizard.addResult(r));
              wizard.setCurrentStep('bulk-add');
            }}
            onSkip={() => wizard.setCurrentStep('bulk-add')} />);


      case 'bulk-add':
        return (
          <BulkAdd onFinish={() => wizard.setCurrentStep('final-review')} />);

      case 'final-review':
        return <FinalReview />;
      default:
        return null;
    }
  };
  const getStepHeader = () => {
    switch (wizard.currentStep) {
      case 'gmail-connect':
        return {
          title: "Let's find your races",
          subtitle:
          "Connect your Gmail to automatically discover races you've registered for."
        };
      case 'gmail-races':
        return {
          title: 'Which races did you run?',
          subtitle:
          'We found these registrations in your email. Tell us which ones you actually completed.'
        };
      case 'fetching-results':
        return {
          title: '',
          subtitle: ''
        };
      case 'claim-results':
        return {
          title: 'Your official results',
          subtitle:
          'We found these verified results from timing databases. Claim them to add to your profile.'
        };
      case 'verify-results':
        return {
          title: 'Boost your credibility score',
          subtitle:
          'Add a bib number or official timing link to verify your results. The more proof you provide, the higher your score.'
        };
      case 'bulk-upload':
        return {
          title: 'Welcome to PRFM',
          subtitle: "Let's set up your athlete profile"
        };
      case 'memory-capture':
        return {
          title: 'What other races have you run?',
          subtitle:
          "Start with any race you remember. We'll help you fill in the details."
        };
      case 'smart-matching':
        return {
          title: 'Is this the race?',
          subtitle: 'We found a match in our verified database.'
        };
      case 'detail-collection':
        return {
          title: 'Tell us about your run',
          subtitle: `Add details for ${selectedRace?.name || 'this race'}`
        };
      case 'strava-sync':
        return {
          title: 'Auto-fill from Strava',
          subtitle: "Let's see what we can find in your activity history."
        };
      case 'bulk-add':
        return {
          title: 'Bulk Entry',
          subtitle: 'Quickly add any remaining races to your history.'
        };
      case 'final-review':
        return {
          title: '',
          subtitle: ''
        };
      default:
        return {};
    }
  };
  const { title, subtitle } = getStepHeader();
  const handleBack = () => {
    switch (wizard.currentStep) {
      case 'gmail-races':
        wizard.setCurrentStep('gmail-connect');
        break;
      case 'fetching-results':
        wizard.setCurrentStep('gmail-races');
        break;
      case 'claim-results':
        wizard.setCurrentStep('gmail-races');
        break;
      case 'verify-results':
        wizard.setCurrentStep('claim-results');
        break;
      case 'bulk-upload':
        wizard.setCurrentStep('verify-results');
        break;
      case 'memory-capture':
        wizard.setCurrentStep('bulk-upload');
        break;
      case 'smart-matching':
        wizard.setCurrentStep('memory-capture');
        break;
      case 'detail-collection':
        wizard.setCurrentStep('smart-matching');
        break;
      case 'strava-sync':
        wizard.setCurrentStep('detail-collection');
        break;
      case 'bulk-add':
        wizard.setCurrentStep('strava-sync');
        break;
      case 'final-review':
        wizard.setCurrentStep('bulk-add');
        break;
    }
  };
  return (
    <WizardLayout
      wizardState={wizard}
      title={title}
      subtitle={subtitle}
      onBack={wizard.currentStep !== 'gmail-connect' ? handleBack : undefined}>

      {renderStep()}
    </WizardLayout>);

}