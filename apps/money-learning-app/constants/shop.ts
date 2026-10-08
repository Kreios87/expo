export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  description: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'sticker-pack', name: 'Sticker Pack', emoji: '✨', cost: 5, description: 'A pack of shiny stickers' },
  { id: 'comic-book', name: 'Comic Book', emoji: '📚', cost: 10, description: 'An exciting comic to read' },
  { id: 'toy-car', name: 'Toy Car', emoji: '🚗', cost: 15, description: 'A cool toy car to race' },
  { id: 'teddy-bear', name: 'Teddy Bear', emoji: '🧸', cost: 20, description: 'A cuddly new friend' },
  { id: 'board-game', name: 'Board Game', emoji: '🎲', cost: 30, description: 'A fun game for the whole family' },
];
