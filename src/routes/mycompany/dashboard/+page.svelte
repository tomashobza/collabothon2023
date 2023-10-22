<script>
	import { goto } from '$app/navigation';
	import ArrowBack from '$lib/ArrowBack.svelte';
	import BarChart from '$lib/BarChart.svelte';
	import DownloadIcon from '$lib/DownloadIcon.svelte';
	import PieChart from '$lib/PieChart.svelte';
	import QuestionmarkIcon from '$lib/QuestionmarkIcon.svelte';
	import SaveIcon from '$lib/SaveIcon.svelte';
	import { fly, scale } from 'svelte/transition';
</script>

<div class="h-full flex flex-col items-stretch gap-2 overflow-auto">
	<div
		class="w-full flex flex-row items-center gap-4 mt-2 py-4 px-6"
		in:fly={{ y: -50, duration: 500 }}
	>
		<button on:click={() => goto('/mycompany')}>
			<ArrowBack />
		</button>
	</div>

	<div class="w-full grid grid-cols-2 gap-2 px-6">
		<div in:scale={{ duration: 500 }} class="bg-gray-100 rounded-xl py-2 px-3 flex flex-col gap-1">
			<div class="text-slate-500 mb-2">Receivables and payables</div>
			<div class="flex-grow" />
			<div class="w-full flex flex-row items-center text-sm">
				<div class="text-xs">Recievables:</div>
				<div class="flex-grow">
					<div class="font-semibold text-right flex-shrink-0 text-xs">7.691,12 &euro;</div>
				</div>
			</div>
			<div class="w-full flex flex-row items-center text-sm">
				<div class="text-xs">Payables:</div>
				<div class="flex-grow">
					<div class="font-semibold text-right flex-shrink-0 text-xs">234,00 &euro;</div>
				</div>
			</div>
			<hr class="my-1" />
			<div class="w-full flex flex-row items-center text-sm">
				<div class="text-xs font-semibold">Expected expenses:</div>
				<div class="flex-grow">
					<div class="font-bold text-right flex-shrink-0 text-xs whitespace-nowrap text-red-600">
						- 534,00 &euro;
					</div>
				</div>
			</div>
		</div>

		<PieChart />

		<div class="col-span-2">
			<BarChart showHeader={false} />
		</div>

		<div class="flex flex-col items-stretch gap-2">
			<div
				in:scale={{ duration: 500 }}
				class="bg-gray-100 rounded-xl py-2 px-3 flex flex-col gap-1"
			>
				<div class="text-slate-500 mb-2">VAT</div>
				<div class="flex-grow" />
				<div class="w-full flex flex-row items-center text-sm">
					<div class="text-xs">Invoiced:</div>
					<div class="flex-grow">
						<div class="font-semibold text-right flex-shrink-0 text-xs">29.458,32 &euro;</div>
					</div>
				</div>
				<div class="w-full flex flex-row items-center text-sm">
					<div class="text-xs">Freight:</div>
					<div class="flex-grow">
						<div class="font-semibold text-right flex-shrink-0 text-xs">0,00 &euro;</div>
					</div>
				</div>
				<hr class="my-1" />
				<div class="w-full flex flex-row items-center text-sm">
					<div class="text-xs font-semibold">BALANCE:</div>
					<div class="flex-grow">
						<div class="font-bold text-right flex-shrink-0 whitespace-nowrap text-red-600 text-xs">
							29.458,32 &euro;
						</div>
					</div>
				</div>
			</div>
			<div
				in:scale={{ duration: 500 }}
				class="bg-gray-100 rounded-xl py-2 px-3 flex flex-col gap-1"
			>
				<div class="text-slate-500 mb-2">Turnover for the previous 12 months</div>
				<div class="flex-grow" />
				<div class="w-full flex flex-row items-center text-sm">
					<div class="text-xs">03/2024-02/2025:</div>
					<div class="flex-grow">
						<div class="font-semibold text-right flex-shrink-0 text-xs whitespace-nowrap">
							7.691,12 &euro;
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-stretch gap-2">
			<div
				in:scale={{ duration: 500 }}
				class="bg-gray-100 flex-grow rounded-xl py-2 px-3 flex flex-col gap-1"
			>
				<div class="text-slate-500 mb-2">Income tax</div>
				<div class="flex-grow" />
				<div class="w-full flex flex-row items-center text-sm flex-wrap">
					<div class="text-xs">Revenue:</div>
					<div class="flex-grow">
						<div class="text-green-600 font-semibold text-right flex-shrink-0 text-xs">
							319.456,42 &euro;
						</div>
					</div>
				</div>
				<div class="w-full flex flex-row items-center text-sm flex-wrap">
					<div class="text-xs">Expense:</div>
					<div class="flex-grow">
						<div class="text-red-600 font-semibold text-right flex-shrink-0 text-xs">
							76.523,08 &euro;
						</div>
					</div>
				</div>
				<hr class="my-1" />
				<div class="w-full flex flex-row items-center text-sm flex-wrap">
					<div class="text-xs">Tax base:</div>
					<div class="flex-grow">
						<div class="font-semibold text-right flex-shrink-0 text-xs">56.765,25 &euro;</div>
					</div>
				</div>
				<div class="w-full flex flex-row items-center text-sm flex-wrap">
					<div class="text-xs font-semibold">Tax 2024:</div>
					<div class="flex-grow">
						<div class="font-bold text-right flex-shrink-0 whitespace-nowrap text-red-600 text-xs">
							29.458,32 &euro;
						</div>
					</div>
				</div>
			</div>

			<div
				in:scale={{ duration: 500 }}
				class="bg-gray-100 flex-grow rounded-xl py-2 px-3 flex flex-row items-center gap-2 justify-center"
			>
				<div class="my-2">
					<QuestionmarkIcon />
				</div>
				<div class="text-xs">Need help? Give us a call!</div>
			</div>
		</div>
		<button
			in:scale={{ duration: 500 }}
			class="bg-gray-100 flex-grow rounded-xl p-4 flex flex-row items-center gap-2 justify-center col-span-2"
		>
			<DownloadIcon />
			Export Tax Report
		</button>
	</div>

	<div class="h-[6rem] flex-shrink-0 text-xs" />
</div>
