/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FC } from "react";
import { IRAN_STATES, USA_STATES, State } from './states';
import { formatNumber, parseFormattedNumber } from './numberUtils';

const RandomStateGenerator: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('iran');
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<State[]>([]);
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

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(e.target.value);
    setResults([]);
    setError('');
  };

  const handleGenerate = () => {
    setError('');
    setResults([]);
    const countNum = parseInt(parseFormattedNumber(count), 10);

    if (isNaN(countNum) || countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      return;
    }
    
    const statePool = selectedCountry === 'iran' ? IRAN_STATES : USA_STATES;

    if (countNum > statePool.length) {
      setError(`تعداد درخواستی از تعداد کل استان‌ها/ایالت‌ها (${formatNumber(statePool.length)}) بیشتر است.`);
      return;
    }

    const shuffled = [...statePool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setResults(shuffled.slice(0, countNum));
  };

  return (
    <div>
      <div className="controls name-generator-controls">
        <div className="alphabet-selector">
          <label>کشور مورد نظر را انتخاب کنید:</label>
          <div className="alphabet-options">
            <React.Fragment>
              <input
                type="radio"
                id="country-iran"
                name="country"
                value="iran"
                checked={selectedCountry === 'iran'}
                onChange={handleCountryChange}
              />
              <label htmlFor="country-iran">ایران</label>
            </React.Fragment>
            <React.Fragment>
              <input
                type="radio"
                id="country-usa"
                name="country"
                value="usa"
                checked={selectedCountry === 'usa'}
                onChange={handleCountryChange}
              />
              <label htmlFor="country-usa">آمریکا</label>
            </React.Fragment>
          </div>
        </div>
        <div className="count-selector">
          <label id="state-count-label">تعداد:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="state-count-label">
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
            {results.map((state, index) => (
              <div key={index} className="result-card">
                <h3>
                  {state.name}
                  <span className="english-translation">({state.englishName})</span>
                </h3>
                <p>
                  مرکز: <span>{state.capital}</span>
                  <span className="english-translation">({state.englishCapital})</span>
                </p>
                <a 
                  href={`https://fa.wikipedia.org/wiki/${state.name.replace(/ /g, '_')}`} 
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

export default RandomStateGenerator;
