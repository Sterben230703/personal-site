---
name: Anand Jaiswal Portfolio
description: Engineering evidence presented through console, atlas, and kinetic studio registers.
colors:
  developer-canvas: "#101815"
  developer-surface: "#17231f"
  developer-surface-strong: "#20322b"
  developer-text: "#b9cfc5"
  developer-heading: "#f0f7f3"
  phosphor-mint: "#7bf0bd"
  signal-citron: "#d4ff62"
  developer-rule: "#365246"
  atlas-paper: "#f0eee7"
  atlas-surface: "#f8f6ef"
  atlas-wash: "#dbe4dd"
  atlas-text: "#233a42"
  atlas-ink: "#102c39"
  vermilion-index: "#c33d24"
  atlas-teal: "#1e6674"
  atlas-rule: "#9aaba6"
  studio-bone: "#f3efe5"
  studio-paper: "#fffaf0"
  studio-cobalt: "#1447e6"
  studio-orange: "#ff4d00"
  studio-orange-tint: "#ffb79a"
  studio-black: "#0b0b0b"
typography:
  developer-display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(3.2rem, 7.1vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  atlas-display:
    fontFamily: "Source Serif 4, serif"
    fontSize: "clamp(3.2rem, 7.1vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  studio-display:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(3.4rem, 5.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1
rounded:
  square: "0"
  control: "4px"
  image: "8px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(5rem, 10vw, 10rem)"
components:
  primary-action:
    backgroundColor: "{colors.phosphor-mint}"
    textColor: "{colors.developer-canvas}"
    rounded: "{rounded.square}"
    padding: "0.7rem 1.15rem"
    height: "48px"
  theme-comparison:
    backgroundColor: "{colors.developer-surface}"
    textColor: "{colors.developer-text}"
    rounded: "{rounded.pill}"
    padding: "3px"
    height: "38px"
  project-container:
    backgroundColor: "{colors.developer-surface}"
    textColor: "{colors.developer-text}"
    rounded: "{rounded.square}"
    padding: "1.5rem"
  search-field:
    backgroundColor: "{colors.developer-surface}"
    textColor: "{colors.developer-text}"
    rounded: "{rounded.square}"
    padding: "0.5rem 0.75rem"
---

# Design System: Anand Jaiswal Portfolio

## Overview

**Creative North Star: "Evidence in Three Registers"**

The portfolio behaves like one body of engineering evidence interpreted through three complete visual languages. Developer Console is graphite-green, phosphor-mint, blunt, and compressed; Technical Field Atlas is warm paper, ink-blue, vermilion-indexed, and editorial; Studio is warm bone, cobalt, signal orange, kinetic, and editorial. None is a novelty skin. Each gives the same verified facts a coherent voice.

The system is evidence-first and deliberately flat. DEV and ATLAS share the same dossier topology. STUDIO replaces the first-viewport evidence rail with a kinetic working reel and three editorial cuts, then carries the bold color-block language through work, writing, and detail routes. The interface remains asymmetric, sectional, and inspectable.

**Key Characteristics:**

- Three complete identities over one factual information architecture, with one authored kinetic stage in STUDIO.
- Self-hosted, legibility-led type with register-specific display faces.
- Flat surfaces separated by rules, tonal fields, and typography rather than ambient shadow.
- Large evidence-led sections with compact labels and explicit metadata.
- Stable, keyboard-accessible navigation that remains fully visible on mobile.
- A labeled three-state theme control, reduced-motion-safe View Transitions, and one authored reel animation.

## Colors

Developer Console uses botanical graphite and luminous signals; Technical Field Atlas uses mineral paper, ink-blue, and vermilion indexing; Studio uses warm bone and paper, saturated cobalt, signal orange, orange tint, and black.

### Primary

- **Phosphor Mint:** Developer Console actions, active rules, selection, focus, and evidence labels. It should read as a live signal against the dark canvas.
- **Vermilion Index:** Technical Field Atlas actions, underlines, focus, and indexing marks. Its scarcity gives annotations authority.
- **Studio Cobalt:** Hero field, index headers, card rules, tags, and detail headings.

### Secondary

- **Signal Citron:** A high-energy secondary signal reserved for the Developer Console.
- **Atlas Teal:** A cooler supporting accent for atlas annotations and secondary emphasis.
- **Signal Orange:** Primary actions, active navigation, playhead, experience field, and detail rules.
- **Orange Tint:** Secondary links, reel metadata, capability labels, and warm hover surfaces.

### Neutral

- **Developer Canvas, Surface, and Strong Surface:** A stepped graphite-green field for the page, evidence rail, and stronger nested regions.
- **Developer Text and Heading:** Muted eucalyptus copy with near-white headings preserves hierarchy without relying on size alone.
- **Atlas Paper, Surface, and Wash:** Warm paper layers provide quiet sectional contrast without simulating floating sheets.
- **Atlas Text and Ink:** Blue-gray prose and deep ink headings make the atlas feel printed and technical rather than nostalgic.
- **Developer Rule and Atlas Rule:** Theme-specific dividers organize evidence and remain visible without becoming frames.
- **Studio Bone and Paper:** The body canvas and brighter reading/card surface create a warm editorial base.
- **Studio Black:** Reel stage, closing field, ink text, and structural lines provide hard contrast.

### Named Rules

**The Three Registers Rule.** Never mix console phosphor, atlas vermilion-paper, or studio cobalt-orange cues across identities. A theme is a complete reading of the system.

**The Signal Rarity Rule.** Accent colors identify action, focus, active state, or metadata; they do not flood large decorative regions.

## Typography

**Display Font:** Archivo Black for Developer Console; Source Serif 4 for Technical Field Atlas; Atkinson Hyperlegible for Studio
**Body Font:** Atkinson Hyperlegible
**Label/Mono Font:** The platform monospace stack for console-like technical labels

**Character:** All three shipped families are self-hosted and chosen for recognition at scanning speed. Atkinson stabilizes body reading across all registers and becomes STUDIO's direct humanist headline voice; the other display faces shift from blunt compiled output to annotated field publication.

### Hierarchy

- **Display** (400 console / 600 atlas / 700 studio, fluid to 6rem, 0.9 line-height): Hero identity, studio index headers, and closing statements; tightly tracked and left aligned.
- **Headline** (400 console / 600 atlas, `clamp(2rem, 4vw, 4.6rem)`, 0.95 line-height): Major section names and structural wayfinding.
- **Title** (700, fluid by context): Project, role, and secondary-page titles; compact enough to remain attached to their evidence.
- **Body** (400, 15px base, 1.65–1.75 line-height): Explanations and long reading, generally held between 55ch and 70ch.
- **Label** (700–800, approximately 0.65–0.72rem): Dates, categories, evidence keys, and link prompts. Labels may use uppercase when they behave as indices.

### Named Rules

**The Shared Reading Rule.** Body typography does not change between identities; display and label treatments carry the register shift, with Atkinson serving both body and humanist display in STUDIO.

**The Tight Display Rule.** Large headings use compact leading and negative tracking, but body copy never inherits that compression.

## Layout

DEV and ATLAS open on an asymmetric two-column evidence composition: identity occupies roughly two-thirds and the dossier rail one-third. STUDIO uses a `1.05fr / .95fr` split placing identity beside the kinetic editorial stage. Subsequent sections retain the shared evidence sequence. Secondary routes sit in centered containers capped at 1180px, expanding to 1280px in STUDIO; reading-heavy content narrows to roughly 70–72ch.

At 900px and below, evidence grids become one column. The dossier rail or Studio stage follows identity; the stage retains a 360px reel window and reaches at least 650px overall. At 560px, the three editorial cuts stack into 64px-minimum rows. The top bar becomes a two-row grid: identity and three-state control remain first, while route links become an equal-width second row. Links do not collapse into a menu or horizontal scroller.

**The Factual Topology Rule.** All registers preserve facts, literal route destinations, actions, and the post-hero evidence sequence. STUDIO alone replaces the hero dossier with its authored reel stage.

**The Document Scroll Rule.** The body and main document remain visibly scrollable in every theme (`overflow: visible`); only contained media windows clip their own animation.

**The Evidence at the Fold Rule.** The hero earns a full desktop viewport, and selected work begins immediately after its boundary rather than being buried under decorative preamble.

## Elevation & Depth

The redesign is flat by default. Rules, tonal fields, hard color blocks, and typographic scale establish depth. DEV and ATLAS project containers may gain a restrained shadow while lifting 4px. STUDIO cards use no shadow: they lift 6px and warm from paper to orange tint.

### Shadow Vocabulary

- **Interactive Lift** (`0 18px 45px color-mix(in srgb, var(--text-heading) 14%, transparent)`): Hover feedback for linked project containers only.
- **Active Inset Rule** (`inset 0 -2px var(--accent-primary)`): Persistent route state in the top navigation.

### Named Rules

**The Rule-Before-Shadow Rule.** Separate regions with borders, spacing, and tonal change first. STUDIO uses color exchange and translation rather than shadow.

## Shapes

The core form language is rectilinear: sections, cards, search fields, stage windows, and evidence rows use square corners and visible rules. The three-state comparison is a compact pill. Studio cards use small square timeline markers as editorial indexing, not diagram nodes. Images may use a modest 8px radius on generic reading surfaces, while the homepage portrait is rectangular.

**The One Pill Rule.** Reserve fully rounded control geometry for the three-state theme comparison and true badges; do not soften Studio's editorial blocks into rounded cards.

## Components

### Buttons

- **Shape:** Square and compact, with a minimum 48px primary action height.
- **Primary:** Theme accent against the current canvas, heavy text, and `0.7rem 1.15rem` padding.
- **Hover / Focus:** Hover inverts toward the heading color; every keyboard focus receives a 3px accent outline offset by 4px.
- **Text action:** Heading-colored, bold, and underlined with the current accent at a 6px offset.

### Chips

- **Style:** Compact indexed labels. Atlas-like/system variants use square rules; retained utility badges may use a pill only when the content is genuinely tag-like.
- **State:** Selection is communicated by solid high-contrast fill, never by opacity alone when the chip controls filtering.

### Cards / Containers

- **Corner Style:** Square in the redesigned shared surfaces.
- **Background:** The current theme surface with a one-pixel rule.
- **Shadow Strategy:** Flat at rest; linked project containers may use Interactive Lift on hover.
- **Internal Padding:** 1.5rem is the recurring card interior.

### Inputs / Fields

- **Style:** Current theme surface, one-pixel rule, square corners, and compact `0.5rem 0.75rem` inset spacing.
- **Focus:** The universal accent outline remains visible and offset; field-specific focus may reinforce it with an accent border.
- **Error / Disabled:** Preserve clear text labels and contrast; never encode state through theme color alone.

### Navigation

The sticky top bar holds identity, public routes, optional authenticated Logs, external profiles, and the theme comparison. Active routes use a two-pixel inset accent rule; hover uses the current surface. On mobile, social icons hide but primary routes and the theme switch remain stable and visible in a two-row grid.

### Theme Comparison

The `DEV / ATLAS / STUDIO` group exposes three real buttons with `aria-pressed`, not one cycling mystery control. The active segment uses the current accent on the canvas. Selection persists locally and uses the View Transitions API: the old root fades over 180ms and the new root reveals top-to-bottom over 420ms. Reduced motion bypasses the transition.

### Evidence Rail

The signature homepage component combines a treated portrait, ruled definition-list rows, and external proof links. It behaves like a compact dossier in both identities: grayscale luminosity in Developer Console, restrained saturation and contrast in Technical Field Atlas.

### Studio Reel Stage

The STUDIO-only stage places a black reel window beside the hero. BUILD, FAST, THINK, DEEP, and SHIP repeat in an oversized vertical strip crossing a fixed orange playhead. One 13-second `cubic-bezier(.16,1,.3,1)` animation advances the reel; hovering the window or focusing anything in the stage pauses it. Reduced motion removes animation and fixes the strip at `translateY(-20%)`.

### Studio Index, Card, and Detail

STUDIO keeps literal navigation vocabulary: Home, Writing, Work, About, and authenticated Logs. Project and writing indexes open with cobalt editorial headers and direct descriptive copy. Work cards use `WORK 01` indexing, a black/orange/cobalt marker line, “Selected project,” compact outlined stack tags, and “Open project.” Detail pages use an orange top rule, cobalt headings and badges, and a 72ch warm-paper prose field; private cards use a cobalt top rule.

## Do's and Don'ts

### Do:

- **Do** preserve factual content and literal route vocabulary across all three registers while retaining STUDIO's reel-stage exception.
- **Do** use rules, labels, dates, and specific outcomes to make evidence inspectable.
- **Do** keep Atkinson Hyperlegible as the shared reading voice and use the register-specific display face decisively.
- **Do** keep keyboard focus visible and honor reduced-motion preferences for theme changes and scrolling.
- **Do** pause the reel on hover or any focus within the stage and ship a static reduced-motion state.
- **Do** let primary evidence occupy generous space while keeping explanatory copy to readable line lengths.

### Don't:

- **Don't** combine palette, typography, or annotation cues from different identities in one theme.
- **Don't** replace the asymmetric evidence composition with a centered hero followed by a generic card grid.
- **Don't** use rounded cards or ambient shadow as the default depth system.
- **Don't** collapse mobile navigation or the three-state identity control into an unstable or hidden interaction.
- **Don't** add competing Studio animations; the 13-second vertical reel is the authored motion system.
- **Don't** trap page scrolling inside `main`; document scrolling remains visible in every theme.
- **Don't** use decorative terminal syntax, atlas marks, or motion unless they clarify identity, navigation, or evidence.
