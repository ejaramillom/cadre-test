# CDR-004 — Pulse: Landing Page

## Goal
Visible, deployable landing page for Pulse. shadcn installed, clean hero + features.
No auth, no DB. Ship it to Vercel.

---

## Commits

### Commit 1 — shadcn init + folder structure
- `npx shadcn@latest init` — slate palette, CSS variables, App Router
- Configure `components.json` to output to `src/shared/ui/atoms/`
- Add components: `button`, `card`, `badge`, `separator`
- Create folder stubs: `src/shared/ui/atoms/`, `src/shared/ui/molecules/`, `src/shared/ui/organisms/`

### Commit 2 — Landing page
- `src/app/page.tsx` — assembles sections
- `src/shared/ui/organisms/Navbar.tsx` — logo (Pulse wordmark) + Sign In button
- `src/shared/ui/organisms/Hero.tsx` — headline, tagline, two CTAs (Get Started + Sign In)
- `src/shared/ui/organisms/Features.tsx` — 3 cards (Share moments / Connect with people / Follow your feed)
- `src/shared/ui/organisms/Footer.tsx` — minimal (Pulse © 2024)
- Responsive, dark-mode ready (shadcn defaults)

### Commit 3 — Sign-in route stub
- `src/app/sign-in/page.tsx` — placeholder (shadcn Card, "Coming soon" or empty form shell)
- CTA links resolve to a real route (no 404 on Get Started click)

---

## Review
After commit 3: ponytail-review → code-reviewer (manual, no harness).

## Deploy
```bash
VERCEL_TOKEN=$VC_TOKEN vercel deploy --prod --yes --scope pulse22
```
