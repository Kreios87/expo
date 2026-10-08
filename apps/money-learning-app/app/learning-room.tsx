import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Coin } from '../components/Coin';
import { ScreenContainer } from '../components/ScreenContainer';
import { StarPopup } from '../components/StarPopup';
import { Subtitle, Title } from '../components/Typography';
import { COINS, CoinData } from '../constants/coins';
import { colors, spacing } from '../constants/theme';
import { useProgress } from '../context/ProgressContext';

export default function LearningRoomScreen() {
  const { learnedCoins, learnCoin } = useProgress();
  const [popup, setPopup] = useState<string | null>(null);

  const handleCoinPress = (coin: CoinData) => {
    const earnedStar = learnCoin(coin.label);
    Alert.alert(coin.fullName, `It is worth ${coin.label}.`);
    if (earnedStar) {
      setPopup('⭐ +1 star!');
    }
  };

  return (
    <ScreenContainer backgroundColor={colors.screens.learningRoom} centered={false}>
      <View style={styles.header}>
        <Title>Meet the Coins</Title>
        <Subtitle>Tap a coin to earn a star!</Subtitle>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {COINS.map((coin) => (
          <Coin
            key={coin.label}
            coin={coin}
            learned={learnedCoins.includes(coin.label)}
            onPress={() => handleCoinPress(coin)}
          />
        ))}
      </ScrollView>

      <StarPopup message={popup} onHide={() => setPopup(null)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    padding: spacing.md,
  },
});
