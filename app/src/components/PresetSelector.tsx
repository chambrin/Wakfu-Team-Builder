import { PRESETS } from '../data/presets';
import type { PresetTeam } from '../types';

interface PresetSelectorProps {
  onSelectPreset: (preset: PresetTeam) => void;
  onClose: () => void;
}

export function PresetSelector({ onSelectPreset, onClose }: PresetSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-white">Compositions préétablies</h2>
            <p className="text-xs text-slate-400 mt-0.5">Choisissez une compo archétype pour commencer</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => onSelectPreset(preset)}
              className="text-left p-4 rounded-2xl border border-slate-700/60 bg-slate-800/50 hover:border-amber-600/50 hover:bg-amber-900/10 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{preset.emoji}</span>
                <span className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                  {preset.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{preset.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {preset.slots.filter(Boolean).map((id, j) => (
                  <span key={j} className="text-[10px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full border border-slate-600/50">
                    {id}
                  </span>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-[10px]">
                  <span className="text-green-400 font-medium">+ </span>
                  <span className="text-slate-400">{preset.strengths}</span>
                </div>
                <div className="text-[10px]">
                  <span className="text-red-400 font-medium">− </span>
                  <span className="text-slate-400">{preset.weaknesses}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
