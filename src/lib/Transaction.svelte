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
		class="p-4 rounded-xl flex-shrink-0 bg-gray-100 flex flex-col overflow-auto cursor-pointer"
		transition:fly={{ x: 50, delay: i * 100 }}
	>
		<div class="flex flex-row items-start gap-1 mb-2">
			<div class="flex-grow flex flex-row flex-wrap items-center gap-1 transition-all">
				{#each transaction?.labels ?? [] as label}
					<Label>{label?.toLowerCase()?.replace('_', ' ')}</Label>
				{/each}
			</div>
			<div class="text-[0.6rem] rounded-full px-2 py-1 border">
				{dayjs(transaction?.date).format('DD.MM.YYYY')}
			</div>
		</div>
		<div class="flex flex-row items-center gap-2 transition-all" class:flex-wrap={expand}>
			<div class="flex-grow truncate transition-all whitespace-pre-wrap">
				{transaction?.description}
			</div>
			<div class="font-semibold text-lg flex-shirnk-0 transition-all">
				{(transaction?.amount).toLocaleString('cs-CZ', {
					style: 'currency',
					currency: transaction?.currency ?? 'CZK'
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
