import React from 'react';
import { RunningResume } from './RunningResume';
import { useWizard } from '../hooks/useWizard';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
interface WizardLayoutProps {
  children: React.ReactNode;
  wizardState: ReturnType<typeof useWizard>;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}
export function WizardLayout({
  children,
  wizardState,
  title,
  subtitle,
  onBack
}: WizardLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-surface-secondary overflow-hidden">
      {/* Left Panel: Wizard Flow */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 sticky top-0 bg-surface-secondary/90 backdrop-blur-sm z-50 border-b border-border-light">
          <div className="flex items-center gap-3">
            {onBack &&
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="!p-2 text-gray-500">

                <ArrowLeft className="w-4 h-4" />
              </Button>
            }
            <h1 className="text-lg font-bold tracking-tight text-gray-900 font-display">
              PRFM
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 w-1/3 rounded-full" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-8 py-12">
          {(title || subtitle) &&
          <div className="mb-10">
              {title &&
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-display">
                  {'Improve the success rate of finding results'}
                </h2>
            }
              {subtitle &&
            <p className="text-base text-gray-500 leading-relaxed">
                  {subtitle}
                </p>
            }
            </div>
          }
          <div className="flex-1">{children}</div>
        </main>
      </div>

      {/* Right Panel: Live Resume */}
      <div className="w-[380px] hidden xl:block h-full border-l border-border shadow-sm">
        <RunningResume
          results={wizardState.results}
          credibilityScore={wizardState.credibilityScore} />

      </div>
    </div>);

}