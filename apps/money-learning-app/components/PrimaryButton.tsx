import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PrimaryButton({
  label,
  onPress,
  backgroundColor = colors.white,
  accessibilityLabel,
  disabled = false,
  style,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    marginVertical: spacing.sm,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },
});
