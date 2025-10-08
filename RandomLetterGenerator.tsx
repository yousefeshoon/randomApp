/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FC } from "react";
import { PERSIAN_ALPHABET, ENGLISH_ALPHABET, GREEK_ALPHABET } from './data';
import { formatNumber, parseFormattedNumber } from './numberUtils';

const RandomLetterGenerator: FC = () => {
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>('persian');
  const [count, setCount] = useState<string>('1');
  const [results, setResults] = useState<string[]>([]);
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

  const handleAlphabetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAlphabet(e.target.value);
  };

  const handleGenerate = () => {
    setError('');
    const countNum = parseInt(parseFormattedNumber(count), 10);
    if (isNaN(countNum) || countNum <= 0) {
      setError('تعداد خروجی باید حداقل ۱ باشد.');
      setResults([]);
      return;
    }

    let characterPool: string[] = [];
    switch (selectedAlphabet) {
      case 'persian':
        characterPool = PERSIAN_ALPHABET;
        break;
      case 'english':
        characterPool = ENGLISH_ALPHABET;
        break;
      case 'greek':
        characterPool = GREEK_ALPHABET;
        break;
    }

    const newResults = Array.from(
      { length: countNum },
      () => characterPool[Math.floor(Math.random() * characterPool.length)]
    );
    setResults(newResults);
  };

  return (
    <div>
      <div className="controls number-generator-controls">
        <div className="alphabet-selector">
          <label>الفبای مورد نظر را انتخاب کنید:</label>
          <div className="alphabet-options">
            <React.Fragment>
              <input
                type="radio"
                id="alpha-persian"
                name="alphabet"
                value="persian"
                checked={selectedAlphabet === 'persian'}
                onChange={handleAlphabetChange}
              />
              <label htmlFor="alpha-persian">فارسی</label>
            </React.Fragment>
            <React.Fragment>
              <input
                type="radio"
                id="alpha-english"
                name="alphabet"
                value="english"
                checked={selectedAlphabet === 'english'}
                onChange={handleAlphabetChange}
              />
              <label htmlFor="alpha-english">انگلیسی</label>
            </React.Fragment>
            <React.Fragment>
              <input
                type="radio"
                id="alpha-greek"
                name="alphabet"
                value="greek"
                checked={selectedAlphabet === 'greek'}
                onChange={handleAlphabetChange}
              />
              <label htmlFor="alpha-greek">یونانی</label>
            </React.Fragment>
          </div>
        </div>
        <div className="count-selector">
          <label id="letter-count-label">تعداد:</label>
          <div className="count-options" role="radiogroup" aria-labelledby="letter-count-label">
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
            {results.map((letter, index) => (
              <div key={index} className="result-chip">
                {letter}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomLetterGenerator;
