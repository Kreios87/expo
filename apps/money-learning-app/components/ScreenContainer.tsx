import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  backgroundColor: string;
  /** Centers children and adds padding — fine for simple screens, turn off for screens that manage their own layout (e.g. a top bar + list). */
  centered?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ScreenContainer({ backgroundColor, centered = true, children, style }: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.base, { backgroundColor }, centered && styles.centered, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
