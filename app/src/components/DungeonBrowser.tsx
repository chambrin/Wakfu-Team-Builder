import { useState, useMemo } from 'react';
import { DUNGEONS, DUNGEON_TIERS } from '../data/dungeons';
import type { Dungeon, DungeonDifficulty } from '../types';

const DIFFICULTY_COLORS: Record<DungeonDifficulty, string> = {
  debutant: 'text-green-400 bg-green-900/20 border-green-800/40',
  intermediaire: 'text-blue-400 bg-blue-900/20 border-blue-800/40',
  avance: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/40',
  expert: 'text-orange-400 bg-orange-900/20 border-orange-800/40',
  endgame: 'text-red-400 bg-red-900/20 border-red-800/40',
};

const DIFFICULTY_LABELS: Record<DungeonDifficulty, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  expert: 'Expert',
  endgame: 'Haut Niveau',
};

interface DungeonBrowserProps {
  selectedDungeonId: string | null;
  onSelectDungeon: (dungeon: Dungeon) => void;
}

export function DungeonBrowser({ selectedDungeonId, onSelectDungeon }: DungeonBrowserProps) {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DungeonDifficulty | null>(null);

  const filtered = useMemo(() => {
    return DUNGEONS.filter((d) => {
      if (selectedTier !== null && d.tier !== selectedTier) return false;
      if (selectedDifficulty !== null && d.difficulty !== selectedDifficulty) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.boss.toLowerCase().includes(q) ||
          d.zone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, selectedTier, selectedDifficulty]);

  // Group by tier for display
  const grouped = useMemo(() => {
    const map = new Map<number, Dungeon[]>();
    for (const d of filtered) {
      if (!map.has(d.tier)) map.set(d.tier, []);
      map.get(d.tier)!.push(d);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un donjon..."
        className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-600/50"
      />

      {/* Difficulty filter */}
      <div className="flex flex-wrap gap-1">
        {(Object.keys(DIFFICULTY_LABELS) as DungeonDifficulty[]).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all ${
              selectedDifficulty === diff
                ? DIFFICULTY_COLORS[diff]
                : 'text-slate-500 border-slate-700 hover:border-slate-500'
            }`}
          >
            {DIFFICULTY_LABELS[diff]}
          </button>
        ))}
      </div>

      {/* Tier filter */}
      <div className="flex flex-wrap gap-1">
        {DUNGEON_TIERS.map(({ tier, levelRange }) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
            className={`text-[9px] px-1.5 py-0.5 rounded-lg border transition-all ${
              selectedTier === tier
                ? 'bg-amber-600/20 border-amber-600/50 text-amber-400'
                : 'text-slate-500 border-slate-700/60 hover:border-slate-500'
            }`}
          >
            {levelRange}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="text-[10px] text-slate-500">
        {filtered.length} donjon{filtered.length !== 1 ? 's' : ''}
        {(selectedTier !== null || selectedDifficulty !== null || search) && (
          <button
            onClick={() => { setSearch(''); setSelectedTier(null); setSelectedDifficulty(null); }}
            className="ml-2 text-amber-500 hover:text-amber-400"
          >
            Effacer filtres
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
        {grouped.map(([tier, dungeons]) => {
          const tierInfo = DUNGEON_TIERS.find((t) => t.tier === tier);
          return (
            <div key={tier}>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span>Niv. {tierInfo?.levelRange}</span>
                <span className="text-slate-700">·</span>
                <span>{tierInfo?.label}</span>
              </div>
              <div className="space-y-1">
                {dungeons.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelectDungeon(d)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl border transition-all ${
                      selectedDungeonId === d.id
                        ? 'bg-amber-900/15 border-amber-600/50 shadow-sm'
                        : 'bg-slate-800/40 border-slate-700/40 hover:border-slate-600 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base shrink-0">{d.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-semibold leading-tight truncate ${
                          selectedDungeonId === d.id ? 'text-amber-300' : 'text-slate-200'
                        }`}>
                          {d.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] text-slate-500">Niv. {d.levelMin}-{d.levelMax}</span>
                          <span className={`text-[8px] font-bold px-1 py-0 rounded border ${DIFFICULTY_COLORS[d.difficulty]}`}>
                            {DIFFICULTY_LABELS[d.difficulty]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {grouped.length === 0 && (
          <div className="text-center text-slate-500 text-xs py-8">
            Aucun donjon trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
