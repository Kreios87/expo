import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { CoinData } from '../constants/coins';

interface CoinProps {
  coin: CoinData;
  onPress: () => void;
  learned?: boolean;
}

export function Coin({ coin, onPress, learned = false }: CoinProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
  };

  return (
    <Pressable
      onPress={() => {
        animatePress();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={`${coin.fullName} — tap to learn about it${learned ? ', already learned' : ''}`}
    >
      <Animated.View
        style={[
          styles.coin,
          {
            backgroundColor: coin.color,
            width: coin.size,
            height: coin.size,
            borderRadius: coin.borderRadius,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.label, { color: coin.textColor }]}>{coin.label}</Text>
        {learned ? <Text style={styles.check}>✓</Text> : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  check: {
    position: 'absolute',
    top: 2,
    right: 4,
    fontSize: 12,
    color: '#1A7A1A',
    fontWeight: 'bold',
  },
});
