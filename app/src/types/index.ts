export type RoleId =
  | 'dpt-melee'
  | 'dpt-distance'
  | 'dpt-hybrid'
  | 'tank'
  | 'healer'
  | 'support'
  | 'placeur'
  | 'controle';

export type Complexity = 'beginner' | 'intermediate' | 'advanced';

export interface TeamProvides {
  tank: boolean;
  heal: boolean;
  armor: boolean;
  removeRes: boolean;
  placement: boolean;
  buffPA: boolean;
  controlePM: boolean;
  dptMelee: boolean;
  dptDistance: boolean;
}

export interface Mechanic {
  name: string;
  description: string;
}

export interface Build {
  name: string;
  description: string;
}

export interface Synergy {
  classId: string;
  reason: string;
}

/** Un playstyle représente une façon de jouer la classe avec ses propres apports à l'équipe */
export interface ClassPlaystyle {
  id: string;
  name: string;
  description: string;
  /** Surcharge partielle des provides de base de la classe */
  provides: Partial<TeamProvides>;
  /** Points forts spécifiques à ce playstyle */
  strengthPoints: string[];
  /** Points faibles spécifiques à ce playstyle */
  weaknessPoints: string[];
}

export interface WakfuClass {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  primaryRole: RoleId;
  secondaryRoles: RoleId[];
  complexity: Complexity;
  style: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  mechanics: Mechanic[];
  builds: Build[];
  synergies: Synergy[];
  /** Provides par défaut (premier playstyle) */
  provides: TeamProvides;
  alternatives: string[];
  tier: string;
  /** Différents modes de jeu avec leurs apports spécifiques */
  playstyles: ClassPlaystyle[];
}

/** État d'un slot de l'équipe */
export interface SlotState {
  classId: string | null;
  playstyleId: string | null;
}

export interface PresetTeam {
  name: string;
  emoji: string;
  description: string;
  strengths: string;
  weaknesses: string;
  slots: (string | null)[];
}

export interface TeamCoverage {
  tank: number;
  heal: number;
  armor: number;
  removeRes: number;
  placement: number;
  buffPA: number;
  controlePM: number;
  dptMelee: number;
  dptDistance: number;
}

export interface SynergyBonus {
  classes: string[];
  description: string;
  strength: 'high' | 'medium' | 'low';
}

export interface TeamWarning {
  type: 'error' | 'warning' | 'info';
  message: string;
}

/** Force ou faiblesse calculée dynamiquement pour l'équipe */
export interface TeamInsight {
  type: 'strength' | 'weakness';
  icon: string;
  title: string;
  description: string;
}
