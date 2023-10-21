<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ArrowBack from '$lib/ArrowBack.svelte';
	import { mockTransactions } from '$ts/constants';
	import { fly } from 'svelte/transition';

	$: editingTransaction = mockTransactions?.find((v) => v?.transactionId == $page.params.slug);
</script>

<div class="w-full h-full flex flex-col items-center overflow-auto">
	<div class="w-full flex flex-row items-center gap-4 py-4 px-6" in:fly={{ y: -50, duration: 500 }}>
		<button on:click={() => goto('/mycompany')}>
			<ArrowBack />
		</button>
		<div class="px-2 py-1 bg-gray-100 text-sm text-slate-600 font-semibold rounded-md">
			{editingTransaction?.transactionId}
		</div>
	</div>
	<div class="">edit page</div>
</div>
