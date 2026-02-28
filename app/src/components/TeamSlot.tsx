import { CLASS_MAP } from '../data/classes';
import type { SlotState } from '../types';

interface TeamSlotProps {
  slotIndex: number;
  slot: SlotState;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
  onPlaystyleChange: (playstyleId: string) => void;
}

export function TeamSlot({ slotIndex, slot, isActive, onClick, onRemove, onPlaystyleChange }: TeamSlotProps) {
  const cls = slot.classId ? CLASS_MAP.get(slot.classId) : null;

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
        <div className="text-3xl">{isActive ? '✨' : '+'}</div>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
            Slot {slotIndex + 1}
          </div>
          {isActive && <div className="text-amber-400/70 text-[10px] mt-0.5">Choisir une classe</div>}
        </div>
      </button>
    );
  }

  const currentPlaystyleId = slot.playstyleId ?? cls.playstyles[0]?.id;
  const currentPlaystyle = cls.playstyles.find((p) => p.id === currentPlaystyleId) ?? cls.playstyles[0];

  return (
    <div
      className={`relative flex flex-col gap-1.5 rounded-2xl border-2 transition-all duration-200
        w-full p-2.5 cursor-pointer
        ${isActive
          ? 'border-amber-500 bg-amber-900/15 shadow-lg shadow-amber-900/30 ring-2 ring-amber-500/20'
          : 'border-slate-600/70 bg-slate-800/50 hover:border-slate-500'
        }`}
      onClick={onClick}
    >
      {/* Remove button */}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-slate-700 hover:bg-red-800 text-slate-400 hover:text-red-300 flex items-center justify-center text-xs transition-colors z-10"
        title="Retirer"
      >
        ×
      </button>

      {/* Class info */}
      <div className="flex flex-col items-center gap-1 pt-0.5">
        <span className="text-2xl">{cls.emoji}</span>
        <div className="text-center">
          <div className="font-bold text-white text-xs leading-tight">{cls.name}</div>
        </div>
      </div>

      {/* Playstyle selector */}
      {cls.playstyles.length > 1 && (
        <div onClick={(e) => e.stopPropagation()} className="w-full">
          <select
            value={currentPlaystyleId}
            onChange={(e) => onPlaystyleChange(e.target.value)}
            className="w-full text-[10px] bg-slate-700 border border-slate-600 rounded-lg px-1.5 py-1 text-slate-300 cursor-pointer focus:outline-none focus:border-amber-600/50 hover:border-slate-500 transition-colors"
            title="Changer de playstyle"
          >
            {cls.playstyles.map((ps) => (
              <option key={ps.id} value={ps.id}>{ps.name}</option>
            ))}
          </select>
        </div>
      )}

      {cls.playstyles.length === 1 && currentPlaystyle && (
        <div className="text-center">
          <span className="text-[9px] text-amber-400/60 font-medium">{currentPlaystyle.name}</span>
        </div>
      )}
    </div>
  );
}
