<script lang="ts">
	import { methodEnumToString, statusEnumToString, type Transaction } from '$ts/interfaces';
	import { fly, slide } from 'svelte/transition';
	import Label from './Label.svelte';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import PlusIcon from './PlusIcon.svelte';
	import { goto } from '$app/navigation';
	import EditIcon from './EditIcon.svelte';
	import { statusToPastelleColor } from '$ts/utils';

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
		class="p-4 rounded-xl flex-shrink-0 bg-gray-100 flex flex-col overflow-auto cursor-pointer"
		transition:fly={{ x: 50, delay: i * 100 }}
	>
		<div class="" on:click={() => (expand = !expand)}>
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
				<div class="flex-grow truncate transition-all">
					{transaction?.description}
				</div>
				<div class="font-semibold text-lg flex-shirnk-0 transition-all">
					{(transaction?.amount).toLocaleString('cs-CZ', {
						style: 'currency',
						currency: transaction?.currency ?? 'CZK'
					})}
				</div>
			</div>
		</div>

		{#if expand}
			<div transition:slide|local class="mt-4 flex flex-col">
				<hr class="mb-2" />
				<div class="flex flex-row flex-wrap justify-between gap-3 text-sm mb-4 mt-2">
					<div class="flex flex-row items-center gap-1">
						<div class="font-semibold">Method:</div>
						<div class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono truncate">
							{methodEnumToString[transaction?.paymentMethod] || '-'}
						</div>
					</div>
					<div class="flex flex-row items-center gap-1">
						<div class="font-semibold">Status:</div>
						<div
							class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono truncate"
							style="background-color: {statusToPastelleColor(transaction?.status)}"
						>
							{statusEnumToString[transaction?.status] || '-'}
						</div>
					</div>
					<div class="flex flex-row items-center gap-1">
						<div class="font-semibold">Currency:</div>
						<div class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono truncate">
							{transaction?.currency || '-'}
						</div>
					</div>
					<div class="flex flex-row items-center gap-1">
						<div class="font-semibold">Location:</div>
						<div class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono truncate">
							{transaction?.location || '-'}
						</div>
					</div>
					<div class="flex flex-row items-center gap-1">
						<div class="font-semibold">Counterparty:</div>
						<div class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono truncate">
							{transaction?.counterparty || '-'}
						</div>
					</div>
					<div class="flex flex-row items-center gap-1 w-full">
						<div class="font-semibold">Notes:</div>
						<div class="px-2 py-1 rounded-md bg-slate-200 text-xs font-mono">
							{transaction?.notes || '-'}
						</div>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-2">
					<button
						class="btn text-xs"
						on:click={() => goto(`/add-items/${transaction?.transactionId}`)}
					>
						<PlusIcon />
						Scan receipt
					</button>
					<button
						class="btn text-xs"
						on:click={() => goto(`/edit-transaction/${transaction?.transactionId}`)}
					>
						<EditIcon />
						Edit
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
