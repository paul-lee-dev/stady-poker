import { Suit } from "../components/UnitCard";
import { UnitData } from "../types/unit";

export function getRandomSuit(): Suit {
  const suits: Suit[] = ["♠️", "♥️", "♦️", "♣️"];
  return suits[Math.floor(Math.random() * suits.length)];
}

export function generateRandomUnit(): UnitData {
  return {
    id: crypto.randomUUID(),
    suit: getRandomSuit(),
    number: Math.floor(Math.random() * 13) + 1,
    selected: false,
    attack: Math.floor(Math.random() * 5) + 1,
    attackSpeed: 1,
    currentHp: 10,
  };
}

export function generateEnemy() {
  return {
    id: crypto.randomUUID(),
    hp: 10,
    position: 0,
  };
}