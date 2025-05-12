import React from "react";
import { UnitCard, UnitCardProps } from "./UnitCard";

interface FieldGridProps {
  units: UnitCardProps[][];
  onUnitClick: (x: number, y: number) => void;
}

export const FieldGrid: React.FC<FieldGridProps> = ({ units }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {units.flatMap((row, y) =>
        row.map((unit, x) => (
          <UnitCard key={unit?.id || `${x}-${y}`} {...unit} />
        ))
      )}
    </div>
  );
};