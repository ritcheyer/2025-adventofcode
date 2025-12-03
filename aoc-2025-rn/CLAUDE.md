# CLAUDE.md - AI Assistant Guidelines

## Project Overview

This is a React Native (Expo) app for solving Advent of Code 2025 puzzles. Each day's puzzle has two parts with separate solutions.

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript (strict mode)
- **Styling**: React Native StyleSheet (no external UI libraries)

## Project Structure

```
aoc-2025-rn/
├── inputs/           # Raw puzzle input files (day01.txt, day02.txt, ...)
├── src/
│   ├── solutions/    # One file per day (day01.ts, day02.ts, ...)
│   │   └── index.ts  # Exports all solutions
│   └── utils/        # Shared parsing and helper utilities
│       └── parse.ts  # Common parsing functions
├── App.tsx           # Main UI component
└── [config files]    # package.json, tsconfig.json, etc.
```

## Coding Conventions

### Solution Files

- Each day's solution file exports two functions: `solveDayXXPart1(input: string)` and `solveDayXXPart2(input: string)`
- Functions should return `number | string` (most AoC answers are numbers)
- Import parsing utilities from `../utils/parse`
- Keep solutions self-contained within their day file unless sharing complex utilities

### Naming

- Solution files: `dayXX.ts` (zero-padded, e.g., `day01.ts`, `day12.ts`)
- Input files: `dayXX.txt` (matching solution file names)
- Solution functions: `solveDayXXPart1`, `solveDayXXPart2`

### Adding a New Day
1. Create `inputs/dayXX.txt` with the puzzle input
2. Create `src/solutions/dayXX.ts` with part1 and part2 functions
3. Export from `src/solutions/index.ts`
4. Add to the `solutions` array in `index.ts`

## Common Parsing Patterns
Use utilities from `src/utils/parse.ts`:
- `parseLines(input)` - Split into non-empty lines
- `parseNumbers(line)` - Extract numbers from a line
- `parseGrid(input)` - 2D character grid
- `parseGroups(input)` - Split by blank lines

## Commands
```bash
npm install      # Install dependencies
npx expo start   # Start development server
```

## Style Guidelines
- Use the AoC dark theme colors: `#0f0f23` (background), `#00cc00` (green), `#ffff66` (gold)
- Keep the UI minimal - focus is on solving puzzles, not fancy UI

