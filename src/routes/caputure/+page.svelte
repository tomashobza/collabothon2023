<script lang="ts">
	import { onMount } from 'svelte';
	import Tesseract from 'tesseract.js';

	let video;
	let canvas;
	let capturedImage;
	let extractedText = '';
	let usingFrontCamera = false; // Initial state uses the rear camera

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
		console.log(video.videoWidth, video.videoHeight);
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

	const parseReceiptHandler = () => {
		if (!extractedText) {
			alert('Please capture an image first.');
			return;
		}
		parseReceipt(extractedText)
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};
</script>

<div class="w-full h-full flex flex-col items-center overflow-auto">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-full grid grid-cols-2 transition-all duration-300"
		class:w-[14rem]={!toggleZoomin}
		class:m-6={!toggleZoomin}
		on:click={() => (toggleZoomin = !toggleZoomin)}
	>
		<video bind:this={video} class="w-full border" autoplay muted playsinline />
		<canvas
			bind:this={canvas}
			width="300"
			height="150"
			class="border w-full"
			style="display: block;"
		/>
	</div>
	<div class="flex flex-col gap-2 p-6">
		<button class="btn" on:click={captureImage}>Capture & Scan</button>
		<button class="btn" on:click={toggleFlashlight}>Toggle Flashlight</button>
		<button class="btn" on:click={switchCamera}>Switch Camera</button>
		<button class="btn" on:click={parseReceiptHandler}>Parse Receipt</button>
	</div>
	<div class="px-6 mb-2 w-full">
		<strong>Extracted Text:</strong>
		<p class="rounded bg-gray-100 p-2 font-mono mt-2 w-full min-h-[2rem]">{extractedText}</p>
	</div>
	<div class="w-full px-6 font-mono text-sm">
		<strong>{prgs?.workerId ?? ''}</strong>
		<p>{prgs?.status ?? ''}</p>
	</div>
	<div class="h-[6rem] flex-shrink-0" />
</div>

<style>
	/* Add any required styling here */
</style>
