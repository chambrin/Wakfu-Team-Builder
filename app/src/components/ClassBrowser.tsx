import { useState, useMemo } from 'react';
import { CLASSES } from '../data/classes';
import { ClassCard } from './ClassCard';
import type { RoleId, WakfuClass } from '../types';

type FilterRole = RoleId | 'all';

const FILTER_OPTIONS: { label: string; value: FilterRole }[] = [
  { label: 'Toutes', value: 'all' },
  { label: 'DPT Mêlée', value: 'dpt-melee' },
  { label: 'DPT Distance', value: 'dpt-distance' },
  { label: 'DPT Hybride', value: 'dpt-hybrid' },
  { label: 'Tank', value: 'tank' },
  { label: 'Healer', value: 'healer' },
  { label: 'Support', value: 'support' },
  { label: 'Placeur', value: 'placeur' },
  { label: 'Contrôle', value: 'controle' },
];

interface ClassBrowserProps {
  selectedClassId: string | null;
  teamClassIds: (string | null)[];
  onSelectClass: (cls: WakfuClass) => void;
}

export function ClassBrowser({ selectedClassId, teamClassIds, onSelectClass }: ClassBrowserProps) {
  const [filter, setFilter] = useState<FilterRole>('all');
  const [search, setSearch] = useState('');

  const teamIdSet = new Set(teamClassIds.filter((id): id is string => id !== null));

  const filtered = useMemo(() => {
    return CLASSES.filter((cls) => {
      const matchesFilter =
        filter === 'all' ||
        cls.primaryRole === filter ||
        cls.secondaryRoles.includes(filter);
      const matchesSearch =
        search === '' ||
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        cls.subtitle.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Rechercher une classe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
              filter === opt.value
                ? 'bg-amber-600/20 border-amber-600/50 text-amber-300'
                : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Classes list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {filtered.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-8">Aucune classe trouvée</div>
        ) : (
          filtered.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              isSelected={selectedClassId === cls.id}
              isInTeam={teamIdSet.has(cls.id)}
              onClick={() => onSelectClass(cls)}
              compact
            />
          ))
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50 text-[10px] text-slate-500 text-center">
        {filtered.length}/{CLASSES.length} classes
      </div>
    </div>
  );
}
