import React from 'react';
import { MANIKINEKO_IMAGES, PATENT_RECORDS, RESEARCH_PROGRAMS } from '../data/manikinekoData';
import { ResearchProgram, ResearchView } from '../types/research';
import { ResilientImage } from './ResilientImage';

interface JournalFeedProps {
  onOpenArticle: (program: ResearchProgram) => void;
  onNavigate: (view: ResearchView) => void;
  onOpenBriefModal: () => void;
}

export const JournalFeed: React.FC<JournalFeedProps> = ({
  onOpenArticle,
  onNavigate,
  onOpenBriefModal,
}) => {
  const flagship = RESEARCH_PROGRAMS[0];

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Centered Hero Focus (Screenshot 1 Pattern) */}
      <section className="pt-4 sm:pt-8 text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Introducing MNK-PH-402 Metrology
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Sub-nanometer wafer interferometry from Eindhoven &amp; Delft
          </p>

          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenArticle(flagship)}
              className="px-5 py-2 text-xs font-medium rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300/80 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Learn more
            </button>
            <button
              type="button"
              onClick={() => onNavigate(ResearchView.Programs)}
              className="px-5 py-2 text-xs font-medium rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-85 transition-opacity whitespace-nowrap cursor-pointer"
            >
              Explore programs
            </button>
          </div>
        </div>

        {/* Centered Rounded Visual Plate */}
        <div className="max-w-[540px] mx-auto">
          <button
            type="button"
            onClick={() => onOpenArticle(flagship)}
            className="block w-full text-left cursor-pointer group"
          >
            <ResilientImage
              src={flagship.imageUrl}
              alt={flagship.imageAlt}
              aspectClassName="aspect-[16/10]"
              className="transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </button>
        </div>

        {/* Short Centered Silver Divider + Mission Statement */}
        <div className="pt-4 space-y-8 max-w-2xl mx-auto">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mx-auto" />

          <div className="space-y-5 text-base sm:text-[19px] font-medium leading-[1.5] text-zinc-900 dark:text-zinc-100">
            <p>
              Manikineko is an applied R&amp;D laboratory in the Netherlands focused on sub-nanometer photonics and cryogenic actuation.
            </p>
            <p>
              From Brainport Eindhoven to Delft, we close the loop between coherent light metrology and precision titanium mechanics.
            </p>
          </div>
        </div>

        {/* Secondary Centered Plate */}
        <div className="max-w-[540px] mx-auto pt-4">
          <button
            type="button"
            onClick={() => onNavigate(ResearchView.LabsAndIP)}
            className="block w-full text-left cursor-pointer group"
          >
            <ResilientImage
              src={MANIKINEKO_IMAGES.facilityAtrium}
              alt="Manikineko Eindhoven Brainport cleanroom atrium"
              aspectClassName="aspect-[16/10]"
              className="transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </button>
        </div>
      </section>

      {/* Two-Column Editorial Index (Screenshot 2 Pattern) */}
      <section className="max-w-[680px] mx-auto space-y-14 pt-4">
        {/* Row 1: Research Dispatches */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8">
          <div className="sm:col-span-4">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Latest dispatches
            </div>
          </div>
          <div className="sm:col-span-8 space-y-2.5">
            {RESEARCH_PROGRAMS.map((prog) => (
              <div key={prog.id}>
                <button
                  type="button"
                  onClick={() => onOpenArticle(prog)}
                  className="text-left text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-950 dark:hover:decoration-white transition-colors cursor-pointer"
                >
                  {prog.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Intellectual Property */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8">
          <div className="sm:col-span-4">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Recent filings
            </div>
          </div>
          <div className="sm:col-span-8 space-y-2.5">
            {PATENT_RECORDS.slice(0, 4).map((pat) => (
              <div key={pat.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(ResearchView.LabsAndIP)}
                  className="text-left text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-950 dark:hover:decoration-white transition-colors cursor-pointer"
                >
                  {pat.filingNumber} — {pat.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Cleanrooms & Briefings */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8">
          <div className="sm:col-span-4">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Cleanrooms &amp; Careers
            </div>
          </div>
          <div className="sm:col-span-8 space-y-4">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Our teams in Brainport Eindhoven and Delft work across ISO Class 3 metrology bays and 4 K cryogenic benches to turn foundational physics into industrial hardware.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate(ResearchView.LabsAndIP)}
                className="px-5 py-2 text-xs font-medium rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-85 transition-opacity whitespace-nowrap cursor-pointer"
              >
                Explore laboratories
              </button>
              <button
                type="button"
                onClick={onOpenBriefModal}
                className="px-5 py-2 text-xs font-medium rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300/80 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Executive brief
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8">
          <div className="sm:col-span-4 space-y-2">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Contact
            </div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 pt-1">
              Press &amp; Briefings
            </div>
          </div>
          <div className="sm:col-span-8 space-y-2 text-sm text-zinc-900 dark:text-zinc-100 pt-3.5">
            <div>research@manikineko.nl</div>
            <div>press@manikineko.nl</div>
          </div>
        </div>
      </section>
    </div>
  );
};
