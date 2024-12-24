<!-- https://iconify.design/docs/icon-components/svelte/ -->

<script lang="ts">
	import Icon from "@iconify/svelte";
	import { chooseRandomFont } from './RandomFont.svelte';

	// get audio source from parent
	let { src = $bindable() } = $props();

	// audio file to perform operations on
	let audioElement;
	let currentTime = $state(0);
	let duration = $state(0);
	let currentProgress = 0;
	let isPlaying = $state(false);
	let wasPlaying = $state(false);
	let hoverIndicator = $state(null);

	// start playback
	function playAudio() {
		audioElement.play();
		isPlaying = true;
		wasPlaying = true;
	}

	// pause playback
	function pauseAudio() {
		audioElement.pause();
		isPlaying = !isPlaying;
	}

	// update progress bar
	function updateProgress() {
		currentTime = audioElement.currentTime;
		duration = audioElement.duration || 0; // Avoid NaN for duration
		currentProgress = (audioElement.currentTime / duration) * 100;
	}

	// play from a specific time in the audio
	function seek(event) {
		const progressWidth = event.currentTarget.offsetWidth;
		const mouseX = event.offsetX;
		const newTime = (mouseX / progressWidth) * duration;
		audioElement.currentTime = newTime;
	}

	// show indicator when hovering over the progress bar
	function showHoverIndicator(event) {
		const progressBar = event.currentTarget;
		const rect = progressBar.getBoundingClientRect();

		// calculate the x position relative to the progress bar
		const mouseX = event.clientX - rect.left;

		// determine the current progress position in pixels
    	const progress = (currentProgress / 100) * rect.width;

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

<!-- custom audio player -->
<div class="audio-player">
	<audio bind:this={audioElement} ontimeupdate={updateProgress}>
		<source src={src} type="audio/mp3" />
		Your browser does not support the audio element.
	</audio>
	<div class="audio-box">
	<!-- show button, depending on if something is playing -->
		{#if !isPlaying}
			<button class="play-button" onclick={playAudio}><Icon icon="pixelarticons-play" style="font-size: 2rem;"/></button>
		{:else}
			<button class="pause-button" onclick={pauseAudio}><Icon icon="memory-pause" style="font-size: 2rem;"/></button>
		{/if}
	</div>
	{#if wasPlaying}
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