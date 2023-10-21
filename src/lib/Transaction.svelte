<script lang="ts">
	import type { Transaction } from '$ts/interfaces';
	import { fly, slide } from 'svelte/transition';
	import Label from './Label.svelte';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	let show = false;
	onMount(() => (show = true));

	let expand = false;

	export let transaction: Transaction;
	export let i: number;
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (expand = !expand)}
		class="p-4 rounded-xl bg-gray-100 flex flex-col overflow-auto cursor-pointer"
		transition:fly={{ x: 50, delay: i * 100 }}
	>
		<div class="flex flex-row items-start gap-1 mb-2">
			<div class="flex-grow flex flex-row flex-wrap items-center gap-1">
				{#each transaction?.labels ?? [] as label}
					<Label>{label?.toLowerCase()?.replace('_', ' ')}</Label>
				{/each}
			</div>
			<div class="text-[0.6rem] rounded-full px-2 py-1 border">
				{dayjs(transaction?.date).format('DD.MM.YYYY')}
			</div>
		</div>
		<div class="flex flex-row items-center flex-wrap">
			<div class="flex-grow">{transaction?.description}</div>
			<div class="font-semibold text-lg">
				{(transaction?.amount).toLocaleString('cs-CZ', {
					style: 'currency',
					currency: 'EUR'
				})}
			</div>
		</div>

		{#if expand}
			<div transition:slide|local class="mt-4 flex flex-col">
				<hr class="mb-2" />
				<div class="">ahojs</div>
			</div>
		{/if}
	</div>
{/if}
