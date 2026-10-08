import { useRouter } from 'expo-router';
import React from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { Title } from '../components/Typography';
import { colors } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const goToHub = () => router.replace('/hub');

  return (
    <ScreenContainer backgroundColor={colors.screens.login}>
      <Title>How would you like to log in?</Title>

      <PrimaryButton
        label="Face ID / Fingerprint"
        onPress={goToHub}
        accessibilityLabel="Log in with Face ID or fingerprint"
      />

      <PrimaryButton
        label="4-Digit PIN"
        onPress={goToHub}
        accessibilityLabel="Log in with a 4-digit PIN code"
      />

      <PrimaryButton
        label="Picture Password"
        onPress={goToHub}
        accessibilityLabel="Log in with a picture password"
      />
    </ScreenContainer>
  );
}
