import type { WakfuClass } from '../types';
import { RoleBadge } from './RoleBadge';
import { ComplexityBadge } from './ComplexityBadge';

interface ClassCardProps {
  cls: WakfuClass;
  isSelected?: boolean;
  isInTeam?: boolean;
  onClick: () => void;
  compact?: boolean;
}

export function ClassCard({ cls, isSelected, isInTeam, onClick, compact }: ClassCardProps) {
  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left p-2 rounded-lg border transition-all duration-150 group
          ${isSelected
            ? 'border-amber-500 bg-amber-900/20 shadow-lg shadow-amber-900/20'
            : isInTeam
            ? 'border-indigo-600/50 bg-indigo-900/10 opacity-60'
            : 'border-slate-700/50 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/70'
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{cls.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-white truncate">{cls.name}</span>
              <RoleBadge role={cls.primaryRole} small />
            </div>
            <ComplexityBadge complexity={cls.complexity} />
          </div>
          {isInTeam && (
            <span className="text-indigo-400 text-xs shrink-0">✓</span>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all duration-150
        ${isSelected
          ? 'border-amber-500 bg-amber-900/20 shadow-lg shadow-amber-900/20 ring-1 ring-amber-500/30'
          : isInTeam
          ? 'border-indigo-600/40 bg-indigo-900/10 opacity-70'
          : 'border-slate-700/50 bg-slate-800/40 hover:border-amber-700/50 hover:bg-slate-800/70 hover:shadow-md'
        }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{cls.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-white">{cls.name}</span>
            <span className="text-slate-400 text-xs">{cls.subtitle}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <RoleBadge role={cls.primaryRole} small />
            {cls.secondaryRoles.slice(0, 1).map((r) => (
              <RoleBadge key={r} role={r} small />
            ))}
          </div>
          <ComplexityBadge complexity={cls.complexity} />
        </div>
        {isInTeam && (
          <div className="shrink-0 text-indigo-400 text-xs font-medium">Dans la team</div>
        )}
      </div>
    </button>
  );
}
