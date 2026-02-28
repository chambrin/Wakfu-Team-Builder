import type { SlotState, TeamInsight, TeamCoverage, WakfuClass } from '../types';
import { CLASS_MAP } from '../data/classes';
import { getEffectiveProvides } from '../hooks/useTeamAnalysis';

interface TeamOverviewProps {
  slots: SlotState[];
  insights: TeamInsight[];
  coverage: TeamCoverage;
  score: number;
}

function ContentTag({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

function getContentRecommendation(coverage: TeamCoverage, insights: TeamInsight[], teamSize: number) {
  if (teamSize === 0) return null;
  const criticals = insights.filter((i) => i.icon === '🚨').length;
  if (criticals > 0) return { label: 'Contenu facile seulement', color: 'bg-red-900/30 text-red-300 border-red-800/40' };
  if (coverage.tank >= 2 && coverage.heal > 0 && coverage.armor > 0) {
    return { label: 'Haut Stasis / Difficulté maximale', color: 'bg-emerald-900/30 text-emerald-300 border-emerald-800/40' };
  }
  if (coverage.tank > 0 && coverage.heal > 0) {
    return { label: 'Contenu modéré à difficile', color: 'bg-blue-900/30 text-blue-300 border-blue-800/40' };
  }
  return { label: 'Contenu facile à modéré', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-800/40' };
}

function getAvgComplexity(classes: WakfuClass[]) {
  if (classes.length === 0) return null;
  const score = classes.reduce((s, c) => s + (c.complexity === 'beginner' ? 1 : c.complexity === 'intermediate' ? 2 : 3), 0) / classes.length;
  if (score <= 1.4) return { label: '🟢 Débutant', color: 'text-green-400' };
  if (score <= 2.2) return { label: '🟡 Intermédiaire', color: 'text-yellow-400' };
  return { label: '🔴 Avancé', color: 'text-red-400' };
}

export function TeamOverview({ slots, insights, coverage, score }: TeamOverviewProps) {
  const filledSlots = slots.filter((s) => s.classId !== null);
  const classes = filledSlots
    .map((s) => CLASS_MAP.get(s.classId!))
    .filter((c): c is WakfuClass => c !== undefined);

  const strengths = insights.filter((i) => i.type === 'strength');
  const weaknesses = insights.filter((i) => i.type === 'weakness');
  const content = getContentRecommendation(coverage, insights, classes.length);
  const complexity = getAvgComplexity(classes);

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <div className="text-4xl opacity-30">👥</div>
        <p className="text-slate-500 text-sm">Ajoutez des classes dans les slots pour voir l'analyse de votre équipe.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Infos rapides */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">📋 Résumé de l'équipe</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500">Taille</span>
            <div className="font-bold text-white mt-0.5">{classes.length}/6 membres</div>
          </div>
          <div>
            <span className="text-slate-500">Score</span>
            <div className="font-bold text-white mt-0.5">{score}/100</div>
          </div>
          {complexity && (
            <div>
              <span className="text-slate-500">Complexité moy.</span>
              <div className={`font-bold mt-0.5 ${complexity.color}`}>{complexity.label}</div>
            </div>
          )}
          {content && (
            <div className="col-span-2">
              <span className="text-slate-500">Contenu recommandé</span>
              <div className="mt-1">
                <ContentTag label={content.label} color={content.color} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Membres et playstyles */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">👥 Membres & Rôles</h3>
        <div className="space-y-2">
          {filledSlots.map((slot, i) => {
            if (!slot.classId) return null;
            const cls = CLASS_MAP.get(slot.classId);
            if (!cls) return null;
            const playstyle = slot.playstyleId ? cls.playstyles.find((p) => p.id === slot.playstyleId) : cls.playstyles[0];
            const effective = getEffectiveProvides(slot, cls);

            const contrib: string[] = [];
            if (effective.tank) contrib.push('Tank');
            if (effective.heal) contrib.push('Heal');
            if (effective.dptMelee) contrib.push('DPT Mêlée');
            if (effective.dptDistance) contrib.push('DPT Distance');
            if (effective.armor) contrib.push('Armures');
            if (effective.removeRes) contrib.push('−Rés.');
            if (effective.placement) contrib.push('Placement');
            if (effective.buffPA) contrib.push('Buff PA');
            if (effective.controlePM) contrib.push('−PM');

            return (
              <div key={i} className="flex items-start gap-2.5 p-2.5 bg-slate-700/30 rounded-xl">
                <span className="text-xl shrink-0">{cls.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-white">{cls.name}</span>
                    {playstyle && (
                      <span className="text-[10px] text-amber-400/80 font-medium">{playstyle.name}</span>
                    )}
                  </div>
                  {contrib.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {contrib.map((c) => (
                        <span key={c} className="text-[9px] bg-slate-600/60 text-slate-300 px-1.5 py-0.5 rounded-full border border-slate-500/30">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {playstyle && playstyle.strengthPoints.length > 0 && (
                    <div className="mt-1.5 text-[10px] text-green-400/70 leading-relaxed">
                      + {playstyle.strengthPoints[0]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forces */}
      {strengths.length > 0 && (
        <div className="bg-green-900/10 rounded-2xl border border-green-800/30 p-4">
          <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>✅</span> Forces de la composition ({strengths.length})
          </h3>
          <div className="space-y-2.5">
            {strengths.map((insight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-base shrink-0 mt-0.5">{insight.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-green-300">{insight.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{insight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Faiblesses */}
      {weaknesses.length > 0 && (
        <div className="bg-red-900/10 rounded-2xl border border-red-800/30 p-4">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>⚠️</span> Faiblesses de la composition ({weaknesses.length})
          </h3>
          <div className="space-y-2.5">
            {weaknesses.map((insight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-base shrink-0 mt-0.5">{insight.icon}</span>
                <div>
                  <div className={`text-xs font-semibold ${insight.icon === '🚨' ? 'text-red-300' : 'text-yellow-300'}`}>
                    {insight.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{insight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {strengths.length === 0 && weaknesses.length === 0 && classes.length > 0 && (
        <div className="text-center text-slate-500 text-xs py-4">
          Ajoutez plus de classes pour voir les forces et faiblesses de votre composition.
        </div>
      )}
    </div>
  );
}
