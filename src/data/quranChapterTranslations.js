/**
 * Per-language chapter name translations.
 *
 * To add a new language:
 *   1. Create src/data/chapterTranslations/<code>.js  (e.g. fr.js)
 *   2. Import and register it in the `translations` map below.
 *
 * English meanings are already stored in quranMetaData[n].translation
 * and are used as the automatic fallback — no English file is needed here.
 */

import { quranMetaData } from './quranMeta.js';

import id from './chapterTranslations/id.js';

/** @type {Record<string, Record<number, string>>} */
const translations = { id };

/**
 * Returns the chapter meaning in the given language,
 * falling back to the English `translation` field in quranMetaData.
 *
 * @param {number} chapterId
 * @param {string} lang - e.g. 'en', 'id'
 * @returns {string}
 */
export function getChapterTranslation(chapterId, lang) {
	return translations[lang]?.[chapterId] ?? quranMetaData[chapterId]?.translation ?? '';
}
