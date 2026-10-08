import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { StarBadge } from '../components/StarBadge';
import { Title } from '../components/Typography';
import { SHOP_ITEMS, ShopItem } from '../constants/shop';
import { colors, radii, spacing } from '../constants/theme';
import { useProgress } from '../context/ProgressContext';

export default function ShopScreen() {
  const { stars, ownedItems, buyItem } = useProgress();

  const handleBuy = (item: ShopItem) => {
    if (ownedItems.includes(item.id)) return;
    if (stars < item.cost) {
      const needed = item.cost - stars;
      Alert.alert(
        'Not enough stars',
        `You need ${needed} more star${needed === 1 ? '' : 's'} to buy the ${item.name}.`,
      );
      return;
    }
    if (buyItem(item.id, item.cost)) {
      Alert.alert('Nice!', `You bought the ${item.name}!`);
    }
  };

  return (
    <ScreenContainer backgroundColor={colors.screens.shop} centered={false}>
      <View style={styles.topBar}>
        <StarBadge stars={stars} />
      </View>

      <Title style={styles.heading}>The Little Money Shop</Title>

      <FlatList
        data={SHOP_ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const owned = ownedItems.includes(item.id);
          return (
            <View style={styles.row}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.cost}>⭐ {item.cost}</Text>
              </View>
              <PrimaryButton
                label={owned ? 'Owned' : 'Buy'}
                onPress={() => handleBuy(item)}
                disabled={owned}
                backgroundColor={owned ? '#CCCCCC' : colors.secondary}
                style={styles.buyButton}
                textStyle={styles.buyButtonText}
                accessibilityLabel={
                  owned ? `${item.name} already owned` : `Buy ${item.name} for ${item.cost} stars`
                }
              />
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  heading: {
    marginTop: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 36,
    marginRight: spacing.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 2,
  },
  buyButton: {
    width: 90,
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  buyButtonText: {
    fontSize: 16,
  },
});
