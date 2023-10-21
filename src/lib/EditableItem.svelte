<script lang="ts">
	import { czechVATPercentages, czechVATrates } from '$ts/constants';
	import type { Item } from '$ts/interfaces';
	import { hashToPastelColor } from '$ts/utils';

	let value: number;
	$: console.log(value);

	export let row: Item;
</script>

<div class="text-xs flex flex-col gap-2">
	<div class="">{row.name}</div>
	<div class="flex flex-row items-center gap-1">
		<div class="text-slate-500 text-[0.6rem]">Rate:</div>
		<select
			class="text-[0.6rem] p-0 bg-transparent w-full px-2 py-1 rounded-md truncate"
			size="0"
			bind:value
			style="background-color: {hashToPastelColor(String(value))}"
		>
			{#each czechVATrates as rate}
				<option value={czechVATPercentages[rate]}>{rate}</option>
			{/each}
		</select>
	</div>
</div>
<div class="text-right">
	{row.quantity}
</div>
<div class="font-bold text-right">
	{row.price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	})}
</div>
