import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { Subtitle, Title } from '../components/Typography';
import { generateQuiz, QuizQuestion } from '../constants/quiz';
import { colors, radii, spacing } from '../constants/theme';
import { useProgress } from '../context/ProgressContext';

const QUESTION_COUNT = 5;

export default function QuizScreen() {
  const router = useRouter();
  const { earnStars } = useProgress();
  const [questions] = useState<QuizQuestion[]>(() => generateQuiz(QUESTION_COUNT));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const isFinished = index >= questions.length;

  if (isFinished) {
    return (
      <ScreenContainer backgroundColor={colors.screens.quiz}>
        <Title>Quiz Complete!</Title>
        <Subtitle>
          You got {score} out of {questions.length} right.
        </Subtitle>
        <PrimaryButton
          label="🔁 Play Again"
          onPress={() => router.replace('/quiz')}
          accessibilityLabel="Play the quiz again"
        />
        <PrimaryButton
          label="🏠 Back to Hub"
          backgroundColor={colors.primary}
          onPress={() => router.replace('/hub')}
          accessibilityLabel="Back to the Hub"
        />
      </ScreenContainer>
    );
  }

  const current = questions[index];

  const handleChoice = (label: string) => {
    if (selected) return;
    setSelected(label);
    if (label === current.answer.label) {
      setScore((s) => s + 1);
      earnStars(1);
    }
    setTimeout(() => {
      setSelected(null);
      setIndex((i) => i + 1);
    }, 900);
  };

  return (
    <ScreenContainer backgroundColor={colors.screens.quiz}>
      <Subtitle>
        Question {index + 1} of {questions.length}
      </Subtitle>
      <Title>Which coin is {current.answer.fullName}?</Title>

      <View style={styles.choices}>
        {current.choices.map((choice) => {
          const isCorrectChoice = choice.label === current.answer.label;
          const isSelected = selected === choice.label;
          const showResult = selected !== null;

          return (
            <TouchableOpacity
              key={choice.label}
              style={[
                styles.choice,
                { backgroundColor: choice.color },
                showResult && isCorrectChoice && styles.correct,
                showResult && isSelected && !isCorrectChoice && styles.incorrect,
              ]}
              onPress={() => handleChoice(choice.label)}
              disabled={selected !== null}
              accessibilityRole="button"
              accessibilityLabel={`Answer: ${choice.label}`}
            >
              <Text style={[styles.choiceText, { color: choice.textColor }]}>{choice.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  choice: {
    width: 90,
    height: 90,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  correct: {
    borderColor: '#2ECC71',
  },
  incorrect: {
    borderColor: colors.danger,
  },
  choiceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
