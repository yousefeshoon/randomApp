/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FC } from "react";
import { COLORS, Color } from './colors';
import { formatNumber, parseFormattedNumber } from './numberUtils';

const RandomColorGenerator: FC = () => {
  const [poolSize, setPoolSize] = useState<string>(String(COLORS.length));
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<Color[]>([]);
  const [error, setError] = useState<string>('');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseFormattedNumber(e.target.value);
      if (rawValue === '' || !isNaN(Number(rawValue))) {
        setter(rawValue);
      }
    };

  const formatForDisplay = (value: string) => {
    if (value === '') return '';
    return formatNumber(value);
  };

  const handleGenerate = () => {
    setError('');
    setResults([]);
    const countNum = parseInt(parseFormattedNumber(count), 10);
    const poolSizeNum = parseInt(parseFormattedNumber(poolSize), 10);

    if (isNaN(poolSizeNum) || poolSizeNum <= 0 || poolSizeNum > COLORS.length) {
      setError(`تعداد مخزن باید عددی بین ۱ و ${formatNumber(COLORS.length)} باشد.`);
      return;
    }

    if (isNaN(countNum) || countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      return;
    }
    
    const colorPool: Color[] = COLORS.slice(0, poolSizeNum);

    if (countNum > colorPool.length) {
      setError(`تعداد درخواستی از تعداد رنگ‌های مخزن (${formatNumber(colorPool.length)}) بیشتر است.`);
      return;
    }

    const shuffled = [...colorPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setResults(shuffled.slice(0, countNum));
  };

  return (
    <div>
      <div className="controls name-generator-controls">
        <div className="form-group">
            <label htmlFor="pool-size">تعداد رنگ‌های مخزن:</label>
            <input 
                type="text" 
                inputMode="numeric"
                className="numeric-input"
                id="pool-size" 
                value={formatForDisplay(poolSize)} 
                onChange={handleInputChange(setPoolSize)}
                aria-label="تعداد رنگ‌های مخزن"
            />
        </div>
        <p className="info-text">از بین ۱ تا {formatNumber(COLORS.length)} رنگ برای مخزن انتخاب کنید.</p>
        <div className="count-selector">
          <label id="color-count-label">تعداد خروجی:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="color-count-label">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                role="radio"
                aria-checked={count === String(num)}
                className={`count-option ${count === String(num) ? 'active' : ''}`}
                onClick={() => setCount(String(num))}
              >
                {num}
              </button>
            ))}
            <input
              type="text"
              inputMode="numeric"
              className="count-input numeric-input"
              value={formatForDisplay(count)}
              onChange={handleInputChange(setCount)}
              aria-label="تعداد سفارشی"
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="roll-button" onClick={handleGenerate}>
          ایجاد کن
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && !error && (
        <div className="results">
          <div className="results-grid">
            {results.map((color, index) => (
              <div key={index} className="result-card">
                <h3>
                  <div className="color-swatch" style={{ backgroundColor: color.hex }}></div>
                  {color.name}
                  <span className="english-translation">({color.englishName})</span>
                </h3>
                <p>
                  کد هگز: <span>{color.hex.toUpperCase()}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomColorGenerator;