<script>
	import Radio from '$ui/FlowbiteSvelte/forms/Radio.svelte';
	import Check from '$svgs/Check.svelte';
	import { __uiLanguage } from '$utils/stores';
	import { selectableUILanguages } from '$data/options';
	import { updateSettings } from '$utils/updateSettings';
	import { selectedRadioOrCheckboxClasses, individualRadioClasses } from '$data/commonClasses';
</script>

<div class="grid gap-3 w-full">
	{#each Object.values(selectableUILanguages) as lang}
		<Radio
			name="uiLanguage"
			bind:group={$__uiLanguage}
			value={lang.code}
			on:change={(event) => updateSettings({ type: 'uiLanguage', value: event.target.value })}
			custom
		>
			<div class="{individualRadioClasses} {$__uiLanguage === lang.code && selectedRadioOrCheckboxClasses}">
				<div class="w-full">{lang.name}</div>
				{#if $__uiLanguage === lang.code}
					<Check size={5} />
				{/if}
			</div>
		</Radio>
	{/each}
</div>
