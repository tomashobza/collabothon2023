<script>
	import MenuBar from '$lib/MenuBar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Bank</title>
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-center bg-gray-100">
	<div class="wrapper">
		<slot />
		<div class="absolute bottom-0 w-full">
			<MenuBar />
		</div>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply h-full;
		@apply w-full md:w-auto;
		@apply md:m-6;
		@apply md:aspect-[1/2];
		@apply md:shadow-md;
		@apply md:rounded-xl;
		@apply bg-white;
		@apply relative;
		@apply overflow-auto;
	}
</style>
