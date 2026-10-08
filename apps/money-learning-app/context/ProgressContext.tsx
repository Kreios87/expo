import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = '@money-learning-app/progress';

interface ProgressState {
  stars: number;
  learnedCoins: string[];
  ownedItems: string[];
}

const DEFAULT_STATE: ProgressState = {
  stars: 0,
  learnedCoins: [],
  ownedItems: [],
};

interface ProgressContextValue extends ProgressState {
  isLoaded: boolean;
  /** Awards a star the first time a coin is learned. Returns true if a star was newly earned. */
  learnCoin: (coinLabel: string) => boolean;
  /** Awards `count` stars, e.g. from a quiz result. */
  earnStars: (count: number) => void;
  /** Spends stars on a shop item if affordable and not already owned. Returns true on success. */
  buyItem: (itemId: string, cost: number) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
        }
      } catch {
        // Corrupt or unavailable storage — fall back to defaults rather than crash
      } finally {
        hasLoadedOnce.current = true;
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    // Skip the write that would otherwise fire with DEFAULT_STATE before the initial load resolves
    if (!hasLoadedOnce.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {
      // Best-effort persistence; progress still works for the rest of this session
    });
  }, [state]);

  const learnCoin = (coinLabel: string): boolean => {
    let didEarnStar = false;
    setState((prev) => {
      if (prev.learnedCoins.includes(coinLabel)) return prev;
      didEarnStar = true;
      return {
        ...prev,
        stars: prev.stars + 1,
        learnedCoins: [...prev.learnedCoins, coinLabel],
      };
    });
    return didEarnStar;
  };

  const earnStars = (count: number) => {
    if (count <= 0) return;
    setState((prev) => ({ ...prev, stars: prev.stars + count }));
  };

  const buyItem = (itemId: string, cost: number): boolean => {
    let didBuy = false;
    setState((prev) => {
      if (prev.ownedItems.includes(itemId) || prev.stars < cost) return prev;
      didBuy = true;
      return {
        ...prev,
        stars: prev.stars - cost,
        ownedItems: [...prev.ownedItems, itemId],
      };
    });
    return didBuy;
  };

  return (
    <ProgressContext.Provider value={{ ...state, isLoaded, learnCoin, earnStars, buyItem }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
