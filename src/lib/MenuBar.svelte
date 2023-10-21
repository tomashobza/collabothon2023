<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AnalyseIcon from './AnalyseIcon.svelte';
	import CompanyIcon from './CompanyIcon.svelte';
	import HomeIcon from './HomeIcon.svelte';
	import InboxIcon from './InboxIcon.svelte';
	import ProfileIcon from './ProfileIcon.svelte';

	const menu = [
		{
			icon: HomeIcon,
			text: 'Home',
			link: '/'
		},
		{
			icon: CompanyIcon,
			text: 'My Company',
			link: '/mycompany'
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
	class="w-full flex flex-row items-center justify-between border-t border-[#02404a10] text-xs px-6 py-4 text-[#02404A] overflow-auto"
>
	{#each menu as { icon, text, link }}
		<button
			class="flex flex-col items-center gap-1 hover:text-[hsl(188,95%,25%)] transition-all hover:scale-105"
			class:active={$page?.route?.id == link}
			on:click={() => link && goto(link)}
		>
			<svelte:component this={icon} />
			<div>{text}</div>
		</button>
	{/each}
</div>

<style lang="postcss">
	.active {
		@apply text-[hsl(188,95%,25%)];
		@apply scale-105;
	}
</style>
