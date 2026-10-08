import { COINS, CoinData } from './coins';

export interface QuizQuestion {
  answer: CoinData;
  choices: CoinData[];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateQuiz(questionCount = 5): QuizQuestion[] {
  const count = Math.min(questionCount, COINS.length);
  const answers = shuffle(COINS).slice(0, count);

  return answers.map((answer) => {
    const distractors = shuffle(COINS.filter((coin) => coin.label !== answer.label)).slice(0, 2);
    return { answer, choices: shuffle([answer, ...distractors]) };
  });
}
