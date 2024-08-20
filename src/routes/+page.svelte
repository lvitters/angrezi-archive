<svelte:head>
	<script type="text/javascript" src="/js/jquery_1.4.2.js"></script>
	<script type="text/javascript" src="/js/mrp.js"></script>
	<script type="text/javascript" src="/js/airtime-player.js"></script>
	<script type="text/javascript" src="/js/vendor/moment/moment.js"></script>
	<script type="text/javascript" src="/js/airtime-schedule.js"></script>
</svelte:head>

<script>
	import { onMount } from  'svelte';
	import jQuery from 'jquery';

	onMount(async () => {
		jQuery.noConflict();
	})
</script>

<div class="wrapper">
<header class="main-head">
	<div class="marquee-wrapper">
		<div class="marquee">
			<p class="now_playing">Welcome to Radio Angrezi! - <a href="https://t.me/radioangrezi">Notification when on air?</a></p>
		</div>
	</div>	
	<nav class="main-nav">
		<ul>
			<li class="flex-item">
				<div class="player-wrapper">
					<div id="player">
						<div class="airtime_player">
							<div class="airtime_box">
								<div id="play" class="box" onclick="musesPlayer.toggle()">START LIVESTREAM</div> <!-- TODO: why does this work lol? -->
							</div>
						</div>
					</div>
					<div id="muses_skin">
						<script type="text/javascript">
							var musesPlayer = new MusesPlayer();
						</script>
					</div>
				</div>
			</li>
			<li class="flex-item">
				<a href="#anchor-footer">
					<div class="logo-link">
					<svg id="radio-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 664.5 155.3">
						<style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
						<path class="st0" d="M133 117.3c-15.7-6.8-36.3-16.9-53.8-26.4 -6.3-3.4-12.1-6.4-17.5-8.9 10.6-1.3 18.8-4.9 23.8-9.4 5.1-4.6 7-10.3 5.5-16.2C88.7 47.4 75.1 43.2 47 42.8c-18.7-0.3-36.5 1.4-37.2 1.4 -1.4 0.1-2.6 0.9-3.4 2s-1 2.6-0.5 3.9c0 0 0.5 1.4 1.2 3.9 -1.5-1-3.5-1-5.1 0 -2.1 1.4-2.6 4.3-1.1 6.3C1 60.5 13.6 78.8 21.2 98.4c0.3 0.9 0.6 1.8 0.8 2.6 0.9 2.8 1.7 5.2 2.2 6.8 0.3 0.8 0.5 1.5 0.7 2 1.6 4.7 5.4 3.7 5.9 3.5 1.3-0.4 4.1-1.8 2.7-6.6 -0.2-0.7-0.5-1.8-1-3.3 -0.8-2.7-1.8-5.4-2.8-8.1 -1.6-4.9-3.5-10.9-5.5-17.3 3.6 1.1 7.1 2 10.5 2.7 9.5 3.3 23.1 8.8 40.1 18.1 17.7 9.7 38.6 19.9 54.5 26.8 0.6 0.3 1.2 0.4 1.8 0.4 1.8 0 3.4-1 4.2-2.7C136.3 121 135.3 118.3 133 117.3zM37 71.9c-9.9-3.4-15.4-4.3-15.8-4.4 -0.1 0-0.2 0-0.3 0 -1.6-5-3.2-10-4.6-14.7 6.8-0.5 18.7-1.1 30.7-1 33.3 0.5 35.3 6.8 35.4 6.9 0.6 2.5-0.3 4.9-2.8 7.2C72.5 72.2 56.3 75.6 37 71.9z"/><path class="st0" d="M145.2 72.2c-0.3-0.1-5.5-1.4-15.8-3l-6.5-48.4c-0.3-2-1.8-3.5-3.7-3.9 -2-0.3-3.9 0.6-4.8 2.4C93.7 59.7 95.5 79.8 95.6 80.6c0.3 2.5 2.5 4.3 4.9 4 2.5-0.2 4.3-2.5 4.1-4.9 0-0.1-0.1-1.5 0.1-4.4 6.3 0.6 11.8 1.2 16.5 1.8l4 30c0.3 2.3 2.3 3.9 4.5 3.9 0.2 0 0.4 0 0.6 0 2.5-0.3 4.2-2.6 3.9-5.1l-3.7-27.4c8.1 1.3 12.2 2.4 12.2 2.4 0.4 0.1 0.8 0.2 1.2 0.2 2 0 3.8-1.3 4.4-3.4C149 75.3 147.6 72.8 145.2 72.2zM106.2 66.3c1.5-7 4.3-16.7 9.7-29.2l4.1 30.7C115.9 67.3 111.3 66.8 106.2 66.3z"/><path class="st0" d="M200.6 38.6c-15.2-11.1-42.1-4-43.2-3.7 -2.2 0.6-3.6 2.7-3.3 5 0.2 1.6 0.5 3.3 0.7 5.1 -1.2-1.3-3-1.8-4.7-1.3 -2.4 0.8-3.7 3.3-3 5.7 0.1 0.4 12.4 39.5 16.4 59.9 -3 1-6.3 2-9.8 3 -2.4 0.6-3.9 3.1-3.2 5.5 0.5 2 2.4 3.4 4.4 3.4 0.4 0 0.8 0 1.2-0.2 3.3-0.9 6.4-1.8 9.4-2.8 1.5 2.2 4 2 4.3 1.9 1-0.1 3.9-0.9 3.8-5 22.4-9.5 36.7-24.1 40-41.4C216.3 59.9 211.3 46.4 200.6 38.6zM204.8 72c-1.3 7-7.1 22.5-32.3 33.8 -0.1-0.9-0.2-1.8-0.4-2.7 -1-7.2-2.3-16.7-3.7-26.2 -1.9-13.7-3.9-27.4-4.8-34 8.4-1.6 23.5-2.8 31.6 3.1C203.1 51.7 206.7 61.6 204.8 72z"/><path class="st0" d="M231.5 43.7c-2.5-0.5-4.8 1.1-5.3 3.6 -0.5 2.4-11.7 59.6-12.9 74.9 -0.2 2.5 1.7 4.7 4.1 4.9 0.1 0 0.3 0 0.4 0 2.3 0 4.3-1.8 4.5-4.2 1.2-14.8 12.7-73.3 12.8-73.9C235.6 46.6 234 44.2 231.5 43.7z"/><path class="st0" d="M271.5 49.2c-3.4-10.5-10.5-11.2-13.4-11 -14.1 1-16.9 23.7-17.7 31.2 -1 8.4-1.2 16.6-1.2 21.7 -1.5 1.8-1.4 4.4 0.2 6 0.4 2.2 2.4 3.8 4.6 3.7 0 0 0 0 0 0 2.8 1.6 5.3 2.2 7.5 2.2 3 0 5.5-1.1 7.1-2.1C270.9 93.5 276.5 64.5 271.5 49.2zM253.9 93.4c-0.8 0.5-2.5 1.6-5.6-0.5 -0.4-22.2 3.5-45.1 10.5-45.6 1.7-0.1 3.1 1.5 4.1 4.7C267 64.6 261.7 88.5 253.9 93.4z"/><path class="st0" d="M230.6 25.9c-2.8 0.8-4.5 3.4-3.9 5.8 0.7 2.3 3.6 3.6 6.4 2.7 2.8-0.8 4.5-3.4 3.9-5.8C236.3 26.3 233.4 25.1 230.6 25.9z"/><path d="M358.6 83.8l-3.6-1.5c-0.4-3.2-0.9-6.4-1.4-9.7 -2-13.9-3.8-25-5.5-33.1 -3.1-15.4-4.9-18.2-8.2-19.1 -2.1-0.6-4.2 0.2-5.5 2 -5.5 7.3-32.2 64-35.2 70.4 -1.1 2.3-0.1 5 2.2 6 2.3 1.1 5 0.1 6-2.2 2.9-6.2 6.3-13.3 9.7-20.5l29.6 12.5c1.4 10.6 2.8 21.7 4.1 32.5 0.3 2.3 2.2 4 4.5 4 0.2 0 0.4 0 0.5 0 2.5-0.3 4.3-2.5 4-5 0-0.2-1.4-12.2-3.4-27.6 0.2 0 0.3 0 0.5 0 1.8 0 3.4-1 4.2-2.8C362 87.5 360.9 84.8 358.6 83.8zM321.1 68c6.4-13.2 12.7-25.9 16.7-33.5 2.1 8.8 4.8 25 7.5 43.7L321.1 68z"/><path d="M375.2 128.2c-2.5 0-4.5-2-4.5-4.4L368 17.3c-0.1-2.2 1.5-4.1 3.6-4.6 2.2-0.4 4.3 0.7 5.1 2.8 0.9 2.2 18 45.2 28 79.6 5.6-25.8 16.4-71.3 26.4-92.4 1.1-2.3 3.8-3.2 6-2.2 2.3 1.1 3.2 3.8 2.2 6 -13.6 28.8-29.5 108.4-29.6 109.2 -0.4 2.1-2.3 3.6-4.4 3.7 -2.1 0-4-1.5-4.5-3.6 -4.5-20.5-15.2-50.9-23.1-72.2l2.1 80c0.1 2.5-1.9 4.6-4.4 4.7C375.3 128.2 375.3 128.2 375.2 128.2z"/><path d="M491.7 11.4c-2.2-1.2-5-0.3-6.1 1.9 -0.5 1-1.2 2.2-1.9 3.6 0 0 0 0 0 0 -0.4 0.7-0.8 1.5-1.2 2.3 -0.1 0.2-0.2 0.4-0.3 0.6 -0.2 0.1-0.4 0.2-0.6 0.3 -0.5 0.4-13.6 9-27.2 20.8 -18.9 16.3-29.2 30.3-30.7 41.5 -0.8 5.7 0.6 10.8 4.2 14.9 1.8 2.1 4.2 3.2 6.8 3.2 0.4 0 0.7 0 1.1-0.1 6.3-0.7 14.2-8.3 24.8-24.5 -7.1 14.4-14.7 26.7-22.7 36.7 -14.2 17.7-29.8 28.5-46.5 32.1 -18 3.9-37.1-0.4-56.8-12.7 -15-9.4-24.7-20.2-24.8-20.3 -1.7-1.9-4.5-2-6.4-0.4 -1.9 1.7-2 4.5-0.4 6.4 0.4 0.5 10.5 11.7 26.5 21.8 16.4 10.3 33.1 15.6 49.1 15.6 5 0 9.9-0.5 14.7-1.6 40.7-8.8 73.9-53.5 98.5-132.9 0.7-1.3 1.3-2.4 1.7-3.3C494.8 15.3 494 12.6 491.7 11.4zM434.9 91.5C434.8 91.5 434.8 91.5 434.9 91.5c-1.9-2.2-2.6-4.7-2.2-7.8 1.9-13.7 23.5-33.2 40.1-46 -4.7 8.6-10 18.2-15.5 26.9C441.6 89.9 435.7 91.4 434.9 91.5z"/><path d="M476.4 106.2c-0.4 0-0.9-0.1-1.3-0.2 -2.3-0.7-3.7-3-3.1-5.4 0.1-0.5 2.3-9.9 8.3-22.1 6.1-16 12.6-32.8 12.7-33 0.9-2.3 3.5-3.5 5.9-2.6 2.1 0.8 3.3 3 2.8 5.2 12.2-12.3 27-20.5 43.4-24.2 2.5-0.5 4.9 1 5.4 3.4 0.5 2.4-1 4.9-3.4 5.4C514.7 40 497 64.9 488.3 83c-2.9 7.7-5.7 15.1-7.6 20.3C480 105 478.2 106.2 476.4 106.2z"/><path d="M521.1 99.3c-0.7 0-1.4 0-2-0.1 -7.7-0.8-12.9-5.9-14.5-14.4 -3.2-16.7 15.5-32 32.5-40 6.6-3.1 22.6-9.7 28.2-3 1.8 2.1 3 6-1.5 12.2 -14.6 20.1-41.7 22.7-49.7 23 -0.6 2-0.9 4-0.5 6.1 1.1 5.9 4.1 6.9 6.5 7.1 12.7 1.3 36.2-17.9 39.6-26 1-2.3 3.6-3.4 5.9-2.5 2.3 1 3.4 3.6 2.5 5.9C563.6 78.1 538.8 99.3 521.1 99.3zM556.8 47.8c-5.9 0.4-20.8 5.7-32.6 15.6 -1.2 1-2.6 2.3-4 3.8 10-1.4 26.6-5.7 36.1-18.7C556.5 48.3 556.6 48.1 556.8 47.8z"/><path d="M536.6 127.8c-0.9 0-1.9-0.3-2.7-0.9 -1.9-1.4-2.4-3.9-1.3-5.9 0.5-0.8 5.9-10.1 18.9-20.3 22.7-23.6 47.8-48.5 60.6-61 -10.6 1-18.2 3.4-23 5.5 -7 3-10 6.1-10 6.1 -1.7 1.8-4.6 1.8-6.4 0.1 -1.8-1.7-1.9-4.6-0.2-6.4 0.6-0.6 14.5-14.9 50.4-14.9 0.3 0 0.6 0 1 0 1.8 0 3.5 1.1 4.2 2.8 0.7 1.7 0.3 3.7-1.1 4.9 -0.3 0.3-22.3 21.6-47 46.5 11.8-4.7 26.1-8.5 43.4-10 2.5-0.2 4.7 1.6 4.9 4.1 0.2 2.5-1.6 4.7-4.1 4.9 -32.7 3-54.1 14.3-67.1 24.5 -6.1 6.3-11.9 12.5-17.3 18.4C539 127.3 537.8 127.8 536.6 127.8z"/><path d="M637 83.2c-2.2 0-4.2-1.7-4.5-4 -0.9-6.6 1.6-15.8 7.2-27.3 4-8.2 8.2-14.6 8.4-14.9 1.4-2.1 4.2-2.7 6.3-1.3 2.1 1.4 2.7 4.2 1.3 6.3 -4.4 6.7-15.5 26.1-14.2 36 0.3 2.5-1.4 4.8-3.9 5.1C637.4 83.2 637.2 83.2 637 83.2z"/><path class="st0" d="M663.9 20.7c-0.8-1.5-3.7-2.1-7.1-1 -3.4 1.1-3.8 4-2.9 6.9 1 2.9 3.3 2.9 6.7 1.8C663.9 27.4 665.6 23.9 663.9 20.7z"/>
					</svg>
				</a>
			</li>
			<li class="flex-item">
				<div class="box">
					<a href="/archiv">ARCHIV</a>
				</div>
			</li>
		</ul>
	</nav>
	<div class="notification-section">
		<div class="telegram-link flex-item grid-outline-block">
			<a href="https://t.me/radioangrezi">ON-AIR-<i>bing</i> via Telegram</a>
		</div>
		<div class="mailinglist-form flex-item grid-outline-block">
			<form action="https://mailman.zfn.uni-bremen.de/cgi-bin/mailman/subscribe/ra-friends" method="POST" target="_blank" class="newsletter-form">
				<input type="email" placeholder="become a friend of the mailing list" name="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" required="" class="email"><button type="submit" class="submit">→</button>
			</form>
		</div>
	</div>
