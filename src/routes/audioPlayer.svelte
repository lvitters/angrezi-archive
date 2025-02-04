<!-- https://svelte.dev/playground/module-exports?version=5.19.6#H4sIAAAAAAAACq1W23LbNhD9lTWbTqQZkZSlWHZlSR0lcRO3ceOp2slD2QeIXJGoQYABlrYVhh_U7-iPdcCLLJvu1J3xG7TYPbvn7BKrwpEsRWfq_MxSjABvM6XJQA8jThj1nYGz4QKNM_29cGibWU9rcAZt3DLLPHONgqxtzQw-Zg-VJJRknKkzM6HmGS0CGRBPbTZY5hFXl4JtUQ-gAEMqWwoBJWy0SuGl5-85NJgvTwM58--g5GydEykJSoaCh1fzokEpFxUeMCGAWRiY-bVrHXbgupAQZWbq-2luVIbSUzq2Zx76351MRi4l6K5Fjm7EZL5GV2Xu-PCVD667CORsrzZLyehwHjgtYl3sn8aLOSX52uPKZ8YgmQbfkGa5MV6ajQPHhhMngfPA-TVBeC1yhLdVTvjEBH2pXUKVZsqgngfOjyphUsKqRqmvM9QbpdPq_izXKkMmYanDhF-j9fCfwvvV-Pj4qCKeCSaRTEV69CycEyUMdRlfMG0GQJa35jJGDWoDn5jukH6XG2LX8N7CdCn_tlr-AO9Rc2IxWohlipqHDF4zGT2Z_8nwcOiO3XibSpVhxNE8T7sZcexSf1el-fuviCNI5cFhh_OZ5lewstFdxpdaRTxmAi61CjUzxCUjpZ_MdXQ0OXbNNs0SJbeuVO6Ry6UbuimXStu-T46fhfwakRJ1jbIrwKrJXrE_Ai7hTTqAj5kHk2Nw4dyDpRAYawWhkrDWXHUU-pBHNzyGaybhdZvoWT-IycnY1fg555hafaJGnyt3Mpo8iz6p-sL0Ix_GL3VSq8pbqJIO4CcPJqOJleb83IMVfs5RhggufGCh3qbKsI5An5TYxEzGsExZhLmBiypfV6MLpq9yAytibN3q4wwcwltypqRzLAf_tgo6z_SDlfDYfXc1QKqiXOCiJiANAQpMrQ_MQeINrJB6_VN7LZAgzLVGSWe1j-1lQPUag00uQ-JKtiul14fCXgfUInobpc9YmPR6jaUP80XrtHPzMpYbbHIGVNaH8uEK6m62ApS8ULmk3TK7W19t_U0yo8NBfaoa35zbBjY_d32q8sMcXmRaZaaurMGrt9wcXhhihHtCVSSiuxvbyzawKbPX2-e_E4lFUa-CbRXQSLmWUHvv3CIUSLjvWbb49zrxkRLU5q4Z9zsI85rC6f_qFN9AewEH8waiD__VwHu1kYpjgW_qanrYb8D5podeqCKsgANnlbEQAwe-foWD-6X3oRbmMVpeI__38NAu2LbXh2nHvldyd9SqMZrecBmpG1DyCreRupHz4h6HEprHjWnioUAIBTNmajNyGc-Lg7qmshrZWTJaFNXslTM_GdW2bDEzpJWMF0U7iuXMb0zgQzuQEay3UOzGs5z52aJWd1bP45rLaEoJN_OiMpS1pRFFSVtT_aetno7SPvWklTBQGB2Wi5lfxdln1m_oNFLQtnksWpZN31KmYy6nMIQhHGIKw9PWfuve8IiSKZwMh9ntbhYoGVXfWfYYwtAb7zAq55pX49ngHQ6H354-iPWObNxeBVW01zRh9w0oofQUvtlsxjgc7jW9YXf_Bf6j_AdCk0ZzuAsAAA== -->
<script module>
	const elements = new Set<HTMLAudioElement>();
	let currentElement: HTMLAudioElement;
</script>

