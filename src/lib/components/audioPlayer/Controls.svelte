<script>
	import Slider from './Slider.svelte'
	import { status, isPlaying, audioPlayer, index, trackList } from './stores.js'
	import { format } from './utilities.js'
	import PlayButton from './PlayButton.svelte'
	import { onMount } from 'svelte'
	
	let duration = 0;
	let currentTime = 0;
	let formattedTime = format(currentTime);
	let paused = true;
	let volume = 0.5;
	
	let slider;
	let rAF = null;

	let title = $trackList[$index].title; 
	let artist = $trackList[$index].artist;
	let src = $trackList[$index].file;
	
	function whilePlaying() {
		slider.value = audio.currentTime;
		currentTime = slider.value;
		rAF = requestAnimationFrame(whilePlaying);
	};
	
	function loadTrack($index) { 
		title = $trackList[$index].title; 
		artist = $trackList[$index].artist;
		$audioPlayer.src = $trackList[$index].file; 
		$audioPlayer.load();
	};
	
	function playTrack() {
		$isPlaying = true;
		requestAnimationFrame(whilePlaying);
		$audioPlayer.play()
	};
	
	function pauseTrack() {
		$isPlaying = false;
		cancelAnimationFrame(rAF);
		$audioPlayer.pause()
	};
	
		function movePosition() {
		time = slider.value;
		if(!audio.paused) {
			cancelAnimationFrame(rAF);
		}
	};

	function updatePosition() {
		audio.currentTime = slider.value;
		if(!audio.paused) {
			requestAnimationFrame(whilePlaying);
		}
	};
	
	function previousTrack() {
		$isPlaying = false;
		currentTime = 0;
		if ($index > 0) {
			$index -= 1; 
		} else {
			$index = $trackList.length - 1
		};
		loadTrack($index);
		playTrack();	
	};
	
	function nextTrack() {
		$isPlaying = false;
		currentTime = 0;
		if ($index < $trackList.length - 1) {
			$index += 1; 
		} else {
			$index = 0
		};
		loadTrack($index);
		playTrack();
	};
	
	onMount(() => {
		$audioPlayer.load();
	});
	
// 	on:progress="{() => $status = 'loading'}"
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
	bind:this={$audioPlayer}
	bind:duration={duration}
	bind:currentTime={currentTime}
	bind:paused={paused}
	bind:volume={volume}
	on:canplay="{() => $status = 'can play some'}"
	on:canplaythrough="{() => $status = 'can play all'}"
	on:waiting="{() => $status = 'waiting'}"
	on:timeupdate="{() => $status = 'playing'}"
	on:seeking="{() => $status = 'seeking'}"
	on:ended="{() => {$isPlaying = false; currentTime = 0}}"
	src={src}
/>

<div class='box'>
	
	<PlayButton controls/>

	<div class='info'>
		<div class='title'>
			<p><strong>Show</strong></p><p>{title}</p>
		</div>
		<div class='artist'>
			<p><strong>Artist</strong></p><p>{artist}</p>
		</div>
	</div>

	<div class='progress'>
		
		<span class='time'>{format(currentTime)}</span>
		
		<div class='progress-slider'>
			<Slider
				bind:this={slider}
				min={0}
				bind:value={currentTime}
				max={duration}
				step={0.01}
				precision={2}
				formatter="{v => format(v)}"
				on:input={movePosition}
				on:change={updatePosition}
			/>
		</div>
		
		<span class='duration'>{format(duration)}</span>
		
	</div>
		
<!-- 	<div class='debugger'> -->
		
<!-- 		<p><strong>Index</strong></p><p>{$index}</p> -->
<!-- 		<p><strong>Volume</strong></p><p>{volume}</p> -->
<!-- 		<p><strong>Loading</strong></p><p>{$status}</p> -->
<!-- 		<p><strong>Playing</strong></p><p>{$isPlaying}</p> -->
<!-- 		<p><strong>Time</strong></p><p>{currentTime}</p> -->
<!-- 		<p><strong>Duration</strong></p><p>{duration}</p> -->
		
<!-- 	</div> -->

</div>

<style>
	audio {
		display: none
	}
	
	div {
		display: grid;
		grid-auto-flow: row;
	}
	
	p {
		margin: 0;
		padding: 0;
		line-height: 1;
		user-select: none;
	}
	
	strong {
		margin: 0;
		padding: 0;
		font-size: 18px;
		line-height: 1;
	}
	
	span {
		display: inline-grid;
		margin: 0;
		padding: 0.25rem 0.75rem;
		width: 2.5rem;
		border-radius: 6px;
		place-items: center;
		font-size: 14px;
	}
	
	.box {
		margin: 0;
		padding: 1rem;
		padding-top: 1.5rem;
		background: hsl(60, 100%, 39.2%);;
		display: flex;
		row-gap: 1rem;
		align-items: center;
		border-radius: 8px;
	}
	
	.info {
		margin: 0;
		padding: 2rem;
		grid-template-columns: 1fr;
		grid-template-rows: 2;
		justify-items: start;
		row-gap: .2rem;
	}
	
	.title, .artist {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 4rem 1fr;
		row-gap: 1rem;
		margin: 0;
		padding: 0;
	}
	
	.title {
		grid-row: 1 / 2;
	}
	
	.artist {
		grid-row: 2 / 3;
	}
	
	.progress {
		grid-template-columns: 6rem 1fr 6rem;
		place-items: center;
		width: 100%;
	}
	
	.time {
		justify-self: start;
	}
	
	.duration {
		justify-self: end;
	}
	
	.progress-slider {
		width: 100%;
	}
	
/* 	.debugger {
		padding: 1rem;
		place-items: center;
		column-gap: 1rem;
		border: 1px solid #bbb;
		border-radius: 8px;
		background: #ddd;
		grid-template-columns: 4rem 1fr 4rem 1fr;
		justify-items: start;
		align-items: center;
		row-gap: 0.5rem;
	} */
</style>