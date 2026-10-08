import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export function StarBadge({ stars }: { stars: number }) {
  return (
    <View style={styles.badge} accessibilityLabel={`You have ${stars} stars`}>
      <Text style={styles.text}>⭐ Star Jar: {stars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});
