import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { solutions } from './src/solutions';
import { getInput, getAvailableDays } from './src/inputs';

interface Results {
  part1: string;
  part2: string;
  part1Correct?: boolean;
  part2Correct?: boolean;
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [useExample, setUseExample] = useState(true);
  const [results, setResults] = useState<Results | null>(null);

  const runSolution = (day: number) => {
    const solution = solutions.find(s => s.day === day);
    if (!solution) return;

    setSelectedDay(day);
    const input = getInput(day, useExample);

    try {
      const part1 = String(solution.part1(input));
      const part2 = String(solution.part2(input));

      // Check against expected example answers
      let part1Correct: boolean | undefined;
      let part2Correct: boolean | undefined;

      if (useExample && solution.example) {
        if (solution.example.part1 !== undefined) {
          part1Correct = part1 === String(solution.example.part1);
        }
        if (solution.example.part2 !== undefined) {
          part2Correct = part2 === String(solution.example.part2);
        }
      }

      setResults({ part1, part2, part1Correct, part2Correct });
    } catch (error) {
      setResults({ part1: 'Error', part2: 'Error' });
    }
  };

  const getVerificationIcon = (correct?: boolean) => {
    if (correct === undefined) return '';
    return correct ? ' ✅' : ' ❌';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Advent of Code 2025</Text>
        <Text style={styles.subtitle}>React Native Edition</Text>
      </View>

      {/* Example Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel, !useExample && styles.toggleLabelActive]}>
          Real Input
        </Text>
        <Switch
          value={useExample}
          onValueChange={setUseExample}
          trackColor={{ false: '#333340', true: '#ffff66' }}
          thumbColor={useExample ? '#0f0f23' : '#cccccc'}
        />
        <Text style={[styles.toggleLabel, useExample && styles.toggleLabelActive]}>
          Example
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.daysGrid}>
          {getAvailableDays().map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.dayButtonSelected,
              ]}
              onPress={() => runSolution(day)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === day && styles.dayButtonTextSelected,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedDay && results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              Day {selectedDay} {useExample ? '(Example)' : '(Real)'}
            </Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Part 1:</Text>
              <Text style={styles.resultValue}>
                {results.part1}{getVerificationIcon(results.part1Correct)}
              </Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Part 2:</Text>
              <Text style={styles.resultValue}>
                {results.part2}{getVerificationIcon(results.part2Correct)}
              </Text>
            </View>
            {useExample && (
              <Text style={styles.hint}>
                💡 Fill in expected answers in src/solutions/index.ts
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333340',
  },
  title: {
    fontSize: 40,
    fontWeight: 'normal',
    color: '#00cc00',
    textShadow: '0 0 10px #00cc00',
  },
  subtitle: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333340',
  },
  toggleLabel: {
    fontSize: 14,
    color: '#666666',
  },
  toggleLabelActive: {
    color: '#ffff66',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  dayButton: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333340',
  },
  dayButtonSelected: {
    backgroundColor: '#00cc00',
    borderColor: '#00cc00',
  },
  dayButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cccccc',
  },
  dayButtonTextSelected: {
    color: '#0f0f23',
  },
  resultsContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333340',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff66',
    marginBottom: 16,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginRight: 8,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00cc00',
    fontFamily: 'monospace',
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
});
