<script>
	import BarChart from '$lib/BarChart.svelte';
	import Transaction from '$lib/Transaction.svelte';
	import { mockTransactions } from '$ts/constants';
</script>

<div class="w-full h-full flex flex-col items-stretch gap-3 p-4 overflow-auto">
	<BarChart />
	{#each mockTransactions ?? [] as transaction, i}
		<Transaction {transaction} {i} />
	{/each}
	<div class="h-[4rem] flex-shrink-0" />
</div>
