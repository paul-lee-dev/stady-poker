import { Suit } from "../components/UnitCard";

export interface UnitData {
  id: string;
  suit: Suit;
  number: number;
  selected: boolean;
  attack: number;
  attackSpeed: number;
  currentHp: number;
}