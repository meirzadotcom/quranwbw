<script>
	import PageHead from '$misc/PageHead.svelte';
	import Spinner from '$svgs/Spinner.svelte';
	import party from 'party-js';
	import Check from '$svgs/Check.svelte';
	import Cross from '$svgs/Cross.svelte';
	import Radio from '$ui/FlowbiteSvelte/forms/Radio.svelte';
	import ErrorLoadingData from '$misc/ErrorLoadingData.svelte';
	import { __currentPage, __quizCorrectAnswers, __quizWrongAnswers } from '$utils/stores';
	import { t } from '$utils/i18n';
	import { buttonClasses, buttonOutlineClasses, disabledClasses, individualRadioClasses } from '$data/commonClasses';
	import { updateSettings } from '$utils/updateSettings';
	import { playWordAudio } from '$utils/audioController';
	import { fetchWordData } from '$utils/fetchData';
	import { fade } from 'svelte/transition';

	let randomID = 1;
	let selection = null;
	let answerChecked = false;
	let isAnswerCorrect = null;
	let randomWord = Math.floor(Math.random() * 3);

	$: randomWordsData = fetchRandomWords(randomID);

	// Fetches all word data and returns 4 random words with their Arabic, transliteration, and translation
	async function fetchRandomWords() {
		const { arabicWordData, translationWordData, transliterationWordData } = await fetchWordData(1, 1, 1);

		const allWordEntries = [];

		for (const chapter in arabicWordData) {
			const verses = arabicWordData[chapter];
			for (const verse in verses) {
				const [arabicWords = []] = verses[verse];
				const translations = translationWordData[chapter]?.[verse]?.[0] || [];
				const transliterations = transliterationWordData[chapter]?.[verse]?.[0] || [];

				for (let i = 0; i < arabicWords.length; i++) {
					allWordEntries.push({
						word_key: `${chapter}:${verse}:${i + 1}`,
						word_arabic: arabicWords[i],
						word_transliteration: transliterations[i] || '',
						word_english: translations[i] || ''
					});
				}
			}
		}

		// Shuffle and pick 4 random unique words
		const shuffled = allWordEntries.sort(() => 0.5 - Math.random());
		const selected = shuffled.slice(0, 4);

		return selected;
	}

	// Check if the selected answer is correct
	function checkAnswer() {
		answerChecked = true;
		isAnswerCorrect = selection === randomWord;

		if (isAnswerCorrect) {
			// Show confetti for correct answer
			party.confetti(document.body, {
				count: 80,
				spread: 100,
				size: 2
			});

			// Update correct answers count
			updateSettings({ type: 'quizCorrectAnswers', value: $__quizCorrectAnswers + 1 });
		} else {
			// Update wrong answers count
			updateSettings({ type: 'quizWrongAnswers', value: $__quizWrongAnswers + 1 });
		}
	}

	// Set new random word and reset selections
	function setRandomWord() {
		randomID = Math.floor(Math.random() * 9999999) + 1;
		randomWord = Math.floor(Math.random() * 3);
		selection = null;
		isAnswerCorrect = null;
		answerChecked = false;
	}

	__currentPage.set('Guess The Word');
</script>

<PageHead title={'Guess The Word'} />

<div class="space-y-12">
	{#await randomWordsData}
		<Spinner />
	{:then data}
		<div class="flex flex-col space-y-8 my-6 md:my-8 justify-center" in:fade={{ duration: 300 }}>
			<!-- word -->
			<button class="flex flex-col space-y-4 mx-auto items-center" on:click={() => playWordAudio({ key: data[randomWord].word_key })}>
				<span class="text-5xl md:text-7xl arabic-font-1">{data[randomWord].word_arabic}</span>
				<span class="text-xs">{data[randomWord].word_transliteration}</span>
			</button>

			<!-- options -->
			<div id="options" class="pt-8">
				<p class="mb-5 text-sm">{$t('game.guessWord.prompt')}</p>
				<div class="grid gap-4 md:gap-6 w-full md:grid-cols-2">
					{#each Object.entries(data) as [key, _]}
						<Radio name="bordered" bind:group={selection} value={+key} class={answerChecked === true && selection !== +key ? disabledClasses : null} custom>
							<div class="{individualRadioClasses} {selection === +key ? `${window.theme('border')}` : null}">
								<div class="flex flex-row mr-auto ml-2">{data[key].word_english}</div>

								<!-- check / cross icon -->
								{#if answerChecked === true && selection === +key}
									<div class="justify-end">
										<svelte:component this={selection === randomWord ? Check : Cross} size={5} />
									</div>
								{/if}
							</div>
						</Radio>
					{/each}
				</div>
			</div>

			<!-- answer-results -->
			{#if answerChecked === true && isAnswerCorrect !== null}
				<div id="answer-results" class="flex justify-center text-center font-medium text-md">
					<span>
						{isAnswerCorrect ? $t('game.guessWord.correct') : $t('game.guessWord.wrong').replace('{answer}', data[randomWord].word_english)}
					</span>
				</div>
			{/if}

			<!-- buttons -->
			<div id="buttons" class="flex flex-row space-x-4 justify-center w-full">
				<!-- confirm-button -->
				{#if !answerChecked}
					<div id="confirm-button" class="{selection === null || answerChecked === true ? disabledClasses : null} w-full">
						<button class="{buttonClasses} w-full" on:click={() => checkAnswer()}>{$t('common.confirm')}</button>
					</div>
				{/if}

				<!-- skip-word-button -->
				<div id="skip-word-button" class="w-full">
					<button class="{buttonOutlineClasses} w-full" on:click={() => setRandomWord()}>{answerChecked ? $t('common.next') : $t('common.skip')} {@html '&#x2192;'}</button>
				</div>
			</div>

			<!-- correct / wrong answers so far -->
			<div id="quiz-stats" class="flex flex-row space-x-4 justify-center text-xs">
				<span>{$t('game.guessWord.correctCount').replace('{count}', String($__quizCorrectAnswers))}</span>
				<span>|</span>
				<span>{$t('game.guessWord.wrongCount').replace('{count}', String($__quizWrongAnswers))}</span>
			</div>
		</div>
	{:catch error}
		<ErrorLoadingData {error} />
	{/await}
</div>
