<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ArrowBack from '$lib/ArrowBack.svelte';
	import CameraIcon from '$lib/CameraIcon.svelte';
	import ChevronDown from '$lib/ChevronDown.svelte';
	import EditIcon from '$lib/EditIcon.svelte';
	import EditableItem from '$lib/EditableItem.svelte';
	import PlusIcon from '$lib/PlusIcon.svelte';
	import SaveIcon from '$lib/SaveIcon.svelte';
	import SparklesIcon from '$lib/SparklesIcon.svelte';
	import TurnArrow from '$lib/TurnArrow.svelte';
	import { mockTransactions } from '$ts/constants';
	import type { Item } from '$ts/interfaces';
	import { onMount } from 'svelte';
	import { fly, scale, slide } from 'svelte/transition';
	import Tesseract from 'tesseract.js';
	import toast from 'svelte-french-toast';
	import { transactionItems } from '$ts/stores';

	let video;
	let canvas;
	let capturedImage;
	let extractedText = '';
	let usingFrontCamera = false; // Initial state uses the rear camera
	let loadingImageParse = false;
	let editCsv = false;

	$: editingTransaction = mockTransactions?.find((v) => v?.transactionId == $page.params.slug);
	$: console.log(editingTransaction);

	let showParsedText = true;

	onMount(async () => {
		await initializeCamera();
	});

	async function initializeCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: usingFrontCamera ? 'user' : 'environment',
					width: { ideal: 1280 },
					height: { ideal: 720 },
					isTorchOn: true
				}
			});
			video.srcObject = stream;
			video.onloadedmetadata = () => {
				video.play();
				updateCanvasDimensions();
			};
		} catch (err) {
			alert('Error accessing camera:', err);
			console.error('Error accessing camera:', err);
		}
	}

	let toggleZoomin = false;

	let prgs: Tesseract.LoggerMessage;

	async function captureImage() {
		canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
		capturedImage = canvas.toDataURL();

		loadingImageParse = true;

		// Process the captured image with Tesseract
		const {
			data: { text }
		} = await Tesseract.recognize(capturedImage, 'eng', {
			logger: (progress) => {
				console.log(progress);
				prgs = progress;
			}
		});
		extractedText = text;

		loadingImageParse = false;
		parseReceiptHandler();
	}

	let isTorchOn = false; // Initial state of the torch

	function toggleFlashlight() {
		const track = video.srcObject.getTracks().find((t) => t.kind === 'video');
		if (!track) return;

		const capabilities = track.getCapabilities();
		if (!capabilities.torch) {
			alert('Torch not available on this device/camera.');
			return;
		}
		isTorchOn = !isTorchOn;
		track
			.applyConstraints({
				advanced: [{ torch: isTorchOn }]
			})
			.catch((error) => {
				isTorchOn = false; // Reset the state in case of an error
				alert('Error toggling flashlight: ' + error.message);
			});
	}
	async function switchCamera() {
		usingFrontCamera = !usingFrontCamera;
		video.srcObject.getTracks().forEach((track) => track.stop());
		await initializeCamera();
	}
	function updateCanvasDimensions() {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
	}

	async function parseReceipt(receiptContent: string) {
		try {
			const response = await fetch('/api/parse-receipt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ receipt: receiptContent })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('There was an error calling the parse receipt endpoint:', error);
			throw error;
		}
	}

	// let chatgptResponse: any;
	let chatgptResponse: any = '';
	// let chatgptResponse: any = 'Non Vegetable Thalit, 1, $11.9\nGinger Minticed Tea, 1, $2.95';
	let parsingReceipt = false;

	const parseReceiptHandler = () => {
		if (!extractedText) {
			alert('Please capture an image first.');
			return;
		}
		parsingReceipt = true;
		parseReceipt(extractedText)
			.then((data) => {
				console.log(data);
				chatgptResponse = data?.content;
				toast.success('Receipt parsed!');
			})
			.catch((error) => {
				console.error(error);
				toast.error('Could not parse receipt.');
			})
			.finally(() => {
				parsingReceipt = false;
			});
	};

	function parseCSV(csvString: string) {
		if (!csvString) return;
		const rows = csvString?.split('\n');
		const data = rows?.map((row) => row?.split(','));
		let items: Item[] = [];
		data.forEach((row) => {
			items.push({
				name: row[0],
				quantity: parseInt(row[1]),
				price: parseFloat(row[2]?.replace('$', '')),
				rate: 'standard'
			});
		});
		// console.log(data, items);
		return { data, items };
	}

	onMount(() => {
		if ($transactionItems.get(editingTransaction?.transactionId)) {
			chatgptResponse = $transactionItems.get(editingTransaction?.transactionId);
		}
	});
</script>

<div class="w-full h-full flex flex-col items-center overflow-auto">
	<div class="w-full flex flex-row items-center gap-4 py-4 px-6" in:fly={{ y: -50, duration: 500 }}>
		<button on:click={() => goto('/mycompany')}>
			<ArrowBack />
		</button>
		<div class="px-2 py-1 bg-gray-100 text-sm text-slate-600 font-semibold rounded-md">
			{editingTransaction?.transactionId}
		</div>
		<div class="flex-grow" />
		<div class="text-right font-semibold text-sm">{editingTransaction?.description}</div>
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="px-6">
		<div
			class="flex-shrink-0 w-full grid grid-cols-2 transition-all duration-300 overflow-hidden rounded-xl max-w-full"
			class:w-[14rem]={!toggleZoomin}
			on:click={() => (toggleZoomin = !toggleZoomin)}
			in:scale|local={{ duration: 500 }}
		>
			<video bind:this={video} class="w-full rounded-l-xl border" autoplay muted playsinline />
			<canvas
				bind:this={canvas}
				width="300"
				height="150"
				class="border w-full rounded-r-xl"
				style="display: block;"
			/>
		</div>
	</div>
	<div class="w-full flex flex-col items-stretch gap-2 p-6" in:slide|local={{ duration: 500 }}>
		<button
			class="btn flex flex-row items-center gap-2"
			on:click={() => {
				toast.promise(captureImage(), {
					loading: 'Reading text from image...',
					success: 'Text read!',
					error: 'Could not read text.'
				});
			}}
		>
			<CameraIcon />
			Capture & Scan
		</button>
		<!-- <button class="btn" on:click={toggleFlashlight}>Toggle Flashlight</button> -->
		<button class="btn flex flex-row items-center gap-2" on:click={switchCamera}>
			<TurnArrow />
			Switch Camera
		</button>
		<!-- <button
			class="btn bg-[#FFE900] hover:bg-[hsl(55,100%,48%)] flex flex-row items-center gap-2"
			on:click={parseReceiptHandler}
		>
			<SparklesIcon />
			Parse Receipt
		</button> -->
	</div>
	<!-- <div class="px-6 mb-2 w-full">
		<button
			class="w-full flex flex-row items-center"
			on:click={() => (showParsedText = !showParsedText)}
		>
			<strong class="flex-grow text-left">Extracted Text:</strong>
			<div class="transition-all" class:rotate-180={showParsedText}>
				<ChevronDown />
			</div>
		</button>
		{#if showParsedText}
			<div class="pt-2" transition:slide|local>
				<p class="rounded-lg text-sm bg-gray-100 p-2 font-mono w-full min-h-[2rem]">
					{#if loadingImageParse}
						Loading ...
					{/if}
					{extractedText}
				</p>
			</div>
		{/if}
	</div>
	<div class="w-full px-6 font-mono text-sm">
		<strong>{prgs?.workerId ?? ''}</strong>
		<p>{prgs?.status ?? ''}</p>
	</div> -->
	<div class="px-6 mb-2 w-full" in:slide|local={{ duration: 500 }}>
		<strong>AI parsed reciept:</strong>
		<div class="rounded-lg text-sm bg-gray-100 p-2 font-mono mt-2 w-full min-h-[2rem]">
			{#if parsingReceipt}
				Loading ...
			{/if}

			<div class="flex flex-col items-stretch gap-2">
				<!-- {#if chatgptResponse} -->
				{#if editCsv}
					<div class="w-full text-xs text-slate-500">Edit raw CSV data:</div>
					<textarea class="rounded p-2" bind:value={chatgptResponse} />
					<button
						class="btn-sm btn bg-[#FFE900] hover:bg-[hsl(55,100%,48%)] text-xs"
						on:click={() => (editCsv = false)}
					>
						<SaveIcon />
						Save
					</button>
				{:else}
					<div class="grid grid-cols-[1.5fr,0.5fr,1fr] gap-2 pt-4 px-2">
						<div class="font-bold">Name</div>
						<div class="font-bold text-right">Quantity</div>
						<div class="font-bold text-right">Price</div>
					</div>

					{#each parseCSV(chatgptResponse)?.items || [] as row, i}
						<div class="grid grid-cols-[1.5fr,0.5fr,1fr] gap-2 pt-4 px-2 border-t items-center">
							<EditableItem {row} />
						</div>
					{/each}
					<div class="grid grid-cols-2 gap-2 mt-2 mb-1">
						<button
							class="btn-sm btn bg-[#FFE900] hover:bg-[hsl(55,100%,48%)] text-xs"
							on:click={() => (chatgptResponse += (chatgptResponse ? '\n' : '') + 'new,1,10')}
						>
							<PlusIcon />
							Add item
						</button>
						<button
							class="btn-sm btn bg-[#FFE900] hover:bg-[hsl(55,100%,48%)] text-xs"
							on:click={() => (editCsv = true)}
						>
							<EditIcon />
							Edit
						</button>
					</div>
				{/if}
				<!-- {/if} -->
			</div>
		</div>
		<button
			class="btn bg-[#FFE900] mt-4 hover:bg-[hsl(55,100%,48%)] w-full"
			on:click={() => {
				toast.success('Save successful!');
				transactionItems.update((v) => {
					if (!editingTransaction?.transactionId) return v;
					v.set(editingTransaction?.transactionId, chatgptResponse);
					return v;
				});
			}}
		>
			Save
		</button>
	</div>
	<div class="h-[6rem] flex-shrink-0" />
</div>
