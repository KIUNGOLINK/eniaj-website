# ENIAJ — Silent Power Archive
## Setup Guide — Collection 01

---

### Structure du projet

```
ENIAJ/
├── index.html              ← Site principal (20 pièces complètes)
├── css/
│   └── style.css           ← CSS premium complet (~600 lignes)
├── js/
│   └── app.js              ← GSAP animations cinéma (~300 lignes)
├── video/
│   └── hero.mp4            ← ⚠️ À PLACER : vidéo hero (voir ci-dessous)
├── assets/
│   ├── suits/              ← 5 costumes × 2-3 images chacun
│   ├── jackets/            ← 5 vestes
│   ├── shirts/             ← 5 chemises
│   ├── trousers/           ← 3 pantalons
│   └── outerwear/          ← Manteau minimal + Icon set
└── fonts/                  ← (optionnel) polices locales
```

---

### Placement des assets

#### VIDÉO HERO
Placer dans `video/hero.mp4`
- Format : MP4 H.264
- Résolution recommandée : 1920×1080 minimum
- Durée : 10-30s loop
- Ambiance : nuit urbaine, lumières, mouvements lents

#### IMAGES PAR PIÈCE

**SUITS** (`assets/suits/`)
- `black-authority-suit.jpg`       ← 01 — vue complète
- `black-authority-detail-1.jpg`   ← détail revers/bouton
- `black-authority-detail-2.jpg`   ← détail doublure/étiquette
- `midnight-burgundy.jpg`          ← 02
- `midnight-detail-1.jpg`
- `midnight-detail-2.jpg`
- `emerald-control.jpg`            ← 03
- `emerald-detail-1.jpg`
- `emerald-detail-2.jpg`
- `ivory-presence.jpg`             ← 04
- `shadow-double.jpg`              ← 05

**JACKETS** (`assets/jackets/`)
- `cropped-command.jpg`            ← 06
- `military-silence.jpg`           ← 07
- `night-performance.jpg`          ← 08
- `minimal-peak.jpg`               ← 09
- `satin-inner.jpg`                ← 10

**SHIRTS** (`assets/shirts/`)
- `black-night-shirt.jpg`          ← 11
- `ivory-silence-shirt.jpg`        ← 12
- `burgundy-fluid-shirt.jpg`       ← 13
- `emerald-control-shirt.jpg`      ← 14
- `deep-collar-shirt.jpg`          ← 15

**TROUSERS** (`assets/trousers/`)
- `slim-straight.jpg`              ← 16
- `stage-cut.jpg`                  ← 17
- `high-control.jpg`               ← 18

**OUTERWEAR** (`assets/outerwear/`)
- `minimal-coat.jpg`               ← 19 + placeholder shop 20
- `icon-set.jpg`                   ← (optionnel)

#### FORMAT IMAGES RECOMMANDÉ
- Ratio portrait : **3:4** pour vues complètes
- Ratio paysage : **4:3** pour détails
- Taille max : 1200×1600px (compress avant deploy)
- Format : JPG qualité 85

---

### Lancement local

Ouvrir `index.html` directement dans le navigateur.
OU serveur local :
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```
→ http://localhost:8080

---

### Déploiement

**Vercel** (recommandé)
```bash
npx vercel
```

**Netlify**
Drag & drop le dossier ENIAJ/ sur netlify.com/drop

**GitHub Pages**
Push le dossier, activer Pages dans Settings

---

### Personnalisation

**Couleurs** → `css/style.css` lignes 1-25 (variables CSS)
**Polices** → Changer `--font-serif` et `--font-sans`
**Animations** → `js/app.js` (durées, easing GSAP)
**Prix** → `index.html` (rechercher `€`)
**Textes** → `index.html` directement

---

### Performances

- Images lazy-loaded (`loading="lazy"`)
- Vidéo hero : fallback gradient si MP4 absent
- CSS vars pour cohérence totale
- GSAP CDN (pas de build requis)

---

ENIAJ © 2026 — Silent Power Archive — Collection 01
