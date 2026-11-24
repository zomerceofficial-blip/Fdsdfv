import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Download, Search } from 'lucide-react';
import { FACILITIES, PATENT_RECORDS } from '../data/manikinekoData';
import { PatentRecord } from '../types/research';
import { ResilientImage } from './ResilientImage';

type StatusFilter = 'All' | PatentRecord['status'];

export const FacilitiesAndBrief: React.FC = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(FACILITIES[0].id);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(PATENT_RECORDS[0].id);

  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [domainFocus, setDomainFocus] = useState('Nanophotonics & Metrology');
  const [briefNotes, setBriefNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const activeFacility =
    FACILITIES.find((f) => f.id === selectedFacilityId) ?? FACILITIES[0];

  const filteredPatents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PATENT_RECORDS.filter((rec) => {
      const matchStatus = statusFilter === 'All' || rec.status === statusFilter;
      const matchSearch =
        q === '' ||
        rec.filingNumber.toLowerCase().includes(q) ||
        rec.title.toLowerCase().includes(q) ||
        rec.authors.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [statusFilter, searchQuery]);

  const downloadBibTeX = (rec: PatentRecord) => {
    const year = rec.filingDate.slice(0, 4);
    const bib = `@patent{${rec.citationKey},
  title = {${rec.title}},
  author = {${rec.authors}},
  number = {${rec.filingNumber}},
  year = {${year}},
  institution = {Manikineko B.V., Eindhoven, Netherlands},
  note = {${rec.jurisdiction} - ${rec.status}}
}\n`;
    const blob = new Blob([bib], { type: 'application/x-bibtex;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rec.filingNumber}.bib`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactEmail.trim() || !contactEmail.includes('@')) {
      setFormError('Please provide an organization name and a valid institutional email.');
      return;
    }
    setFormError(null);
    const refId = `MNK-NL-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setSubmittedRef(refId);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-20">
      {/* Header & Campus Switcher */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Cleanrooms &amp; Patent Ledger
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Physical laboratory infrastructure across Brainport Eindhoven and Delft Science Park.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            {FACILITIES.map((fac) => (
              <button
                key={fac.id}
                type="button"
                onClick={() => setSelectedFacilityId(fac.id)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  fac.id === activeFacility.id
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                    : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/70 dark:hover:bg-zinc-700'
                }`}
              >
                {fac.city}
              </button>
            ))}
          </div>
        </div>

        <ResilientImage
          src={activeFacility.imageUrl}
          alt={activeFacility.imageAlt}
          aspectClassName="aspect-[16/9]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
          <div className="sm:col-span-4">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {activeFacility.city} Specifications
            </div>
          </div>

          <div className="sm:col-span-8 space-y-5">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {activeFacility.description}
            </p>
            <dl className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Cleanroom Standard</dt>
                <dd className="font-mono text-zinc-950 dark:text-white mt-0.5">
                  {activeFacility.cleanroomClass}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Footprint</dt>
                <dd className="font-mono text-zinc-950 dark:text-white mt-0.5">
                  {activeFacility.floorAreaSqm.toLocaleString()} m²
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Vibration Floor</dt>
                <dd className="font-mono text-zinc-950 dark:text-white mt-0.5">
                  {activeFacility.vibrationFloor}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Thermal Control</dt>
                <dd className="font-mono text-zinc-950 dark:text-white mt-0.5">
                  {activeFacility.thermalStability}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Patent Ledger */}
      <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
        <div className="sm:col-span-4">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Patent filings
          </div>
        </div>

        <div className="sm:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Granted', 'PCT Published', 'Peer Review'] as StatusFilter[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === st
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                      : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-40">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID..."
                aria-label="Search patent ledger"
                className="w-full pl-5 py-1 text-xs bg-transparent text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPatents.map((rec) => {
              const isOpen = expandedId === rec.id;
              return (
                <div key={rec.id} className="py-2">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : rec.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-sm font-medium text-zinc-950 dark:text-white underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700">
                        {rec.filingNumber} — {rec.title}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {rec.jurisdiction} · {rec.status} · {rec.filingDate}
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="pt-3 space-y-3">
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {rec.abstract}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {rec.authors} · {rec.claimsCount} claims
                        </span>
                        <button
                          type="button"
                          onClick={() => downloadBibTeX(rec)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200/75 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300/80 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>BibTeX</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Briefing Request */}
      <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
        <div className="sm:col-span-4">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mb-3" />
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Request briefing
          </div>
        </div>

        <div className="sm:col-span-8">
          {submittedRef ? (
            <div className="rounded-xl bg-zinc-200/60 dark:bg-zinc-900 p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-white">
                <Check className="w-4 h-4" />
                <span>Briefing Logged — {submittedRef}</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Routed to Manikineko Principal Engineering Desk, Eindhoven.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setOrgName('');
                  setContactEmail('');
                  setBriefNotes('');
                }}
                className="px-4 py-1.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-medium cursor-pointer"
              >
                New request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div role="alert" className="text-xs text-zinc-900 dark:text-zinc-100">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Organization / Institution"
                  aria-label="Organization"
                  className="w-full px-4 py-2.5 rounded-full text-xs bg-zinc-200/60 dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Institutional email"
                  aria-label="Institutional email"
                  className="w-full px-4 py-2.5 rounded-full text-xs bg-zinc-200/60 dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
              </div>

              <select
                value={domainFocus}
                onChange={(e) => setDomainFocus(e.target.value)}
                aria-label="Research Track"
                className="w-full px-4 py-2.5 rounded-full text-xs bg-zinc-200/60 dark:bg-zinc-900 text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <option>Nanophotonics &amp; Metrology</option>
                <option>Cryogenic Titanium Actuation</option>
                <option>Athermal Metamaterial Optics</option>
                <option>Cleanroom Facility Qualification</option>
              </select>

              <textarea
                rows={3}
                value={briefNotes}
                onChange={(e) => setBriefNotes(e.target.value)}
                placeholder="Technical scope, wavelength envelope, or timeline..."
                aria-label="Technical scope"
                className="w-full px-4 py-3 rounded-2xl text-xs bg-zinc-200/60 dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-medium bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-85 transition-opacity cursor-pointer"
              >
                Request briefing
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
