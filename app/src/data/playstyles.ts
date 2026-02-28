import type { ClassPlaystyle } from '../types';

export const CLASS_PLAYSTYLES: Record<string, ClassPlaystyle[]> = {
  iop: [
    {
      id: 'melee-mono',
      name: 'Mêlée Burst Mono',
      description: 'Sorts monocibles à fort ratio, gros PA/PW sur une cible prioritaire. Cherche le dos quand possible.',
      provides: {},
      strengthPoints: ['DPT monocible très élevé sur une cible prioritaire', 'Idéal pour descendre un boss en quelques tours'],
      weaknessPoints: ['S\'expose en mêlée, nécessite un tank devant', 'Peu efficace contre plusieurs cibles simultanées'],
    },
    {
      id: 'melee-zone',
      name: 'Mêlée Zone Farm',
      description: 'Sorts en croix/ligne pour frapper plusieurs ennemis, très efficace pour nettoyer des packs.',
      provides: {},
      strengthPoints: ['Nettoie rapidement les packs de monstres', 'Excellent pour le farm et les vagues'],
      weaknessPoints: ['Moins efficace sur boss monocible', 'Toujours exposé au contact'],
    },
  ],

  cra: [
    {
      id: 'distance-mono-crit',
      name: 'Distance Monocible Critique',
      description: 'Focus sur flèches mono + critiques depuis longue portée. Cherche le dos via balises.',
      provides: {},
      strengthPoints: ['Burst monocible élevé depuis une position sécurisée', 'Très bon en bossing'],
      weaknessPoints: ['Dépendant de la ligne de vue', 'Fragile si les ennemis le rejoignent'],
    },
    {
      id: 'distance-zone',
      name: 'Distance Zone Farm',
      description: 'Abuse des flèches de zone sur balises pour nettoyer des packs. Maîtrises distance + zone.',
      provides: {},
      strengthPoints: ['Nettoie rapidement les groupes d\'ennemis', 'Excellent pour l\'XP et les donjons à vagues'],
      weaknessPoints: ['Moins efficace en bossing monocible pur', 'Ligne de vue toujours requise'],
    },
    {
      id: 'utilitaire-entrave',
      name: 'Utilitaire + Entrave PM',
      description: 'Garde quelques sorts de retrait PM/PO pour sécuriser les combats tout en restant DPT distance.',
      provides: { controlePM: true },
      strengthPoints: ['DPT distance + contrôle PM léger — double contribution', 'Sécurise les combats HL'],
      weaknessPoints: ['DPT légèrement réduit par l\'investissement utilitaire'],
    },
  ],

  feca: [
    {
      id: 'tank-barriere',
      name: 'Tank Barrière',
      description: 'Génération massive de Barrière pour l\'équipe entière. Priorité résistances + PV + Parade.',
      provides: {},
      strengthPoints: ['Génère des Barrières massives protégeant toute l\'équipe', 'Meilleure survie du jeu en contenu HL'],
      weaknessPoints: ['DPT offensif négligeable', 'Moins utile si l\'équipe prend peu de dégâts'],
    },
    {
      id: 'tank-glyphes',
      name: 'Tank Glyphes',
      description: 'Contrôle de zone via glyphes offensifs/défensifs, placement agressif, réduction de dégâts.',
      provides: { controlePM: true },
      strengthPoints: ['Contrôle terrain + protection équipe', 'Glyphes défensifs et offensifs très polyvalents'],
      weaknessPoints: ['Requiert une bonne coordination de placement avec l\'équipe'],
    },
  ],

  sacrieur: [
    {
      id: 'tank-armure-brulante',
      name: 'Tank Armure Brûlante',
      description: 'Joue bas en PV pour booster dégâts ET mécanismes défensifs. Génère de l\'armure via Retour de Flamme.',
      provides: { tank: true, dptMelee: true, armor: true },
      strengthPoints: ['Double rôle tank + DPT berserk avec armures', 'Très efficace avec un healer qui maintient les PV bas'],
      weaknessPoints: ['Gestion des PV complexe — ni trop haut ni trop bas', 'Dépendant du healer pour rester en zone berserk'],
    },
    {
      id: 'dpt-berserk',
      name: 'DPT Berserk Pur',
      description: 'S\'auto-inflige des dégâts pour descendre vite en PV et profiter de multiplicateurs berserk massifs.',
      provides: { tank: false, dptMelee: true },
      strengthPoints: ['DPT mêlée explosif à bas PV — très dangereux', 'Fort multiplicateur berserk = gros tours de dégâts'],
      weaknessPoints: ['Très fragile — dépendant du healer pour rester en vie', 'Pas de contribution défensive pour l\'équipe'],
    },
    {
      id: 'placeur-mobilite',
      name: 'Placeur / Mobilité',
      description: 'Abuse des sorts de déplacement pour replacer alliés/ennemis, contrôle de mobilité via passifs.',
      provides: { tank: false, dptMelee: true, placement: true, controlePM: true },
      strengthPoints: ['Placement secondaire utile + contrôle PM via passifs', 'Grande mobilité pour accéder aux cibles'],
      weaknessPoints: ['DPT inférieur au build berserk pur', 'Rôle de placeur secondaire — Pandawa reste meilleur'],
    },
  ],

  pandawa: [
    {
      id: 'tank-placeur',
      name: 'Tank / Placeur',
      description: 'Tank principal + placement des ennemis (Porter/Lancer). Priorité résistances + PV + tacle.',
      provides: {},
      strengthPoints: ['Meilleur placeur du jeu + tank solide en un seul slot', 'Expose le dos des ennemis aux DPT'],
      weaknessPoints: ['Aucun soin — un healer dédié est indispensable'],
    },
    {
      id: 'tank-off-heal',
      name: 'Tank / Off-Heal',
      description: 'Garde placement et tankiness tout en apportant un soin léger, nettoyage d\'états et buffs défensifs.',
      provides: { heal: true },
      strengthPoints: ['Soin léger en plus du placement — très utile en petite équipe', 'Peut remplacer partiellement un healer dédié'],
      weaknessPoints: ['Soin insuffisant pour un contenu très difficile', 'Moins efficace que l\'archétype tank/placeur pur'],
    },
  ],

  eniripsa: [
    {
      id: 'full-heal',
      name: 'Full Heal',
      description: 'Maximum de maîtrise soin pour des soins directs massifs et de zone. Indispensable en haut stasis.',
      provides: { dptDistance: false },
      strengthPoints: ['Soin le plus élevé du jeu — l\'équipe survit à tout', 'Soins de zone ET ciblés selon les besoins'],
      weaknessPoints: ['DPT personnel nul — contribution offensive inexistante'],
    },
    {
      id: 'support-offensif',
      name: 'Support Offensif',
      description: 'Joue plus agressif avec des sorts à dégâts corrects tout en conservant un kit heal suffisant.',
      provides: { dptDistance: true },
      strengthPoints: ['Cumule soins ET dégâts — utile pour les teams en manque de DPT', 'Plus dynamique à jouer'],
      weaknessPoints: ['Soins moins puissants que le full heal', 'Compromis à bien gérer'],
    },
  ],

  osamodas: [
    {
      id: 'support-buffeur',
      name: 'Support / Buffeur',
      description: 'Focus sur buffs PA/DI et retrait résistances, invocations utilitaires. DPT personnel secondaire.',
      provides: { dptMelee: false },
      strengthPoints: ['Buff PA + retrait résistances = boost massif pour tous les DPT', 'Invocations peuvent tanker ou bloquer des couloirs'],
      weaknessPoints: ['DPT personnel faible — contribution offensive via créatures seulement'],
    },
    {
      id: 'dpt-invocs',
      name: 'DPT + Invocations',
      description: 'Frappe lui-même en plus de ses créatures, maîtrise d\'invocation élevée via équipement.',
      provides: { dptMelee: true },
      strengthPoints: ['Cumule DPT direct + DPT via créatures + support PA/retrait rés', 'Très polyvalent en combat'],
      weaknessPoints: ['Gestion des invocations chronophage sur des combats complexes'],
    },
  ],

  sadida: [
    {
      id: 'soutien-heal',
      name: 'Soutien / Heal Poupées',
      description: 'Invoque différentes poupées (soin, tank, dégâts), propage soins/poisons, maintient l\'équipe en vie.',
      provides: {},
      strengthPoints: ['Soin de zone + contrôle terrain + retrait résistances en un slot', 'Très flexible selon les types de poupées invoquées'],
      weaknessPoints: ['Poupées peuvent gêner le placement allié si mal positionnées', 'DPT direct limité'],
    },
    {
      id: 'entrave-controle',
      name: 'Entrave / Contrôle',
      description: 'Mise en avant du retrait PM, malus résistances, état Infecté sur de nombreux ennemis.',
      provides: { heal: false, dptDistance: true },
      strengthPoints: ['Entrave PM forte + retrait résistances + DPT zone — contrôle total', 'Très efficace contre les mobs très mobiles'],
      weaknessPoints: ['Aucun soin dans ce mode — un healer dédié est indispensable'],
    },
  ],

  xelor: [
    {
      id: 'dpt-controle-pa',
      name: 'DPT Distance / Contrôle PA',
      description: 'Burst distance via horloges/cadran tout en retirant des PA aux cibles prioritaires.',
      provides: { buffPA: false },
      strengthPoints: ['DPT distance élevé + retrait PA = contrôle très puissant', 'Les ennemis font moins d\'actions par tour'],
      weaknessPoints: ['Pas de buff PA pour les alliés dans ce mode', 'Mécaniques d\'horloges complexes'],
    },
    {
      id: 'support-pa',
      name: 'Support PA / Utilitaire',
      description: 'Construit pour donner des PA aux alliés clés et manipuler la timeline. DPT personnel secondaire.',
      provides: { dptDistance: false, buffPA: true },
      strengthPoints: ['Donne des PA aux alliés — un DPT peut faire un sort de plus par tour', 'Manipulation de la timeline pour des rotations optimisées'],
      weaknessPoints: ['DPT personnel sacrifié pour le support', 'Moins utile si les alliés n\'ont pas de sorts chers'],
    },
    {
      id: 'hybride-dpt-support',
      name: 'Hybride DPT / Support',
      description: 'Cumule dégâts distance élevés ET buffs PA pour les alliés. Le plus complet mais le plus complexe.',
      provides: { dptDistance: true, buffPA: true },
      strengthPoints: ['Cumule DPT distance ET buffs PA — contribution maximale', 'L\'un des profils les plus puissants en mains expertes'],
      weaknessPoints: ['Extrêmement complexe — courbe d\'apprentissage longue', 'Punitif si les rotations ne sont pas optimisées'],
    },
  ],

  enutrof: [
    {
      id: 'entrave-pm',
      name: 'Entrave PM Pur',
      description: 'Maximum de retrait PM pour immobiliser totalement les ennemis. Idéal contre mobs très mobiles.',
      provides: { dptDistance: false },
      strengthPoints: ['Immobilise les ennemis — ils restent exposés aux DPT', 'Contrôle de mobilité unique dans les compositions'],
      weaknessPoints: ['DPT faible, moins utile contre les boss avec peu de PM', 'Rôle très spécialisé'],
    },
    {
      id: 'dpt-farm',
      name: 'DPT Distance / Farm',
      description: 'Combine dégâts distance avec entrave légère et passifs de drop pour le farm optimal.',
      provides: { dptDistance: true },
      strengthPoints: ['Combine DPT + entrave + bonus de drop pour le farm économique', 'Plus polyvalent que l\'entrave pure'],
      weaknessPoints: ['Entrave moins prononcée que le build pur', 'Drop bonus peu utile en contenu HL'],
    },
  ],

  sram: [
    {
      id: 'assassin-dos',
      name: 'Assassin Dos / Backstab',
      description: 'Cherche systématiquement le dos via invisibilité. Burst monocible massif avec maîtrise dos.',
      provides: {},
      strengthPoints: ['DPT mêlée dos parmi les plus élevés du jeu', 'Invisibilité pour se repositionner sans risque'],
      weaknessPoints: ['Requiert un placeur dédié (Pandawa) pour être pleinement efficace', 'DPT s\'effondre sans accès au dos'],
    },
    {
      id: 'off-tank-esquive',
      name: 'Off-Tank Esquive',
      description: 'Combine DPT dos et survie via haute esquive, vol de vie. Plus autonome mais DPT réduit.',
      provides: { tank: true },
      strengthPoints: ['DPT dos + tankiness — peut absorber des dégâts en off-tank', 'Plus autonome, nécessite moins de protection'],
      weaknessPoints: ['DPT inférieur au build assassin pur', 'Off-tank moins efficace que Féca ou Pandawa'],
    },
  ],

  ecaflip: [
    {
      id: 'dpt-crit',
      name: 'DPT Mêlée Critique',
      description: 'Enchaîne les sorts à forte variance et critiques. Bons dégâts moyens grâce aux CC fréquents.',
      provides: {},
      strengthPoints: ['DPT élevé grâce aux critiques très fréquents', 'Sorts avec effets bonus puissants sur CC'],
      weaknessPoints: ['Variance aléatoire — certains tours peuvent être décevants', 'Peu prévisible en comparaison d\'un Iop ou Cra'],
    },
    {
      id: 'hybride-dpt-soin',
      name: 'Hybride DPT / Soin',
      description: 'Branche Eau combinée avec Feu/Terre pour soigner les alliés tout en infligeant des dégâts.',
      provides: { heal: true },
      strengthPoints: ['Combine dégâts ET soin léger (vol de vie) — très flexible', 'Peut maintenir un peu de sustain sans slot healer dédié'],
      weaknessPoints: ['Ni DPT maximal ni soin suffisant pour remplacer un vrai healer', 'Variance du hasard toujours présente'],
    },
  ],

  zobal: [
    {
      id: 'support-armure',
      name: 'Support Armure / Buffs',
      description: 'Masque Noble prioritaire : armures, soins, buffs DI + retrait résistances. Support pur maximal.',
      provides: { dptMelee: false },
      strengthPoints: ['Support le plus complet du jeu : soins + armures + buffs DI + retrait rés', 'Un seul slot couvre 4 rôles de soutien'],
      weaknessPoints: ['DPT personnel faible en mode support pur'],
    },
    {
      id: 'dpt-support',
      name: 'DPT Mêlée + Support',
      description: 'Alterne Masque Psychopathe (DPT) et Noble (support). Frappe fort ET soutient l\'équipe.',
      provides: { dptMelee: true },
      strengthPoints: ['Cumule DPT mêlée ET soutien complet — très polyvalent', 'Profite de ses propres buffs DI pour ses dégâts'],
      weaknessPoints: ['Deck plus difficile à équilibrer pour couvrir les deux rôles'],
    },
  ],

  roublard: [
    {
      id: 'bombes-zone',
      name: 'Bombes Zone',
      description: 'Pose un réseau de bombes, les booste puis déclenche des explosions en chaîne pour un burst massif.',
      provides: {},
      strengthPoints: ['Burst de zone astronomique quand les bombes sont bien positionnées', 'Chaînes d\'explosion = dégâts exponentiels'],
      weaknessPoints: ['Plusieurs tours de setup avant de burst', 'Très dépendant du placeur (Pandawa/Féca) pour immobiliser les cibles'],
    },
    {
      id: 'fourbe-fuyard',
      name: 'Fourbe / Fuyard Direct',
      description: 'Joue sur les états mêlée/distance et sorts directs (Dynamite, etc.) sans dépendre uniquement des bombes.',
      provides: {},
      strengthPoints: ['DPT plus constant et moins dépendant du setup', 'Plus flexible dans les donjons complexes'],
      weaknessPoints: ['Dégâts inférieurs au plein potentiel bombes en chaîne', 'Perd une partie du potentiel burst unique de la classe'],
    },
  ],

  ouginak: [
    {
      id: 'dpt-transformation',
      name: 'DPT Mêlée / Transformation',
      description: 'Accumule de la Rage pour déclencher des transformations et des combos prolongés en mêlée.',
      provides: {},
      strengthPoints: ['DPT mêlée explosif en transformation — mobilité extrême', 'Peut chasser n\'importe quelle cible sur le terrain'],
      weaknessPoints: ['Fragile hors transformation', 'Dépendant du placeur pour le dos en bossing'],
    },
    {
      id: 'bruiser-off-tank',
      name: 'Bruiser / Off-Tank',
      description: 'Investit dans résistances + PV pour tenir en mêlée et encaisser quand le vrai tank est occupé.',
      provides: { tank: true },
      strengthPoints: ['DPT mêlée + tankiness — peut absorber des dégâts en off-tank', 'Très collant — empêche les ennemis de fuir'],
      weaknessPoints: ['DPT inférieur au build transformation pur', 'Off-tank moins efficace qu\'un vrai tank'],
    },
  ],

  huppermage: [
    {
      id: 'dpt-distance',
      name: 'DPT Distance (Lumière)',
      description: 'Génère et consomme des runes pour booster ses dégâts, joue à distance sur 4 éléments.',
      provides: { dptMelee: false },
      strengthPoints: ['DPT distance sur 4 éléments — passe toujours les résistances ennemies', 'Très flexible face aux différents types d\'ennemis'],
      weaknessPoints: ['Combos élémentaires complexes à exécuter correctement'],
    },
    {
      id: 'melee-bruiser',
      name: 'Mêlée Bruiser',
      description: 'Profite d\'armures et de déplacements via runes pour jouer proche des ennemis.',
      provides: { dptMelee: true, dptDistance: false },
      strengthPoints: ['DPT mêlée avec armures passives pour tenir au contact', 'Surprenant et difficile à anticiper'],
      weaknessPoints: ['Encore plus complexe que la version distance', 'Moins efficace si mal positionné'],
    },
    {
      id: 'support-entrave',
      name: 'Support / Entrave',
      description: 'Utilise les voies Terre/Eau/Air pour armures, soins et entraves PA/PM plutôt que le DPT pur.',
      provides: { dptMelee: false, dptDistance: false, removeRes: true, controlePM: true, heal: true },
      strengthPoints: ['Apporte soins + armures + entrave PA/PM — support de niche polyvalent', 'Comble un manque dans des compos spécifiques'],
      weaknessPoints: ['DPT sacrifié — slot DPT mal exploité si d\'autres classes peuvent jouer ce rôle'],
    },
  ],

  eliotrope: [
    {
      id: 'dpt-distance-portails',
      name: 'DPT Distance via Portails',
      description: 'Place des portails pour frapper à travers la map depuis une position sécurisée.',
      provides: {},
      strengthPoints: ['DPT distance très élevé + placement secondaire via portails', 'Peut frapper depuis n\'importe où sur la map'],
      weaknessPoints: ['Efficacité dépend du terrain — certains donjons peu adaptés aux portails'],
    },
    {
      id: 'melee-mobile',
      name: 'Mêlée Mobile',
      description: 'Utilise les portails pour dash en mêlée, sortir rapidement, ultra explosif mais exigeant.',
      provides: { dptMelee: true, dptDistance: false },
      strengthPoints: ['DPT mêlée explosif avec mobilité inégalée via portails', 'Très difficile à kiter ou à cibler'],
      weaknessPoints: ['Extrêmement exigeant à jouer', 'Risqué si les portails sont mal positionnés'],
    },
  ],

  steamer: [
    {
      id: 'dpt-stasis',
      name: 'DPT Distance Stasis',
      description: 'Joue avec la tourelle + voie Stasis pour des dégâts neutres ignorant les résistances ennemies.',
      provides: { tank: false, armor: false },
      strengthPoints: ['Dégâts Stasis constants qui ignorent les résistances ennemies', 'Tourelle comme DPT automatique supplémentaire'],
      weaknessPoints: ['Pas d\'armures pour l\'équipe dans ce mode', 'Tourelle à protéger et à positionner'],
    },
    {
      id: 'tank-armure',
      name: 'Tank / Armure',
      description: 'Utilise la tourelle pour générer des armures et protéger une zone défensive.',
      provides: { dptDistance: false, tank: true, armor: true },
      strengthPoints: ['Génère des armures via tourelle pour protéger toute l\'équipe', 'Alternative à Féca avec un profil zone fixe'],
      weaknessPoints: ['DPT personnel sacrifié pour la défense', 'Tourelle doit être bien placée pour être efficace'],
    },
    {
      id: 'hybride-dpt-support',
      name: 'Hybride DPT / Armures',
      description: 'Cumule DPT Stasis ET génération d\'armures — très précieux pour les teams distance.',
      provides: { dptDistance: true, tank: false, armor: true },
      strengthPoints: ['Cumule DPT Stasis ET armures — doublement précieux pour teams distance', 'Bon compromis offensif/défensif'],
      weaknessPoints: ['Moins optimal sur chaque aspect que les builds spécialisés'],
    },
  ],
};
