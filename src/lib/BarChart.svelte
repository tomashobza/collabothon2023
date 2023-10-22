<script>
	import { onMount } from 'svelte';
	import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
	import ChevronRightIcon from './ChevronRightIcon.svelte';

	// Register the required controllers and elements
	Chart.register(BarController, CategoryScale, LinearScale, BarElement);

	let chart;

	onMount(() => {
		// Mock data
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const incomes = [5, 10, 15, 8, 20, 10, 12];
		const expenses = [-3, -5, -7, -4, -10, -8, -6];

		// Create Chart
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: days,
				datasets: [
					{
						label: 'Income',
						data: incomes,
						backgroundColor: 'rgb(163 230 53)'
					},
					{
						label: 'Expense',
						data: expenses,
						backgroundColor: 'rgb(248 113 113)'
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						mode: 'index',
						callbacks: {
							label: function (context) {
								// Show only the y-value without the label
								return context.parsed.y;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							display: false // Hide vertical axis numbers
						},
						grid: {
							display: true,
							drawBorder: false
						}
					},
					x: {
						barPercentage: 0.5
					}
				}
			}
		});
	});

	let ctx;
</script>

<div class="p-6 rounded-xl bg-gray-100 flex flex-col">
	<button class="text-xl mb-4 flex flex-row items-center">
		<div class="flex-grow text-left">Dashboard</div>
		<div>
			<ChevronRightIcon />
		</div>
	</button>
	<canvas bind:this={ctx} class="w-full" />
</div>

<style>
	/* Add any desired styling here */
</style>
