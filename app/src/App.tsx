import { useState, useCallback } from 'react';
import { CLASS_MAP } from './data/classes';
import { TeamSlot } from './components/TeamSlot';
import { ClassBrowser } from './components/ClassBrowser';
import { ClassDetail } from './components/ClassDetail';
import { TeamAnalysis } from './components/TeamAnalysis';
import { TeamOverview } from './components/TeamOverview';
import { PresetSelector } from './components/PresetSelector';
import { useTeamAnalysis } from './hooks/useTeamAnalysis';
import type { WakfuClass, PresetTeam, SlotState } from './types';

const EMPTY_SLOT: SlotState = { classId: null, playstyleId: null };
const INITIAL_SLOTS: SlotState[] = Array(6).fill(null).map(() => ({ ...EMPTY_SLOT }));

type ActivePanel = 'analysis' | 'overview';

export function App() {
  const [slots, setSlots] = useState<SlotState[]>(INITIAL_SLOTS);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<WakfuClass | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');
  const [showPresets, setShowPresets] = useState(false);

  const analysis = useTeamAnalysis(slots);

  const handleSlotClick = useCallback((index: number) => {
    setActiveSlot((prev) => (prev === index ? null : index));
    setActivePanel('overview');
  }, []);

  const handleRemoveFromSlot = useCallback((index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...EMPTY_SLOT };
      return next;
    });
    if (activeSlot === index) setActiveSlot(null);
  }, [activeSlot]);

  const handlePlaystyleChange = useCallback((slotIndex: number, playstyleId: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = { ...next[slotIndex], playstyleId };
      return next;
    });
  }, []);

  const handleSelectClass = useCallback(
    (cls: WakfuClass) => {
      setSelectedClass(cls);

      if (activeSlot !== null) {
        setSlots((prev) => {
          const next = [...prev];
          next[activeSlot] = {
            classId: cls.id,
            playstyleId: cls.playstyles[0]?.id ?? null,
          };
          return next;
        });

        // Move to next empty slot or deactivate
        const nextEmpty = slots.findIndex((s, i) => i > activeSlot && s.classId === null);
        if (nextEmpty !== -1) {
          setActiveSlot(nextEmpty);
        } else {
          const anyEmpty = slots.findIndex((s, i) => i !== activeSlot && s.classId === null);
          setActiveSlot(anyEmpty !== -1 ? anyEmpty : null);
        }
      }
    },
    [activeSlot, slots]
  );

  const handleSelectPreset = useCallback((preset: PresetTeam) => {
    const newSlots: SlotState[] = Array(6).fill(null).map(() => ({ ...EMPTY_SLOT }));
    preset.slots.forEach((classId, i) => {
      if (i < 6 && classId !== null) {
        const cls = CLASS_MAP.get(classId);
        newSlots[i] = {
          classId,
          playstyleId: cls?.playstyles[0]?.id ?? null,
        };
      }
    });
    setSlots(newSlots);
    setShowPresets(false);
    setActiveSlot(null);
    setSelectedClass(null);
    setActivePanel('overview');
  }, []);

  const handleReset = useCallback(() => {
    setSlots(Array(6).fill(null).map(() => ({ ...EMPTY_SLOT })));
    setActiveSlot(null);
    setSelectedClass(null);
  }, []);

  const handleAlternativeClick = useCallback((classId: string) => {
    const cls = CLASS_MAP.get(classId);
    if (cls) setSelectedClass(cls);
  }, []);

  const filledCount = slots.filter((s) => s.classId !== null).length;
  const teamClassIds = slots.map((s) => s.classId);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚔️</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none" style={{ fontFamily: 'Cinzel, serif' }}>
                Wakfu Team Builder
              </h1>
              <div className="text-[10px] text-slate-400 mt-0.5">Constructeur de teams de 6 — PvM multicompte</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2">
              <span className="text-amber-400 font-bold">{filledCount}</span>/6 classes
            </div>
            <button
              onClick={() => setShowPresets(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-600/40 text-indigo-300 text-xs font-medium hover:bg-indigo-600/30 transition-all"
            >
              📋 Presets
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-xs font-medium hover:bg-red-900/30 transition-all"
            >
              🗑️ Reset
            </button>
          </div>
        </div>
      </header>

      {/* Team Slots */}
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-[1600px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Composition de l'équipe
            </div>
            {activeSlot !== null && (
              <div className="text-xs text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block"></span>
                Slot {activeSlot + 1} actif — cliquez une classe pour l'assigner
              </div>
            )}
          </div>
          <div className="grid grid-cols-6 gap-3">
            {slots.map((slot, i) => (
              <TeamSlot
                key={i}
                slotIndex={i}
                slot={slot}
                isActive={activeSlot === i}
                onClick={() => handleSlotClick(i)}
                onRemove={() => handleRemoveFromSlot(i)}
                onPlaystyleChange={(playstyleId) => handlePlaystyleChange(i, playstyleId)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-4 flex gap-4 overflow-hidden">
        {/* Left: Browser */}
        <div className="w-64 shrink-0 flex flex-col">
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-4 flex flex-col flex-1 overflow-hidden">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>🧙</span> Classes ({18})
            </h2>
            <ClassBrowser
              selectedClassId={selectedClass?.id ?? null}
              teamClassIds={teamClassIds}
              onSelectClass={handleSelectClass}
            />
          </div>
        </div>

        {/* Center: Class Detail */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {selectedClass ? (
            <ClassDetail
              cls={selectedClass}
              teamClassIds={teamClassIds}
              onAddAlternative={handleAlternativeClick}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="text-6xl opacity-30">⚔️</div>
              <div>
                <div className="text-slate-400 font-medium mb-1">Sélectionnez une classe</div>
                <div className="text-slate-500 text-xs max-w-sm">
                  Cliquez sur un slot pour l'activer, puis sélectionnez une classe dans la liste pour l'assigner.
                  Ou choisissez une compo préétablie via le bouton Presets.
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2 max-w-md text-xs text-slate-500">
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                  <div className="text-lg mb-1">1️⃣</div>
                  <div>Cliquez un slot pour l'activer</div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                  <div className="text-lg mb-1">2️⃣</div>
                  <div>Sélectionnez une classe à gauche</div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                  <div className="text-lg mb-1">3️⃣</div>
                  <div>Analysez votre team à droite</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Analysis / Overview */}
        <div className="w-72 shrink-0">
          {/* Panel switcher */}
          <div className="flex gap-1 mb-3 bg-slate-900/50 rounded-xl p-1 border border-slate-800/60">
            <button
              onClick={() => setActivePanel('overview')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePanel === 'overview'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              👥 Vue Équipe
            </button>
            <button
              onClick={() => setActivePanel('analysis')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePanel === 'analysis'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              📊 Analyse
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
            {activePanel === 'overview' ? (
              <TeamOverview
                slots={slots}
                insights={analysis.insights}
                coverage={analysis.coverage}
                score={analysis.score}
              />
            ) : (
              <TeamAnalysis
                coverage={analysis.coverage}
                activeSynergies={analysis.activeSynergies}
                warnings={analysis.warnings}
                score={analysis.score}
                teamSize={analysis.teamSize}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preset Modal */}
      {showPresets && (
        <PresetSelector
          onSelectPreset={handleSelectPreset}
          onClose={() => setShowPresets(false)}
        />
      )}
    </div>
  );
}
