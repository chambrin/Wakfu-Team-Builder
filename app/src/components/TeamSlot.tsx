import { CLASS_MAP } from '../data/classes';
import { RoleBadge } from './RoleBadge';

interface TeamSlotProps {
  slotIndex: number;
  classId: string | null;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export function TeamSlot({ slotIndex, classId, isActive, onClick, onRemove }: TeamSlotProps) {
  const cls = classId ? CLASS_MAP.get(classId) : null;

  if (!cls) {
    return (
      <button
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-all duration-200
          h-32 w-full
          ${isActive
            ? 'border-amber-500 bg-amber-900/10 shadow-lg shadow-amber-900/30 ring-2 ring-amber-500/20'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-400 hover:bg-slate-800/50'
          }`}
      >
        <div className={`text-3xl transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
          {isActive ? '✨' : '+'}
        </div>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
            Slot {slotIndex + 1}
          </div>
          {isActive && <div className="text-amber-400/70 text-[10px] mt-0.5">Choisir une classe</div>}
        </div>
      </button>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 transition-all duration-200
        h-32 w-full p-3 cursor-pointer
        ${isActive
          ? 'border-amber-500 bg-amber-900/15 shadow-lg shadow-amber-900/30 ring-2 ring-amber-500/20'
          : 'border-slate-600/70 bg-slate-800/50 hover:border-slate-500'
        }`}
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-slate-700 hover:bg-red-800 text-slate-400 hover:text-red-300 flex items-center justify-center text-xs transition-colors"
        title="Retirer"
      >
        ×
      </button>

      <div className="text-3xl">{cls.emoji}</div>
      <div className="text-center min-w-0 w-full">
        <div className="font-bold text-white text-sm truncate">{cls.name}</div>
        <div className="flex justify-center mt-1">
          <RoleBadge role={cls.primaryRole} small />
        </div>
      </div>
    </div>
  );
}
