<script lang="ts">
	import ArrowButton from '$lib/ArrowButton.svelte';
	import MasterCardLogo from '$lib/MasterCardLogo.svelte';
	import PlusIcon from '$lib/PlusIcon.svelte';
	import PremiumKontroLogo from '$lib/PremiumKontroLogo.svelte';
	import { app } from '$ts/firebase';
	console.log(app);
</script>

<div class="w-full flex flex-col font-monserrat gap-6 p-6 border-b-[1rem] border-gray-100">
	<div class="flex flex-col text-[#02404A]">
		<div class="text-xl mt-4">Good morning, your total balance is</div>
		<div class="font-semibold text-2xl">7.691,12 &euro;</div>
	</div>

	<button class="self-end flex flex-row items-center gap-1 transition-all hover:-translate-x-1">
		<div class="text-sm font-semibold">Transfer</div>
		<ArrowButton />
	</button>
	<div class="w-full flex flex-col mt-10 gap-6">
		<div class="w-full flex flex-row items-center gap-3">
			<div class="rounded-full border w-12 aspect-square grid place-content-center">
				<PremiumKontroLogo />
			</div>
			<div class="text-sm flex-grow truncate">Premiumkonto</div>
			<div class="font-semibold text-lg">7.691,12</div>
		</div>
		<div class="w-full flex flex-row items-center gap-3">
			<div class="rounded-full border w-12 aspect-square grid place-content-center">
				<MasterCardLogo />
			</div>
			<div class="text-sm flex-grow truncate">Premiumkonto</div>
			<div class="font-semibold text-lg">-234,00</div>
		</div>
		<button class="w-full flex flex-row items-center gap-3">
			<div class="rounded-full border w-12 aspect-square grid place-content-center">
				<PlusIcon />
			</div>
			<div class="text-sm flex-grow truncate text-left">Add an account</div>
		</button>
	</div>
</div>

<div class="w-full flex flex-col font-monserrat gap-6 p-6">
	<div class="text-xl mt-4">What else would you like to do?</div>
</div>
