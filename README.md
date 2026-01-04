# Personal Website

React + Vite portfolio site driven by local JSON content (no backend).

## Stack
- React + Vite
- Tailwind CSS + shadcn/ui components
- Lucide icons

## Getting Started
1. Install dependencies: `npm install`
2. Start the Vite dev server: `npm run dev`

The site runs at `http://localhost:2301`.

## Scripts
- `npm run dev` - start the dev server
- `npm run build` - production build
- `npm run preview` - preview the build locally

## Content Management
- Source of truth: `data/site-data.json`.
- Example project item: `data/site-data-example.json` (copy into `projects.items`).
- Images can be full URLs or files under `public/`. Use a leading slash for local assets, e.g. `/assets/logos/ntu.png`.
- External links should include a protocol (e.g. `https://github.com/...`). If omitted, `https://` is added automatically.
- Interest items support optional `imageUrl`, `linkUrl`, and `linkLabel`.

## Navigation Order
- Section order and scroll tracking are driven by `src/components/header/navItems.ts`.

## Project Structure
- `data/site-data.json` - site content
- `data/site-data-example.json` - example project entry
- `public/assets/` - static images (logos, etc.)
- `src/` - React components and styles

## Deployment
1. Build the site: `npm run build`
2. Publish the `build/` folder to your static host
