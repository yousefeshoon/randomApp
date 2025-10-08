/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, FC } from "react";
import { DOT_PATTERNS } from './data';
import { formatNumber } from './numberUtils';

interface DieProps {
  value: number;
  isRolling: boolean;
}

const Die: FC<DieProps> = ({ value, isRolling }) => {
  const dots = DOT_PATTERNS[value] || [];

  return (
    <div className={`die ${isRolling ? "rolling" : ""}`} aria-label={`تاس ${value}`}>
      {dots.map((area) => (
        <span key={area} className="dot" data-area={area}></span>
      ))}
    </div>
  );
};

const DiceRoller: FC = () => {
  const [numberOfDice, setNumberOfDice] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    const newValues = Array.from(
      { length: numberOfDice },
      () => Math.floor(Math.random() * 6) + 1
    );

    setTimeout(() => {
      setDiceValues(newValues);
      setIsRolling(false);
    }, 1000);
  };

  const { sum, average } = useMemo(() => {
    if (diceValues.length === 0) {
      return { sum: 0, average: 0 };
    }
    const sum = diceValues.reduce((acc, val) => acc + val, 0);
    const average = sum / diceValues.length;
    return { sum, average };
  }, [diceValues]);

  return (
    <div>
      <div className="controls">
        <div className="dice-count-selector">
          <label htmlFor="dice-count">تعداد تاس‌ها:</label>
          <div className="dice-options">
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <input
                  type="radio"
                  id={`dice-${num}`}
                  name="dice-count"
                  value={num}
                  checked={numberOfDice === num}
                  onChange={() => setNumberOfDice(num)}
                  disabled={isRolling}
                />
                <label htmlFor={`dice-${num}`}>{num}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="roll-button" onClick={handleRoll} disabled={isRolling}>
          {isRolling ? "صبر کنید..." : "تاس بنداز"}
        </button>
      </div>

      <div className="dice-container">
        {(diceValues.length > 0 ? diceValues : Array.from({ length: numberOfDice }).map(() => 1)).map((value, index) => (
            <Die key={index} value={value} isRolling={isRolling} />
        ))}
      </div>
      
      {diceValues.length > 0 && !isRolling && (
        <div className="results">
          <div className="results-grid">
            {diceValues.map((value, index) => (
              <div key={index} className="result-chip">
                {formatNumber(value)}
              </div>
            ))}
          </div>
          <div className="summary-stats">
            <p>مجموع اعداد: <span>{formatNumber(sum)}</span></p>
            <p>میانگین اعداد: <span>{average.toLocaleString('fa-IR', { maximumFractionDigits: 2 })}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;