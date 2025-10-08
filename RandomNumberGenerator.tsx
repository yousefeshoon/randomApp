/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, FC, useEffect } from "react";
import { formatNumber, parseFormattedNumber } from './numberUtils';

const RandomNumberGenerator: FC = () => {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('');
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<number[]>([]);
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
  
  const maxPlaceholder = useMemo(() => {
    const minNum = parseInt(parseFormattedNumber(min), 10);
    if (!isNaN(minNum)) {
        return formatNumber(minNum + 1);
    }
    return formatNumber('100');
  }, [min]);

  const handleGenerate = () => {
    setError('');
    const minNum = parseInt(parseFormattedNumber(min), 10);
    const maxNum = parseInt(parseFormattedNumber(max), 10);
    const countNum = parseInt(parseFormattedNumber(count), 10);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      setError('لطفاً مقادیر معتبر عددی وارد کنید.');
      return;
    }

    if (minNum > maxNum) {
      setError('مقدار حداقل نمی‌تواند از حداکثر بیشتر باشد.');
      return;
    }

    if (countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      return;
    }

    const newResults = Array.from(
      { length: countNum },
      () => Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    );
    setResults(newResults);
  };

  const { sum, average } = useMemo(() => {
    if (results.length === 0) {
      return { sum: 0, average: 0 };
    }
    const sum = results.reduce((acc, val) => acc + val, 0);
    const average = sum / results.length;
    return { sum, average };
  }, [results]);

  return (
    <div>
      <div className="controls number-generator-controls">
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="min-number">از:</label>
                <input 
                    type="text" 
                    inputMode="numeric"
                    className="numeric-input"
                    id="min-number" 
                    value={formatForDisplay(min)} 
                    onChange={handleInputChange(setMin)}
                    aria-label="حداقل عدد"
                />
            </div>
            <div className="form-group">
                <label htmlFor="max-number">تا:</label>
                <input 
                    type="text"
                    inputMode="numeric"
                    className="numeric-input" 
                    id="max-number" 
                    value={formatForDisplay(max)} 
                    onChange={handleInputChange(setMax)}
                    placeholder={maxPlaceholder}
                    aria-label="حداکثر عدد"
                />
            </div>
        </div>
        <div className="count-selector">
          <label id="count-label">تعداد:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="count-label">
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
                {results.map((num, index) => (
                    <div key={index} className="result-chip">
                        {formatNumber(num)}
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

export default RandomNumberGenerator;