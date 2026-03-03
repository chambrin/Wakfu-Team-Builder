import { useState, useMemo } from 'react';
import { QUEST_GROUPS, TOTAL_QUEST_COUNT } from '../data/quests';
import { useQuestTracking } from '../hooks/useQuestTracking';
import type { QuestCategory, QuestStatus, QuestGroup } from '../types';

type FilterStatus = 'all' | QuestStatus;

const CATEGORY_LABELS: Record<QuestCategory, { label: string; icon: string; color: string }> = {
  principale: { label: 'Principales', icon: '🗺️', color: 'text-amber-400' },
  annexe: { label: 'Annexes', icon: '🧩', color: 'text-indigo-400' },
  mercenaire: { label: 'Mercenaires', icon: '⚔️', color: 'text-red-400' },
};

const STATUS_CONFIG: Record<QuestStatus, { icon: string; color: string; label: string }> = {
  'todo': { icon: '○', color: 'text-slate-500', label: 'À faire' },
  'in-progress': { icon: '◑', color: 'text-amber-400', label: 'En cours' },
  'done': { icon: '●', color: 'text-green-400', label: 'Terminé' },
};

function ProgressRing({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : done / total;
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const color = pct >= 1 ? '#22c55e' : pct >= 0.6 ? '#f6ad1c' : pct >= 0.3 ? '#6366f1' : '#475569';

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
        <circle
          cx="38" cy="38" r={r}
          fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-white leading-none">{done}</span>
        <span className="text-[10px] text-slate-400">/{total}</span>
      </div>
    </div>
  );
}

function GroupProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : (done / total) * 100;
  const color = pct >= 100 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-indigo-500';
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-400 shrink-0">{done}/{total}</span>
    </div>
  );
}

interface QuestItemProps {
  questId: string;
  name: string;
  levelMin: number;
  levelMax?: number;
  zone?: string;
  rewards?: string[];
  repeatable?: boolean;
  important?: boolean;
  status: QuestStatus;
  onCycle: () => void;
}

