<script>
	import { YearSlider } from '$lib/index';

	import { Controls } from '$lib/index';
	import { Track } from '$lib/index';

</script>

<YearSlider/>

<Controls/>

<div class="tracks">

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
	
	.tracks {
		margin: 0;
		padding: 1rem;
		display: flex;
		column-gap: 1rem;
		row-gap: 1rem;
	}

</style>