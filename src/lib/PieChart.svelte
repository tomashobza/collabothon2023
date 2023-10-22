<script>
	import { onMount } from 'svelte';
	import { Chart, PieController, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';

	// Register the required controllers and elements
	Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend);

	let chart;

	onMount(() => {
		// Labels and Data
		const labels = [
			'Revenues/Sales',
			'Fixed Assets',
			'Consumables and Supplies',
			'Travel and Accommodation',
			'Wages and Salaries',
			'Social and Health Insurance Contributions',
			'Professional Services',
			'Rent and Utilities',
			'Marketing and Promotion',
			'Education and Training',
			'Other Expenses'
		];

		const data = [50, 20, 30, 10, 50, 30, 20, 40, 30, 20, 15];

		// Combine labels and data for sorting
		let combined = labels.map((label, i) => ({ label, value: data[i] }));

		// Sort descending
		combined.sort((a, b) => b.value - a.value);

		// Extract the top 3 labels for the legend
		const topLabels = combined.slice(0, 3).map((item) => item.label);

		// Create Chart
		chart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						backgroundColor: [
							'#FF9999',
							'#66B2FF',
							'#99E699',
							'#FFCC66',
							'#C266FF',
							'#FF6666',
							'#3399FF',
							'#66FF66',
							'#FF9933',
							'#9933FF',
							'#FFFF66'
						]
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					tooltip: {
						filter: (item) => topLabels.includes(item.label),
						callbacks: {
							label: function (context) {
								const label = context.label;
								const value = context.parsed;
								const total = data.reduce((acc, curr) => acc + curr, 0);
								const percentage = Math.round((value / total) * 100);
								return `${label}: ${percentage}%`;
							}
						}
					},
					legend: {
						display: true,
						labels: {
							filter: function (item, chart) {
								// Only show legends from the topLabels
								return topLabels.includes(item.text);
							}
						}
					}
				}
			}
		});
	});

	let ctx;
</script>

<div class="p-2 rounded-xl bg-gray-100">
	<canvas bind:this={ctx} class="w-full" />
	<h2 class="text-xs text-right text-slate-500 mt-4">Spending Breakdown</h2>
</div>

<style>
	/* Add any desired styling here */
</style>
