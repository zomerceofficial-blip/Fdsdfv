import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { BrandMark } from './components/BrandMark';
import { ExportDossierModal } from './components/ExportDossierModal';
import { FacilitiesAndBrief } from './components/FacilitiesAndBrief';
import { JournalFeed } from './components/JournalFeed';
import { MonographReader } from './components/MonographReader';
import { ProgramsIndex } from './components/ProgramsIndex';
import { ResearchProgram, ResearchView } from './types/research';

const NAV_LINKS: { id: ResearchView; label: string }[] = [
  { id: ResearchView.Journal, label: 'Journal' },
  { id: ResearchView.Programs, label: 'Programs' },
  { id: ResearchView.LabsAndIP, label: 'Labs & IP' },
];

export default function App() {
  const [activeView, setActiveView] = useState<ResearchView>(ResearchView.Journal);
  const [activeArticle, setActiveArticle] = useState<ResearchProgram | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleNavigate = (view: ResearchView) => {
    setActiveView(view);
    setActiveArticle(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (program: ResearchProgram) => {
    setActiveArticle(program);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-[#111113] dark:bg-[#08080A] dark:text-[#F4F4F6]">
        {/* Minimalist Borderless Top Bar */}
        <header className="sticky top-0 z-40 bg-[#F7F7F7]/90 dark:bg-[#08080A]/90 backdrop-blur-md">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-8">
            <button
              type="button"
              onClick={() => handleNavigate(ResearchView.Journal)}
              className="text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none"
            >
              <BrandMark />
            </button>

            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((item) => {
                const isActive = activeView === item.id && !activeArticle;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`relative py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-zinc-950 dark:text-white'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="editorial-nav-line"
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-zinc-950 dark:bg-white rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="hidden sm:inline-flex items-center px-5 py-2 text-xs font-medium rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
              >
                Executive Brief
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="md:hidden p-2 rounded-full text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm flex justify-end"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-72 max-w-[85vw] h-full bg-[#F7F7F7] dark:bg-[#08080A] p-8 flex flex-col justify-between"
              >
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <BrandMark />
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close navigation menu"
                      className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <nav className="space-y-4">
                    {NAV_LINKS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(item.id)}
                        className="block w-full text-left text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setExportModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-full text-xs font-medium bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 cursor-pointer"
                  >
                    Executive Brief
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDark((d) => !d)}
                  className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light surface' : 'Dark surface'}</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 sm:px-10 pt-4 pb-20 sm:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArticle ? `article-${activeArticle.id}` : activeView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeArticle ? (
                <MonographReader
                  program={activeArticle}
                  onBack={() => setActiveArticle(null)}
                  onSelectArticle={handleOpenArticle}
                />
              ) : activeView === ResearchView.Journal ? (
                <JournalFeed
                  onOpenArticle={handleOpenArticle}
                  onNavigate={handleNavigate}
                  onOpenBriefModal={() => setExportModalOpen(true)}
                />
              ) : activeView === ResearchView.Programs ? (
                <ProgramsIndex onOpenArticle={handleOpenArticle} />
              ) : (
                <FacilitiesAndBrief />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Quiet Borderless Footer Matching Screenshot 2 */}
        <footer className="max-w-[680px] w-full mx-auto px-6 sm:px-0 py-12 space-y-4">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <div>© 2026 Manikineko B.V., Eindhoven &amp; Delft.</div>
            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </footer>

        <ExportDossierModal
          open={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
