/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import DiceRoller from './DiceRoller';
import RandomNumberGenerator from './RandomNumberGenerator';
import RandomLetterGenerator from './RandomLetterGenerator';
import RandomNameGenerator from './RandomNameGenerator';
import RandomCountryGenerator from './RandomCountryGenerator';
import RandomStateGenerator from './RandomStateGenerator';
import RandomColorGenerator from './RandomColorGenerator';

const App = () => {
  const [activeTab, setActiveTab] = useState('dice');
  const [canShare, setCanShare] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  useEffect(() => {
    if (navigator.share || navigator.clipboard?.writeText) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'رندوم اپ',
      text: 'یک اپلیکیشن برای ایجاد اعداد تصادفی به روش‌های مختلف.',
      url: window.location.href,
    };

    const showFeedback = (message: string) => {
      setShareFeedback(message);
      setTimeout(() => {
        setShareFeedback('');
      }, 3000);
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return; 
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        console.warn('Web Share API failed, falling back to clipboard.', err);
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showFeedback('لینک کپی شد!');
      } catch (copyErr) {
        console.error('Failed to copy to clipboard:', copyErr);
        showFeedback('کپی با خطا مواجه شد');
      }
    } else {
      showFeedback('اشتراک‌گذاری پشتیبانی نمی‌شود');
    }
  };

  return (
    <>
      <main className="app-container">
        <header>
          <h1>رندوم اپ</h1>
        </header>
        <nav className="tabs">
          <button 
            className={`tab ${activeTab === 'dice' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dice')}
            aria-current={activeTab === 'dice' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'dice'}
            aria-controls="dice-panel"
            id="dice-tab"
          >
            تاس بنداز
          </button>
          <button 
            className={`tab ${activeTab === 'number' ? 'active' : ''}`}
            onClick={() => setActiveTab('number')}
            aria-current={activeTab === 'number' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'number'}
            aria-controls="number-panel"
            id="number-tab"
          >
            عدد رندوم
          </button>
          <button 
            className={`tab ${activeTab === 'letter' ? 'active' : ''}`}
            onClick={() => setActiveTab('letter')}
            aria-current={activeTab === 'letter' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'letter'}
            aria-controls="letter-panel"
            id="letter-tab"
          >
            حرف رندوم
          </button>
          <button 
            className={`tab ${activeTab === 'name' ? 'active' : ''}`}
            onClick={() => setActiveTab('name')}
            aria-current={activeTab === 'name' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'name'}
            aria-controls="name-panel"
            id="name-tab"
          >
            اسم رندوم
          </button>
          <button 
            className={`tab ${activeTab === 'country' ? 'active' : ''}`}
            onClick={() => setActiveTab('country')}
            aria-current={activeTab === 'country' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'country'}
            aria-controls="country-panel"
            id="country-tab"
          >
            کشور رندوم
          </button>
          <button 
            className={`tab ${activeTab === 'state' ? 'active' : ''}`}
            onClick={() => setActiveTab('state')}
            aria-current={activeTab === 'state' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'state'}
            aria-controls="state-panel"
            id="state-tab"
          >
            شهر رندوم
          </button>
          <button 
            className={`tab ${activeTab === 'color' ? 'active' : ''}`}
            onClick={() => setActiveTab('color')}
            aria-current={activeTab === 'color' ? 'page' : undefined}
            role="tab"
            aria-selected={activeTab === 'color'}
            aria-controls="color-panel"
            id="color-tab"
          >
            رنگ رندوم
          </button>
        </nav>
        <div className="tab-content">
          {activeTab === 'dice' && <div id="dice-panel" role="tabpanel" aria-labelledby="dice-tab"><DiceRoller /></div>}
          {activeTab === 'number' && <div id="number-panel" role="tabpanel" aria-labelledby="number-tab"><RandomNumberGenerator /></div>}
          {activeTab === 'letter' && <div id="letter-panel" role="tabpanel" aria-labelledby="letter-tab"><RandomLetterGenerator /></div>}
          {activeTab === 'name' && <div id="name-panel" role="tabpanel" aria-labelledby="name-tab"><RandomNameGenerator /></div>}
          {activeTab === 'country' && <div id="country-panel" role="tabpanel" aria-labelledby="country-tab"><RandomCountryGenerator /></div>}
          {activeTab === 'state' && <div id="state-panel" role="tabpanel" aria-labelledby="state-tab"><RandomStateGenerator /></div>}
          {activeTab === 'color' && <div id="color-panel" role="tabpanel" aria-labelledby="color-tab"><RandomColorGenerator /></div>}
        </div>
      </main>
      {canShare && (
        <div className="share-section">
          <button className="share-button" onClick={handleShare}>
            معرفی برنامه به دیگران
          </button>
          {shareFeedback && (
            <span className="share-feedback" aria-live="polite">
              {shareFeedback}
            </span>
           )}
        </div>
      )}
    </>
  );
};

export default App;
