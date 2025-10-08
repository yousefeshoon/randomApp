/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const formatNumber = (num: number | string) => {
    const numValue = typeof num === 'string' ? Number(num) : num;
    if (isNaN(numValue)) return '';
    return numValue.toLocaleString('fa-IR');
};

export const parseFormattedNumber = (str: string): string => {
    if (typeof str !== 'string') return '';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';

    let result = str
        .replace(/٬/g, '') // Persian separator
        .replace(/,/g, '');  // English separator

    for (let i = 0; i < persianDigits.length; i++) {
        result = result.replace(new RegExp(persianDigits[i], 'g'), englishDigits[i]);
    }

    // Ensure it's only digits at the end
    return result.replace(/[^\d]/g, '');
};
