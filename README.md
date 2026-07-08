# Portfolio

A single-page portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** primitives. Light + dark mode, fully responsive, accessible, and tuned for performance.

Sections: Intro · Experience · Education · Selected Work · About · Contact.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

> Requires Node 18.17+. Fonts (Pixelify Sans + VT323) load from Google Fonts at runtime.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com/new) — zero config. Or `npm run build` and host the output anywhere that runs Node.

## Structure

```
app/            layout, page, global styles + theme tokens
components/
  sections/     hero · work · experience · education · about · contact
  rail.tsx      fixed editorial masthead + section index
  section-label.tsx
  ui/           shadcn primitives (button, badge, ...)
  theme-*.tsx   dark-mode provider + toggle
data/
  portfolio.ts  all data (incl. workExperience + education)
lib/utils.ts    cn() helper
```