<!-- https://iconify.design/docs/icon-components/svelte/ -->
<script lang="ts">
	import Icon from "@iconify/svelte";
	import { chooseRandomFont } from './RandomFont.svelte';
	import { onMount } from 'svelte';

	// get audio source from parent
	let { src = $bindable() } = $props();

	// audio file to perform operations on
	let audio: HTMLAudioElement;
	let paused = $state(true);
	let currentTime = $state(0);
	let duration = $state(0);
	let hoverIndicator = $state(null);


	onMount(() => {
		elements.add(audio);
		return () => elements.delete(audio);
	});

	// stop all playback except this
	function stopOthers() {
		currentElement = audio;
		elements.forEach((element) => {
			if (element !== audio) {
				element.pause();
			} 
		});
	}

	// toggle playback only for this
	function toggleCurrent(e) {
		// prevent default space bar behavior
		e.preventDefault();
		// check if key was space bar and currentElement exists
		if(e.code !== "Space" || !currentElement) return;
		// check if currentElement is actually the current (or last playing) audio
		if(currentElement !== audio) return
		currentElement.paused ? currentElement.play() : currentElement.pause();
	}

	// start playback
	function playAudio() {
		audio.play();
	}

	// stop playback
	function pauseAudio() {
		currentElement = audio;
		audio.pause();
	}

	// play from a specific time in the audio
	function seek(event) {
		const progressWidth = event.currentTarget.offsetWidth;
		const mouseX = event.offsetX;
		const newTime = (mouseX / progressWidth) * duration;
		currentTime = newTime;
	}

	// show indicator when hovering over the progress bar
	function showHoverIndicator(event) {
		const progressBar = event.currentTarget;
		const rect = progressBar.getBoundingClientRect();

		// calculate the x position relative to the progress bar
		const mouseX = event.clientX - rect.left;

		// determine the current progress position in pixels
    	const progress = (currentTime / duration) * rect.width;

    	// check if hover is to the left or right of the current progress
    	const isLeft = mouseX < progress;

		// assign color based on position relative to play head
		hoverIndicator.style.backgroundColor = isLeft ? 'black' : 'red';

		// show the hover indicator and position it
		hoverIndicator.style.display = 'block';
		hoverIndicator.style.left = `${mouseX}px`;
  	}

	// hide the indicator when moving out of the progress bar
	function hideHoverIndicator() {
		hoverIndicator.style.display = 'none';
	}

	// format time into MM:SS or HH:MM:SS directly from ChatGPT
	const formatTime = (time) => {
		if (isNaN(time)) return '0:00';
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = Math.floor(time % 60);
		if (hours > 0) {
		return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		}
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

</script>

<!-- list for space bar anywhere in the window -->
<svelte:window onkeydown={toggleCurrent} />

<!-- custom audio player -->
<div class="audio-player">
	<audio bind:this={audio} bind:paused bind:duration bind:currentTime onplay={stopOthers} >
		<source src={src} type="audio/mp3" />
		Your browser does not support the audio element.
	</audio>
	<div class="audio-box">
	<!-- show button, depending on if something is playing -->
		{#if paused}
			<button class="play-button" onclick={playAudio}><Icon icon="pixelarticons-play" style="font-size: 2rem;"/></button>
		{:else}
			<button class="pause-button" onclick={pauseAudio}><Icon icon="memory-pause" style="font-size: 2rem;"/></button>
		{/if}
	</div>
	{#if currentTime > 0}
	<div class="audio-box" id="progress-box">
		<!-- progress bar with key event for accessability (not sure how accessability works yet) -->
		<div class="progress-bar" role="button" tabindex="0" aria-label="Seek in audio" 
		onclick={seek}
		onmousemove={showHoverIndicator}
		onmouseleave={hideHoverIndicator}
		onkeydown = {(e) => { if (e.key === 'Enter' || e.key === ' ') { seek(e); }}} >
			<div class="hover-indicator" bind:this={hoverIndicator}></div>
			<div class="progress-indicator" style="width: {duration ? (currentTime / duration) * 100 : 0}%"></div>
		</div>
	</div>
	{/if}
	<div class="audio-box">
		<!-- show progress in numbers -->
		<div class="time-info">
			<span id={chooseRandomFont()}>{formatTime(currentTime)} / {formatTime(duration)}</span>
		</div>
	</div>
</div>

<style>
	.audio-player {
		background-color: yellow;
		display: inline-flex;
		align-items: stretch;
	}

	.audio-box {
		display: flex; /* enable flexbox inside the box */
		flex-grow: 1; /* boxes grow dynamically based on content */
		padding: 1rem;
		margin-top: -1px; /* make borders overlap so they remain 1px thick */
		margin-left: -1px; /* make borders overlap so they remain 1px thick */
		border: 1px solid;
		text-align: left; /* align text to the left */
		word-wrap: break-word; /* prevent long text from overflowing */
		align-items: center; /* vertically center the text inside the box */
		justify-content: center; /* horizontally center the text inside the box */
	}

	.play-button {
		background-color: yellow;
		border: 0px;
		cursor: pointer;
	}

	.play-button:hover {
		color: red;
		cursor: pointer;
	}

	.pause-button {
		background-color: yellow;
		border: 0px;
		cursor: pointer;
	}

	.pause-button:hover {
		color: hsl(60, 100%, 39.2%);
		cursor: pointer;
	}

	.progress-bar {
		background-color: hsl(60, 100%, 39.2%);
		position: relative; /* so that children can be placed absolute */
		height: 100%;
		width: 20rem;
		overflow: hidden;
		cursor: pointer;
  	}

	.progress-indicator {
		background-color: red;
		height: 100%;
		width: 0%; /* initial width of progress */
		transition: width 0.1s linear;
	}

	.hover-indicator {
		background-color: red; /* start with red because there won't be a progress bar yet */
		position: absolute; /* so that it is placed relative to parent */
		height: 100%; /* full height of the progress bar */
		width: 1.5px; /* thin bar */
		display: none; /* hidden by default */
		pointer-events: none; /* ensure it doesn't interfere with progress-indicator */
	}

	#progress-box {
		padding: 0; /* progress bar should fill its entire box */
	}

	.time-info {
		flex-shrink: 0;
		text-align: right;
		font-size: 1rem;
		color: black;
	}
</style>