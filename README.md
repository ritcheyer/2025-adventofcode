# Advent of Code 2025 - React Native

A React Native app for solving [Advent of Code 2025](https://adventofcode.com/2025) puzzles.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Expo CLI

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

## Project Structure

```plaintext
aoc-2025-rn/
├── inputs/           # Puzzle input files
│   ├── day01.txt
│   ├── day02.txt
│   └── ...
├── src/
│   ├── solutions/    # Daily puzzle solutions
│   │   ├── day01.ts
│   │   ├── day02.ts
│   │   └── index.ts
│   └── utils/        # Utility functions
│       └── parse.ts
├── App.tsx           # Main app component
├── app.json          # Expo configuration
├── babel.config.js   # Babel configuration
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript configuration
```

## Adding Solutions

1. Add your puzzle input to `inputs/dayXX.txt`
2. Implement your solution in `src/solutions/dayXX.ts`
3. Export your solution from `src/solutions/index.ts`
