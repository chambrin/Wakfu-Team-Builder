import type { WakfuClass } from '../types';
import { CLASS_PLAYSTYLES } from './playstyles';

export const CLASSES: WakfuClass[] = [
  {
    id: 'iop',
    name: 'Iop',
    emoji: '⚔️',
    subtitle: 'Guerrier',
    primaryRole: 'dpt-melee',
    secondaryRoles: [],
    complexity: 'beginner',
    style: 'Corps-à-corps offensif, gros tours de dégâts',
    description:
      "Le Iop est le guerrier pur de Wakfu : très offensif, capable de sortir des tours de dégâts colossaux au corps-à-corps. Gameplay direct mais avec une profondeur réelle dans l'optimisation des rotations PA/PW.",
    strengths: [
      'Dégâts mêlée parmi les plus élevés du jeu sur un tour',
      'Gameplay direct et satisfaisant',
      'Bonnes options de zone en mêlée',
      'Mobilité correcte pour atteindre les cibles',
      'Très bon en bossing monocible comme en farm de groupe',
    ],
    weaknesses: [
      "Doit se rapprocher des ennemis — exposé aux risques de mêlée",
      'Peu de défenses naturelles — dépend du tank',
      'Rotation PA/PW demande une gestion précise pour ne pas gaspiller',
      'Moins efficace à distance',
    ],
    mechanics: [
      {
        name: 'Accumulation de Puissance / PW',
        description:
          'Le Iop accumule des PW à travers ses sorts normaux, puis les dépense sur ses sorts les plus dévastateurs. La gestion de ce cycle est la clé du DPS optimal.',
      },
      {
        name: "Combos d'états",
        description:
          'Certains sorts créent des états qui modifient les effets des sorts suivants, créant des combos naturels à enchaîner.',
      },
      {
        name: 'Saut et mobilité',
        description:
          'Sorts de mobilité permettant d\'atteindre les cibles rapidement sans gaspiller de PM.',
      },
    ],
    builds: [
      { name: 'Mêlée + Zone', description: 'Farm agressif, frappe plusieurs ennemis d\'un coup' },
      { name: 'Mêlée + Monocible', description: 'Bossing pur, concentration max sur le boss' },
      { name: 'Berserk', description: 'Build low HP très offensif — haute récompense, haut risque' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Place les ennemis dos au Iop → multiplicateur de dégâts dos' },
      { classId: 'zobal', reason: 'Buffs dégâts + retrait résistances → le Iop fait encore plus mal' },
      { classId: 'feca', reason: 'Protection indispensable pour rester au contact sans mourir' },
      { classId: 'osamodas', reason: 'Buffs PA → plus de sorts, plus de dégâts par tour' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: false,
    },
    alternatives: ['sacrieur', 'ouginak', 'sram', 'ecaflip'],
    tier: 'Référence historique DPT mêlée, constamment compétitif',
    playstyles: CLASS_PLAYSTYLES['iop'],
  },
  {
    id: 'cra',
    name: 'Cra',
    emoji: '🏹',
    subtitle: 'Archère',
    primaryRole: 'dpt-distance',
    secondaryRoles: ['controle'],
    complexity: 'beginner',
    style: 'Distance, zone ou monocible, balises',
    description:
      "Le Cra est l'archétype du DPT distance dans Wakfu : excellent dégâts à longue portée, bonnes capacités de contrôle via ses balises. Courbe d'apprentissage douce, s'intègre dans quasiment toutes les compositions.",
    strengths: [
      'Gros dégâts à longue portée dès les premiers niveaux',
      'Idéal pour rester hors de danger tout en frappant fort',
      'Accès à des balises offensives et de contrôle',
      "Courbe d'apprentissage douce — excellent pour débuter",
      'S\'intègre dans quasiment toutes les compositions d\'équipe',
    ],
    weaknesses: [
      'Très dépendant de la ligne de vue — les obstacles le gênent',
      'Fragile au corps-à-corps (faibles résistances naturelles)',
      'Peu d\'options de mobilité propres',
      'Nécessite d\'être protégé par un tank',
    ],
    mechanics: [
      {
        name: 'Balises',
        description:
          'Le Cra pose des balises sur le terrain servant de points d\'ancrage pour certains sorts, attirant/repoussant des ennemis ou amplifiant certains sorts.',
      },
      {
        name: 'Flèches élémentaires',
        description:
          'Feu: dégâts zone + DoT | Eau: sorts courte portée/zone | Terre: dégâts monocible | Air: mobilité, dégâts rapides',
      },
    ],
    builds: [
      { name: 'Distance + Monocible', description: 'Maximum de dégâts sur un seul ennemi — idéal en bossing' },
      { name: 'Distance + Zone', description: 'Farm efficace de groupes d\'ennemis' },
      { name: 'Critique', description: 'Combiné avec maîtrises distance, très haut potentiel de burst' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Place les ennemis dos au Cra → bonus de dégâts significatif' },
      { classId: 'zobal', reason: 'Réduit les résistances + buffs dégâts → Cra fait encore plus mal' },
      { classId: 'osamodas', reason: 'Buffs PA et retrait de résistances → plus de sorts, plus de dégâts' },
      { classId: 'feca', reason: 'Protège le Cra de loin via armures et glyphes' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: true,
    },
    alternatives: ['xelor', 'eliotrope', 'steamer', 'huppermage'],
    tier: 'Constamment dans la méta comme référence DPT distance',
    playstyles: CLASS_PLAYSTYLES['cra'],
  },
  {
    id: 'feca',
    name: 'Féca',
    emoji: '🛡️',
    subtitle: 'Gardien',
    primaryRole: 'tank',
    secondaryRoles: ['support', 'controle'],
    complexity: 'intermediate',
    style: 'Défensif, génération d\'armures et de glyphes',
    description:
      'Le Féca est le tank/protecteur de référence de Wakfu. Sa spécialité : générer des armures et des Barrières puissantes pour protéger toute l\'équipe, poser des glyphes de contrôle de zone. Difficile à remplacer dans les contenus difficiles.',
    strengths: [
      'Meilleure génération de Barrière du jeu',
      'Contrôle de zone puissant via les glyphes',
      'Peut protéger l\'équipe entière simultanément',
      'Excellent en donjon haut stasis',
      'Très résistant nativement',
    ],
    weaknesses: [
      'Dégâts offensifs faibles',
      'Gameplay moins spectaculaire — rôle ingrat mais crucial',
      'Les glyphes nécessitent une bonne gestion du placement',
      'Moins performant si l\'équipe est mal placée autour de ses glyphes',
    ],
    mechanics: [
      {
        name: 'Armures et Barrières',
        description:
          'Le Féca est le roi de la génération de Barrière (absorption de dégâts fixes). Il peut en produire massivement pour lui-même et ses alliés.',
      },
      {
        name: 'Glyphes',
        description:
          'Zones placées sur le sol du terrain : infligent des dégâts aux ennemis, appliquent des contrôles, créent des zones de protection pour les alliés.',
      },
      {
        name: 'Transfert de dégâts',
        description:
          'Certains builds permettent de rediriger les dégâts destinés aux alliés vers le Féca, absorbés par sa Barrière.',
      },
    ],
    builds: [
      { name: 'Tank Barrière pure', description: 'Maximum de Barrière pour absorber les dégâts de toute l\'équipe' },
      { name: 'Tank Glyphes', description: 'Positionnement agressif des glyphes pour contrôler le terrain' },
      { name: 'Hybride Tank/DPT', description: 'Rare, basé sur les contre-attaques' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Double tanking → sécurité maximale pour une team exigeante' },
      { classId: 'eniripsa', reason: 'Le Féca absorbe, le healer restaure — duo de survie classique' },
      { classId: 'cra', reason: 'Couvre les DPT fragiles avec ses armures à distance' },
      { classId: 'xelor', reason: 'Protection pour que le Xelor gère ses horloges en sécurité' },
    ],
    provides: {
      tank: true,
      heal: false,
      armor: true,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['pandawa', 'sacrieur', 'steamer'],
    tier: 'Systématiquement recommandé dans les contenus PvM haut niveau',
    playstyles: CLASS_PLAYSTYLES['feca'],
  },
  {
    id: 'sacrieur',
    name: 'Sacrieur',
    emoji: '🩸',
    subtitle: 'Sacrifieur',
    primaryRole: 'tank',
    secondaryRoles: ['dpt-melee'],
    complexity: 'intermediate',
    style: 'Mêlée agressive, survie à faibles PV, transfert de dégâts',
    description:
      'Le Sacrieur est une classe hybride unique : tank qui se transforme en menace DPT lorsque ses PV baissent. Sa philosophie repose sur la maîtrise berserk — plus il est en danger, plus il est dangereux.',
    strengths: [
      'Dégâts berserk très élevés quand PV bas',
      'Forte mobilité mêlée — difficile à kiter',
      'Peut tanker via transfert de dégâts',
      'Résistances naturellement élevées',
      'Gameplay unique et gratifiant',
    ],
    weaknesses: [
      'Gérer les PV à un niveau optimal (ni trop haut, ni trop bas) est technique',
      'Fragilité inhérente en builds berserk extrêmes',
      'Moins de contrôle terrain que Féca ou Pandawa',
      'Dépend du positionnement pour maximiser le berserk',
    ],
    mechanics: [
      {
        name: 'Maîtrise Berserk',
        description:
          'Lorsque les PV tombent sous ~50%, la maîtrise berserk s\'active, multipliant significativement les dégâts. Les builds berserk cherchent à rester durablement dans cet état.',
      },
      {
        name: 'Transfert de dégâts',
        description:
          'Le Sacrieur peut absorber les dégâts destinés à ses alliés, les prenant sur lui-même et les atténuant grâce à ses résistances.',
      },
      {
        name: 'Mobilité berserk',
        description:
          'En mode berserk, bonus de PM et de mobilité pour pourchasser les ennemis sans se laisser bloquer.',
      },
    ],
    builds: [
      { name: 'Berserk pur', description: 'Jouer délibérément à faibles PV pour maximiser les dégâts — risqué' },
      { name: 'Off-tank résistant', description: 'Tanker et frapper, avec résistances élevées et transfert de dégâts' },
      { name: 'Hybride', description: 'Alterner entre phases tank et phases DPT selon les besoins du combat' },
    ],
    synergies: [
      { classId: 'eniripsa', reason: 'Maintient le Sacrieur dans la zone berserk sans le laisser mourir' },
      { classId: 'pandawa', reason: 'Bon off-tank complémentaire au Pandawa placeur' },
      { classId: 'zobal', reason: 'Buffs dégâts amplifiés par le multiplicateur berserk' },
    ],
    provides: {
      tank: true,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: false,
    },
    alternatives: ['iop', 'ouginak', 'feca', 'pandawa'],
    tier: 'Solide en PvM, redoutable avec un bon healer en multicompte',
    playstyles: CLASS_PLAYSTYLES['sacrieur'],
  },
  {
    id: 'pandawa',
    name: 'Pandawa',
    emoji: '🐼',
    subtitle: 'Panda',
    primaryRole: 'placeur',
    secondaryRoles: ['tank', 'support'],
    complexity: 'intermediate',
    style: 'Placement des ennemis et alliés, tanking, ivrognerie',
    description:
      'Le Pandawa est le meilleur placeur brut du jeu. Sa mécanique d\'ivresse lui permet de porter et de lancer ennemis et alliés sur le terrain. Indispensable dans la quasi-totalité des compositions multi-comptes haut niveau.',
    strengths: [
      'Placement de loin le meilleur du jeu — porte et lance n\'importe qui',
      'Excellent tank grâce à ses résistances naturelles et sa Barrière',
      'Peut adapter son deck pour soigner ou frapper selon les besoins',
      'Peut retourner des ennemis pour exposer leur dos aux DPT',
      'Contrôle de masse via poussées et attractions',
    ],
    weaknesses: [
      'Nécessite de comprendre les angles de placement pour exploiter son potentiel',
      'Dégâts DPT faibles comparé à un vrai DPT',
      'Sa puissance dépend fortement du positionnement de l\'équipe',
      'Mécanique d\'ivresse à gérer activement',
    ],
    mechanics: [
      {
        name: 'Ivresse (Mécanique signature)',
        description:
          'Le Pandawa accumule de l\'ivresse en utilisant ses sorts, ce qui augmente sa résistance, ses capacités de placement et débloque les sorts les plus puissants.',
      },
      {
        name: 'Porter & Lancer',
        description:
          'Porter une entité puis la lancer : lancer ennemi contre mur = dégâts, lancer ennemi sur ennemi = les deux subissent dégâts, lancer allié = TP tactique.',
      },
      {
        name: "Contrôle de l'orientation",
        description:
          'Peut forcer l\'orientation des ennemis pour exposer leur dos aux DPT alliés — mécanique très valorisée.',
      },
    ],
    builds: [
      { name: 'Tank/Placeur', description: 'Priorité placement + résistances élevées — rôle standard en team' },
      { name: 'Tank/Off-heal', description: 'Mix placement + soins légers pour les équipes sans healer dédié' },
      { name: 'Bras + Placement', description: 'Build plus offensif avec quelques dégâts en plus du placement' },
    ],
    synergies: [
      { classId: 'sram', reason: 'Le dos est la spécialité du Sram — Pandawa est son meilleur allié' },
      { classId: 'iop', reason: 'Place les ennemis dos au Iop → multiplicateur de dégâts massif' },
      { classId: 'cra', reason: 'Place les ennemis dos au Cra → bonus de dégâts significatif' },
      { classId: 'eniripsa', reason: 'Duo tank/healer classique — Pandawa encaisse, Eniripsa soigne' },
    ],
    provides: {
      tank: true,
      heal: false,
      armor: false,
      removeRes: false,
      placement: true,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['feca', 'eliotrope', 'zobal'],
    tier: 'Référence absolue en placement, systématiquement recommandé',
    playstyles: CLASS_PLAYSTYLES['pandawa'],
  },
  {
    id: 'eniripsa',
    name: 'Eniripsa',
    emoji: '💊',
    subtitle: 'Soigneuse',
    primaryRole: 'healer',
    secondaryRoles: ['support'],
    complexity: 'intermediate',
    style: 'Soins de groupe et cibles, soutien passif, buffs',
    description:
      "L'Eniripsa est le healer de référence de Wakfu. Kit très flexible : soin pur, soin + zone offensive, ou DPT secondaire. Sa capacité à maintenir l'équipe en vie dans les contenus difficiles est inégalée.",
    strengths: [
      'Capacité de soin la plus élevée du jeu',
      'Soins de zone (toute l\'équipe d\'un coup) ET soins ciblés',
      'Kit de soutien passif (buffs alliés, états bénéfiques)',
      'Peut se jouer en mode offensif tout en gardant un soutien fort',
      'Indispensable dans les contenus haut stasis',
    ],
    weaknesses: [
      'Fragile — doit rester hors de portée des ennemis',
      'Très dépendante de la protection du tank',
      'En solo ou sans protection, devient vulnérable',
      'Moins versatile en compositions monocompte',
    ],
    mechanics: [
      {
        name: 'Soins de groupe',
        description:
          "L'Eniripsa peut soigner toute l'équipe en même temps via des sorts de zone de soin — crucial dans les combats avec dégâts massifs sur plusieurs alliés.",
      },
      {
        name: 'État Soigné / Sursoigné',
        description:
          'Certains sorts appliquent des états spécifiques qui améliorent les soins reçus, créant des rotations heal optimisées.',
      },
      {
        name: 'Hybride offensif (post-refonte)',
        description:
          "Avec la bonne configuration de deck, l'Eniripsa peut infliger des dégâts significatifs tout en maintenant un kit heal fonctionnel.",
      },
    ],
    builds: [
      { name: 'Heal pur', description: 'Maximum de maîtrise soin — pour les contenus très difficiles' },
      { name: 'Heal + Zone offensive', description: 'Soins efficaces + dégâts de zone — polyvalent pour le farm' },
      { name: 'Hybride DPT/Soin', description: 'Pour les teams avec peu de dégâts, mais compromis sur les soins' },
    ],
    synergies: [
      { classId: 'feca', reason: 'Le Féca absorbe, l\'Eniripsa restaure — duo de survie classique' },
      { classId: 'pandawa', reason: 'Duo tank/healer classique — Pandawa encaisse, Eniripsa soigne' },
      { classId: 'sacrieur', reason: 'Maintient le Sacrieur dans la zone berserk sans le laisser mourir' },
    ],
    provides: {
      tank: false,
      heal: true,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['zobal', 'sadida', 'osamodas'],
    tier: 'Systématiquement recommandée comme healer principal en PvM',
    playstyles: CLASS_PLAYSTYLES['eniripsa'],
  },
  {
    id: 'osamodas',
    name: 'Osamodas',
    emoji: '🐉',
    subtitle: 'Invocateur',
    primaryRole: 'support',
    secondaryRoles: ['dpt-hybrid', 'healer'],
    complexity: 'intermediate',
    style: 'Gestion de créatures, buffs PA, retrait de résistances',
    description:
      "L'Osamodas est considéré comme l'une des meilleures classes monocompte du jeu. Sa polyvalence extrême lui permet de jouer DPT via ses créatures, de soutenir avec buffs PA et retraits de résistances, ou de tanker légèrement via ses invocations.",
    strengths: [
      'Polyvalence extrême — s\'adapte à presque toutes les compositions',
      'Buffs PA très précieux pour toute l\'équipe',
      'Retrait de résistances ennemies (boost indirect des DPT)',
      'Invocations qui créent des obstacles, attaquent ou soutiennent',
      'Parmi les meilleures classes monocompte',
    ],
    weaknesses: [
      'Gestion des invocations peut être chronophage en combat',
      'Dégâts directs plus faibles si joué support pur',
      'Dépend du deck de créatures préparé à l\'avance',
    ],
    mechanics: [
      {
        name: 'Capture de créatures',
        description:
          "L'Osamodas peut capturer des monstres vaincus en combat pour les ajouter à sa collection, chacune avec des capacités uniques.",
      },
      {
        name: 'Invocations en combat',
        description:
          'Invoquer ses créatures pour attaquer les ennemis, bloquer des couloirs, soigner ou protéger les alliés.',
      },
      {
        name: 'Buff PA (ultime support)',
        description:
          "L'Osamodas peut donner des PA supplémentaires à ses alliés — l'un des buffs les plus puissants du jeu.",
      },
    ],
    builds: [
      { name: 'Support/Invocateur', description: 'Focus buffs PA + retrait rés + invocations utilitaires' },
      { name: 'DPT/Invocateur', description: 'Créatures offensives + sorts directs' },
      { name: 'Hybride soin', description: "Certaines créatures soignent — alternative à l'Eniripsa" },
    ],
    synergies: [
      { classId: 'xelor', reason: 'Double buff PA pour l\'équipe — rotation ultra-optimisée' },
      { classId: 'iop', reason: 'Buffs PA + retrait rés → dégâts décuplés pour le Iop' },
      { classId: 'cra', reason: 'Buffs PA et retrait de résistances boostent directement les dégâts' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: true,
      placement: false,
      buffPA: true,
      controlePM: false,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['xelor', 'zobal', 'sadida'],
    tier: 'Constamment dans le haut de la méta monocompte et multicompte',
    playstyles: CLASS_PLAYSTYLES['osamodas'],
  },
  {
    id: 'sadida',
    name: 'Sadida',
    emoji: '🌿',
    subtitle: 'Druide',
    primaryRole: 'controle',
    secondaryRoles: ['support', 'healer'],
    complexity: 'intermediate',
    style: 'Gestion de poupées, états (infecté), contrôle zone',
    description:
      'Le Sadida est un maître du contrôle de terrain via ses poupées invoquées et ses graines. Il peut bloquer des couloirs, appliquer l\'état infecté sur les ennemis, soigner l\'équipe ou frapper en zone.',
    strengths: [
      'Contrôle de terrain très puissant via les poupées',
      'Soin de zone et soutien passif',
      'Retrait de PM adverse via l\'état infecté',
      'Gestion de l\'espace (poupées comme obstacles)',
      'Polyvalent — s\'adapte aux besoins de l\'équipe',
    ],
    weaknesses: [
      'Gestion des graines et des poupées peut être complexe',
      'Dégâts directs limités si joué support pur',
      'Ses poupées peuvent gêner le placement allié si mal positionnées',
    ],
    mechanics: [
      {
        name: 'Poupées',
        description:
          'Différents types: aggressive (attaque chaque tour), tank (bloque couloirs), soin (restaure PV), totem (effets de zone).',
      },
      {
        name: 'Graines',
        description:
          'Placées sur le terrain, évoluent en poupées ou arbres selon les sorts lancés dessus. Gérer les graines est la clé du Sadida avancé.',
      },
      {
        name: 'État Infecté',
        description:
          'Réduit les PM des ennemis affectés, peut être propagé d\'ennemi en ennemi, interagit avec plusieurs sorts du Sadida.',
      },
    ],
    builds: [
      { name: 'Soin + Soutien', description: 'Poupées heal + retraits PM + état infecté — support complet' },
      { name: 'DPT Zone', description: 'Sort de zone + graines offensives — farm efficace' },
      { name: 'Hybride', description: 'Mix poupées utilitaires + quelques sorts offensifs' },
    ],
    synergies: [
      { classId: 'osamodas', reason: 'Deux invocateurs = gestion de terrain totale + buffs + soins' },
      { classId: 'pandawa', reason: 'Sadida retire les PM, Pandawa place — contrôle de mobilité complet' },
      { classId: 'enutrof', reason: 'Double entrave PM + état infecté = contrôle de mobilité total' },
    ],
    provides: {
      tank: false,
      heal: true,
      armor: false,
      removeRes: true,
      placement: false,
      buffPA: false,
      controlePM: true,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['eniripsa', 'osamodas', 'zobal', 'enutrof'],
    tier: 'Très apprécié en PvM pour polyvalence et apport en soutien/contrôle',
    playstyles: CLASS_PLAYSTYLES['sadida'],
  },
  {
    id: 'xelor',
    name: 'Xelor',
    emoji: '⏰',
    subtitle: 'Mage du Temps',
    primaryRole: 'dpt-distance',
    secondaryRoles: ['support', 'controle'],
    complexity: 'advanced',
    style: 'Horloges, cadran solaire, manipulation du temps',
    description:
      'Le Xelor est l\'un des personnages les plus techniques de Wakfu. Sa thématique du contrôle du temps se traduit mécaniquement par la manipulation des PA (donner aux alliés, retirer aux ennemis) et la gestion d\'horloges et d\'un cadran solaire.',
    strengths: [
      'Burst distance très élevé sur les cibles bien ciblées',
      'Peut donner des PA à ses alliés (l\'un des buffs les plus précieux)',
      'Retrait de PA/PM adverses = contrôle puissant',
      'Manipulation du tour de jeu (faire rejouer un allié, agir deux fois)',
      'Très fort en PvP grâce au contrôle des ressources',
    ],
    weaknesses: [
      'Système d\'horloges et de cadran complexe à maîtriser',
      'Très punitif si mal joué — les rotations doivent être pensées',
      'Dépend fortement du positionnement de ses horloges',
      "Courbe d'apprentissage longue",
    ],
    mechanics: [
      {
        name: 'Horloges',
        description:
          'Le Xelor place des horloges sur le terrain servant de points d\'ancrage, à déclencher au bon moment pour maximiser les effets.',
      },
      {
        name: 'Cadran solaire',
        description:
          'Structure centrale placée en combat qui crée un motif de cases autour du Xelor avec des effets différents selon leur position.',
      },
      {
        name: 'Manipulation des PA',
        description:
          'Donner des PA à un allié (sort supplémentaire ce tour) | Retirer des PA à un ennemi (moins d\'actions). Combiné avec Osamodas, crée des tours très déséquilibrés.',
      },
    ],
    builds: [
      { name: 'DPT pur', description: 'Maximum de dégâts via les horloges et sorts directement' },
      { name: 'Support PA', description: 'Focus sur donner des PA aux alliés + retrait adverse' },
      { name: 'Hybride DPT/Support', description: "L'idéal : dégâts + buffs PA utiles" },
    ],
    synergies: [
      { classId: 'osamodas', reason: 'Double buff PA pour l\'équipe — rotation ultra-optimisée' },
      { classId: 'iop', reason: 'Profite des PA supplémentaires pour plus de sorts' },
      { classId: 'pandawa', reason: 'Le Xelor peut téléporter alliés/ennemis pour amplifier les placements' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: true,
      controlePM: false,
      dptMelee: false,
      dptDistance: true,
    },
    alternatives: ['cra', 'eliotrope', 'osamodas'],
    tier: 'Très fort mais exigeant, extrêmement précieux en mains expertes',
    playstyles: CLASS_PLAYSTYLES['xelor'],
  },
  {
    id: 'enutrof',
    name: 'Enutrof',
    emoji: '💰',
    subtitle: 'Chasseur de trésors',
    primaryRole: 'controle',
    secondaryRoles: ['support'],
    complexity: 'intermediate',
    style: 'Retrait PM adverses, contrôle de mobilité, farm de ressources',
    description:
      "L'Enutrof est un spécialiste du retrait de PM et de l'optimisation du drop de ressources. En immobilisant les ennemis, il les force à rester exposés aux DPT alliés tout en boostant les récompenses de fin de combat.",
    strengths: [
      'Retrait de PM massif — immobilise les ennemis',
      'Améliore le drop de ressources (unique à cette classe)',
      'Bon contrôle de la distance entre ennemis et alliés',
      'Utile dans les compositions cherchant du contrôle de mobilité',
    ],
    weaknesses: [
      'Dégâts offensifs modestes',
      'Moins utile en bossing pur (les boss ont souvent peu de PM)',
      'Rôle très spécialisé — remplacé facilement par d\'autres supports',
    ],
    mechanics: [
      {
        name: "Pièces d'or / Mines",
        description:
          "L'Enutrof place des pièces d'or sur le terrain qui créent des effets lorsqu'elles sont ramassées ou piétinées.",
      },
      {
        name: 'Retrait de PM',
        description:
          'Retirer des PM aux ennemis les empêche de se déplacer pour attaquer les alliés fragiles ou fuir la zone de DPT.',
      },
      {
        name: 'Boosteur de drop',
        description:
          'Des passifs spécifiques augmentent significativement la quantité et qualité des ressources obtenues en combat.',
      },
    ],
    builds: [
      { name: 'Entrave PM pur', description: 'Maximum de retrait PM pour immobiliser totalement les ennemis' },
      { name: 'Farm/Drop', description: 'Passifs drop + entrave légère — optimisé pour la récolte de ressources' },
      { name: 'Hybride DPT', description: 'Mix dégâts + entrave PM pour les teams sans pur contrôleur' },
    ],
    synergies: [
      { classId: 'pandawa', reason: "L'Enutrof retire les PM, le Pandawa place — contrôle de mobilité absolu" },
      { classId: 'sadida', reason: 'Double entrave PM + état infecté = contrôle de mobilité total' },
      { classId: 'iop', reason: 'Les ennemis immobilisés sont des cibles parfaites pour les frappes' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: true,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['sadida', 'xelor', 'pandawa'],
    tier: 'Utile dans des compositions spécifiques, précieux pour le farm',
    playstyles: CLASS_PLAYSTYLES['enutrof'],
  },
  {
    id: 'sram',
    name: 'Sram',
    emoji: '🗡️',
    subtitle: 'Assassin',
    primaryRole: 'dpt-melee',
    secondaryRoles: ['controle'],
    complexity: 'intermediate',
    style: 'Backstab, furtivité, pièges, dégâts conditionnels',
    description:
      'Le Sram est le spécialiste du dos de Wakfu. Son gameplay entier est construit autour du backstab : se placer derrière les ennemis pour infliger des dégâts massifs via la maîtrise dos. Dépend fortement des placeurs.',
    strengths: [
      'Dégâts backstab parmi les plus élevés du jeu quand correctement placé',
      'Invisibilité pour se repositionner sans subir d\'attaque',
      'Pièges pour créer des zones de dégâts passifs',
      'Très fort en bossing monocible quand le boss est de dos',
    ],
    weaknesses: [
      'Très dépendant du placement — sans dos, les dégâts s\'effondrent',
      'Fragile — le Sram doit rester dans l\'ombre',
      'Nécessite un bon placeur (Pandawa) pour exprimer son potentiel',
      'Moins polyvalent en l\'absence de soutien de placement',
    ],
    mechanics: [
      {
        name: 'Maîtrise Dos (mécanique centrale)',
        description:
          'Le Sram inflige des dégâts massivement amplifiés quand il frappe depuis le dos de sa cible. Toute sa construction tourne autour de maximiser cette condition.',
      },
      {
        name: 'Invisibilité',
        description:
          'En mode invisible, les ennemis ne le ciblent plus, il peut se repositionner et certains sorts ne sont disponibles que depuis l\'invisibilité.',
      },
      {
        name: 'Pièges',
        description:
          'Des pièges placés sur le terrain s\'activent quand une entité marche dessus. Peuvent s\'enchaîner en chaîne et interagissent avec les déplacements.',
      },
    ],
    builds: [
      { name: 'Backstab pur', description: 'Mêlée + Dos + Mono — maximum de dégâts si toujours au dos' },
      { name: 'Pièges', description: 'Moins dépendant du placement personnel, contrôle par les pièges' },
      { name: 'Hybride', description: 'Backstab + quelques pièges pour la flexibilité' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Indispensable — place les ennemis dos au Sram pour activer le backstab' },
      { classId: 'feca', reason: 'Glyphes qui immobilisent les ennemis exposés' },
      { classId: 'zobal', reason: 'Retrait de résistances amplifie les dégâts backstab' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: false,
    },
    alternatives: ['iop', 'ouginak', 'ecaflip'],
    tier: 'Très fort en DPT avec les bonnes conditions, redoutable avec un Pandawa',
    playstyles: CLASS_PLAYSTYLES['sram'],
  },
  {
    id: 'ecaflip',
    name: 'Ecaflip',
    emoji: '🃏',
    subtitle: 'Joueur',
    primaryRole: 'dpt-melee',
    secondaryRoles: ['support'],
    complexity: 'intermediate',
    style: 'Critiques, chance, gameplay aléatoire',
    description:
      "L'Ecaflip est la classe du hasard et des critiques. Certains sorts déclenchent des effets aléatoires très puissants, son taux de critique est naturellement élevé. Dispose aussi de mécaniques de soin ou de boost pour l'équipe.",
    strengths: [
      'Critiques très fréquents = dégâts moyens élevés sur la durée',
      'Sorts avec effets puissants quand la chance est de son côté',
      'Quelques soins et buffs utiles pour l\'équipe',
      'Gameplay fun et imprévisible',
    ],
    weaknesses: [
      'Variance élevée — peut avoir de très bons ou très mauvais tours',
      'Moins prévisible que d\'autres DPT en termes de contribution',
      'Peu de contrôle sur ses effets aléatoires',
    ],
    mechanics: [
      {
        name: 'Pièce / Faces',
        description:
          'Le cœur du gameplay : lancer un "dé" pour déterminer si un sort a l\'effet positif ou négatif/alternatif. Certains passifs augmentent la probabilité d\'obtenir le bon résultat.',
      },
      {
        name: 'Critiques',
        description:
          'Naturellement haut taux de critique, plusieurs sorts ont des effets amplifiés sur coup critique.',
      },
      {
        name: 'Soins conditionnels',
        description:
          'Via certains passifs, peut transformer une partie de ses dégâts en soins pour l\'équipe.',
      },
    ],
    builds: [
      { name: 'DPT Critique', description: 'Maximum de critique et maîtrise élémentaire' },
      { name: 'Mêlée', description: 'Corps-à-corps avec critiques fréquents' },
      { name: 'Distance', description: 'Quelques sorts distance disponibles selon l\'élément' },
    ],
    synergies: [
      { classId: 'zobal', reason: 'Buffs dégâts amplifient les critiques de l\'Ecaflip' },
      { classId: 'pandawa', reason: 'Placement pour accéder au dos, combiné avec les critiques' },
      { classId: 'osamodas', reason: 'Buffs PA pour plus de sorts par tour' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: false,
    },
    alternatives: ['iop', 'sram', 'ouginak'],
    tier: 'Solide en PvM grâce à la fréquence de critique élevée, fun factor unique',
    playstyles: CLASS_PLAYSTYLES['ecaflip'],
  },
  {
    id: 'zobal',
    name: 'Zobal',
    emoji: '🎭',
    subtitle: 'Masqueraider',
    primaryRole: 'support',
    secondaryRoles: ['healer', 'dpt-melee'],
    complexity: 'intermediate',
    style: 'Soins, armures, buffs dégâts, retrait résistances, placement',
    description:
      'Le Zobal est considéré comme le meilleur support universel de Wakfu. Il cumule dans un seul personnage : soins, armures, augmentation des dégâts alliés en zone, réduction des résistances adverses et outils de placement.',
    strengths: [
      'Support le plus complet du jeu — fait tout à la fois',
      'Armures puissantes pour l\'équipe entière',
      'Buffs dégâts en zone d\'effet (profite à tous les alliés en même temps)',
      'Retrait de résistances adverses (boost indirect des DPT)',
      'Peut aussi DPT efficacement en mêlée selon le deck',
    ],
    weaknesses: [
      'Deck complexe à construire pour couvrir tous les rôles sans se diluer',
      'Moins puissant en DPT pur qu\'un Iop ou un Cra',
      'Ses armures, bien que puissantes, ne remplacent pas un vrai tank',
    ],
    mechanics: [
      {
        name: 'Masques',
        description:
          'Masque Noble (défensif: armures + soins) | Masque Trouillard (furtif: évitement + placement) | Masque Psychopathe (offensif: bonus dégâts mêlée). La mécanique centrale.',
      },
      {
        name: "Armures d'équipe",
        description:
          'Les armures que le Zobal génère protègent tous les alliés proches — tank de zone plutôt que tank personnel.',
      },
      {
        name: 'Buff Dégâts Infligés',
        description:
          'Augmenter les Dégâts Infligés de ses alliés en zone. Tous les DPT présents dans la zone profitent du bonus simultanément.',
      },
    ],
    builds: [
      { name: 'Support pur', description: "Armures + Buffs DI + Retrait rés + Soins — maximum d'utilité" },
      { name: 'DPT/Support', description: 'Mêlée forte + quelques buffs — pour les teams avec peu de DPT' },
      { name: 'Hybride', description: "L'idéal : solide en support + contribue en DPT mêlée" },
    ],
    synergies: [
      { classId: 'cra', reason: 'Le Zobal réduit les résistances + buffs DI → le Cra fait des dégâts monstrueux' },
      { classId: 'iop', reason: "Les buffs DI amplifient le burst Iop" },
      { classId: 'pandawa', reason: "Pandawa place dos, Zobal buffs + retire res → combo offensif parfait" },
      { classId: 'sram', reason: 'Retrait de résistances amplifie les dégâts backstab' },
    ],
    provides: {
      tank: false,
      heal: true,
      armor: true,
      removeRes: true,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: false,
    },
    alternatives: ['eniripsa', 'osamodas', 'feca', 'sadida'],
    tier: 'Systématiquement dans le top du méta comme support en PvM',
    playstyles: CLASS_PLAYSTYLES['zobal'],
  },
  {
    id: 'roublard',
    name: 'Roublard',
    emoji: '💣',
    subtitle: 'Rogue',
    primaryRole: 'dpt-hybrid',
    secondaryRoles: ['controle'],
    complexity: 'advanced',
    style: 'Bombes, placement précis, burst de zone',
    description:
      "Le Roublard est un DPT unique centré sur les bombes. Son potentiel de burst en zone est immense quand bien exécuté, mais cela requiert une excellente compréhension des mécaniques de placement et de déclenchement. L'une des classes les plus techniques.",
    strengths: [
      'Burst de zone massif quand les bombes sont bien placées',
      'Très haut potentiel de dégâts en situation optimale',
      'Peut jouer mêlée ou distance selon les états et le deck',
    ],
    weaknesses: [
      'Très complexe — mauvaise gestion des bombes = aucun dégât',
      'Dépendant du placement précis des bombes ET des ennemis',
      'Prend plusieurs tours à setup avant d\'exploser',
      'Vulnérable si les bombes sont déclenchées au mauvais moment',
    ],
    mechanics: [
      {
        name: 'Bombes élémentaires',
        description:
          'Le Roublard place des bombes sur le terrain, chacune d\'un élément différent, à déclencher via des sorts "détonateur" pour maximiser les dégâts.',
      },
      {
        name: 'États de combat (mêlée/distance)',
        description:
          'Certains sorts changent son état entre mêlée et distance, modifiant les sorts disponibles et les maîtrises actives.',
      },
      {
        name: "Chaînes d'explosion",
        description:
          'Si les bombes sont adjacentes, l\'explosion de l\'une peut déclencher les autres en chaîne, amplifiant les dégâts de façon exponentielle.',
      },
    ],
    builds: [
      { name: 'Bombes Zone', description: 'Setup de bombes + déclenchement pour burst de groupe' },
      { name: 'Mêlée agressive', description: 'Moins de bombes, plus de sorts directs en mêlée' },
      { name: 'Hybride', description: 'Mix bombes + dégâts directs selon opportunité' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Place les ennemis dans la zone des bombes' },
      { classId: 'feca', reason: 'Glyphes qui immobilisent les cibles sur les bombes' },
      { classId: 'osamodas', reason: 'Buffs PA pour placer plus de bombes en un tour' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: true,
    },
    alternatives: ['huppermage', 'eliotrope', 'sram'],
    tier: 'Potentiellement dévastateur mais exige un haut niveau de maîtrise',
    playstyles: CLASS_PLAYSTYLES['roublard'],
  },
  {
    id: 'ouginak',
    name: 'Ouginak',
    emoji: '🐕',
    subtitle: 'Guerrier Chien',
    primaryRole: 'dpt-melee',
    secondaryRoles: ['tank'],
    complexity: 'beginner',
    style: 'Mêlée très agressive, transformation, combos de PM',
    description:
      "L'Ouginak est un bruiser mêlée très agressif. Sa signature : une transformation qui lui confère un nombre massif de PM supplémentaires, lui permettant de traverser le terrain et d'enchaîner les attaques sur de longues séquences.",
    strengths: [
      'Mobilité mêlée extrême en transformation (gros boost de PM)',
      'Dégâts mêlée très bons, surtout en transformation',
      'Peut "chasser" les cibles qui fuient',
      'Gameplay dynamique et fun',
      'Accessible tout en ayant de la profondeur',
    ],
    weaknesses: [
      'Dépend de sa transformation pour son plein potentiel',
      'Fragile hors transformation',
      "Peu d'options à distance",
    ],
    mechanics: [
      {
        name: 'Transformation',
        description:
          "L'Ouginak peut se transformer en une forme bête plus puissante : PM massifs (traverse tout le terrain), boost dégâts mêlée, sorts exclusifs à la forme transformée.",
      },
      {
        name: 'Mécanique de "Traque"',
        description:
          "L'Ouginak peut marquer une cible et obtenir des bonus lorsqu'il l'attaque, ce qui l'incite à se concentrer sur un ennemi spécifique.",
      },
    ],
    builds: [
      { name: 'DPT Transformation', description: 'Focus sur les tours de transformation pour burst maximum' },
      { name: 'Bruiser constant', description: 'Dégâts constants sans dépendre exclusivement de la transformation' },
      { name: 'Monocible', description: 'Bossing concentré sur une seule cible' },
    ],
    synergies: [
      { classId: 'pandawa', reason: "Place les ennemis dos à l'Ouginak avant sa transformation" },
      { classId: 'zobal', reason: 'Buffs DI amplifient le burst de transformation' },
      { classId: 'eniripsa', reason: "Soins nécessaires car l'Ouginak doit rester au contact des ennemis" },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: false,
    },
    alternatives: ['iop', 'sacrieur', 'sram'],
    tier: 'Solide en DPT mêlée, apprécié pour son gameplay dynamique',
    playstyles: CLASS_PLAYSTYLES['ouginak'],
  },
  {
    id: 'huppermage',
    name: 'Huppermage',
    emoji: '✨',
    subtitle: 'Archimage',
    primaryRole: 'dpt-hybrid',
    secondaryRoles: ['support'],
    complexity: 'advanced',
    style: 'Combos élémentaires, états, flexibilité totale',
    description:
      "L'Huppermage est le mage universel de Wakfu : il peut jouer les 4 éléments, en mêlée ou distance, en mono ou zone. Son système d'états élémentaires et de combos en fait une classe extrêmement flexible mais aussi très complexe à optimiser.",
    strengths: [
      'Peut s\'adapter à absolument tous les types de contenu',
      'Combos élémentaires très puissants quand correctement enchaînés',
      'Peut jouer mêlée ou distance selon la situation',
      'Accès à 4 éléments = passe toujours les résistances ennemies',
      'Légère utilité de soutien via buffs élémentaires',
    ],
    weaknesses: [
      'Système de combos complexe à maîtriser',
      'Nécessite de bien gérer les états élémentaires (dans le bon ordre)',
      'Optimisation du deck très technique',
      'Punissant si les combos sont mal enchaînés',
    ],
    mechanics: [
      {
        name: 'États élémentaires',
        description:
          'Chaque sort élémentaire applique un état sur les cibles (Brûlé, Trempé, Rocheux, Venteux). Enchaîner des sorts d\'éléments différents sur un ennemi affecté crée des combos qui amplifient les dégâts.',
      },
      {
        name: 'Combos élémentaires',
        description:
          'Exemple : ennemi "Brûlé" (Feu) + sort Eau = explosion de vapeur → dégâts bonus. Ces combos sont au cœur du gameplay avancé.',
      },
      {
        name: 'Flexibilité de portée',
        description:
          "L'Huppermage peut choisir de frapper de mêlée ou distance selon le sort, ce qui le rend adaptable aux besoins du combat.",
      },
    ],
    builds: [
      { name: 'Zone hybride', description: 'Combos élémentaires en zone — farm efficace' },
      { name: 'Monocible burst', description: 'Combos concentrés sur un boss — bossing puissant' },
      { name: 'Distance', description: 'Exploiter la portée pour rester sécurisé tout en combotant' },
    ],
    synergies: [
      { classId: 'pandawa', reason: "Placement pour accéder aux angles optimaux pour les combos" },
      { classId: 'osamodas', reason: 'Buffs PA pour avoir assez d\'actions pour compléter les combos en un tour' },
      { classId: 'zobal', reason: "Retrait de résistances amplifie tous les éléments de l'Huppermage" },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: true,
      dptDistance: true,
    },
    alternatives: ['roublard', 'eliotrope', 'cra', 'xelor'],
    tier: 'Très fort en mains expertes, flexibilité totale unique',
    playstyles: CLASS_PLAYSTYLES['huppermage'],
  },
  {
    id: 'eliotrope',
    name: 'Eliotrope',
    emoji: '🌀',
    subtitle: 'Portailliste',
    primaryRole: 'dpt-distance',
    secondaryRoles: ['placeur', 'dpt-melee'],
    complexity: 'advanced',
    style: 'Portails, exaltation, frappe à travers l\'espace',
    description:
      'L\'Eliotrope est un DPT unique qui frappe à travers ses portails — il peut être physiquement éloigné d\'un ennemi mais frapper comme s\'il était adjacent. Gère aussi un état d\'exaltation qui modifie les effets de ses sorts.',
    strengths: [
      'DPT très élevé quand les portails sont bien positionnés',
      'Peut frapper à n\'importe quelle portée grâce aux portails',
      'Flexibilité distance/mêlée unique dans le jeu',
      'Placement secondaire utile pour toute l\'équipe',
    ],
    weaknesses: [
      'Gestion des portails très complexe',
      'Placement des portails dépend du terrain — moins efficace dans certains donjons',
      'Punissant si les portails sont mal positionnés',
      'Exaltation difficile à gérer en parallèle',
    ],
    mechanics: [
      {
        name: 'Portails',
        description:
          'L\'Eliotrope place deux portails sur le terrain. Applications: DPT depuis case sécurisée, placement alliés/ennemis, téléportation personnelle.',
      },
      {
        name: "État d'Exaltation",
        description:
          "L'exaltation modifie les effets de ses sorts (dégâts augmentés, effets différents, etc.). La gestion en parallèle des portails est ce qui rend la classe avancée.",
      },
    ],
    builds: [
      { name: 'DPT Distance via portails', description: 'Portails proches des ennemis, Eliotrope en sécurité' },
      { name: 'DPT Mêlée', description: 'Utilise les portails pour apparaître adjacent et frapper' },
      { name: 'Zone', description: 'Portails pour couvrir de grandes zones de dégâts' },
    ],
    synergies: [
      { classId: 'pandawa', reason: 'Pandawa place, Eliotrope amplifie le placement via portails' },
      { classId: 'feca', reason: "Protection pour que l'Eliotrope puisse gérer ses portails en sécurité" },
      { classId: 'osamodas', reason: 'Buffs PA pour gérer portails + sorts en un tour' },
    ],
    provides: {
      tank: false,
      heal: false,
      armor: false,
      removeRes: false,
      placement: true,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: true,
    },
    alternatives: ['cra', 'xelor', 'huppermage', 'roublard'],
    tier: 'Très fort une fois maîtrisé, régulièrement cité dans les meilleures options DPT distance',
    playstyles: CLASS_PLAYSTYLES['eliotrope'],
  },
  {
    id: 'steamer',
    name: 'Steamer',
    emoji: '🤖',
    subtitle: 'Foggernaut',
    primaryRole: 'dpt-distance',
    secondaryRoles: ['tank', 'support'],
    complexity: 'intermediate',
    style: 'Tourelle évolutive, branche Stasis (multi-élémentaire)',
    description:
      'Le Steamer est une classe mécanique qui tourne autour de sa tourelle. Peut se jouer DPT Stasis (dégâts neutres constants) ou Tank/Support (génération d\'armures, comparable à Féca mais avec un profil différent).',
    strengths: [
      'Grande flexibilité de build (DPT ou Tank totalement différents)',
      'La branche Stasis contourne les résistances élémentaires (neutre à tout)',
      'Génération d\'armures pour l\'équipe en build tank',
      'Tourelle comme outil de contrôle de zone',
      'Bon choix pour les teams distance (armures + DPT Stasis)',
    ],
    weaknesses: [
      'La tourelle doit être bien gérée et protégée',
      'En DPT pur, légèrement derrière Cra ou Eliotrope sur le bossing mono',
      'Build tank requiert plus d\'investissement pour égaler Féca',
    ],
    mechanics: [
      {
        name: 'Tourelle',
        description:
          'Posée sur le terrain en début de combat : attaque automatiquement les ennemis, peut être upgradée (dégâts, effets, portée), bloque les couloirs, génère des armures en build tank.',
      },
      {
        name: 'Branche Stasis',
        description:
          'Utilise un élément neutre (Stasis) qui ne tient pas compte des résistances adverses. La constance des dégâts est son avantage.',
      },
    ],
    builds: [
      { name: 'DPT Stasis Distance', description: 'Dégâts neutres élémentaires constants + tourelle' },
      { name: 'Tank/Armures', description: "Génération massive d'armures pour teams distance" },
      { name: 'Hybride DPT/Support', description: 'Quelques armures + bonne contribution DPT' },
    ],
    synergies: [
      { classId: 'cra', reason: 'Le Steamer tank couvre les DPT distance avec ses armures' },
      { classId: 'osamodas', reason: 'Buffs PA permettent de gérer tourelle + sorts en un tour' },
      { classId: 'zobal', reason: 'Double support armures + buffs pour une survie maximale' },
    ],
    provides: {
      tank: true,
      heal: false,
      armor: true,
      removeRes: false,
      placement: false,
      buffPA: false,
      controlePM: false,
      dptMelee: false,
      dptDistance: true,
    },
    alternatives: ['feca', 'cra', 'eliotrope'],
    tier: 'Très apprécié dans les compositions distance pour son double rôle DPT/armures',
    playstyles: CLASS_PLAYSTYLES['steamer'],
  },
];

export const CLASS_MAP = new Map(CLASSES.map((c) => [c.id, c]));
