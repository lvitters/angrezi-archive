<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let year = 2024;
</script>

<div class="container mx-auto p-8 space-y-8">
	<p>{year}</p>
	<RangeSlider name="range-slider" bind:value={year} min={2018} max={2118} step={1} ticked></RangeSlider>
</div>