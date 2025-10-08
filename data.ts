/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Dot patterns for each dice face
export const DOT_PATTERNS: { [key: number]: string[] } = {
  1: ["g"],
  2: ["a", "b"],
  3: ["a", "g", "b"],
  4: ["a", "b", "c", "d"],
  5: ["a", "b", "c", "d", "g"],
  6: ["a", "b", "c", "d", "e", "f"],
};

// Alphabets
export const PERSIAN_ALPHABET = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی'.split('');
export const ENGLISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const GREEK_ALPHABET = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.split('');