</header>

	<section class="shoutbox-section">
		<div class="wrap-collabsible">
			<input id="collapsible" class="toggle" type="checkbox">
			<label for="collapsible" class="lbl-toggle">Angrezi Chat</label>
			<div class="collapsible-content">
				<div class="content-inner">
					<div class="shoutbox-wrapper">
						<!-- HACK: because we can not share the cookie across origins (subdomains) we need to embed from an iframe. How shit! -->
						<iframe width="100%" height="960px" src="http://talk.radioangrezi.de/embed.html?1705674130862506274" border="0" outline="0" loading="lazy"></iframe>  
					</div>
				</div>
			</div>
		</div>
	</section>

	<main class="show-section">
	</main>

	<template id="schedule-no-show-regular">
		<article class='show-item'>
			<div class='headlines'>
			<img class='pixel' src='../../images/MrPixel-moon.svg'>
			<!-- <h1 class='show-time'>SENDE-<br/>PAUSE?!</h1> -->
			<h1 class='show-title'>We have no broadcasts scheduled within the next week. <br/>Can't stand the silence? <a href="/special.html">Contribute</a> to the programme with your production.</h1>
			</div>
		</article>
	</template> 
	
	<template id="schedule-no-show">
		<article class='show-item'>
			<div class='headlines'>
			<img class='pixel' src='../../images/MrPixel-moon.svg'>
			<h1 class='show-time'>INTER-<br/>MISSION</h1>
				
			<h1 class='show-title'>Until the 9th of september the radio will be turned off.<br/>
			We are eager to be back in september. You won't be disappointed.</h1>
			</div>
		</article>
	</template>
	
	<template id="schedule-fail">
		<article class='show-item'>
			<div class='headlines'>
			<img class='pixel' src='../../images/MrPixel-tear.svg'>
			<h1 class='show-time'>UUPZZ</h1>
			<h1 class='show-title'>Can't connect to the studio: Schedule currently not available right now. Sorry!</h1>
			</div>
		</article>
	</template> 	

	<footer id="anchor-footer" class="site-footer">
		<p>Radio Angrezi is an experimental ground for sound, music, voice and live performance. It broadcasts weekly from its studio at Speicher XI (Bremen) on radioangrezi.de, as well as occasionally on 92,5 FM, receivable in the Bremen and the surrounding area. In addition special broadcasts covering concerts, lectures, presentations and exhibition openings are produced regularly.
		<br><br>
		Radio Angrezi is an autonomous student collective, spanning all disciplines, study departments and multiple languages. It is open for students, teachers and guests. It aims to rise questions, develop new conditions, shapes and formats, to perform and to broadcast – collectively or individually – to listen, to observe and to discuss.
		<br/><br/>
		Interested in broadcasting, performing, supporting, mixing or just hanging out? Drop by in Segment 7 in Speicher XI or send a line to <a class="black-link" href="mailto:radioangrezi@hfk-bremen.de">radioangrezi@hfk-bremen.de</a></p>
		<p>Visit the studio during the live streams:<br>
		<address>
			Radio Angrezi<br>
			Hochschule f&uuml;r K&uuml;nste Bremen<br>
			Am Speicher XI 7<br>
			28217 Bremen <br>
			Germany
		</address>
		<br>
	<p>Contact Radio Angrezi:</p>
	<p>
	Email: <a class="black-link" href="mailto:radioangrezi@hfk-bremen.de">radioangrezi@hfk-bremen.de</a><br/>
	Call us at: <a class="black-link" href="tel:+49-421-95-95-12-13">0421 95 95 12 13</a><br>
	</p>

