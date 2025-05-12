import React from "react";

export interface EnemyProps {
  id: string;
  hp: number;
  position: number;
}

export const Enemy: React.FC<EnemyProps> = ({ hp, position }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded"
      style={{ left: `${position}px`, top: "0px", transition: "left 0.2s linear" }}
    >
      {hp}
    </div>
  );
};