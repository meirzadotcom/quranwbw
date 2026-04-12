import { get } from 'svelte/store';
import { __uiLanguage } from '$utils/stores';

const strings = {
	en: {
		playWord: 'Play Word',
		gotoVerse: 'Goto Verse',
		withSameRoot: 'with the same root',
		appearingExactly: 'appearing exactly',
		word: 'word',
		words: 'words',
		loadMore: 'Load more',
		columnWord: 'Word',
		columnTranslation: 'Translation',
		columnTransliteration: 'Transliteration',
		columnVerse: 'Verse',
		columnMorphology: 'Word',
		// Verb form labels — keys match the API field names (snake_case)
		verbForms: {
			perfect: 'Perfect',
			imperfect: 'Imperfect',
			imperative: 'Imperative',
			active_participle: 'Active Participle',
			passive_participle: 'Passive Participle',
			verbal_noun: 'Verbal Noun'
		}
	},
	id: {
		playWord: 'Putar Kata',
		gotoVerse: 'Ke Ayat',
		withSameRoot: 'dengan akar kata yang sama',
		appearingExactly: 'yang muncul persis',
		word: 'kata',
		words: 'kata',
		loadMore: 'Muat lebih banyak',
		columnWord: 'Kata',
		columnTranslation: 'Terjemahan',
		columnTransliteration: 'Transliterasi',
		columnVerse: 'Ayat',
		columnMorphology: 'Kata',
		// Verb form labels — uses Arabic-rooted terms common in Indonesian Islamic education
		verbForms: {
			perfect: 'Madhi (Lampau)',
			imperfect: 'Mudhari',
			imperative: "Amar (Perintah)",
			active_participle: "Isim Fa'il",
			passive_participle: "Isim Maf'ul",
			verbal_noun: 'Masdar'
		}
	}
};

/**
 * Returns the morphology UI strings for the given language code.
 * Falls back to English if the language is not yet supported.
 *
 * @param {string} langCode - e.g. 'en', 'id'
 * @returns {typeof strings.en}
 */
export function getMorphologyStrings(langCode) {
	const key = /** @type {keyof typeof strings} */ (langCode);
	return strings[key] ?? strings.en;
}

/**
 * Returns the active language code from the __uiLanguage store.
 * Use this to pass to getWordSummary() for language-aware CDN fetching.
 *
 * @returns {string}
 */
export function getMorphologyLanguageCode() {
	return get(__uiLanguage) || 'en';
}
