<script>
	import { YearSlider } from '$lib/index';

	import { Controls } from '$lib/index';
	import { Track } from '$lib/index';

</script>

<YearSlider/>

<div class="app">

	<Controls/>

	<Track/>
	<Track/>
	<Track/>

</div>

<style>

	:global(body) {
		margin: 0;
		padding: 1rem;
	}
	
	:global(p) {
		font-size: 12px;
	}
	
	:global(strong) {
		font-size: 14px;
	}
	
	:global(button) {
		font-size: 14px;
	}
	
	.app {
		margin: 0;
		padding: 0;
		display: grid;
		row-gap: 1rem;
	}

</style>