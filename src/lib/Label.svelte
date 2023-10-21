<script lang="ts">
	import { hashToPastelColor } from '$ts/utils';
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';

	let el: HTMLDivElement;
	let show = false;
	onMount(() => (show = true));
</script>

{#if show}
	<div
		class="text-[0.55rem] px-2 py-1 rounded transition-all capitalize"
		style="background-color: {el?.innerText && hashToPastelColor(el?.innerText)}"
		bind:this={el}
		in:scale
	>
		<slot />
	</div>
{/if}
