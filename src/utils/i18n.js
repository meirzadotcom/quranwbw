/**
 * Lightweight i18n system for QuranWBW.
 *
 * Usage in any Svelte component:
 *   import { t } from '$utils/i18n';
 *   {$t('common.save')}
 *
 * `t` is a Svelte derived store that returns a lookup function.
 * It re-evaluates automatically when $__uiLanguage changes.
 *
 * To add a new language:
 *   1. Create src/utils/i18n/<code>.js  (e.g. fr.js)
 *   2. Import and register it in the `translations` map below.
 *   3. Add it to `selectableUILanguages` in src/data/options.js.
 */

import { derived } from 'svelte/store';
import { __uiLanguage } from '$utils/stores';

import en from './i18n/en.js';
import id from './i18n/id.js';

/** @type {Record<string, Record<string, string>>} */
const translations = { en, id };

/**
 * Svelte derived store that returns a translation function.
 *
 * In any component:
 *   import { t } from '$utils/i18n';
 *   {$t('common.save')}
 */
export const t = derived(__uiLanguage, ($lang) => {
	const dict = translations[$lang] ?? translations.en;
	/** @param {string} key */
	return (key) => dict[key] ?? translations.en[key] ?? key;
});
