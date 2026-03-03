const BASE = import.meta.env.BASE_URL;

/** Mapping slug de classe → ID asset numérique */
const CLASS_ASSET_IDS: Record<string, number> = {
  feca: 1,
  osamodas: 2,
  enutrof: 3,
  sram: 4,
  xelor: 5,
  ecaflip: 6,
  eniripsa: 7,
  iop: 8,
  cra: 9,
  sadida: 10,
  sacrieur: 11,
  pandawa: 12,
  roublard: 13,
  zobal: 14,
  ouginak: 15,
  steamer: 16,
  eliotrope: 18,
  huppermage: 19,
};

/** Icône petite format d'une classe (24–48px) */
export function getClassIcon(classId: string): string {
  const id = CLASS_ASSET_IDS[classId];
  if (!id) return '';
  return `${BASE}assets/classes/icons/${id}.png`;
}

/** Grande illustration d'une classe (homme par défaut) */
export function getClassIllustration(classId: string, gender: 'male' | 'female' = 'male'): string {
  const id = CLASS_ASSET_IDS[classId];
  if (!id) return '';
  const file = gender === 'male' ? `${id * 10}.png` : `${id * 10 + 1}.png`;
  return `${BASE}assets/classes/illustrations/${file}`;
}

/**
 * Mapping nom de donjon (asset) → ID image boss.
 * Les noms sont ceux de dungeons_mapping.json.
 */
const DUNGEON_BOSS_MAP: Record<string, number> = {
  'Pâturages des Bouftous': 90,
  'Le Tofulailler': 27,
  'Le Tofulailler Royal': 27,
  'Larventura': 65,
  'Donjon des Abraknes': 125,
  'Donjon Arakne': 46,
  'Donjon Mulou': 47,
  'Sliptorium': 48,
  'Château de Wagnar': 49,
  'Chuchobase': 53,
  'Antre du Dragon-Cochon': 57,
  'Le Glaglacier Cornu': 62,
  'Le Pot d\'Hagën-Glass': 63,
  'Jawdin de la Weine': 67,
  'Le Hammamamoule': 68,
  'Donjon Gelée': 69,
  'Château du Wa Wabbit': 72,
  'Palais Lenald': 73,
  'Laboratoire de Womewo': 74,
  'Repaire des Super-Vilains': 79,
  'Donjon Bwork': 80,
  'L\'Antre oubliée': 81,
  'Fosse du Tourmenteur': 82,
  'Donjon Cacterre': 83,
  'Donjon Noirespore': 84,
  'Sanctuaire de Mihmol': 85,
  'Donjon Srambad': 86,
  'Donjon Enutrosor': 87,
  'La Corbeau-Cave': 88,
  'Le Caveau Relevé': 89,
  'Fabrique Méka': 95,
  'Donjon E-Bou': 96,
  'Temple du Grand Orrok': 99,
  'Plateau des Haut-Vents': 100,
  'Le Misolée': 101,
  'Donjon des Tropikes': 104,
  'Donjon des Kannibouls': 106,
  'Donjon des Kannivores': 109,
  'Donjon des Crocodailles': 110,
  'Cime du Grand Totem': 111,
  'Le Vignoble Ignoble': 115,
  'Antre de Nogord l\'Ezarélé': 117,
  'Repaire de Kali': 121,
  'Caverne des Slekymoses': 122,
  'Caverne Smarrante': 123,
  'Domaine de la Trouffe Salée': 124,
  'Tanière des Blérox': 126,
  'Volcan Or\'Hodruin': 127,
  'La Crête Givrée': 128,
  'Sanctuaire des Dragoeufs': 129,
  'Pointe du Mont Zinit': 131,
  'La Tour Minérale': 133,
  'Dimension-Objet d\'Ombrage': 135,
  'La Montagne Adezieu': 136,
  'Le Papaturage Royal': 137,
  'Repaire des Magik Riktus': 138,
  'Donjon Riktus Elite': 139,
  'Château des Cwabes': 140,
  'Kokokolantha': 141,
  'Donjon Flaqueux': 142,
  'La Pichine': 143,
  'Roub\'Bar': 144,
  'Domaine du Petit Groin': 145,
  'Truchière Abandonnée': 146,
  'Palais du Tsu': 147,
  'Donjon Abraknyde': 148,
  'Le Lampionaute': 149,
  'Nécropoil de Morbax': 150,
  'Scarrière Abandonnée': 151,
  'Blopéra': 152,
  'La Patapoutrerie': 153,
  'Source du Mal': 154,
  'Cité Interdite': 155,
  'Canyon des Fléopards': 156,
  'Tombeau de Pandala': 157,
  'Donjon Gerbouille': 158,
  'Usine Hibourg': 159,
  'Donjon Vandaliénés': 160,
  'Donjon Cagnardeurs': 161,
  'Donjon Crustargneux': 162,
  'Donjon Toundrasoirs': 163,
  'Donjon Carapattes': 165,
  'Donjon Plantigardes': 166,
  'Donjon Mansots': 167,
  'Palais de Rushu': 181,
  'Donjon Équipage du poulpe': 184,
  'Donjon Morts-brûlés': 185,
  'Donjon Marteaux-Aigris': 186,
  'Donjon Poisseux abyssaux': 187,
  'Donjon Steamers': 188,
  'Tour des Miss Moches': 189,
  'Ruche-mère Sabléoptère': 192,
  'Compost du grand Potofeu': 193,
  'Tombeau de Tal Kasha': 194,
  'Nécromonde': 196,
  'Donjon Férociraptors': 197,
  'Donjon Primassifs': 198,
  'Donjon Savanastraux': 199,
  'Donjon Clan de Bworkana': 200,
  'Donjon Machines de Nox': 201,
  'Théâtre intemporel': 202,
  'Cœur de l\'horloge de Nox': 203,
  'Antre du Meulou': 3,
  'Antre d\'Excarnus': 4,
  'Antre du Corbeau Noir': 5,
  'Antre du Boufrog': 6,
  'Niche du Yech\'Ti\'Wawa': 8,
  'Aile de l\'Ambassadrice': 9,
  'La Tour Gelée': 10,
  'L\'Arène Dansante': 11,
  'Les Ratacombes': 12,
  'Académie Trool': 13,
  'Les Champs Pourchan': 25,
  'Piou Lahoupe': 26,
  'Donjon Mollusky': 34,
  'La Skouale Sèche': 41,
};

/** Image du boss d'un donjon par son nom */
export function getDungeonBossImage(dungeonName: string): string | null {
  const id = DUNGEON_BOSS_MAP[dungeonName];
  if (!id) return null;
  return `${BASE}assets/boss/${id}.png`;
}

/** Icône d'élément principal (FIRE, WATER, AIR, EARTH, LIGHT, STASIS, PHYSICAL, SUPPORT) */
export function getElementIcon(element: string): string {
  return `${BASE}assets/elements/${element.toUpperCase()}.png`;
}

/** Petite icône d'élément (smallFIRE, smallWATER, ...) */
export function getSmallElementIcon(element: string): string {
  const name = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  return `${BASE}assets/elements/small${name}.png`;
}

/** Icône de caractéristique/stat (AP, MP, HP, MELEE_DMG, ARMOR, HEAL_IN_PERCENT, ...) */
export function getCharacteristicIcon(stat: string): string {
  return `${BASE}assets/characteristics/${stat}.png`;
}

/** Icône de rareté (0 = commun, 7 = relique) */
export function getRarityIcon(rarityId: number): string {
  return `${BASE}assets/rarities/${rarityId}.png`;
}
