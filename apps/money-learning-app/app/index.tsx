import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Subtitle, Title } from '../components/Typography';
import { colors } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/login'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ScreenContainer backgroundColor={colors.screens.splash}>
      <Title>How Money Works</Title>
      <Subtitle>Loading...</Subtitle>
    </ScreenContainer>
  );
}
