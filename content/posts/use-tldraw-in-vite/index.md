---
title: "Use tldraw in Vite"
date: "2024-07-31"
categories: ["Web"]
tags: ["Vite"]
summary: Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
---

[Vite](https://vitejs.dev/) is a build tool that aims to provide a faster and leaner development experience for modern web projects. Is consists of two major parts:
- A dev server that provides rich feature enhancements over native ES modules, for example extremly fast Hot Module Replacement(HMR).
- A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

[tldraw](https://tldraw.com/) is a library for creating infinite canvas experiences in [React](https://react.dev/).

To scaffold a Vite+React project, run:
```shell
npm create vite@latest tldraw -- --template react-swc-ts
cd tldraw
npm install
npm run dev
```

Install tldraw library, run:
```shell
npm install tldraw
```

Import fonts and CSS for tldraw, edit `App.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap");
@import url("tldraw/tldraw.css");

body {
  font-family: "Inter";
}
```

Render the tldraw component, edit `App.tsx`:
```tsx
import { Tldraw } from 'tldraw'
import './App.css'

function App() {
    return (
        <div style={{ position: 'fixed', inset: 0 }}>
            <Tldraw />
        </div>
    )
}

export default App
```

You may run `npm run build` to build the app, and run `npm run preview` to test it.
