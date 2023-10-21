<script lang="ts">
	import type { Item } from '$ts/interfaces';

	export let row: Item;
</script>

<div class="text-xs">
	{row.name}
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
