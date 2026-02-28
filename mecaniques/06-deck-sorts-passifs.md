# 🃏 Système de Deck de Sorts & Passifs

## Principe du Deck

Wakfu utilise un **système de deck** : avant chaque combat, le joueur sélectionne un ensemble limité de sorts élémentaires, de sorts actifs et de passifs parmi l'arsenal complet de la classe.

Ce système permet une **personnalisation profonde** du style de jeu : deux joueurs avec la même classe peuvent avoir des decks radicalement différents, correspondant à des rôles et des stratégies distinctes.

---

## Emplacements de sorts par niveau

Le nombre d'emplacements de sorts augmente progressivement avec le niveau du personnage :

| Niveau | Emplacements sorts élémentaires |
|--------|-------------------------------|
| Début | 6 sorts |
| Progression | Augmentation par paliers |
| Niveau 200 (max) | Jusqu'à 12 sorts élémentaires |

En plus des sorts élémentaires, des emplacements séparés existent pour :
- Les **sorts actifs** (non-élémentaires) : téléportations, invocations, buffs, etc.
- Les **passifs** : effets permanents actifs durant le combat

---

## Déblocage des Passifs

Les emplacements de passifs se débloquent progressivement :

| Niveau | Passifs disponibles |
|--------|-------------------|
| 10 | 2 passifs |
| 30 | 3 passifs |
| 50 | 4 passifs |
| 100 | 5 passifs |
| 150 | 6 passifs |
| 200 | 6 passifs (maximum) |

---

## Types de Passifs

### Passifs généraux
Disponibles à toutes les classes, ils donnent des bonus de stats (maîtrises, résistances, PV, etc.) ou des effets transversaux.

### Passifs de spécialité de classe
Propres à chaque classe, ils définissent le style de jeu profond :
- **Féca** : augmentation tacle/parade, génération de barrière plus puissante
- **Pandawa** : bonus de placement, amélioration de l'ivresse
- **Iop** : augmentation des dégâts en mêlée, combo de sorts spécifiques
- **Sacrieur** : bonus au seuil berserk, transfert de dégâts, mobilité
- **Osamodas** : renforcement des invocations, polyvalence soin/buff

---

## Construire son Deck — Philosophie

### 1. Définir son rôle avant tout
Le deck doit refléter le rôle que le personnage va tenir en équipe :
- **DPT pur** : sorts offensifs + passifs d'augmentation de dégâts
- **Tank** : sorts défensifs + passifs de résistances/parade/barrière
- **Support** : sorts de buffs + passifs d'amélioration d'alliés
- **Hybride** : mix selon les besoins

### 2. Cohérence des maîtrises
Les sorts choisis doivent utiliser les mêmes types de maîtrises pour éviter la dispersion :
- Ne pas mélanger sorts mêlée et sorts distance sans passif fusionnant les deux
- Choisir entre mono et zone selon le contenu visé (bossing vs farm)
- Vérifier que les passifs renforcent les sorts du deck

### 3. Couverture élémentaire
- Avoir au moins 2 sorts par élément principal pour la flexibilité
- Inclure un sort "hors-élément" si utile (mobilité, buff, etc.)
- Adapter selon les donjons prévus (résistances des ennemis)

---

## Exemples de Decks types

### Cra — DPT Distance Monocible
```
Sorts : 3 sorts Feu distance, 3 sorts Terre distance, 2 sorts Eau distance
        + balises de contrôle + sort de mobilité
Passifs : Distance, Monocible, Critique, Initiative haute
Maîtrises : Élémentaire (Feu/Terre) + Distance + Monocible
```

### Iop — DPT Mêlée Zone
```
Sorts : sorts Terre mêlée AOE, sorts Feu mêlée, sort de mobilité, sort de finition PW
Passifs : Mêlée, Zone, PW generation, Force brute
Maîtrises : Élémentaire (Terre/Feu) + Mêlée + Zone
```

### Féca — Tank Défensif
```
Sorts : glyphes de protection, sorts de barrière, sorts de contre-attaque
Passifs : Parade, Barrière, Résistances, Armure renforcée
Maîtrises : Résistances élémentaires + PV + Parade
```

---

## Respec et adaptation

- Le deck peut être modifié **entre les combats** sans coût particulier
- Il est possible (et conseillé) d'avoir plusieurs configurations sauvegardées pour différents contenus
- Certains donjons requièrent d'adapter le deck aux résistances spécifiques des boss

---

*→ Voir aussi : [Sublimations & Optimisation](./07-sublimations-optimisation.md) | [Caractéristiques & Maîtrises](./02-caracteristiques-maitrises.md)*
