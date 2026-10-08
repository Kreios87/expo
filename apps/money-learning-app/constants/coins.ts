export interface CoinData {
  label: string;
  fullName: string;
  color: string;
  // Size is proportional to the real UK coin diameter (base: 5p at 18mm -> 50px)
  size: number;
  // 20p and 50p use a lower borderRadius to hint at their heptagonal shape
  borderRadius: number;
  textColor: string;
}

export const COINS: CoinData[] = [
  { label: '1p', fullName: 'One Penny', color: '#B87333', size: 56, borderRadius: 28, textColor: '#fff' },
  { label: '2p', fullName: 'Two Pence', color: '#CD7F32', size: 72, borderRadius: 36, textColor: '#fff' },
  { label: '5p', fullName: 'Five Pence', color: '#C0C0C0', size: 50, borderRadius: 25, textColor: '#333' },
  { label: '10p', fullName: 'Ten Pence', color: '#A8A8A8', size: 68, borderRadius: 34, textColor: '#333' },
  { label: '20p', fullName: 'Twenty Pence', color: '#C0C0C0', size: 60, borderRadius: 12, textColor: '#333' },
  { label: '50p', fullName: 'Fifty Pence', color: '#A8A8A8', size: 76, borderRadius: 16, textColor: '#333' },
  { label: '£1', fullName: 'One Pound', color: '#D4AF37', size: 65, borderRadius: 32, textColor: '#333' },
  { label: '£2', fullName: 'Two Pounds', color: '#B8960C', size: 79, borderRadius: 40, textColor: '#fff' },
];
