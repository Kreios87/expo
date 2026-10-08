import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, radii } from '../constants/theme';

interface StarPopupProps {
  /** Changing this to a non-null string triggers the pop-in/pop-out animation. */
  message: string | null;
  onHide: () => void;
}

export function StarPopup({ message, onHide }: StarPopupProps) {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message) return;
    translateY.setValue(20);
    opacity.setValue(0);
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]),
      Animated.delay(900),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]);
    animation.start(({ finished }) => {
      if (finished) onHide();
    });
    return () => animation.stop();
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, { opacity, transform: [{ translateY }] }]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: colors.gold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.md,
    zIndex: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});
