import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { PATENT_RECORDS, RESEARCH_PROGRAMS } from '../data/manikinekoData';

interface ExportDossierModalProps {
  open: boolean;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const downloadMarkdownBrief = () => {
    const lines = [
      '# Manikineko B.V. — Executive R&D Brief (Netherlands)',
      'Brainport Eindhoven & TU Delft Science Park · November 2026',
      '',
      '## Research Monographs & Programs',
      ...RESEARCH_PROGRAMS.map(
        (p) =>
          `### ${p.code} — ${p.title}\n- Division: ${p.division} | Facility: ${p.facility}\n- Lead: ${p.leadInvestigator} | TRL ${p.trl}/9 | Allocation: €${p.budgetEurM.toFixed(1)}M\n- Summary: ${p.summary}\n`
      ),
      '## Priority Patent Portfolio',
      ...PATENT_RECORDS.map(
        (pat) => `- ${pat.filingNumber} (${pat.status}, ${pat.jurisdiction}): ${pat.title}`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'manikineko-executive-brief-2026.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadJsonLedger = () => {
    const payload = {
      organization: 'Manikineko B.V.',
      jurisdiction: 'Netherlands (Eindhoven / Delft)',
      programs: RESEARCH_PROGRAMS,
      patents: PATENT_RECORDS,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'manikineko-rd-ledger.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-[#F7F7F7] dark:bg-[#111114] p-7 space-y-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="export-modal-title"
              className="text-lg font-semibold text-zinc-950 dark:text-white"
            >
              Executive Brief
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Download Manikineko portfolio documentation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={downloadMarkdownBrief}
            className="w-full px-5 py-3.5 rounded-xl bg-zinc-200/70 dark:bg-zinc-800/80 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium text-zinc-950 dark:text-white">
                Executive Summary (.md)
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Monographs, TRL milestones, and EPO filings
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-500 shrink-0" />
          </button>

          <button
            type="button"
            onClick={downloadJsonLedger}
            className="w-full px-5 py-3.5 rounded-xl bg-zinc-200/70 dark:bg-zinc-800/80 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium text-zinc-950 dark:text-white">
                Structured R&amp;D Ledger (.json)
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Allocations, investigators, and patent IDs
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-500 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              setTimeout(() => window.print(), 120);
            }}
            className="w-full px-5 py-3.5 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 flex items-center justify-between text-left transition-opacity cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium">Print / Save PDF</div>
              <div className="text-[11px] opacity-75 mt-0.5">
                Format current view for presentation print
              </div>
            </div>
            <Printer className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
