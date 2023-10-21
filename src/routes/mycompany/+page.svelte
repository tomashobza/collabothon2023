<script>
	import Transaction from '$lib/Transaction.svelte';
	import { mockTransactions } from '$ts/constants';
</script>

<div class="w-full h-full flex flex-col items-stretch gap-3 p-4">
	{#each mockTransactions ?? [] as transaction}
		<Transaction {transaction} />
	{/each}
</div>
