import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// --- NAVIGATION TYPES ---
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Hub: undefined;
  LearningRoom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- STARS CONTEXT ---
// Lives at the app root so stars persist as the user navigates between screens
interface StarsContextValue {
  stars: number;
  addStar: () => void;
}

const StarsContext = createContext<StarsContextValue>({ stars: 0, addStar: () => {} });
const useStars = () => useContext(StarsContext);

// --- SCREEN 1: SPLASH SCREEN ---
function SplashScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
}) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Login'), 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: '#FFD700' }]}>
      <Text style={styles.titleText}>How Money Works</Text>
      <Text style={styles.subtitleText}>Loading...</Text>
    </SafeAreaView>
  );
}

// --- SCREEN 2: LOGIN SCREEN ---
function LoginScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}) {
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: '#87CEEB' }]}>
      <Text style={styles.titleText}>How would you like to log in?</Text>

      <TouchableOpacity
        style={styles.chunkyButton}
        onPress={() => navigation.replace('Hub')}
        accessibilityRole="button"
        accessibilityLabel="Log in with Face ID or fingerprint"
      >
        <Text style={styles.buttonText}>Face ID / Fingerprint</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chunkyButton}
        onPress={() => navigation.replace('Hub')}
        accessibilityRole="button"
        accessibilityLabel="Log in with a 4-digit PIN code"
      >
        <Text style={styles.buttonText}>4-Digit PIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chunkyButton}
        onPress={() => navigation.replace('Hub')}
        accessibilityRole="button"
        accessibilityLabel="Log in with a picture password"
      >
        <Text style={styles.buttonText}>Picture Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// --- SCREEN 3: MAIN HUB ---
function HubScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Hub'>;
}) {
  const { stars } = useStars();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
      <View style={styles.topBar}>
        <View style={styles.starJar}>
          <Text style={styles.starText}>⭐ Star Jar: {stars}</Text>
        </View>
      </View>
      <View style={styles.screen}>
        <Text style={styles.titleText}>Welcome back!</Text>

        <TouchableOpacity
          style={[styles.chunkyButton, { backgroundColor: '#FFA500' }]}
          onPress={() => navigation.navigate('LearningRoom')}
          accessibilityRole="button"
          accessibilityLabel="Go to the Learning Room"
        >
          <Text style={styles.buttonText}>💡 The Learning Room</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chunkyButton, { backgroundColor: '#32CD32' }]}
          onPress={() => Alert.alert('Coming Soon', 'The shop is currently being built!')}
          accessibilityRole="button"
          accessibilityLabel="The Little Money Shop — coming soon"
        >
          <Text style={styles.buttonText}>🏪 The Little Money Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- COIN DATA ---
// Sizes are proportional to real UK coin diameters (base: 5p at 18mm → 50px).
// 20p and 50p use a lower borderRadius to hint at their heptagonal shape.
interface CoinData {
  label: string;
  fullName: string;
  color: string;
  size: number;
  borderRadius: number;
  textColor: string;
}

const COINS: CoinData[] = [
  { label: '1p',  fullName: 'One Penny',    color: '#B87333', size: 56, borderRadius: 28, textColor: '#fff' },
  { label: '2p',  fullName: 'Two Pence',    color: '#CD7F32', size: 72, borderRadius: 36, textColor: '#fff' },
  { label: '5p',  fullName: 'Five Pence',   color: '#C0C0C0', size: 50, borderRadius: 25, textColor: '#333' },
  { label: '10p', fullName: 'Ten Pence',    color: '#A8A8A8', size: 68, borderRadius: 34, textColor: '#333' },
  { label: '20p', fullName: 'Twenty Pence', color: '#C0C0C0', size: 60, borderRadius: 12, textColor: '#333' },
  { label: '50p', fullName: 'Fifty Pence',  color: '#A8A8A8', size: 76, borderRadius: 16, textColor: '#333' },
  { label: '£1',  fullName: 'One Pound',    color: '#D4AF37', size: 65, borderRadius: 32, textColor: '#333' },
  { label: '£2',  fullName: 'Two Pounds',   color: '#B8960C', size: 79, borderRadius: 40, textColor: '#fff' },
];

// --- SCREEN 4: THE LEARNING ROOM ---
function LearningRoomScreen() {
  const { addStar } = useStars();

  const handleCoinPress = useCallback(
    (coin: CoinData) => {
      addStar();
      Alert.alert(coin.fullName, `It is worth ${coin.label}.`);
    },
    [addStar],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        <Text style={styles.titleText}>Meet the Coins</Text>
        <Text style={styles.subtitleText}>Tap a coin to earn a star!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.coinGrid}>
        {COINS.map((coin) => (
          <TouchableOpacity
            key={coin.label}
            style={[
              styles.coin,
              {
                backgroundColor: coin.color,
                width: coin.size,
                height: coin.size,
                borderRadius: coin.borderRadius,
              },
            ]}
            onPress={() => handleCoinPress(coin)}
            accessibilityRole="button"
            accessibilityLabel={`${coin.fullName} — tap to learn about it`}
          >
            <Text style={[styles.coinText, { color: coin.textColor }]}>{coin.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- APP ---
export default function App() {
  const [stars, setStars] = useState(0);
  const addStar = useCallback(() => setStars((s) => s + 1), []);

  return (
    <SafeAreaProvider>
      <StarsContext.Provider value={{ stars, addStar }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Hub" component={HubScreen} />
            <Stack.Screen name="LearningRoom" component={LearningRoomScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StarsContext.Provider>
    </SafeAreaProvider>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  chunkyButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  starJar: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  starText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    padding: 20,
  },
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
