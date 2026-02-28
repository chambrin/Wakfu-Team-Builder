import { useMemo } from 'react';
import { CLASS_MAP } from '../data/classes';
import { SYNERGY_BONUSES } from '../data/synergies';
import type {
  TeamCoverage,
  SynergyBonus,
  TeamWarning,
  WakfuClass,
  SlotState,
  TeamProvides,
  TeamInsight,
} from '../types';

/** Fusionne les provides de base de la classe avec ceux du playstyle sélectionné */
export function getEffectiveProvides(slot: SlotState, cls: WakfuClass): TeamProvides {
  if (!slot.playstyleId) return cls.provides;
  const playstyle = cls.playstyles.find((p) => p.id === slot.playstyleId);
  if (!playstyle) return cls.provides;
  return { ...cls.provides, ...playstyle.provides };
}

export function useTeamAnalysis(slots: SlotState[]) {
  return useMemo(() => {
    const resolvedSlots = slots
      .filter((s): s is SlotState & { classId: string } => s.classId !== null)
      .map((s) => {
        const cls = CLASS_MAP.get(s.classId);
        if (!cls) return null;
        return { slot: s, cls, provides: getEffectiveProvides(s, cls) };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const classes = resolvedSlots.map((r) => r.cls);
    const classIds = resolvedSlots.map((r) => r.slot.classId);
    const classIdSet = new Set(classIds);

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

    for (const { provides } of resolvedSlots) {
      if (provides.tank) coverage.tank++;
      if (provides.heal) coverage.heal++;
      if (provides.armor) coverage.armor++;
      if (provides.removeRes) coverage.removeRes++;
      if (provides.placement) coverage.placement++;
      if (provides.buffPA) coverage.buffPA++;
      if (provides.controlePM) coverage.controlePM++;
      if (provides.dptMelee) coverage.dptMelee++;
      if (provides.dptDistance) coverage.dptDistance++;
    }

    const activeSynergies: SynergyBonus[] = SYNERGY_BONUSES.filter((synergy) =>
      synergy.classes.every((id) => classIdSet.has(id))
    );

    const warnings: TeamWarning[] = [];
    const teamSize = classes.length;

    if (teamSize === 0) {
      warnings.push({ type: 'info', message: 'Ajoutez des classes pour commencer à construire votre team.' });
      return { coverage, activeSynergies, warnings, score: 0, teamSize, insights: [] };
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
      warnings.push({ type: 'warning', message: '⚠️ Pas de retrait de résistances — vos DPT seront moins efficaces en haut niveau.' });
    }
    if (coverage.armor === 0 && teamSize >= 4) {
      warnings.push({ type: 'warning', message: "⚠️ Pas de génération d'armures — l'équipe est plus exposée aux dégâts bruts." });
    }
    if (coverage.placement === 0 && teamSize >= 4) {
      warnings.push({ type: 'warning', message: '⚠️ Pas de placeur dédié — manque de synergies de placement (backstab, dos, etc.).' });
    }
    if (coverage.dptMelee > 0 && coverage.dptDistance === 0 && teamSize >= 4) {
      warnings.push({ type: 'warning', message: '⚠️ Uniquement DPT mêlée — certaines mécaniques de boss peuvent poser problème.' });
    }
    if (coverage.dptDistance > 0 && coverage.dptMelee === 0 && teamSize >= 4) {
      warnings.push({ type: 'warning', message: '⚠️ Uniquement DPT distance — certains boss obligent à être adjacent.' });
    }
    if (coverage.tank >= 2 && teamSize <= 4) {
      warnings.push({ type: 'info', message: '💡 Double tank en équipe réduite — envisagez un DPT supplémentaire.' });
    }

    const seen = new Set<string>();
    let hasDuplicate = false;
    for (const id of classIds) {
      if (seen.has(id)) { hasDuplicate = true; break; }
      seen.add(id);
    }
    if (hasDuplicate) {
      warnings.push({ type: 'warning', message: "⚠️ Doublon de classe — deux classes identiques = gaspillage d'un slot en général." });
    }

    // --- Team Insights (forces & faiblesses dynamiques) ---
    const insights: TeamInsight[] = [];
    const hasPandawa = classIdSet.has('pandawa');
    const hasSram = classIdSet.has('sram');
    const hasEliotrope = classIdSet.has('eliotrope');
    const hasZobal = classIdSet.has('zobal');
    const hasOsamodas = classIdSet.has('osamodas');
    const hasXelor = classIdSet.has('xelor');
    const hasRoublard = classIdSet.has('roublard');
    const hasFeca = classIdSet.has('feca');
    const hasIop = classIdSet.has('iop');
    const hasCra = classIdSet.has('cra');
    const hasSacrieur = classIdSet.has('sacrieur');
    const hasEniripsa = classIdSet.has('eniripsa');
    const hasHuppermage = classIdSet.has('huppermage');

    // FORCES
    if (coverage.tank > 0 && coverage.heal > 0) {
      insights.push({
        type: 'strength', icon: '🛡️', title: 'Noyau défensif solide',
        description: 'Tank + Healer garantit la survie dans tous les contenus PvM.',
      });
    }
    const hasPlaceur = hasPandawa || hasEliotrope || (hasSacrieur && classIds.includes('sacrieur'));
    const hasDptDos = hasSram || hasIop || classIdSet.has('ouginak');
    if (hasPlaceur && hasDptDos && coverage.placement > 0) {
      insights.push({
        type: 'strength', icon: '🎯', title: 'Backstab / Placement optimisé',
        description: 'Le placeur expose le dos des ennemis aux DPT mêlée — multiplicateur de dégâts massif.',
      });
    }
    if (coverage.buffPA > 0) {
      insights.push({
        type: 'strength', icon: '⚡', title: 'Boost de PA actif',
        description: 'Les DPT ont des PA supplémentaires chaque tour — plus de sorts, plus de dégâts.',
      });
    }
    if (coverage.removeRes > 0 && totalDpt > 0) {
      insights.push({
        type: 'strength', icon: '💥', title: 'DPT amplifiés',
        description: 'Retrait de résistances ennemies → vos DPT infligent plus de dégâts sans équipement supplémentaire.',
      });
    }
    if (coverage.dptMelee > 0 && coverage.dptDistance > 0) {
      insights.push({
        type: 'strength', icon: '⚔️', title: 'Couverture mêlée + distance',
        description: 'L\'équipe s\'adapte aux mécaniques de boss qui bloquent la portée ou le corps-à-corps.',
      });
    }
    if (coverage.armor > 0) {
      insights.push({
        type: 'strength', icon: '🔮', title: 'Armures d\'équipe',
        description: 'Des Barrières/armures supplémentaires réduisent les dégâts bruts sur l\'équipe entière.',
      });
    }
    if (coverage.controlePM > 0) {
      insights.push({
        type: 'strength', icon: '🔗', title: 'Entrave PM ennemie',
        description: 'Les ennemis ont moins de PM — restent exposés aux DPT sans pouvoir fuir ou attaquer.',
      });
    }
    if (hasOsamodas && hasXelor) {
      insights.push({
        type: 'strength', icon: '🌟', title: 'Combo PA maximal',
        description: 'Osamodas + Xelor = double manipulation PA pour des rotations dévastatrices.',
      });
    }
    if (hasPandawa && hasSram) {
      insights.push({
        type: 'strength', icon: '🗡️', title: 'Machine à backstab',
        description: 'Pandawa place dos, Sram backstab en boucle — DPT monocible parmi les plus élevés.',
      });
    }
    if (hasZobal && (hasIop || hasCra || hasSram)) {
      insights.push({
        type: 'strength', icon: '💪', title: 'Buffs DI actifs',
        description: 'Zobal amplifie les Dégâts Infligés de tous les DPT en zone simultanément.',
      });
    }
    if (hasEniripsa && hasSacrieur) {
      insights.push({
        type: 'strength', icon: '🩸', title: 'Duo Berserk sécurisé',
        description: 'Eniripsa maintient le Sacrieur dans sa zone berserk optimale sans le laisser mourir.',
      });
    }
    if (coverage.tank >= 2 && coverage.heal > 0 && coverage.armor > 0) {
      insights.push({
        type: 'strength', icon: '🏰', title: 'Survie maximale',
        description: 'Double tank + healer + armures = composition quasi infaillible en haut stasis.',
      });
    }
    if (activeSynergies.filter((s) => s.strength === 'high').length >= 3) {
      insights.push({
        type: 'strength', icon: '✨', title: 'Nombreuses synergies',
        description: `${activeSynergies.length} synergies actives dont ${activeSynergies.filter(s => s.strength === 'high').length} majeures.`,
      });
    }

    // FAIBLESSES
    if (coverage.tank === 0 && teamSize >= 2) {
      insights.push({
        type: 'weakness', icon: '🚨', title: 'Pas de tank',
        description: 'Aucun frontliner pour encaisser — fragile face aux boss et groupes de monstres.',
      });
    }
    if (coverage.heal === 0 && teamSize >= 2) {
      insights.push({
        type: 'weakness', icon: '🚨', title: 'Pas de healer',
        description: 'Sustain nul — les pertes en PV en combat sont permanentes.',
      });
    }
    if (totalDpt === 0 && teamSize >= 3) {
      insights.push({
        type: 'weakness', icon: '🚨', title: 'Aucun DPT efficace',
        description: 'Impossible de terminer les combats rapidement sans DPT spécialisé.',
      });
    }
    if (hasSram && !hasPandawa && !hasEliotrope && !hasZobal) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Sram sans placeur',
        description: 'Le Sram a besoin d\'un placeur (Pandawa, Eliotrope, Zobal) pour accéder au dos des ennemis.',
      });
    }
    if (hasRoublard && !hasPandawa && !hasFeca && teamSize >= 3) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Roublard sans setup',
        description: 'Pandawa ou Féca est nécessaire pour immobiliser les cibles sur les bombes.',
      });
    }
    if (hasHuppermage && teamSize >= 4 && !hasOsamodas && !hasXelor) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Huppermage sans buff PA',
        description: 'L\'Huppermage a besoin de PA supplémentaires pour compléter ses combos élémentaires en un tour.',
      });
    }
    const advancedCount = classes.filter((c) => c.complexity === 'advanced').length;
    if (advancedCount >= 2) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Équipe très exigeante',
        description: `${advancedCount} classes avancées — demande une excellente maîtrise pour être pleinement efficace.`,
      });
    }
    if (coverage.dptMelee > 0 && coverage.dptDistance === 0 && teamSize >= 4) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Uniquement DPT mêlée',
        description: 'Certains boss empêchent l\'approche au contact — DPT bloqués par des mécaniques de terrain.',
      });
    }
    if (coverage.dptDistance > 0 && coverage.dptMelee === 0 && teamSize >= 4) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Uniquement DPT distance',
        description: 'Certains boss obligent à être adjacent — DPT distance pénalisés ou inutilisables.',
      });
    }
    if (coverage.tank >= 2 && totalDpt <= 1 && teamSize >= 5) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Trop défensif',
        description: 'Double tank sans assez de DPT = farm très lent et combats interminables.',
      });
    }
    if (hasDuplicate) {
      insights.push({
        type: 'weakness', icon: '⚠️', title: 'Doublon de classe',
        description: 'Deux classes identiques = redondance — un slot pourrait couvrir un rôle manquant.',
      });
    }

    // Score
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
    score = Math.min(score, 100);

    return { coverage, activeSynergies, warnings, score, teamSize, insights };
  }, [slots]);
}
