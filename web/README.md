## Guess the Output C++ - Web Frontend

Next.js 16 web interface for the "Guess the Output C++" learning game. Built with TypeScript, Tailwind CSS v4, and modern tooling for optimal developer experience.

### Features

- **App Router** (Next.js 16)
- **TypeScript** with strict typing
- **Tailwind CSS v4** with PostCSS
- **React 19** with React Compiler
- **Production-grade linting** (ESLint 9 + security/performance rules)
- **Prettier** with import sorting + Tailwind class optimization
- **Modern import resolution** (`@/*` alias)

### Quick Start

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint     # Lint + format check
npm run format   # Auto-format
```

### 📦 Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Development server         |
| `npm run build`        | Production build           |
| `npm run start`        | Production server          |
| `npm run lint`         | ESLint + TypeScript checks |
| `npm run format:check` | Prettier validation        |
| `npm run format`       | Auto-format codebase       |

### 🔧 Configuration Highlights

- **Prettier**: 100 char width, sorted imports, Tailwind class optimization [prettier.config.mjs]
- **ESLint**: Security scans, unused imports, React hooks, complexity limits [eslint.config.mjs]
- **Tailwind**: v4 with PostCSS integration [@tailwindcss/postcss]

### 📁 Project Structure

```
src/
├── app/           # App Router (pages + layouts)
├── components/    # Reusable UI components
├── lib/           # Utilities + config
├── styles/        # Global styles + Tailwind config
└── types/         # TypeScript definitions
```

### Development Workflow

1. **Code** → Auto-format on save (VS Code recommended)
2. **Lint** → `npm run lint` before commit
3. **Build** → Static export with `npm run build`
4. **Deploy** → Deploy on giyhub pages with `npm run deploy`

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **TypeScript Importer**
