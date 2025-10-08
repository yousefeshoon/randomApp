/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FC } from "react";
import { formatNumber, parseFormattedNumber } from './numberUtils';


const RandomNameGenerator: FC = () => {
  const [names, setNames] = useState<string[]>(['']);
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;

    if (index === names.length - 1 && value.trim() !== '' && names.length < 20) {
      newNames.push('');
    }

    setNames(newNames);
  };

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
    const validNames = names.map(name => name.trim()).filter(name => name !== '');
    const countNum = parseInt(parseFormattedNumber(count), 10);

    if (isNaN(countNum) || countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      return;
    }
    if (validNames.length === 0) {
      setError('لطفاً حداقل یک اسم وارد کنید.');
      return;
    }
    if (countNum > validNames.length) {
      setError('تعداد درخواستی از تعداد اسامی وارد شده بیشتر است.');
      return;
    }

    const shuffled = [...validNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setResults(shuffled.slice(0, countNum));
  };

  return (
    <div>
      <div className="controls name-generator-controls">
        <div className="name-inputs-container">
          <label id="name-list-label">اسامی مورد نظر را وارد کنید:</label>
          <div className="name-inputs-wrapper" role="group" aria-labelledby="name-list-label">
            {names.map((name, index) => (
              <input
                key={index}
                type="text"
                className="name-input"
                placeholder="اسم..."
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                aria-label={`اسم شماره ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="count-selector">
          <label id="name-count-label">تعداد:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="name-count-label">
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
            {results.map((name, index) => (
              <div key={index} className="result-chip">
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomNameGenerator;
