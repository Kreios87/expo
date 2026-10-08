# How Money Works

A children's money-learning app built with Expo and expo-router.

## Screens

- **Splash** — brief loading screen, then auto-advances to Login.
- **Login** — placeholder sign-in (Face ID, PIN, picture password all lead to the Hub).
- **Hub** — shows the star jar total and links to the three activities below.
- **Learning Room** — tap any of the 8 UK coins to hear its name and value; the first tap on each coin earns a star.
- **Coin Quiz** — a 5-question multiple-choice quiz; each correct answer earns a star.
- **The Little Money Shop** — spend earned stars on virtual items.

## Architecture

- **expo-router** file-based routing (`app/`).
- **`context/ProgressContext.tsx`** holds stars, learned coins, and owned shop items in one place, persisted to `AsyncStorage` so progress survives an app restart.
- **`constants/`** holds coin data, shop items, quiz generation, and the shared theme (colors/spacing/radii).
- **`components/`** holds the reusable pieces (`PrimaryButton`, `Coin`, `StarBadge`, `StarPopup`, `ScreenContainer`, `Typography`) shared across screens.

## Running

```
pnpm install
pnpm --filter money-learning-app start
```
