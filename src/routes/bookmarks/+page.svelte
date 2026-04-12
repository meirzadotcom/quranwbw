<script>
	import PageHead from '$misc/PageHead.svelte';
	import FullVersesDisplay from '$display/verses/modes/FullVersesDisplay.svelte';
	import Bookmark from '$svgs/Bookmark.svelte';
	import { __currentPage, __displayType, __userBookmarks } from '$utils/stores';
	import { term } from '$utils/terminologies';
	import { t } from '$utils/i18n';

	// only allow display type 1 & 2, and don't save the layout in settings
	if ([3, 4, 5].includes($__displayType)) $__displayType = 1;

	__currentPage.set('bookmarks');
</script>

<PageHead title={'Bookmarks'} />

<div id="individual-verses-block">
	{#if $__userBookmarks.length === 0}
		<div class="flex flex-row justify-center text-xs md:text-sm opacity-70">
			<span class="leading-relaxed">{$t('bookmarks.empty').replace('{verse}', term('verse')).replace('{verse}', term('verse')).replace('{verses}', term('verses'))}</span>
		</div>
	{:else}
		<FullVersesDisplay keys={$__userBookmarks.toString()} />
	{/if}
</div>
