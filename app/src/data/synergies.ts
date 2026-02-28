import type { SynergyBonus } from '../types';

export const SYNERGY_BONUSES: SynergyBonus[] = [
  {
    classes: ['pandawa', 'sram'],
    description: 'Combo légendaire : Pandawa place les ennemis dos → Sram backstab avec multiplicateur massif',
    strength: 'high',
  },
  {
    classes: ['pandawa', 'iop'],
    description: 'Pandawa expose le dos → Iop frappe au corps-à-corps avec bonus de dégâts',
    strength: 'high',
  },
  {
    classes: ['pandawa', 'cra'],
    description: 'Pandawa oriente les ennemis → Cra tire dans le dos depuis la distance',
    strength: 'high',
  },
  {
    classes: ['osamodas', 'xelor'],
    description: 'Double manipulation PA : Osamodas donne des PA + Xelor donne/retire des PA → tours ultra-optimisés',
    strength: 'high',
  },
  {
    classes: ['feca', 'eniripsa'],
    description: 'Duo survie classique : Féca absorbe avec Barrière, Eniripsa restaure les PV',
    strength: 'high',
  },
  {
    classes: ['zobal', 'cra'],
    description: 'Zobal réduit les résistances + buffs DI → le Cra fait des dégâts monstrueux',
    strength: 'high',
  },
  {
    classes: ['zobal', 'iop'],
    description: 'Buffs Dégâts Infligés du Zobal amplifient massivement le burst du Iop',
    strength: 'high',
  },
  {
    classes: ['pandawa', 'feca'],
    description: 'Double tanking : couverture défensive maximale pour les contenus haut stasis',
    strength: 'medium',
  },
  {
    classes: ['osamodas', 'iop'],
    description: 'Buffs PA de l\'Osamodas → le Iop peut lancer plus de sorts dévastateurs par tour',
    strength: 'high',
  },
  {
    classes: ['eniripsa', 'sacrieur'],
    description: 'L\'Eniripsa maintient le Sacrieur dans sa zone berserk sans le laisser mourir',
    strength: 'high',
  },
  {
    classes: ['pandawa', 'enutrof'],
    description: 'Pandawa place, Enutrof retire les PM → les ennemis sont piégés et orientés',
    strength: 'medium',
  },
  {
    classes: ['sadida', 'enutrof'],
    description: 'Double entrave PM + état infecté = contrôle total de la mobilité ennemie',
    strength: 'medium',
  },
  {
    classes: ['osamodas', 'cra'],
    description: 'Buffs PA + retrait résistances de l\'Osamodas → le Cra passe plus de flèches et fait plus de dégâts',
    strength: 'medium',
  },
  {
    classes: ['zobal', 'pandawa'],
    description: 'Combo offensif parfait : Pandawa place dos, Zobal buffs + retire résistances',
    strength: 'high',
  },
  {
    classes: ['steamer', 'cra'],
    description: 'Steamer tank couvre le Cra avec ses armures, permettant au Cra de DPT en sécurité',
    strength: 'medium',
  },
  {
    classes: ['feca', 'roublard'],
    description: 'Les glyphes du Féca immobilisent les cibles sur les bombes du Roublard',
    strength: 'medium',
  },
  {
    classes: ['huppermage', 'zobal'],
    description: 'Zobal retire les résistances → tous les éléments de l\'Huppermage font plus de dégâts',
    strength: 'medium',
  },
  {
    classes: ['osamodas', 'xelor', 'iop'],
    description: 'Triple combo PA : double buff PA → le Iop peut unleash des rotations dévastatrices',
    strength: 'high',
  },
  {
    classes: ['pandawa', 'zobal', 'sram'],
    description: 'Trio léstal : placement dos (Pandawa) + buffs/retrait rés (Zobal) + backstab (Sram)',
    strength: 'high',
  },
];
