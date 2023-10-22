<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ArrowBack from '$lib/ArrowBack.svelte';
	import EditIcon from '$lib/EditIcon.svelte';
	import Label from '$lib/Label.svelte';
	import PlusIcon from '$lib/PlusIcon.svelte';
	import SparklesIcon from '$lib/SparklesIcon.svelte';
	import XIcon from '$lib/XIcon.svelte';
	import { LABELS, mockTransactions } from '$ts/constants';
	import { fly, slide } from 'svelte/transition';

	$: editingTransaction = mockTransactions?.find((v) => v?.transactionId == $page.params.slug);

	let labelsEditing = true;
	let newLabel: string;
	let suggestedLabels: string[] = [];

	async function suggestLabel() {
		try {
			// Specify the API endpoint
			const apiUrl = '/api/label-suggestion';

			// Set up the request body
			const requestBody = {
				transactions: JSON.stringify(
					mockTransactions.filter((v) => v?.transactionId != $page.params.slug)
				),
				newTransaction: editingTransaction
			};

			// Make the POST request
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});
			// console.log(response);

			// Parse the response
			const result = await response.json();

			console.log(
				result?.labelSuggestion?.content?.split(', ').forEach((v: string) => {
					// skip if already in labels or suggestedLables
					if (editingTransaction?.labels.includes(v) || suggestedLabels.includes(v)) return;
					suggestedLabels.push(v as any);
					suggestedLabels = suggestedLabels;
				})
			);

			// Return the label suggestion
			return result.labelSuggestion;
		} catch (error) {
			console.error('Error suggesting label:', error);
			throw error;
		}
	}
</script>

<div class="w-full h-full flex flex-col items-center overflow-auto">
	<div class="w-full flex flex-row items-center gap-4 py-4 px-6" in:fly={{ y: -50, duration: 500 }}>
		<button on:click={() => goto('/mycompany')}>
			<ArrowBack />
		</button>
		<div class="px-2 py-1 bg-gray-100 text-sm text-slate-600 font-semibold rounded-md">
			{editingTransaction?.transactionId}
		</div>
		<div class="flex-grow" />
		<div class="text-right font-semibold text-sm">{editingTransaction?.description}</div>
	</div>
	<div class="text-lg w-full px-6 font-monserrat flex flex-row">
		<div class="flex-grow">Labels</div>
		<button
			class="btn btn-sm text-xs flex flex-row items-center gap-1"
			on:click={() => {
				labelsEditing = !labelsEditing;
				if (!labelsEditing) {
					editingTransaction?.labels?.push(...suggestedLabels);
					editingTransaction = editingTransaction;
					suggestedLabels = [];
				}
			}}
		>
			{#if labelsEditing}
				<div class="w-5">
					<XIcon />
				</div>
			{:else}
				<EditIcon />
			{/if}
			<div class="">Edit</div>
		</button>
	</div>
	<div class="w-full px-6 flex flex-row flex-wrap gap-2 my-4">
		{#each editingTransaction?.labels ?? [] as label, i}
			<Label
				showX={labelsEditing}
				small={false}
				on:click={() => {
					editingTransaction?.labels.splice(i, 1);
					editingTransaction = editingTransaction;
				}}
			>
				{label?.toLowerCase()?.replace('_', ' ')}
			</Label>
		{/each}
		{#each suggestedLabels ?? [] as label, i}
			<Label
				showX={labelsEditing}
				small={false}
				on:click={() => {
					suggestedLabels?.splice(i, 1);
					suggestedLabels = suggestedLabels;
				}}
			>
				<div class="flex flex-row items-center gap-1">
					<SparklesIcon small={true} />
					<div>{label?.toLowerCase()?.replace('_', ' ')}</div>
				</div>
			</Label>
		{/each}
		{#if labelsEditing}
			<Label small={false} color={false} on:click={suggestLabel}>
				<div class="flex flex-row gap-1">
					<PlusIcon />Suggest Lables
				</div>
			</Label>
		{/if}
	</div>
	{#if labelsEditing}
		<div class="px-6 w-full flex flex-row justify-end items-stretch gap-3" transition:slide>
			<!-- <input class="flex-grow border rounded-md px-2" type="text" bind:value={newLabel} /> -->
			<select class="border flex-grow truncate w-full rounded-md" size="1" bind:value={newLabel}>
				{#each LABELS as label}
					<option value={label}>{label}</option>
				{/each}
			</select>
			<button
				class="btn btn-sm"
				on:click={() => {
					console.log(newLabel);
					if (editingTransaction?.labels.includes(newLabel)) return;
					editingTransaction?.labels.push(newLabel);
					editingTransaction = editingTransaction;
				}}>Add</button
			>
		</div>
	{/if}
</div>