</footer>
</div>

<style>

	@import url("https://fonts.googleapis.com/css?family=Archivo+Narrow");*,*:before,*:after {
		box-sizing: border-box
	}

	body {
		font-family: 'Sporting Grotesque_Regular', sans-serif
	}

	body,.wrapper,p {
		margin: 0;
		padding: 0
	}

	body {
		padding: 2rem;
		background-color: #ffff00
	}

	svg {
		fill: currentColor
	}

	.wrapper {
		display: grid;
		grid-template-areas: "header" "shoutbox" "main" "footer"
	}

	ul {
		list-style-type: square
	}

	address {
		font-style: normal
	}

	.main-head {
		grid-area: header;
		background-color: #ffff00;
		outline: 1px solid black;
		z-index: 1
	}

	a,a:visited {
		color: black
	}

	a:hover,a:active {
		color: #0000ff
	}

	.inverted a,.inverted a:hover,.inverted a:visited,.inverted a:active {
		color: #ffff00
	}

	.row {
		outline: #000 1px solid;
		padding: 1rem
	}

	.notifications-section,.notifications-section a,.notifications-section p {
		font-family: 'Archivo Narrow', sans-serif
	}

	.grid-outline-container-large-gap {
		row-gap: 10px;
		grid-column-gap: 10px
	}

	.grid-outline-container {
		row-gap: 10px;
		grid-column-gap: 1px
	}

	.grid-outline-block {
		box-shadow: 0 0 0 1px black
	}

	.notification-section {
		justify-content: space-around;
		min-height: 3em;
		display: flex;
		flex-wrap: wrap
	}

	.notification-section div {
		padding: 0;
		min-width: 310px;
		max-width: 100%;
		flex-basis: auto;
		flex-grow: 1
	}

	.notification-section a {
		line-height: 3em
	}

	.mailinglist-form {
		min-height: 3em
	}

	.mailinglist-form form {
		margin: 0;
		width: 100%;
		position: relative
	}

	.mailinglist-form .newsletter input,.mailinglist-form .newsletter button {
		margin: 1em 0
	}

	.mailinglist-form .newsletter button {
		margin-left: -1px;
		padding: 0 1em
	}

	.mailinglist-form .email {
		width: 80%;
		margin: 0;
		font-family: 'savateregular';
		font-size: 1.2em;
		position: absolute;
		top: 0;
		left: 0
	}

	.mailinglist-form .submit {
		width: 20%;
		border: 0;
		background: black;
		color: yellow;
		margin: 0;
		padding: 0;
		border-left: 1px solid black;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0
	}

	.mailinglist-form .submit:hover {
		background: transparent;
		color: black
	}

	.mailinglist-form a.btn,.mailinglist-form input,.mailinglist-form button {
		background: transparent;
		outline: 0;
		padding: 0 0.5em;
		color: black;
		margin: 0.5em 0 0.5em 0;
		text-align: center;
		line-height: 2.2em;
		display: inline-block;
		border: none;
		outline-offset: 0;
		height: 100%;
		margin: 0
	}

	.mailinglist-form a.btn::placeholder,.mailinglist-form input::placeholder,.mailinglist-form button::placeholder {
		color: black
	}

	.mailinglist-form a.btn:focus,.mailinglist-form input:focus,.mailinglist-form button:focus {
		outline-style: dotted
	}

	.mailinglist-form a.btn:focus::placeholder,.mailinglist-form a.btn:focus::-webkit-input-placeholder,.mailinglist-form input:focus::placeholder,.mailinglist-form input:focus::-webkit-input-placeholder,.mailinglist-form button:focus::placeholder,.mailinglist-form button:focus::-webkit-input-placeholder {
		color: transparent
	}

	.mailinglist-form a.btn:active::placeholder,.mailinglist-form input:active::placeholder,.mailinglist-form button:active::placeholder {
		color: black
	}

	.page main>p {
		margin-bottom: 2rem
	}

	.page main {
		grid-template-columns: none;
		padding: 2rem 2rem;
		word-break: break-word
	}

	.page main strong {
		background: black;
		color: yellow
	}

	main {
		max-width: none;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		outline: 1px solid black;
		font-family: 'Sporting Grotesque_Regular'
	}

	main p.main-padding {
		padding: 2rem
	}

	.show-section {
		grid-area: main;
		outline: 1px solid black;
		overflow-wrap: break-word
	}

	input[type='checkbox'] {
		display: none
	}

	.lbl-toggle {
		display: block;
		font-family: 'Archivo Narrow', sans-serif;
		font-size: 2rem;
		text-align: center;
		padding: 1rem;
		color: black;
		background: #ffff00;
		cursor: pointer;
		transition: all 0.25s ease-out
	}

	.lbl-toggle:hover {
		color: #0000ff
	}

	.lbl-toggle::before {
		content: ' ';
		display: inline-block;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 5px solid currentColor;
		vertical-align: middle;
		margin-right: .7rem;
		transform: translateY(-2px);
		transition: transform .2s ease-out
	}

	.collapsible-content {
		max-height: 0px;
		overflow: hidden;
		transition: max-height .25s ease-in-out
	}

	.toggle:checked+.lbl-toggle+.collapsible-content {
		max-height: 200vh
	}

	.toggle:checked+.lbl-toggle::before {
		transform: rotate(90deg) translateX(-3px)
	}

	.toggle:checked+.lbl-toggle {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0
	}

	iframe {
		outline: 0;
		border: 0
	}

	.shoutbox-section {
		grid-area: shoutbox;
		outline: 1px solid black
	}

	.ys-post-post {
		color: white;
		background-color: #00e04c;
		margin-bottom: 0.8rem;
		border-radius: 0.8rem;
		padding: 0.5rem;
		font-family: 'Archivo Narrow', sans-serif
	}

	.ys-post-date {
		font-family: 'Archivo Narrow', sans-serif;
		text-align: center;
		line-height: 2em
	}

	.ys-post-info {
		display: none
	}

	.ys-post-timestamp {
		margin-right: 0.3rem
	}

	.ys-post-actions {
		display: none
	}

	#ys-history-link {
		display: none
	}

	form {
		margin-top: 1rem;
		padding: 0
	}

	fieldset {
		margin: 0;
		padding: 0.5rem;
		background-color: none;
		display: block;
		border: none
	}

	input {
		display: block
	}

	input[type=text],select {
		width: 100%;
		padding: 0.9rem;
		margin: 8px 0;
		border: 1px solid gray;
		border-radius: 15rem;
		box-sizing: border-box;
		outline: 0
	}

	input[type=submit] {
		width: 100%;
		background-color: #188bfe;
		color: white;
		padding: 0.9rem;
		margin-top: 1rem;
		border: none;
		border-radius: 15rem;
		cursor: pointer;
		outline: 0
	}

	input[type=submit]:hover {
		background-color: #1763fc
	}

	.site-footer {
		padding: 2rem;
		font-family: 'Sporting Grotesque_Regular';
		background-color: inherit;
		outline: 1px solid black;
		grid-area: footer
	}

	.main-nav {
		grid-area: nav;
		background-color: inherit;
		padding-bottom: 0.5em
	}

	.marquee-wrapper {
		color: black;
		font-family: 'terminal_grotesque';
		border-bottom: 1px solid black;
		font-size: 1.5rem;
		text-transform: uppercase
	}

	.marquee {
		height: 30px;
		overflow: hidden;
		position: relative;
		box-sizing: border-box
	}

	.marquee p {
		position: absolute;
		width: 100%;
		height: 100%;
		margin: 0;
		line-height: 30px;
		text-align: center;
		-moz-transform: translateX(100%);
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
		-moz-animation: scroll-left 20s linear infinite;
		-webkit-animation: scroll-left 20s linear infinite;
		animation: scroll-left 20s linear infinite
	}

	@-moz-keyframes scroll-left {
		0% {
			-moz-transform: translateX(100%)
		}

		100% {
			-moz-transform: translateX(-100%)
		}
	}

	@-webkit-keyframes scroll-left {
		0% {
			-webkit-transform: translateX(100%)
		}

		100% {
			-webkit-transform: translateX(-100%)
		}
	}

	@keyframes scroll-left {
		0% {
			-moz-transform: translateX(100%);
			-webkit-transform: translateX(100%);
			transform: translateX(100%)
		}

		100% {
			-moz-transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%)
		}
	}

	#muses_skin {
		display: none
	}

	.flex-item {
		display: flex;
		justify-content: center;
		padding: 0.6rem;
		margin: 0;
		text-align: center
	}

	.black-link {
		color: black
	}

	.logo-link {
		width: 300px;
		height: 60px;
		padding: 0;
		outline: 1px solid black;
		box-shadow: 5px 5px;
		box-sizing: border-box
	}

	.logo-link:hover {
		color: #0000ff
	}

	.logo-link:active {
		color: hotpink
	}

	#radio-logo {
		padding-top: 0.2rem;
		width: 14rem
	}

	#play {
		width: 300px;
		height: 60px;
		background-color: inherit;
		color: black;
		padding-top: 1rem;
		outline: 1px solid black;
		box-shadow: 5px 5px;
		box-sizing: border-box;
		font-family: 'Sporting Grotesque_Regular';
		cursor: pointer;
		font-size: 1.3rem;
		white-space: nowrap
	}

	#play:hover {
		color: #0000ff
	}

	#play:active {
		color: hotpink
	}

	#pause:hover {
		color: #0000ff
	}

	#pause:active {
		color: hotpink
	}

	.box {
		width: 300px;
		height: 60px;
		background-color: inherit;
		color: black;
		padding-top: 1rem;
		outline: 1px solid black;
		box-shadow: 5px 5px;
		box-sizing: border-box;
		font-family: 'Sporting Grotesque_Regular';
		cursor: pointer;
		font-size: 1.3rem;
		white-space: nowrap
	}

	.box:hover {
		color: #0000ff
	}

	.box:active {
		color: hotpink
	}

	#chat {
		width: 300px;
		height: 60px;
		padding: 1rem 0;
		font-family: 'Archivo Narrow', sans-serif;
		background-color: inherit;
		outline: 1px solid black;
		cursor: pointer;
		box-shadow: 5px 5px;
		box-sizing: border-box;
		font-size: 2rem
	}

	#chat:hover {
		color: #0000ff
	}

	#chat:active {
		color: hotpink
	}

	.flex-item>a {
		text-decoration: none
	}

	@media (max-width: 400px) {
		body {
			padding:0
		}
	}

	@media (min-width: 1000px) {
		.main-head {
			top:0;
			position: -webkit-sticky;
			position: sticky
		}

		nav ul {
			display: flex;
			justify-content: space-around;
			list-style-type: none;
			margin: 0;
			padding: 0
		}
	}

	article {
		margin: 0;
		display: flex;
		flex-flow: column;
		padding: 1.8rem;
		text-align: center;
		outline: 1px solid black;
		background-color: inherit
	}

	.pixel {
		width: 10%;
		margin: 2rem
	}

	article>img {
		order: -1;
		align-self: center;
		margin: 2rem;
		width: 50%
	}

	.show-time {
		font-size: 3em;
		font-family: 'Sporting Grotesque_Bold','Millimetre', Arial;
		font-weight: bold;
		transform: rotate(-20deg)
	}

	.holidays {
		font-size: 2rem
	}

	.show-item-date {
		margin: 0;
		display: flex;
		flex-flow: column;
		padding: 1.8rem;
		text-align: center;
		outline: 1px solid black;
		background-color: inherit;
		justify-content: center
	}

	.date {
		font-size: 1.5rem;
		font-family: 'Sporting Grotesque_Bold','Millimetre', Arial;
		font-weight: bold;
		transform: rotate(10deg)
	}

	.show-title,.page h2 {
		font-size: 2em;
		font-family: 'VG5000', Arial;
		line-height: 1.2;
		overflow-wrap: break-word
	}

	.show-host {
		margin: 0 1rem 0.5rem;
		font-size: 1.2em;
		font-family: 'savateregular', Arial
	}

	.show-date {
		margin: 0;
		margin-top: 1rem;
		text-align: center;
		font-size: 0.8em
	}

	.show-description {
		white-space: pre-wrap
	}

	article>p {
		margin: 0.25em 1rem 1rem;
		text-align: left;
		font-family: 'Sporting Grotesque_Regular', Arial;
		line-height: 1.25em;
		font-size: 1rem
	}

	@font-face {
		font-family: 'Sporting Grotesque_Regular';
		src: url("fonts/Sporting_Grotesque-Regular_web.eot");
		src: url("fonts/Sporting_Grotesque-Regular_web.eot?#iefix") format("embedded-opentype"),url("fonts/Sporting_Grotesque-Regular_web.woff") format("woff"),url("fonts/Sporting_Grotesque-Regular_web.woff2") format("woff2"),url("fonts/Sporting_Grotesque-Regular_web.ttf") format("truetype"),url("fonts/Sporting_Grotesque-Regular_web.svg#svgFontName") format("svg");
		font-weight: normal;
		font-style: normal
	}

	@font-face {
		font-family: 'Sporting Grotesque_Bold';
		src: url("fonts/Sporting_Grotesque-Bold_web.eot");
		src: url("fonts/Sporting_Grotesque-Bold_web.eot?#iefix") format("embedded-opentype"),url("fonts/Sporting_Grotesque-Bold_web.woff") format("woff"),url("fonts/Sporting_Grotesque-Bold_web.woff2") format("woff2"),url("fonts/Sporting_Grotesque-Bold_web.ttf") format("truetype"),url("fonts/Sporting_Grotesque-Bold_web.svg#svgFontName") format("svg");
		font-weight: normal;
		font-style: normal
	}

	@font-face {
		font-family: 'savateregular';
		src: url("fonts/savate-regular-webfont.eot");
		src: url("fonts/savate-regular-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/savate-regular-webfont.woff2") format("woff2"),url("fonts/savate-regular-webfont.woff") format("woff"),url("fonts/savate-regular-webfont.ttf") format("truetype"),url("fonts/savate-regular-webfont.svg#savateregular") format("svg");
		font-weight: normal;
		font-style: normal
	}

	@font-face {
		font-family: 'VG5000';
		src: url("fonts/VG5000-Regular_web.eot");
		src: url("fonts/VG5000-Regular_web.eot?#iefix") format("embedded-opentype"),url("fonts/VG5000-Regular_web.woff") format("woff"),url("fonts/VG5000-Regular_web.woff2") format("woff2"),url("fonts/VG5000-Regular_web.ttf") format("truetype"),url("fonts/VG5000-Regular_web.svg#svgFontName") format("svg");
		font-weight: normal;
		font-style: normal
	}

	@font-face {
		font-family: 'Millimetre';
		src: url("fonts/Millimetre/Bold/Millimetre-Bold_web.eot");
		src: url("fonts/Millimetre/Bold/Millimetre-Bold_web.eot?#iefix") format("embedded-opentype"),url("fonts/Millimetre/Bold/Millimetre-Bold_web.woff") format("woff"),url("fonts/Millimetre/Bold/Millimetre-Bold_web.woff2") format("woff2"),url("fonts/Millimetre/Bold/Millimetre-Bold_web.ttf") format("truetype"),url("fonts/Millimetre/Bold/Millimetre-Bold_web.svg#svgFontName") format("svg");
		font-weight: bold;
		font-style: normal
	}

	@font-face {
		font-family: 'terminal_grotesque';
		src: url("fonts/terminal-grotesque-webfont.eot");
		src: url("fonts/terminal-grotesque-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/terminal-grotesque-webfont.woff2") format("woff2"),url("fonts/terminal-grotesque-webfont.woff") format("woff"),url("fonts/terminal-grotesque-webfont.ttf") format("truetype"),url("fonts/terminal-grotesque-webfont.svg#terminal_grotesqueregular") format("svg");
		font-weight: normal;
		font-style: normal
	}

	.inverted {
		background: black;
		color: #ffff00
	}

	.venezia {
		font-family: Millimetre;
		line-height: 30px;
		text-align: center
	}

	.coin-overlay {
		position: fixed;
		height: 200px;
		width: 200px;
		right: 30px;
		bottom: 30px;
		z-index: 9998;
		transition: transform .3s
	}

	@media (max-width: 500px) {
		.coin-overlay {
			height:150px;
			width: 150px;
			right: 0px;
			bottom: 0px
		}
	}

	.coin-overlay:hover {
		text-decoration: none;
		transform: scale(1.2)
	}

	.coin-overlay .coin {
		position: absolute;
		top: 14%;
		left: 15%;
		width: 70%;
		height: 70%;
		transition: transform 0.5s;
		z-index: 9999
	}

	.coin-overlay .coin:active {
		transform: translateY(-100vh) translateX(-100vh)
	}

	.rotate {
		animation: rotate 11s linear infinite
	}

	.rotate.reverse {
		animation-direction: reverse
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(360deg)
		}
	}

</style>
