<script lang="ts">
	import { hashToPastelColor } from '$ts/utils';
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	import XIcon from './XIcon.svelte';

	let el: HTMLDivElement;
	let show = false;
	export let small = true;
	export let showX = false;
	export let color = true;
	onMount(() => (show = true));
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click
		class="relative px-2 py-1 rounded transition-all capitalize"
		class:text-[0.55rem]={small}
		class:text-sm={!small}
		class:cursor-pointer={!color}
		style="background-color: {color
			? el?.innerText && hashToPastelColor(el?.innerText)
			: '#f0f0f0'}"
		bind:this={el}
		in:scale
	>
		{#if showX}
			<div
				class="bg-red-100 absolute -top-[0.3rem] -right-[0.3rem] w-4 h-4 grid place-content-center rounded-full p-[0.2rem]"
				transition:scale
			>
				<XIcon />
			</div>
		{/if}
		<slot />
	</div>
{/if}
