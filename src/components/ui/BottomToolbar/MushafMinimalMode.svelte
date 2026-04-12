<script>
	import Maximize from '$svgs/Maximize.svelte';
	import Tooltip from '$ui/FlowbiteSvelte/tooltip/Tooltip.svelte';
	import { toggleMushafMinimalMode } from '$utils/toggleMushafMinimalMode';
	import { t } from '$utils/i18n';
</script>

<button id="mushafMinimalModeButton" type="button" title={$t('audio.minimalMode')} class="inline-flex flex-col items-center justify-center px-5 group {window.theme('hover')}" on:click={toggleMushafMinimalMode}>
	<Maximize />
	<span class="sr-only">{$t('audio.minimalMode')}</span>
</button>
<Tooltip triggeredBy="#mushafMinimalModeButton" arrow={false} type="light" class="hidden md:block font-normal">{$t('audio.minimalMode')}</Tooltip>
