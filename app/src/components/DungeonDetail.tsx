import { CLASS_MAP } from '../data/classes';
import type { Dungeon, DungeonDifficulty, SlotState } from '../types';

const DIFFICULTY_COLORS: Record<DungeonDifficulty, string> = {
  debutant: 'text-green-300 bg-green-900/20 border-green-700/40',
  intermediaire: 'text-blue-300 bg-blue-900/20 border-blue-700/40',
  avance: 'text-yellow-300 bg-yellow-900/20 border-yellow-700/40',
  expert: 'text-orange-300 bg-orange-900/20 border-orange-700/40',
  endgame: 'text-red-300 bg-red-900/20 border-red-700/40',
};

const DIFFICULTY_LABELS: Record<DungeonDifficulty, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  expert: 'Expert',
  endgame: 'Haut Niveau',
};

const DIFFICULTY_STARS: Record<DungeonDifficulty, number> = {
  debutant: 1,
  intermediaire: 2,
  avance: 3,
  expert: 4,
  endgame: 5,
};

interface DungeonDetailProps {
  dungeon: Dungeon;
  onLoadComposition: (slots: SlotState[]) => void;
  onSelectClass: (classId: string) => void;
}

export function DungeonDetail({ dungeon, onLoadComposition, onSelectClass }: DungeonDetailProps) {
  const recommendedClasses = dungeon.recommendedClasses
    .map((id) => CLASS_MAP.get(id))
    .filter(Boolean);

  const stars = DIFFICULTY_STARS[dungeon.difficulty];

  const handleLoadComposition = () => {
    const slots: SlotState[] = Array(6).fill(null).map((_, i) => {
      const classId = dungeon.recommendedClasses[i] ?? null;
      if (!classId) return { classId: null, playstyleId: null };
      const cls = CLASS_MAP.get(classId);
      return { classId, playstyleId: cls?.playstyles[0]?.id ?? null };
    });
    onLoadComposition(slots);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-5">
        <div className="flex items-start gap-4">
          <div className="text-5xl shrink-0">{dungeon.emoji}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white leading-tight">{dungeon.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[dungeon.difficulty]}`}>
                {DIFFICULTY_LABELS[dungeon.difficulty]}
              </span>
              <span className="text-xs text-slate-400">
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
              <span className="text-xs text-amber-400 font-semibold">
                Niv. {dungeon.levelMin}–{dungeon.levelMax}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
              <span>📍 {dungeon.zone}</span>
              <span>👾 {dungeon.boss}</span>
              <span>🏆 Tranche {dungeon.tier}/15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mécaniques clés */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          ⚙️ Mécaniques clés
        </h3>
        <ul className="space-y-2">
          {dungeon.mechanics.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-amber-500 shrink-0 mt-0.5">•</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Astuce principale */}
      <div className="bg-amber-900/10 rounded-2xl border border-amber-800/30 p-4">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          💡 Conseil stratégique
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">{dungeon.tips}</p>
      </div>

      {/* Classes recommandées */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            👥 Classes recommandées
          </h3>
          {recommendedClasses.length > 0 && (
            <button
              onClick={handleLoadComposition}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-600/20 border border-amber-600/40 text-amber-400 hover:bg-amber-600/30 transition-all"
            >
              ⚡ Charger dans le builder
            </button>
          )}
        </div>

        {recommendedClasses.length === 0 ? (
          <p className="text-xs text-slate-500">Composition standard Tank + Healer + DPT.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {recommendedClasses.map((cls, i) => {
              if (!cls) return null;
              return (
                <button
                  key={cls.id}
                  onClick={() => onSelectClass(cls.id)}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-700/40 hover:bg-slate-700/70 border border-slate-600/40 hover:border-slate-500 rounded-xl transition-all text-left"
                >
                  <div className="relative shrink-0">
                    <span className="text-2xl">{cls.emoji}</span>
                    {i === 0 && (
                      <span className="absolute -top-1 -right-1 text-[8px] bg-amber-500 text-black font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                        1
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{cls.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{cls.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
