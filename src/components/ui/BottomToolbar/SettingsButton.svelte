<script>
	import SettingsFilled from '$svgs/SettingsFilled.svelte';
	import Tooltip from '$ui/FlowbiteSvelte/tooltip/Tooltip.svelte';
	import { __settingsDrawerHidden } from '$utils/stores';
	import { t } from '$utils/i18n';
</script>

<button type="button" title={$t('nav.settings')} on:click={() => ($__settingsDrawerHidden = false)} class="inline-flex flex-col items-center justify-center px-5 group {window.theme('hover')}" data-umami-event="Toolbar Settings Button">
	<SettingsFilled size={5} />
	<span class="sr-only">{$t('nav.settings')}</span>
</button>
<Tooltip arrow={false} type="light" class="hidden md:block font-normal">{$t('nav.settings')}</Tooltip>
