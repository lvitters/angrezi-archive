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
	let isPlaying = $state(false);

	// start playback
	function playAudio() {
		audioElement.play();
		isPlaying = true;
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
	}

	// play from a specific time in the audio
	function seek(event) {
		const progressWidth = event.currentTarget.offsetWidth;
		const clickX = event.offsetX;
		const newTime = (clickX / progressWidth) * duration;
		audioElement.currentTime = newTime;
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
	<div class="audio-box">
		<!-- progress bar with key event for accessability (not sure how accessability works yet) -->
		<div class="progress-bar" role="button" tabindex="0" aria-label="Seek in audio" onclick={seek}
			onkeydown = {(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					seek(e);
				}
			}}
		>
			<div class="progress" style="width: {duration ? (currentTime / duration) * 100 : 0}%"></div>
		</div>
	</div>
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

	/* progress bar container */
	.progress-bar {
		background-color: hsl(60, 100%, 39.2%);
		height: .5rem;
		width: 20rem;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
  	}

	/* progress indicator */
	.progress {
		background-color: red;
		height: 100%;
		width: 0%; /* initial width of progress */
		transition: width 0.1s linear;
	}

	/* progressed time in numbers */
	.time-info {
		flex-shrink: 0;
		text-align: right;
		font-size: 1rem;
		color: black;
	}

	.audio-box {
		display: flex; /* Enable flexbox inside the box */
		flex-grow: 1; /* Boxes grow dynamically based on content */
		padding: 1rem; /* Add padding for spacing inside the box */
		margin-top: -1px; /* make borders overlap so they remain 1px thick */
		margin-left: -1px; /* make borders overlap so they remain 1px thick */
		border: 1px solid;
		text-align: left; /* Align text to the left */
		word-wrap: break-word; /* Prevent long text from overflowing */
		align-items: center; /* Vertically center the text inside the box */
		justify-content: center; /* Horizontally center the text inside the box */
	}
</style>