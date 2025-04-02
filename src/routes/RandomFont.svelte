<script lang="ts" context="module">
	// some random fonts from the regular radio website
	let fonts: string[] = [
		"Archivo_Narrow",
		"Millimetre",
		"savateregular",
		"Sporting_Grotesque_Regular",
		"terminal_grotesque",
		"VG5000",
	];

	// choose a random font for each audioFile, insert as class name in divs
	export function chooseRandomFont() {
		let font = fonts[Math.floor(Math.random() * fonts.length)];
		//console.log(font);
		return font;
	}

	// choose a font from the array
	export function chooseFont(i: string | number) {
		let font = fonts[i];
		//console.log(font);
		return font;
	}
</script>
