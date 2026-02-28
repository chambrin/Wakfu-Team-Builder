import type { PresetTeam } from '../types';

export const PRESETS: PresetTeam[] = [
  {
    name: 'Équilibrée Standard',
    emoji: '🟢',
    description: 'Idéale pour débuter en multicompte — aborde la quasi-totalité des donjons',
    strengths: 'Couverture complète de tous les rôles, très stable, accessible',
    weaknesses: 'Légèrement lente en farm brut (2 tanks)',
    slots: ['pandawa', 'feca', 'iop', 'cra', 'eniripsa', 'zobal'],
  },
  {
    name: 'Farm Rapide',
    emoji: '🔥',
    description: 'Optimisée pour nettoyer rapidement des zones de monstres',
    strengths: '2 DPT zone puissants + buffs PA/retrait rés = farm ultra-rapide',
    weaknesses: 'Moins de tank pur — vulnérable sur contenus très difficiles',
    slots: ['pandawa', 'iop', 'huppermage', 'zobal', 'osamodas', 'sadida'],
  },
  {
    name: 'Très Safe (Haut Stasis)',
    emoji: '🛡️',
    description: 'Pour les donjons les plus exigeants du jeu',
    strengths: 'Double tank + healer pur + Osamodas = survie maximale',
    weaknesses: "Plus lente en clear — optimisée pour la stabilité, pas la vitesse",
    slots: ['pandawa', 'feca', 'cra', 'iop', 'eniripsa', 'osamodas'],
  },
  {
    name: 'Burst Bossing',
    emoji: '⚡',
    description: 'Pour maximiser les dégâts sur les boss monocible',
    strengths: 'Pandawa place dos → Sram + Eliotrope exploitent les multiplicateurs',
    weaknesses: 'Moins efficace en farm de zone, très dépendant du placement',
    slots: ['pandawa', 'sram', 'eliotrope', 'zobal', 'osamodas', 'eniripsa'],
  },
];
