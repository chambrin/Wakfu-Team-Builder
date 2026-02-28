import type { TeamCoverage, SynergyBonus, TeamWarning } from '../types';

interface CoverageItem {
  key: keyof TeamCoverage;
  label: string;
  icon: string;
  required: boolean;
}

const COVERAGE_ITEMS: CoverageItem[] = [
  { key: 'tank', label: 'Tank', icon: '🛡️', required: true },
  { key: 'heal', label: 'Heal', icon: '💊', required: true },
  { key: 'dptMelee', label: 'DPT Mêlée', icon: '⚔️', required: true },
  { key: 'dptDistance', label: 'DPT Distance', icon: '🏹', required: true },
  { key: 'armor', label: 'Armures', icon: '🔮', required: false },
  { key: 'removeRes', label: 'Retrait Rés.', icon: '💥', required: false },
  { key: 'placement', label: 'Placement', icon: '🎯', required: false },
  { key: 'buffPA', label: 'Buff PA', icon: '⚡', required: false },
  { key: 'controlePM', label: 'Contrôle PM', icon: '🔗', required: false },
];

interface TeamAnalysisProps {
  coverage: TeamCoverage;
  activeSynergies: SynergyBonus[];
  warnings: TeamWarning[];
  score: number;
  teamSize: number;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  const color =
    score >= 80 ? '#22c55e' : score >= 60 ? '#f6ad1c' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-[10px] text-slate-400">/100</span>
        </div>
      </div>
      <span
        className="text-xs font-semibold"
        style={{ color }}
      >
        {score >= 80 ? 'Excellente' : score >= 60 ? 'Bonne' : score >= 40 ? 'Correcte' : 'Incomplète'}
      </span>
    </div>
  );
}

export function TeamAnalysis({ coverage, activeSynergies, warnings, score, teamSize }: TeamAnalysisProps) {
  const errors = warnings.filter((w) => w.type === 'error');
  const warningsList = warnings.filter((w) => w.type === 'warning');
  const infos = warnings.filter((w) => w.type === 'info');

  return (
    <div className="flex flex-col gap-4">
      {/* Score */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span>📊</span> Score de la Team
        </h3>
        <div className="flex items-center gap-4">
          <ScoreRing score={score} />
          <div className="text-xs text-slate-400 space-y-1">
            <div>
              <span className="text-slate-300 font-medium">{teamSize}</span>/6 classes
            </div>
            <div>
              <span className="text-slate-300 font-medium">{activeSynergies.length}</span> synergie
              {activeSynergies.length !== 1 ? 's' : ''} active
              {activeSynergies.length !== 1 ? 's' : ''}
            </div>
            <div>
              <span className={errors.length > 0 ? 'text-red-400 font-medium' : 'text-green-400 font-medium'}>
                {errors.length}
              </span>{' '}
              problème{errors.length !== 1 ? 's' : ''} critique{errors.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span>✅</span> Couverture des rôles
        </h3>
        <div className="grid grid-cols-1 gap-1.5">
          {COVERAGE_ITEMS.map(({ key, label, icon, required }) => {
            const count = coverage[key];
            const covered = count > 0;
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className={`text-xs ${required ? 'text-slate-200' : 'text-slate-400'}`}>{label}</span>
                  {required && (
                    <span className="text-[9px] text-amber-500/70 font-medium">REQUIS</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {count > 1 && (
                    <span className="text-[10px] text-indigo-400 font-medium">×{count}</span>
                  )}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      covered
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                        : required
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-slate-700 text-slate-500 border border-slate-600/40'
                    }`}
                  >
                    {covered ? '✓' : '✗'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Synergies */}
      {activeSynergies.length > 0 && (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <span>⚡</span> Synergies actives ({activeSynergies.length})
          </h3>
          <div className="space-y-2">
            {activeSynergies.map((synergy, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl border text-xs ${
                  synergy.strength === 'high'
                    ? 'bg-amber-900/20 border-amber-700/40 text-amber-200'
                    : 'bg-indigo-900/20 border-indigo-700/40 text-indigo-200'
                }`}
              >
                <div className="font-semibold mb-0.5 flex items-center gap-1">
                  {synergy.strength === 'high' ? '🔥' : '💫'}
                  {synergy.classes.join(' + ')}
                </div>
                <div className="opacity-80">{synergy.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {(errors.length > 0 || warningsList.length > 0 || infos.length > 0) && (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <span>📋</span> Analyse
          </h3>
          <div className="space-y-1.5">
            {[...errors, ...warningsList, ...infos].map((w, i) => (
              <div
                key={i}
                className={`text-xs p-2 rounded-lg ${
                  w.type === 'error'
                    ? 'bg-red-900/20 text-red-300 border border-red-800/40'
                    : w.type === 'warning'
                    ? 'bg-yellow-900/20 text-yellow-300 border border-yellow-800/40'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600/40'
                }`}
              >
                {w.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
