import React, { useState } from 'react';
import { generateRandomUnit, generateEnemy } from './logic/unitUtils';
import { FieldGrid } from './components/FieldGrid';
import { Enemy } from './components/Enemy';
import { useGameLoop } from './hooks/useGameLoop';
import { UnitData } from './types/unit';
import { getPokerRank } from './logic/pokerUtils';

const App = () => {
    const [units, setUnits] = useState<(UnitData | null)[][]>(
        Array.from({ length: 3 }, () => Array(5).fill(null))
    );
    const [enemies, setEnemies] = useState<
        { id: string; hp: number; position: number }[]
    >([]);
    const [gold, setGold] = useState(100);
    const [gameOver, setGameOver] = useState(false);

    const handleBuyUnit = () => {
        if (gold < 10) return;
        const newUnit = generateRandomUnit();
        const flat = units.flat();
        const emptyIndex = flat.findIndex((u) => !u);
        if (emptyIndex === -1) return;
        const x = emptyIndex % 5;
        const y = Math.floor(emptyIndex / 5);
        const updated = [...units];
        updated[y][x] = newUnit;
        setUnits(updated);
        setGold((g) => g - 10);
    };

    const toggleUnitSelect = (x: number, y: number) => {
        const updated = [...units];
        const unit = updated[y][x];
        if (!unit) return;
        updated[y][x] = { ...unit, selected: !unit.selected };
        setUnits(updated);
    };

    const combineUnits = () => {
        const selected = units
            .flat()
            .filter((u) => u && u.selected) as UnitData[];
        if (selected.length < 2) return;
        const rank = getPokerRank(selected);
        const bonus =
            rank === 'Pair'
                ? 2
                : rank === 'Triple'
                ? 4
                : rank === 'Flush'
                ? 6
                : 0;
        if (bonus > 0) {
            const newUnit = generateRandomUnit();
            newUnit.attack += bonus;
            const updated = units.map((row) =>
                row.map((unit) => (unit && unit.selected ? null : unit))
            );
            const flat = updated.flat();
            const emptyIndex = flat.findIndex((u) => !u);
            if (emptyIndex === -1) return;
            const x = emptyIndex % 5;
            const y = Math.floor(emptyIndex / 5);
            updated[y][x] = newUnit;
            setUnits(updated);
        }
    };

    const gameTick = () => {
        setEnemies((prev) => {
            const moved = prev.map((e) => ({
                ...e,
                position: e.position + 10,
            }));
            const reached = moved.find((e) => e.position >= 300);
            if (reached) {
                setGameOver(true);
                return [];
            }
            return moved;
        });

        // 유닛이 가장 가까운 적을 공격
        setEnemies((prevEnemies) => {
            const newEnemies = [...prevEnemies];
            units.flat().forEach((unit) => {
                if (!unit) return;
                let closestEnemy = newEnemies.find((e) => e.hp > 0);
                if (closestEnemy) {
                    closestEnemy.hp -= unit.attack;
                }
            });
            return newEnemies.filter((e) => e.hp > 0);
        });
    };

    const { start } = useGameLoop(gameTick, 1000);

    const spawnEnemy = () => {
        setEnemies((prev) => [...prev, generateEnemy()]);
    };

    return (
        <div className='p-4 relative h-[200px]'>
            <h1 className='text-xl font-bold mb-2'>Poker Defense Prototype</h1>
            <div className='mb-2'>Gold: {gold}</div>
            <button
                onClick={handleBuyUnit}
                className='px-4 py-2 bg-blue-500 text-white rounded mb-2'
            >
                랜덤 유닛 구매 (10G)
            </button>
            <button
                onClick={spawnEnemy}
                className='px-4 py-2 bg-red-500 text-white rounded mb-4 ml-2'
            >
                적 스폰
            </button>
            <button
                onClick={start}
                className='px-4 py-2 bg-green-500 text-white rounded mb-4 ml-2'
            >
                게임 시작
            </button>
            <button
                onClick={combineUnits}
                className='px-4 py-2 bg-yellow-500 text-white rounded mb-4 ml-2'
            >
                포커 조합 (강화)
            </button>
            <FieldGrid
                units={units.map((row, y) =>
                    row.map((unit, x) =>
                        unit
                            ? { ...unit, onClick: () => toggleUnitSelect(x, y) }
                            : {
                                  id: `${x}-${y}`,
                                  suit: '♠️',
                                  number: 1,
                                  selected: false,
                                  onClick: () => {},
                              }
                    )
                )}
                onUnitClick={toggleUnitSelect}
            />
            {enemies.map((enemy) => (
                <Enemy key={enemy.id} {...enemy} />
            ))}
            {gameOver && (
                <div className='absolute inset-0 bg-black bg-opacity-70 text-white text-3xl flex items-center justify-center'>
                    Game Over
                </div>
            )}
        </div>
    );
};

export default App;
