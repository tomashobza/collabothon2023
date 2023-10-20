<script>
	import AnalyseIcon from './AnalyseIcon.svelte';
	import CompanyIcon from './CompanyIcon.svelte';
	import HomeIcon from './HomeIcon.svelte';
	import InboxIcon from './InboxIcon.svelte';
	import ProfileIcon from './ProfileIcon.svelte';

	const menu = [
		{
			icon: HomeIcon,
			text: 'Home'
		},
		{
			icon: CompanyIcon,
			text: 'My Company'
		},
		{
			icon: AnalyseIcon,
			text: 'Analyse'
		},
		{
			icon: InboxIcon,
			text: 'Inbox'
		},
		{
			icon: ProfileIcon,
			text: 'Profile'
		}
	];
</script>

<div
	class="w-full flex flex-row items-center justify-between border-t border-[#02404a10] text-xs px-6 py-4 text-[#02404A]"
>
	{#each menu as { icon, text }}
		<button
			class="flex flex-col items-center gap-1 hover:text-[hsl(188,95%,25%)] transition-all hover:scale-105"
		>
			<svelte:component this={icon} />
			<div>{text}</div>
		</button>
	{/each}
</div>
