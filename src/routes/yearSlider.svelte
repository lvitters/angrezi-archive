<script lang="ts">
    import { onMount } from "svelte";
	import RangeSlider from "svelte-range-slider-pips";
	
	// for getting the current year
	let now = new Date();

	// get selected year from parent
	let { year = $bindable() } = $props();

	//do this when the program starts
	onMount(()=> {
		year = now.getFullYear();
	})

	//assign the input to the year on change (while moving the slider)
	function handleInput(inputValue: number) {
		year = inputValue;
	}
</script>

<div id="yearSelectBox">
	<RangeSlider value={year} on:change={(e) => {handleInput(e.detail.value)}} id="yearSelect" pips pipstep={1} min={2019} max={2069} float />
</div>

<style>
	/* https://simeydotme.github.io/svelte-range-slider-pips/en/styling/ */
  	:root {
		--range-slider:            hsl(60, 100%, 39.2%);
		--range-handle-inactive:   hsl(0, 100%, 50%);
		--range-handle:            hsl(0, 100%, 50%);
		--range-handle-focus:      hsl(0, 100%, 50%);
		--range-handle-border:     hsl(0, 100%, 75.1%);
		--range-range-inactive:    hsl(60, 100%, 39.2%);
		--range-range:             hsl(60, 100%, 50%);
		--range-float-inactive:    hsl(0, 100%, 75.1%);
		--range-float:             hsl(0, 100%, 75.1%);
		--range-float-text:        hsl(0, 0%, 100%);

		--range-pip:               hsl(210, 14.3%, 53.3%);
		--range-pip-text:          hsl(210, 14.3%, 53.3%);
		--range-pip-active:        hsl(180, 25.4%, 24.7%);
		--range-pip-active-text:   hsl(180, 25.4%, 24.7%);
		--range-pip-hover:         hsl(180, 25.4%, 24.7%);
		--range-pip-hover-text:    hsl(180, 25.4%, 24.7%);
		--range-pip-in-range:      hsl(180, 25.4%, 24.7%);
		--range-pip-in-range-text: hsl(180, 25.4%, 24.7%);
  	}

	#yearSelectBox {
		margin-top: 2rem;
	}
</style>