<script lang="ts">
	import ArrowButton from '$lib/ArrowButton.svelte';
	import { app } from '$ts/firebase';
	console.log(app);
</script>

<div class="w-full h-full flex flex-col font-monserrat gap-6 p-6">
	<div class="flex flex-col text-[#02404A]">
		<div class="text-xl mt-4">Good morning, your total balance is</div>
		<div class="font-semibold text-2xl">7.691,12 &euro;</div>
	</div>

	<button class="self-end flex flex-row items-center gap-1 transition-all hover:-translate-x-1">
		<div class="text-sm font-semibold">Transfer</div>
		<ArrowButton />
	</button>
</div>