function QuestItem({ questId: _questId, name, levelMin, levelMax, zone, rewards, repeatable, important, status, onCycle }: QuestItemProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[status];
  const hasDetails = (rewards && rewards.length > 0);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        status === 'done'
          ? 'border-green-800/30 bg-green-900/5'
          : status === 'in-progress'
          ? 'border-amber-700/30 bg-amber-900/5'
          : 'border-slate-700/40 bg-slate-800/20'
      }`}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Status toggle */}
        <button
          onClick={onCycle}
          className={`text-xl shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-slate-700/50 ${cfg.color}`}
          title={`Statut : ${cfg.label} — cliquer pour changer`}
        >
          {cfg.icon}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-medium leading-tight ${status === 'done' ? 'text-slate-400 line-through' : 'text-white'}`}>
              {name}
            </span>
            {important && (
              <span className="text-[9px] bg-amber-900/40 text-amber-400 border border-amber-700/40 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide shrink-0">
                Important
              </span>
            )}
            {repeatable && (
              <span className="text-[9px] bg-indigo-900/30 text-indigo-400 border border-indigo-700/30 px-1.5 py-0.5 rounded-full shrink-0">
                Répétable
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-amber-500/80 font-medium">
              niv. {levelMin}{levelMax && levelMax !== levelMin ? `–${levelMax}` : '+'}
            </span>
            {zone && (
              <span className="text-[11px] text-slate-500 truncate">{zone}</span>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        {hasDetails && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-slate-500 hover:text-slate-300 text-xs shrink-0 transition-colors"
          >
            {expanded ? '▲' : '▼'}
          </button>
        )}
      </div>

      {/* Expanded rewards */}
      {expanded && hasDetails && (
        <div className="px-3 pb-2.5 border-t border-slate-700/30 mt-0 pt-2">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Récompenses</div>
          <ul className="space-y-0.5">
            {rewards!.map((r, i) => (
              <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5 shrink-0">›</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface GroupCardProps {
  group: QuestGroup;
  progress: Record<string, QuestStatus>;
  onCycle: (id: string) => void;
  filterStatus: FilterStatus;
}

function GroupCard({ group, progress, onCycle, filterStatus }: GroupCardProps) {
  const quests = group.quests;
  const doneCount = quests.filter((q) => (progress[q.id] ?? 'todo') === 'done').length;

  const visibleQuests = filterStatus === 'all'
    ? quests
    : quests.filter((q) => (progress[q.id] ?? 'todo') === filterStatus);

  if (visibleQuests.length === 0) return null;

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800/60 overflow-hidden">
      {/* Group header */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{group.icon}</span>
            <span className="text-sm font-bold text-white">{group.name}</span>
          </div>
          <span className="text-xs text-slate-400">
            niv. {group.levelMin}{group.levelMax ? `–${group.levelMax}` : '+'}
          </span>
        </div>
        <GroupProgressBar done={doneCount} total={quests.length} />
      </div>

      {/* Quest list */}
      <div className="p-3 space-y-2">
        {visibleQuests.map((q) => (
          <QuestItem
            key={q.id}
            questId={q.id}
            name={q.name}
            levelMin={q.levelMin}
            levelMax={q.levelMax}
            zone={q.zone}
            rewards={q.rewards}
            repeatable={q.repeatable}
            important={q.important}
            status={progress[q.id] ?? 'todo'}
            onCycle={() => onCycle(q.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function QuestTracker() {
  const { progress, cycleStatus, resetAll } = useQuestTracking();
  const [activeCategory, setActiveCategory] = useState<QuestCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const totalDone = useMemo(
    () => Object.values(progress).filter((s) => s === 'done').length,
    [progress]
  );
  const totalInProgress = useMemo(
    () => Object.values(progress).filter((s) => s === 'in-progress').length,
    [progress]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<QuestCategory, { done: number; total: number }> = {
      principale: { done: 0, total: 0 },
      annexe: { done: 0, total: 0 },
      mercenaire: { done: 0, total: 0 },
    };
    for (const g of QUEST_GROUPS) {
      counts[g.category].total += g.quests.length;
      counts[g.category].done += g.quests.filter(
        (q) => (progress[q.id] ?? 'todo') === 'done'
      ).length;
    }
    return counts;
  }, [progress]);

  const visibleGroups = useMemo(
    () =>
      QUEST_GROUPS.filter(
        (g) => activeCategory === 'all' || g.category === activeCategory
      ),
    [activeCategory]
  );

  const handleReset = () => {
    if (window.confirm('Réinitialiser toute la progression ? Cette action est irréversible.')) {
      resetAll();
    }
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-80px)]">
      {/* ── Left sidebar ──────────────────────────────────────────────────── */}
      <div className="w-56 shrink-0 flex flex-col gap-3 overflow-y-auto">
        {/* Global progress */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-4 flex flex-col items-center gap-3">
          <ProgressRing done={totalDone} total={TOTAL_QUEST_COUNT} />
          <div className="text-center">
            <div className="text-xs font-bold text-white">Progression globale</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {totalInProgress > 0 && (
                <span className="text-amber-400 font-medium">{totalInProgress} en cours · </span>
              )}
              {TOTAL_QUEST_COUNT - totalDone - totalInProgress} restantes
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-[10px] text-slate-600 hover:text-red-400 transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        {/* Category filter */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-3 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Catégories</div>
          <button
            onClick={() => setActiveCategory('all')}
            className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-all ${
              activeCategory === 'all'
                ? 'bg-slate-700/80 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>📋</span> Toutes
            </span>
            <span className="text-[10px] text-slate-500">{TOTAL_QUEST_COUNT}</span>
          </button>
          {(Object.entries(CATEGORY_LABELS) as [QuestCategory, typeof CATEGORY_LABELS[QuestCategory]][]).map(
            ([cat, cfg]) => {
              const counts = categoryCounts[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-700/80 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cfg.icon}</span>
                    <span>{cfg.label}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {counts.done}/{counts.total}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Status filter */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-3 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Afficher</div>
          {([
            { value: 'all', label: 'Toutes', icon: '◻', color: 'text-slate-300' },
            { value: 'todo', label: 'À faire', icon: '○', color: 'text-slate-500' },
            { value: 'in-progress', label: 'En cours', icon: '◑', color: 'text-amber-400' },
            { value: 'done', label: 'Terminées', icon: '●', color: 'text-green-400' },
          ] as const).map(({ value, label, icon, color }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value as FilterStatus)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs transition-all ${
                filterStatus === value
                  ? 'bg-slate-700/80 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className={color}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 overflow-y-auto space-y-4 pr-1">
        {visibleGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            progress={progress}
            onCycle={cycleStatus}
            filterStatus={filterStatus}
          />
        ))}
        {visibleGroups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="text-4xl opacity-30">📜</div>
            <p className="text-slate-500 text-sm">Aucun groupe dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
