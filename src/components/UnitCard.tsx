import React from "react";

export type Suit = "♠️" | "♥️" | "♦️" | "♣️";

export interface UnitCardProps {
  id: string;
  suit: Suit;
  number: number;
  selected: boolean;
  onClick: () => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ id, suit, number, selected, onClick }) => {
  return (
    <div
      className={`border rounded p-2 m-1 cursor-pointer w-16 h-24 flex flex-col items-center justify-center ${
        selected ? "bg-yellow-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="text-xl">{suit}</div>
      <div className="text-2xl font-bold">{number}</div>
    </div>
  );
};