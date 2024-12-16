<script lang="ts">
	let audioElement;

	let { src = $bindable() } = $props();

	function playAudio() {
		audioElement.play();
	}

	function pauseAudio() {
		audioElement.pause();
	}
	
</script>

<!-- custom audio player -->
<div class="audio-player">
	<audio bind:this={audioElement}>
		<source src={src} type="audio/mp3" />
		Your browser does not support the audio element.
	</audio>
	<button onclick={playAudio}>Play</button>
	<button onclick={pauseAudio}>Pause</button>
  </div>

<style>
	.audio-player {
		background-color: yellow;
		padding: 10px;
		border-radius: 10px;
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.audio-player button {
		background-color: black;
		color: yellow;
		border: none;
		padding: 10px;
		cursor: pointer;
	}

	.audio-player button:hover {
		background-color: green;
		color: white;
	}
</style>