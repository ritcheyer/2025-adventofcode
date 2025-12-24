#!/bin/bash

# Script to scaffold and register a new Advent of Code day
# Usage: ./scripts/new-day.sh <day_number>
# Example: ./scripts/new-day.sh 7

set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/new-day.sh <day_number>"
  echo "Example: ./scripts/new-day.sh 7"
  exit 1
fi

DAY=$1
PADDED_DAY=$(printf "%02d" $DAY)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

SOLUTION_FILE="$PROJECT_ROOT/src/solutions/day${PADDED_DAY}.ts"
INPUT_FILE="$PROJECT_ROOT/src/inputs/day${PADDED_DAY}.ts"
NOTES_FILE="$PROJECT_ROOT/notes/day${PADDED_DAY}.md"
INPUTS_INDEX="$PROJECT_ROOT/src/inputs/index.ts"
SOLUTIONS_INDEX="$PROJECT_ROOT/src/solutions/index.ts"

echo "🎄 Scaffolding Day $DAY..."
echo ""

# === Create files from templates (skip if exists) ===
echo "📝 Creating files..."

if [ -f "$SOLUTION_FILE" ]; then
  echo "   ⏭️  Solution file already exists: $SOLUTION_FILE"
else
  sed "s/XX/${PADDED_DAY}/g" "$PROJECT_ROOT/templates/solution.ts.template" > "$SOLUTION_FILE"
  echo "   ✅ $SOLUTION_FILE"
fi

if [ -f "$INPUT_FILE" ]; then
  echo "   ⏭️  Input file already exists: $INPUT_FILE"
else
  sed "s/XX/${PADDED_DAY}/g" "$PROJECT_ROOT/templates/input.ts.template" > "$INPUT_FILE"
  echo "   ✅ $INPUT_FILE"
fi

if [ -f "$NOTES_FILE" ]; then
  echo "   ⏭️  Notes file already exists: $NOTES_FILE"
else
  sed "s/XX/${DAY}/g" "$PROJECT_ROOT/templates/notes.md.template" > "$NOTES_FILE"
  echo "   ✅ $NOTES_FILE"
fi

# === Register in index files ===
echo ""
echo "📋 Registering in index files..."

# Update inputs/index.ts
if grep -q "day${PADDED_DAY}" "$INPUTS_INDEX"; then
  echo "   ⏭️  Already in inputs/index.ts"
else
  # Add import at the end of imports section
  sed -i '' "/^import \* as day/a\\
import * as day${PADDED_DAY} from './day${PADDED_DAY}';
" "$INPUTS_INDEX"

  # Add to inputs record (before the closing brace)
  sed -i '' "s/};$/  ${DAY}: day${PADDED_DAY},\\
};/" "$INPUTS_INDEX"

  echo "   ✅ inputs/index.ts"
fi

# Update solutions/index.ts
if grep -q "solveDay${PADDED_DAY}" "$SOLUTIONS_INDEX"; then
  echo "   ⏭️  Already in solutions/index.ts"
else
  # Add export
  sed -i '' "/^export \* from/a\\
export * from './day${PADDED_DAY}';
" "$SOLUTIONS_INDEX"

  # Add import
  sed -i '' "/^import { solveDay/a\\
import { solveDay${PADDED_DAY}Part1, solveDay${PADDED_DAY}Part2 } from './day${PADDED_DAY}';
" "$SOLUTIONS_INDEX"

  # Add solution entry (before the closing bracket)
  sed -i '' "s/^];$/  {\\
    day: ${DAY},\\
    part1: solveDay${PADDED_DAY}Part1,\\
    part2: solveDay${PADDED_DAY}Part2,\\
    example: { part1: undefined, part2: undefined },\\
  },\\
];/" "$SOLUTIONS_INDEX"

  echo "   ✅ solutions/index.ts"
fi

echo ""
echo "🎉 Day $DAY is ready! Happy coding!"
