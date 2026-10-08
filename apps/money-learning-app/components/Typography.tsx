import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../constants/theme';

export function Title(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function Subtitle(props: TextProps) {
  return <Text {...props} style={[styles.subtitle, props.style]} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
});
