import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RESEARCH_PROGRAMS } from '../data/manikinekoData';
import { ResearchProgram } from '../types/research';
import { InteractiveWaveFigure } from './InteractiveWaveFigure';
import { ResilientImage } from './ResilientImage';

interface MonographReaderProps {
  program: ResearchProgram;
  onBack: () => void;
  onSelectArticle: (program: ResearchProgram) => void;
}

export const MonographReader: React.FC<MonographReaderProps> = ({
  program,
  onBack,
  onSelectArticle,
}) => {
  const currentIdx = RESEARCH_PROGRAMS.findIndex((p) => p.id === program.id);
  const nextProgram = RESEARCH_PROGRAMS[(currentIdx + 1) % RESEARCH_PROGRAMS.length];

  return (
    <article className="max-w-2xl mx-auto space-y-10">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-200/75 dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300/80 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span>{program.division}</span>
          <span aria-hidden="true">·</span>
          <span>{program.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{program.readTime}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{program.code}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-[1.16] text-zinc-950 dark:text-white [text-wrap:balance]">
          {program.title}
        </h1>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {program.subtitle}
        </p>

        <div className="pt-1 text-xs text-zinc-500 dark:text-zinc-400">
          By <span className="text-zinc-900 dark:text-zinc-100 font-medium">{program.leadInvestigator}</span>
          {' · '}
          {program.facility}
        </div>
      </header>

      {/* Borderless Rounded Hero Figure */}
      <figure className="space-y-2.5">
        <ResilientImage
          src={program.imageUrl}
          alt={program.imageAlt}
          aspectClassName="aspect-[16/10]"
        />
        <figcaption className="text-xs text-zinc-500 dark:text-zinc-400">
          {program.figureCaption}
        </figcaption>
      </figure>

      {/* Essay Body Prose */}
      <div className="space-y-6 text-sm sm:text-[15.5px] leading-[1.8] text-zinc-700 dark:text-zinc-300">
        {program.essayParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {program.hasInteractiveWaveFigure && <InteractiveWaveFigure />}

      {/* Unboxed Specification Block */}
      <section className="pt-8 space-y-6">
        <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
          Program Parameters &amp; Milestones
        </h2>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Precision Target</dt>
            <dd className="font-mono text-sm font-medium text-zinc-950 dark:text-white mt-1">
              {program.precisionMetric} {program.precisionUnit}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Readiness</dt>
            <dd className="font-mono text-sm font-medium text-zinc-950 dark:text-white mt-1">
              TRL {program.trl} / 9
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Allocation</dt>
            <dd className="font-mono text-sm font-medium text-zinc-950 dark:text-white mt-1">
              €{program.budgetEurM.toFixed(1)}M
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Target Horizon</dt>
            <dd className="font-mono text-sm font-medium text-zinc-950 dark:text-white mt-1">
              {program.targetQuarter}
            </dd>
          </div>
        </dl>

        <div className="space-y-4 pt-2">
          {program.milestones.map((m) => (
            <div key={m.phase} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs gap-4">
                <span className="text-zinc-700 dark:text-zinc-200">
                  <span className="font-mono text-zinc-400 mr-2.5">{m.phase}</span>
                  {m.deliverable}
                </span>
                <span className="font-mono text-zinc-950 dark:text-white shrink-0">
                  {m.completion}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-zinc-950 dark:bg-zinc-200"
                  style={{ width: `${m.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Dispatch */}
      <footer className="pt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          ← All dispatches
        </button>

        <button
          type="button"
          onClick={() => onSelectArticle(nextProgram)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-medium hover:opacity-85 transition-opacity cursor-pointer"
        >
          <span className="truncate max-w-[200px] sm:max-w-xs">Next: {nextProgram.code}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </footer>
    </article>
  );
};
