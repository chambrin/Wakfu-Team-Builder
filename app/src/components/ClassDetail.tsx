import type { WakfuClass } from '../types';
import { CLASS_MAP } from '../data/classes';
import { RoleBadge } from './RoleBadge';
import { ComplexityBadge } from './ComplexityBadge';

interface ClassDetailProps {
  cls: WakfuClass;
  teamClassIds: (string | null)[];
  onAddAlternative: (classId: string) => void;
}

export function ClassDetail({ cls, teamClassIds, onAddAlternative }: ClassDetailProps) {
  const teamIdSet = new Set(teamClassIds.filter((id): id is string => id !== null));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-5">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{cls.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-xl font-bold text-white">{cls.name}</h2>
              <span className="text-slate-400 text-sm">{cls.subtitle}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <RoleBadge role={cls.primaryRole} />
              {cls.secondaryRoles.map((r) => (
                <RoleBadge key={r} role={r} />
              ))}
            </div>
            <ComplexityBadge complexity={cls.complexity} />
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-3 leading-relaxed">{cls.description}</p>
        <div className="mt-3 text-xs text-slate-400 italic border-t border-slate-700/50 pt-3">
          <span className="text-amber-400/80 font-medium">Style : </span>
          {cls.style}
        </div>
      </div>

      {/* Forces / Faiblesses */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-900/10 rounded-2xl border border-green-800/30 p-4">
          <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>✅</span> Forces
          </h3>
          <ul className="space-y-2">
            {cls.strengths.map((s, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5 shrink-0">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-900/10 rounded-2xl border border-red-800/30 p-4">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>❌</span> Faiblesses
          </h3>
          <ul className="space-y-2">
            {cls.weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5 shrink-0">−</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mécaniques */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span>⚙️</span> Mécaniques clés
        </h3>
        <div className="space-y-3">
          {cls.mechanics.map((m, i) => (
            <div key={i} className="border-l-2 border-amber-700/50 pl-3">
              <div className="text-xs font-semibold text-amber-300 mb-0.5">{m.name}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{m.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Builds */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span>🔨</span> Builds courants
        </h3>
        <div className="space-y-2">
          {cls.builds.map((b, i) => (
            <div key={i} className="bg-slate-700/30 rounded-xl p-3">
              <div className="text-xs font-semibold text-indigo-300 mb-0.5">{b.name}</div>
              <div className="text-xs text-slate-400">{b.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Synergies */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span>🤝</span> Synergies d'équipe
        </h3>
        <div className="space-y-2">
          {cls.synergies.map((s, i) => {
            const ally = CLASS_MAP.get(s.classId);
            if (!ally) return null;
            const inTeam = teamIdSet.has(s.classId);
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                  inTeam
                    ? 'bg-amber-900/20 border border-amber-700/30'
                    : 'bg-slate-700/30 border border-transparent'
                }`}
              >
                <span className="text-lg">{ally.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-white">{ally.name}</span>
                    {inTeam && (
                      <span className="text-[10px] text-amber-400 font-medium">✓ Dans la team</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.reason}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alternatives */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span>🔄</span> Alternatives possibles
        </h3>
        <div className="flex flex-wrap gap-2">
          {cls.alternatives.map((altId) => {
            const alt = CLASS_MAP.get(altId);
            if (!alt) return null;
            const inTeam = teamIdSet.has(altId);
            return (
              <button
                key={altId}
                onClick={() => !inTeam && onAddAlternative(altId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  inTeam
                    ? 'border-indigo-600/40 bg-indigo-900/20 text-indigo-300 cursor-default'
                    : 'border-slate-600/50 bg-slate-700/30 text-slate-300 hover:border-amber-600/50 hover:bg-amber-900/20 hover:text-amber-300'
                }`}
                title={inTeam ? 'Déjà dans la team' : `Voir ${alt.name}`}
              >
                <span>{alt.emoji}</span>
                <span>{alt.name}</span>
                {inTeam && <span className="text-indigo-400">✓</span>}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-[10px] text-slate-500">
          Cliquez sur une alternative pour voir ses détails
        </div>
      </div>

      {/* Tier */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-3">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-medium">Tier & Méta</div>
        <div className="text-xs text-slate-300 italic">{cls.tier}</div>
      </div>
    </div>
  );
}
