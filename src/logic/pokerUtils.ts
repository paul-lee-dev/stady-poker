import { Suit } from '../components/UnitCard';

export function getPokerRank(cards: { suit: Suit; number: number }[]): string {
    const numbers = cards.map((c) => c.number).sort((a, b) => a - b);
    const suits = new Set(cards.map((c) => c.suit));

    const isFlush = suits.size === 1;
    const isStraight = numbers.every(
        (n, i, arr) => i === 0 || n === arr[i - 1] + 1
    );
    const counts = numbers.reduce(
        (map, n) => map.set(n, (map.get(n) || 0) + 1),
        new Map()
    );
    const countValues = Array.from(counts.values()).sort((a, b) => b - a);

    if (isFlush && isStraight) return 'Straight Flush';
    if (countValues[0] === 4) return 'Four of a Kind';
    if (countValues[0] === 3 && countValues[1] === 2) return 'Full House';
    if (isFlush) return 'Flush';
    if (isStraight) return 'Straight';
    if (countValues[0] === 3) return 'Triple';
    if (countValues[0] === 2 && countValues.length === 2) return 'Two Pair';
    if (countValues[0] === 2) return 'Pair';
    return 'Nothing';
}
