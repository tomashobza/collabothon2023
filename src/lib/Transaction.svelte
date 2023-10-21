<script lang="ts">
	import type { Transaction } from '$ts/interfaces';
	import Label from './Label.svelte';

	export let transaction: Transaction;
</script>

<div class="p-4 rounded-xl bg-gray-100 flex flex-col gap-2">
	<div class="flex flex-row items-center gap-1">
		{#each transaction?.labels ?? [] as label}
			<Label>{label?.toLowerCase()?.replace('_', ' ')}</Label>
		{/each}
	</div>
	<div class="flex flex-row items-center">
		<div class="flex-grow">{transaction?.description}</div>
		<div class="font-semibold text-lg">
			{(transaction?.amount).toLocaleString('en-US', {
				style: 'currency',
				currency: 'EUR'
			})}
		</div>
	</div>
</div>
