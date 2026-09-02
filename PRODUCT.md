# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The portfolio serves three audiences without treating them as identical:

- Recruiters and hiring managers need a fast, credible view of Anand Jaiswal's role, strengths, experience, standout work, and contact paths.
- Potential collaborators need deeper evidence of ownership, technical decisions, architecture, and current interests.
- Technical readers need substantial public writing about implementation details, systems, algorithms, and applied AI.

Anand is also the sole user of private Learning Logs, where he keeps short-form notes for his own learning workflow.

## Product Purpose

Present Anand's work and technical thinking clearly enough to support hiring and collaboration, while giving technical readers useful long-form writing. Success means a visitor can understand Anand's strengths quickly and can progressively inspect the evidence behind them.

## Positioning

The site connects concise career proof with inspectable project work and public technical writing, rather than operating as a decorative portfolio or a standalone blog.

## Operating Context

Public visitors scan the homepage, explore project case studies, and read published blog posts. Anand privately records short Learning Logs and selectively develops them into public blog posts.

## Capabilities and Constraints

- Preserve the existing Next.js application, project routes, blog routes, developer authentication, and learning-log workflows.
- Projects and blog posts are public.
- Learning Logs are private and intended only for Anand.
- The homepage must remain quickly scannable while deeper pages serve technical readers.
- During redesign evaluation, one control switches between three complete visual directions that share the same content and component structure.
- The redesign uses a code-first workflow.

## Brand Commitments

- Preserve Anand Jaiswal's name, factual biography, experience, achievements, project information, and existing external-profile links.
- Technical credibility and clear navigation outrank signaling frontend or visual-design expertise.
- The comparison includes a refined terminal/developer identity, a technical editorial atlas, and a kinetic editorial studio built around authored motion and direct navigation.

## Evidence on Hand

- Existing biography, education, experience, achievements, skills, and profile links in `src/app/page.tsx`.
- Existing project data and routes under `content/projects.json` and `src/app/projects/`.
- Existing public blog models, routes, and components under `src/app/blog/`, `src/components/Blog*`, and `src/models/Blog.ts`.
- Existing private learning-log routes and editor under `src/app/logs/`, `src/components/LogEditor.tsx`, and `src/models/LearningLog.ts`.
- Existing profile photography under `public/images/`.
- No testimonials or third-party endorsements may be invented.

## Product Principles

1. Lead with a fast, credible career summary, then let evidence deepen progressively.
2. Keep public reading and private note-taking clearly separated.
3. Show technical substance through specific work and writing rather than visual gimmicks.
4. Make every primary route understandable to non-specialists without flattening technical detail.
5. Keep all three identities connected to the same factual content while allowing Studio one kinetic, demonstrative first-viewport composition.

## Accessibility & Inclusion

Prioritize readable typography, strong contrast, keyboard navigation, clear focus states, reduced-motion support, and responsive layouts across common mobile and desktop widths.
