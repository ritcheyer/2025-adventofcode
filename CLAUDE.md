# CLAUDE.md - AI Assistant Guidelines

## ⚠️ IMPORTANT: No Spoilers Rule

**This is Advent of Code - a puzzle challenge. DO NOT provide direct solutions or answers.**

Instead, when helping with puzzles:

- ✅ Give hints and nudges in the right direction
- ✅ Explain algorithms or data structures that might be useful
- ✅ Help identify edge cases to consider
- ✅ Review code for bugs WITHOUT revealing the fix directly
- ✅ Ask guiding questions ("Have you considered what happens when...?")
- ✅ Explain why an approach might not work
- ✅ Help with parsing input or setting up boilerplate
- ❌ Never provide the final solution or answer
- ❌ Never write the core algorithm logic
- ❌ Never reveal the "trick" or insight needed to solve the puzzle

You are a **pair programming buddy**, not a cheatsheet. Help me learn and discover the solution myself!

---

## Project Overview

This is a React Native (Expo) app for solving Advent of Code 2025 puzzles. Each day's puzzle has two parts with separate solutions.

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript (strict mode)
- **Styling**: React Native StyleSheet (no external UI libraries)

## Project Structure

```plaintext
2025-adventofcode/
├── src/
│   ├── inputs/       # Input data as TS modules
│   │   ├── day01.ts  # exports { example, input }
│   │   └── index.ts  # getInput(day, useExample)
│   ├── solutions/    # One file per day (day01.ts, day02.ts, ...)
│   │   └── index.ts  # Exports all solutions + expected answers
│   └── utils/        # Shared parsing and helper utilities
│       └── parse.ts  # Common parsing functions
├── notes/            # Planning notes for each day
├── scripts/          # Automation scripts
│   └── new-day.sh    # Scaffold and register a new day
├── templates/        # Templates for new days
├── App.tsx           # Main UI with Example/Real toggle
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
- Input files: `dayXX.ts` (matching solution file names)
- Solution functions: `solveDayXXPart1`, `solveDayXXPart2`

### Documentation

- Use JSDoc (`/** */`) with `@param`/`@returns` for **functions**
- Use simple `//` comments for inline code explanations

### Commit Messages

- Include what was solved and key learnings
- Example: `Day 8 Part 1: Connect junction boxes using Union-Find ⭐`

### Adding a New Day

Run the scaffolding script:

```bash
./scripts/new-day.sh <day_number>
# Example: ./scripts/new-day.sh 7
```

This automatically:
1. Creates `src/inputs/dayXX.ts` with `example` and `input` exports
2. Creates `src/solutions/dayXX.ts` with part1 and part2 functions
3. Creates `notes/dayXX.md` with a blank scaffold
4. Registers the day in both index files

After scaffolding, fill in the expected example answers in `src/solutions/index.ts`.

**Note:** If `notes/dayXX.md` already exists, the script will fail. Manually create the other files or delete the notes file first.

### Input Files (src/inputs/dayXX.ts)

```typescript
export const example = `
3   4
4   3
`.trim();

export const input = `
// paste your real puzzle input here
`.trim();
```

### Expected Answers (src/solutions/index.ts)

```typescript
{
  day: 1,
  part1: solveDay01Part1,
  part2: solveDay01Part2,
  example: { part1: 11, part2: 31 },  // from puzzle description
}
```

## Common Parsing Patterns

Use utilities from `src/utils/parse.ts`:

- `parseLines(input)` - Split into non-empty lines
- `parseLinesWithEmpty(input)` - Split into lines, keeping empty ones
- `parseNumbers(line)` - Extract numbers from a line (whitespace-separated)
- `parseGrid(input)` - 2D character grid
- `parseNumberGrid(input)` - 2D number grid (single digits)
- `parseGroups(input)` - Split by blank lines into groups

## Commands

```bash
npm install               # Install dependencies
npx expo start            # Start development server
./scripts/new-day.sh 7    # Scaffold Day 7 (creates files + registers)
```

## Style Guidelines

- Use the AoC dark theme colors: `#0f0f23` (background), `#00cc00` (green), `#ffff66` (gold)
- Keep the UI minimal - focus is on solving puzzles, not fancy UI
