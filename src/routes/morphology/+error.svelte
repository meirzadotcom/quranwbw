<script>
	import { page } from '$app/stores';
	import { __currentPage } from '$utils/stores';
	import { linkClasses } from '$data/commonClasses';
	import { t } from '$utils/i18n';

	__currentPage.set('error');
</script>

<div class="flex flex-col space-y-4 items-center justify-center text-center pt-28">
	{#if $page.status === 404}
		<span>{$t('error.notFound')}</span>
	{:else}
		<span>{$t('error.loadContent')}</span>
	{/if}

	<span>{$t('error.contact')} <a class={linkClasses} href="mailto:quranwbw@gmail.com">email</a>.</span>

	<a class="{linkClasses} pt-8" href="/">{$t('error.goHome')}</a>
</div>
