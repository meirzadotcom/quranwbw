<br />
<div align="center">
  <a target="_blank" href="https://quranwbw.com"><img src="https://raw.githubusercontent.com/marwan/quranwbw/main/static/images/banner.png?v=2"></a>
  <br />
</div>

## About

QuranWBW.com is your companion for reading, listening to, and learning the Holy Quran, word-by-word. With features like word audios, Tajweed colors, and transliteration, you can delve into the Quran with ease. Additionally, explore multi-language translations, tafsir, and detailed word morphology.

## Project Status

This is a passion project maintained in spare time. Development happens in bursts, and there may be periods of inactivity lasting weeks or months. Bug fixes and feature requests will be addressed as time permits. Your patience and understanding are appreciated.

## Stack & Architecture

QuranWBW’s frontend is built with [SvelteKit](https://svelte.dev/), delivering a fast, lightweight, and highly reactive user experience.

Unlike many Quran-related websites, QuranWBW does not rely on any real-time external APIs, by this we mean APIs hosted on a server that fetch custom data from a database on-demand.
Instead, we use pre-generated static JSON files containing all the required Quran data.
These files are generated locally, uploaded, and served via our private CDN at `static.quranwbw.com`.

This CDN is hosted on Cloudflare and is optimized for speed and reliability. It contains:

- Complete Quran data files (verses, translations, morphology, etc.)
- Crucial metadata and indexing information
- Mushaf fonts and supporting assets
- Translation files in multiple languages

Verse audio is sourced from [EveryAyah](https://www.everyayah.com/), while all word-by-word audio files are served from our CDN.

We use the following external services and resources to power QuranWBW:

- [Tafsir API by spa5k](https://github.com/spa5k/tafsir_api) – External open-source static API providing various tafsir texts.
- [Kalimat API](https://www.kalimat.dev/) – AI-powered semantic search via a real-time API.

## Our Data

QuranWBW uses its very own data to give you that awesome word-by-word experience. We're always working to make it even better and bigger!

If you're looking for Quranic data for your own projects, a great place to start is the [Quranic Universal Library (QUL)](https://qul.tarteel.ai/). It's a cool spot with lots of data!

But if QUL doesn't have what you need, or you're curious about our data, just get in touch. We'll do our best to help you out.

## Development & Deployment

For those who wish to run the project locally or contribute to its development, the setup process is outlined below.

```bash
# Clone the repository
git clone https://github.com/marwan/quranwbw.git

# Navigate into the project directory
cd quranwbw

# Install project dependencies
npm install

# Start the development server
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

The application will typically be accessible at `http://localhost:5173`.

#### Styling with Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. All styles are compiled automatically during development and production builds.

You can freely make changes, and Tailwind configuration files without manually rebuilding the CSS — the build system handles compilation, minification, and updates for you behind the scenes.

#### Deployment

This SvelteKit project can be deployed to various hosting providers.
It is currently hosted on Cloudflare Pages, but it can also be deployed to other platforms such as Vercel, Netlify, or any service that supports SvelteKit adapters.

## Contributing a Language Translation

QuranWBW has a lightweight i18n system that makes it straightforward to add a new interface language. There are two parts: the **UI strings** (buttons, labels, messages) and the **chapter name meanings** (e.g. "The Opening", "The Cow").

#### 1. UI strings

All UI strings live in `src/utils/i18n/`. English (`en.js`) is the baseline — every key must exist there. Other languages only need to include keys that differ from English; missing keys fall back to English automatically.

1. Copy `src/utils/i18n/en.js` to `src/utils/i18n/<code>.js` (e.g. `fr.js` for French).
2. Translate the values. You may remove keys whose English value is already correct.
3. Open `src/utils/i18n.js` and register the new file:

```js
import fr from './i18n/fr.js';
const translations = { en, id, fr };
```

4. Open `src/data/options.js` and add the language to `selectableUILanguages`:

```js
export const selectableUILanguages = [
  { id: 'en', name: 'English' },
  { id: 'id', name: 'Bahasa Indonesia' },
  { id: 'fr', name: 'Français' },   // ← add your language here
];
```

#### 2. Chapter name meanings

Each language's chapter meanings live in `src/data/chapterTranslations/`. English meanings are already stored in the core Quran metadata, so no English file is needed here.

1. Copy `src/data/chapterTranslations/id.js` to `src/data/chapterTranslations/<code>.js`.
2. Replace every value with the chapter meaning in your language (all 114 entries).
3. Open `src/data/quranChapterTranslations.js` and register the new file:

```js
import fr from './chapterTranslations/fr.js';
const translations = { id, fr };
```

#### Tips

- Keep one PR per language to make review easy.
- Include a native speaker in the review if possible.
- If you're only able to translate part of the UI strings, that's fine — submit what you have and note which keys are still missing.

---

## Contribution

QuranWBW welcomes focused contributions that improve the project. You can help by reporting bugs, suggesting small features, improving documentation, or spreading the word.

#### Guidelines

- Discuss significant changes via GitHub issues first
- Match existing design patterns and code style
- Keep PRs focused (one feature or fix per PR)
- Include screenshots for UI changes
- Test in both development and production builds

#### Expectations

- Review and understand any AI-generated code you submit
- Follow the existing structure and naming conventions
- Avoid large refactors or changes across many files
- Discuss new dependencies before adding them

We can't accept large unfocused PRs, unreviewed AI-generated code, or changes that deviate from the existing design language.

If you're unsure about anything, don't hesitate to open an issue, join our [WhatsApp group](https://chat.whatsapp.com/CtrbWUB4GTyDdZWXWujVSl), or [email us](mailto:quranwbw@gmail.com). We also have a private Discord channel, which you can join upon request.

Your contributions, big or small, help make QuranWBW better for everyone.
