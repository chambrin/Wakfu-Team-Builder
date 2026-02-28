import { useMemo } from 'react';
import { CLASS_MAP } from '../data/classes';
import { SYNERGY_BONUSES } from '../data/synergies';
import type { TeamCoverage, SynergyBonus, TeamWarning, WakfuClass } from '../types';

export function useTeamAnalysis(slotClassIds: (string | null)[]) {
  return useMemo(() => {
    const classes = slotClassIds
      .filter((id): id is string => id !== null)
      .map((id) => CLASS_MAP.get(id))
      .filter((c): c is WakfuClass => c !== undefined);

    const coverage: TeamCoverage = {
      tank: 0,
      heal: 0,
      armor: 0,
      removeRes: 0,
      placement: 0,
      buffPA: 0,
      controlePM: 0,
      dptMelee: 0,
      dptDistance: 0,
    };

    for (const cls of classes) {
      if (cls.provides.tank) coverage.tank++;
      if (cls.provides.heal) coverage.heal++;
      if (cls.provides.armor) coverage.armor++;
      if (cls.provides.removeRes) coverage.removeRes++;
      if (cls.provides.placement) coverage.placement++;
      if (cls.provides.buffPA) coverage.buffPA++;
      if (cls.provides.controlePM) coverage.controlePM++;
      if (cls.provides.dptMelee) coverage.dptMelee++;
      if (cls.provides.dptDistance) coverage.dptDistance++;
    }

    const classIdSet = new Set(slotClassIds.filter((id): id is string => id !== null));

    const activeSynergies: SynergyBonus[] = SYNERGY_BONUSES.filter((synergy) => {
      return synergy.classes.every((id) => classIdSet.has(id));
    });

    const warnings: TeamWarning[] = [];
    const teamSize = classes.length;

    if (teamSize === 0) {
      warnings.push({ type: 'info', message: 'Ajoutez des classes pour commencer à construire votre team.' });
      return { coverage, activeSynergies, warnings, score: 0, teamSize };
    }

    if (coverage.tank === 0) {
      warnings.push({ type: 'error', message: '❌ Aucun tank — votre équipe mourra rapidement en contenu difficile.' });
    }

    if (coverage.heal === 0) {
      warnings.push({ type: 'error', message: '❌ Aucun healer — survie compromise dès le moyen niveau.' });
    }

    const totalDpt = coverage.dptMelee + coverage.dptDistance;
    if (totalDpt === 0 && teamSize >= 2) {
      warnings.push({ type: 'error', message: '❌ Aucun DPT — impossible de tuer les ennemis efficacement.' });
    }

    if (coverage.removeRes === 0 && teamSize >= 4) {
      warnings.push({
        type: 'warning',
        message: '⚠️ Pas de retrait de résistances — vos DPT seront moins efficaces en haut niveau.',
      });
    }

    if (coverage.armor === 0 && teamSize >= 4) {
      warnings.push({
        type: 'warning',
        message: "⚠️ Pas de génération d'armures — l'équipe est plus exposée aux dégâts bruts.",
      });
    }

    if (coverage.placement === 0 && teamSize >= 4) {
      warnings.push({
        type: 'warning',
        message: '⚠️ Pas de placeur dédié — vous manquerez de synergies de placement (backstab, dos, etc.).',
      });
    }

    if (coverage.dptMelee > 0 && coverage.dptDistance === 0 && teamSize >= 4) {
      warnings.push({
        type: 'warning',
        message: '⚠️ Uniquement DPT mêlée — certains mécaniques de boss peuvent poser problème.',
      });
    }

    if (coverage.dptDistance > 0 && coverage.dptMelee === 0 && teamSize >= 4) {
      warnings.push({
        type: 'warning',
        message: '⚠️ Uniquement DPT distance — certains mécaniques de boss peuvent poser problème.',
      });
    }

    if (coverage.tank >= 2 && teamSize <= 4) {
      warnings.push({
        type: 'info',
        message: '💡 Double tank en équipe réduite — envisagez un DPT supplémentaire.',
      });
    }

    const hasDuplicate = (() => {
      const seen = new Set<string>();
      for (const id of slotClassIds) {
        if (id !== null) {
          if (seen.has(id)) return true;
          seen.add(id);
        }
      }
      return false;
    })();

    if (hasDuplicate) {
      warnings.push({
        type: 'warning',
        message: '⚠️ Doublon de classe — deux classes identiques = gaspillage d\'un slot en général.',
      });
    }

    // Score calculation
    let score = 0;
    if (coverage.tank > 0) score += 20;
    if (coverage.heal > 0) score += 20;
    if (totalDpt >= 2) score += 20;
    else if (totalDpt === 1) score += 10;
    if (coverage.removeRes > 0) score += 10;
    if (coverage.armor > 0) score += 10;
    if (coverage.placement > 0) score += 10;
    if (coverage.buffPA > 0) score += 5;
    if (activeSynergies.filter((s) => s.strength === 'high').length >= 2) score += 5;

    return { coverage, activeSynergies, warnings, score: Math.min(score, 100), teamSize };
  }, [slotClassIds]);
}
