import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RESEARCH_PROGRAMS } from '../data/manikinekoData';
import { ResearchProgram } from '../types/research';
import { ResilientImage } from './ResilientImage';

interface ProgramsIndexProps {
  onOpenArticle: (program: ResearchProgram) => void;
}

export const ProgramsIndex: React.FC<ProgramsIndexProps> = ({ onOpenArticle }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-16">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Research Programs
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Active photonic, cryogenic, and metamaterial engineering tracks led from Eindhoven and Delft.
        </p>
      </div>

      <div className="space-y-14">
        {RESEARCH_PROGRAMS.map((prog, idx) => (
          <article
            key={prog.id}
            onClick={() => onOpenArticle(prog)}
            className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center"
          >
            <div className="sm:col-span-5">
              <ResilientImage
                src={prog.imageUrl}
                alt={prog.imageAlt}
                aspectClassName="aspect-[16/10]"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
            </div>

            <div className="sm:col-span-7 space-y-2.5">
              <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono text-zinc-900 dark:text-zinc-100">
                  0{idx + 1} · {prog.code}
                </span>
                <span aria-hidden="true">·</span>
                <span>{prog.division}</span>
                <span aria-hidden="true">·</span>
                <span>{prog.facility}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-white group-hover:opacity-75 transition-opacity">
                {prog.title}
              </h2>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {prog.summary}
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="font-mono text-zinc-500 dark:text-zinc-400">
                  {prog.precisionMetric} {prog.precisionUnit} · TRL {prog.trl}/9 · €{prog.budgetEurM.toFixed(1)}M
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-zinc-950 dark:text-white">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
