import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { solutions } from './src/solutions';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [results, setResults] = useState<{ part1: string; part2: string } | null>(null);

  const runSolution = (day: number) => {
    const solution = solutions.find(s => s.day === day);
    if (!solution) return;

    setSelectedDay(day);
    // TODO: Load actual input from inputs/dayXX.txt
    const input = '';

    try {
      const part1 = String(solution.part1(input));
      const part2 = String(solution.part2(input));
      setResults({ part1, part2 });
    } catch (error) {
      setResults({ part1: 'Error', part2: 'Error' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>🎄 Advent of Code 2025</Text>
        <Text style={styles.subtitle}>React Native Edition</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.daysGrid}>
          {Array.from({ length: 25 }, (_, i) => i + 1).map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.dayButtonSelected,
                day > solutions.length && styles.dayButtonDisabled,
              ]}
              onPress={() => runSolution(day)}
              disabled={day > solutions.length}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === day && styles.dayButtonTextSelected,
                  day > solutions.length && styles.dayButtonTextDisabled,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedDay && results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Day {selectedDay} Results</Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Part 1:</Text>
              <Text style={styles.resultValue}>{results.part1}</Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Part 2:</Text>
              <Text style={styles.resultValue}>{results.part2}</Text>
            </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00cc00',
    textShadowColor: '#00cc00',
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 4,
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
  dayButtonDisabled: {
    opacity: 0.3,
  },
  dayButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cccccc',
  },
  dayButtonTextSelected: {
    color: '#0f0f23',
  },
  dayButtonTextDisabled: {
    color: '#666666',
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
});
