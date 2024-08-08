<script>
	let year = 2024;
	$: yearPos = year - 2013;
</script>

<div id="container">
	<div id="year" style="left: {(yearPos/100*90)}%">{year}</div>
	<input type="range" bind:value={year} min="2018" max="2118"/>
</div>

<style>
	#container {
		display: block;
		width: 100vw;
	}
	#year {
		position: absolute;
		top: 3%;
	}
	input {
		margin-top: 1%;
		width: 90%;
	}
</style>
