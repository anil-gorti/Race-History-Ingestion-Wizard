# WONE — Race History Ingestion Wizard

A multi-step onboarding wizard that helps athletes build a verified race history for their PRFM (Personal Race & Fitness Manager) profile. The wizard intelligently collects past race data through multiple ingestion methods — Gmail scanning, Strava sync, manual entry, and bulk upload — and assigns a credibility score to each result.

## Features

- **Gmail Integration** — Scans your inbox for race registration emails to auto-discover races you've signed up for
- **Smart Result Fetching** — Looks up official results from timing databases using your bib number
- **Claim & Verify Results** — Review auto-fetched results, claim them to your profile, and boost your credibility score by adding proof (bib number or official timing link)
- **Strava Sync** — Auto-fills race details from your Strava activity history
- **Memory Capture + Smart Matching** — Type any race you remember; the wizard matches it against a verified race database
- **Bulk Upload & Bulk Add** — Upload a CSV or quickly add multiple races in one go
- **Credibility Score** — Each result is assigned a confidence level: `verified`, `link-backed`, `activity-backed`, `self-reported`, or `pending`
- **Final Review** — A running resume-style summary of your full race history before saving

## Wizard Flow

```
gmail-connect
    ↓
gmail-races        (mark which races you actually ran)
    ↓
fetching-results   (auto-fetch official timing results)
    ↓
claim-results      (claim results to your profile)
    ↓
verify-results     (add bib / timing link for higher credibility)
    ↓
bulk-upload        (upload a CSV of past races)
    ↓
memory-capture     (type any race you remember)
    ↓
smart-matching     (match against verified race database)
    ↓
detail-collection  (add finish time, category, etc.)
    ↓
strava-sync        (pull in races from Strava activities)
    ↓
bulk-add           (add any remaining races)
    ↓
final-review       (review and confirm your full race history)
```

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| State | Custom `useWizard` hook |
| Prototyping | Magic Patterns |

## Project Structure

```
src/
├── components/
│   ├── steps/          # One component per wizard step
│   │   ├── GmailConnect.tsx
│   │   ├── GmailRaces.tsx
│   │   ├── FetchingResults.tsx
│   │   ├── ClaimResults.tsx
│   │   ├── VerifyResults.tsx
│   │   ├── BulkUpload.tsx
│   │   ├── MemoryCapture.tsx
│   │   ├── SmartMatching.tsx
│   │   ├── DetailCollection.tsx
│   │   ├── StravaSync.tsx
│   │   ├── BulkAdd.tsx
│   │   └── FinalReview.tsx
│   ├── ui/             # Shared UI primitives
│   ├── RunningResume.tsx
│   └── WizardLayout.tsx
├── hooks/
│   └── useWizard.ts    # Central wizard state management
├── lib/
│   ├── types.ts        # TypeScript interfaces & types
│   └── mockData.ts     # Mock data for development
├── App.tsx
├── index.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/anil-gorti/Race-History-Ingestion-Wizard.git
cd Race-History-Ingestion-Wizard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Key Types

```ts
// Confidence levels for race results
type ConfidenceLevel = 'verified' | 'link-backed' | 'activity-backed' | 'self-reported' | 'pending';

// A race result linked to an athlete
interface AthleteResult {
  id: string;
  raceName: string;
  raceDate: string;
  time?: string;
  bib?: string;
  confidence: ConfidenceLevel;
  status: 'draft' | 'confirmed';
  source?: 'manual' | 'strava' | 'search' | 'gmail';
}
```

## Origin

This project was scaffolded using [Magic Patterns](https://magicpatterns.com) and is built as a UI prototype for the PRFM athlete profile onboarding flow.
