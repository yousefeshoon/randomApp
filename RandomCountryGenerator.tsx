/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FC } from "react";
import { COUNTRIES, Country } from './countries';
import { formatNumber, parseFormattedNumber } from './numberUtils';

const RandomCountryGenerator: FC = () => {
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<Country[]>([]);
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

    if (isNaN(countNum) || countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      return;
    }
    if (countNum > COUNTRIES.length) {
      setError(`تعداد درخواستی از تعداد کل کشورها (${formatNumber(COUNTRIES.length)}) بیشتر است.`);
      return;
    }

    const shuffled = [...COUNTRIES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setResults(shuffled.slice(0, countNum));
  };

  return (
    <div>
      <div className="controls name-generator-controls">
        <div className="count-selector">
          <label id="country-count-label">تعداد:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="country-count-label">
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
            {results.map((country, index) => (
              <div key={index} className="result-card">
                <h3>
                  {country.name}
                  <span className="english-translation">({country.englishName})</span>
                </h3>
                <p>
                  پایتخت: <span>{country.capital}</span>
                  <span className="english-translation">({country.englishCapital})</span>
                </p>
                <a 
                  href={`https://fa.wikipedia.org/wiki/${country.name.replace(/ /g, '_')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  اطلاعات بیشتر در ویکی‌پدیا
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomCountryGenerator;