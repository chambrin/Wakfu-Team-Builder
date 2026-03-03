# 🎨 Assets Visuels Wakfu

Collection d'assets graphiques du jeu Wakfu, issus du dépôt communautaire [Vertylo/wakassets](https://github.com/Vertylo/wakassets).

> **Source** : Propriété intellectuelle d'Ankama Games. Usage pour outils communautaires non-commerciaux.

---

## Structure

```
assets/
├── classes/
│   ├── icons/          # 18 icônes (petit format) — ID 1-19
│   ├── illustrations/  # 36 grandes illustrations H+F — ex: 80.png (Iop homme), 81.png (Iop femme)
│   └── backgrounds/    # Fonds de classe
├── boss/               # 181 illustrations de boss de donjon
├── monsters/           # 994 illustrations de monstres
├── elements/           # 67 icônes (Feu, Eau, Air, Terre, Stase...)
├── rarities/           # 8 icônes de raretés (Commun → Relic)
├── itemTypes/          # 109 icônes de types d'objets
├── characteristics/    # 46 icônes de stats (Maîtrise, Résistance...)
├── misc/               # 11 icônes divers
└── jsons/
    ├── classes_mapping.json    # ID → nom, slug, fichiers
    ├── dungeons_mapping.json   # ID → nom donjon, illustration
    ├── breeds.json             # Données complètes classes
    ├── dungeons.json           # Données complètes donjons
    ├── monsters.json           # Données monstres
    ├── monsterFamilies.json    # Familles de monstres
    ├── rarities.json           # Raretés
    └── jobs.json               # Métiers
```

---

## Mapping Classes

| ID | Nom | Icône | Illustration Homme | Illustration Femme |
|----|-----|-------|-------------------|--------------------|
| 1 | Féca | `icons/1.png` | `illustrations/10.png` | `illustrations/11.png` |
| 2 | Osamodas | `icons/2.png` | `illustrations/20.png` | `illustrations/21.png` |
| 3 | Enutrof | `icons/3.png` | `illustrations/30.png` | `illustrations/31.png` |
| 4 | Sram | `icons/4.png` | `illustrations/40.png` | `illustrations/41.png` |
| 5 | Xélor | `icons/5.png` | `illustrations/50.png` | `illustrations/51.png` |
| 6 | Ecaflip | `icons/6.png` | `illustrations/60.png` | `illustrations/61.png` |
| 7 | Eniripsa | `icons/7.png` | `illustrations/70.png` | `illustrations/71.png` |
| 8 | Iop | `icons/8.png` | `illustrations/80.png` | `illustrations/81.png` |
| 9 | Crâ | `icons/9.png` | `illustrations/90.png` | `illustrations/91.png` |
| 10 | Sadida | `icons/10.png` | `illustrations/100.png` | `illustrations/101.png` |
| 11 | Sacrieur | `icons/11.png` | `illustrations/110.png` | `illustrations/111.png` |
| 12 | Pandawa | `icons/12.png` | `illustrations/120.png` | `illustrations/121.png` |
| 13 | Roublard | `icons/13.png` | `illustrations/130.png` | `illustrations/131.png` |
| 14 | Zobal | `icons/14.png` | `illustrations/140.png` | `illustrations/141.png` |
| 15 | Ouginak | `icons/15.png` | `illustrations/150.png` | `illustrations/151.png` |
| 16 | Steamer | `icons/16.png` | `illustrations/160.png` | `illustrations/161.png` |
| 18 | Eliotrope | `icons/18.png` | `illustrations/180.png` | `illustrations/181.png` |
| 19 | Huppermage | `icons/19.png` | `illustrations/190.png` | `illustrations/191.png` |

---

## Utilisation dans le code

```javascript
// Icône de classe
const classIcon = `assets/classes/icons/${classId}.png`

// Illustration (homme = ID×10, femme = ID×10+1)
const illusHomme = `assets/classes/illustrations/${classId * 10}.png`
const illusFemme = `assets/classes/illustrations/${classId * 10 + 1}.png`

// Boss d'un donjon
const bossIllus = `assets/boss/${dungeonId}.png`

// Élément
const elemIcon = `assets/elements/FIRE.png` // FIRE, WATER, AIR, EARTH, STASIS, LIGHT...

// Rareté
const rarityIcon = `assets/rarities/${rarityId}.png`
```

---

*1510 fichiers — 32 MB total*
