# 📊 Caractéristiques & Maîtrises

## Comment les dégâts sont calculés

Les dégâts dans Wakfu résultent de l'addition de plusieurs maîtrises :

```
Dégâts = (Maîtrise Élémentaire + Maîtrise Géométrique + Maîtrise de Portée) × multiplicateurs situationnels
```

Le jeu additionne uniquement les maîtrises dont les **conditions sont satisfaites** au moment du sort.

---

## Maîtrises Élémentaires

Il existe 4 éléments, chacun avec sa maîtrise dédiée :

| Élément | Symbole | Notes |
|---------|---------|-------|
| Feu 🔥 | Rouge | Souvent associé aux dégâts zone ou DoT |
| Eau 💧 | Bleu | Associé à certains soins et dégâts de zone |
| Terre 🌿 | Vert | Dégâts solides, souvent monocible |
| Air 💨 | Blanc/Gris | Souvent associé à la mobilité et les dégâts rapides |

Chaque sort appartient à un ou plusieurs éléments — la maîtrise élémentaire correspondante s'applique toujours.

---

## Maîtrises de Portée (géographiques)

Ces maîtrises dépendent de la **distance entre le lanceur et la cible** :

| Maîtrise | Condition | Conseil |
|----------|-----------|---------|
| **Mêlée** | Lanceur à ≤ 2 cases de la cible | Idéale pour DPT corps-à-corps (Iop, Sacrieur, Ouginak, Sram) |
| **Distance** | Lanceur à ≥ 3 cases de la cible | Idéale pour DPT à longue portée (Cra, Xelor, Eliotrope) |

> ⚠️ Il est contre-productif de monter les deux maîtrises en même temps, sauf exception (certains Sacrieur ou Steamer avec passifs fusionnant mêlée+distance).

---

## Maîtrises Géométriques (forme du sort)

Ces maîtrises dépendent de la **forme d'impact du sort** :

| Maîtrise | Condition | Conseil |
|----------|-----------|---------|
| **Monocible** | Sort qui touche 1 seule cible | Idéale pour bossing (Cra distance+mono, Sram dos+mono) |
| **Zone** | Sort qui touche plusieurs cases | Idéale pour farm (Iop mêlée+zone, Huppermage zone) |

Ces maîtrises se cumulent avec la maîtrise de portée : exemple Cra = Distance + Monocible.

---

## Maîtrises Situationnelles

| Maîtrise | Condition | Notes |
|----------|-----------|-------|
| **Dos** | Frapper le dos de la cible | Multiplicateur de dégâts élevé — essentiel pour Sram, certains Iop/Sacrieur |
| **Côté** | Frapper le côté de la cible | Multiplicateur intermédiaire, plus accessible que le dos |
| **Berserk** | PV du lanceur < seuil critique | Fort multiplicateur, builds "low HP" très offensifs mais risqués |
| **Soin** | Sorts de guérison | Augmente la puissance des soins prodigués |

---

## Combinaisons optimales par archétype

| Archétype | Maîtrises recommandées |
|-----------|------------------------|
| DPT distance monocible (Cra) | Élémentaire + Distance + Monocible |
| DPT mêlée zone (Iop) | Élémentaire + Mêlée + Zone |
| DPT dos (Sram) | Élémentaire + Mêlée/Distance + (Dos) |
| Tank (Féca/Pandawa) | Résistances + PV + Parade — maîtrises secondaires |
| Healer (Eniripsa) | Élémentaire + Soin (+ zone si heal de groupe) |
| Support offensif (Zobal) | Mêlée + Monocible ou Zone selon deck |

---

## Caractéristiques secondaires importantes

| Stat | Description |
|------|-------------|
| **Résistances élémentaires** | Réduisent les dégâts reçus — prioritaire pour survivre |
| **Points de Vie (PV)** | Pool de santé totale |
| **Parade (Block)** | % de réduction des dégâts d'un coup — très efficace vs. gros hits uniques |
| **Barrière** | Réduction fixe des dégâts après résistances — efficace vs. nombreuses petites frappes |
| **Tacle / Esquive** | Mécaniques de déplacement forcé |
| **Portée (PO)** | Augmente la portée de lancement des sorts |
| **Critique** | % de chance de coup critique (× dégâts supplémentaires) |

---

*→ Voir aussi : [Résistances & Survie](./03-resistances-survie.md) | [Positionnement](./05-positionnement.md)*
