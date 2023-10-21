<script>
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
					height: { ideal: 720 }
				}
			});
			video.srcObject = stream;
			video.play();
		} catch (err) {
			alert('Error accessing camera:', err);
			console.error('Error accessing camera:', err);
		}
	}

	async function captureImage() {
		canvas.getContext('2d').drawImage(video, 0, 0, 300, 150);
		capturedImage = canvas.toDataURL();

		// Process the captured image with Tesseract
		const {
			data: { text }
		} = await Tesseract.recognize(capturedImage, 'eng', {
			logger: (progress) => console.log(progress)
		});
		extractedText = text;
	}

	function toggleFlashlight() {
		const track = video.srcObject.getTracks()[0];
		if (track.getCapabilities().torch) {
			track.applyConstraints({
				advanced: [{ torch: !track.getConstraints().torch }]
			});
		}
	}

	async function switchCamera() {
		usingFrontCamera = !usingFrontCamera;
		video.srcObject.getTracks().forEach((track) => track.stop());
		await initializeCamera();
	}
</script>

<video bind:this={video} width="300" height="150" />
<canvas bind:this={canvas} width="300" height="150" style="display: none;" />
<button class="btn" on:click={captureImage}>Capture & Scan</button>
<button class="btn" on:click={toggleFlashlight}>Toggle Flashlight</button>
<button class="btn" on:click={switchCamera}>Switch Camera</button>
<div>
	<strong>Extracted Text:</strong>
	<p>{extractedText}</p>
</div>

<style>
	/* Add any required styling here */
</style>
