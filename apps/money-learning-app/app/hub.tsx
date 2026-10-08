import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { StarBadge } from '../components/StarBadge';
import { Title } from '../components/Typography';
import { colors, spacing } from '../constants/theme';
import { useProgress } from '../context/ProgressContext';

export default function HubScreen() {
  const router = useRouter();
  const { stars } = useProgress();

  return (
    <ScreenContainer backgroundColor={colors.screens.hub} centered={false}>
      <View style={styles.topBar}>
        <StarBadge stars={stars} />
      </View>

      <View style={styles.content}>
        <Title>Welcome back!</Title>

        <PrimaryButton
          label="💡 The Learning Room"
          backgroundColor={colors.primary}
          onPress={() => router.push('/learning-room')}
          accessibilityLabel="Go to the Learning Room"
        />

        <PrimaryButton
          label="🧠 Coin Quiz"
          backgroundColor="#9370DB"
          onPress={() => router.push('/quiz')}
          accessibilityLabel="Go to the Coin Quiz"
        />

        <PrimaryButton
          label="🏪 The Little Money Shop"
          backgroundColor={colors.secondary}
          onPress={() => router.push('/shop')}
          accessibilityLabel="Go to the Little Money Shop"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
});
