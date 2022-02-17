<script>
	import '../styles.css';
	import { onAuthStateChanged } from 'firebase/auth'
	import {session} from '$lib/stores.js'
	import { auth } from '$lib/firebaseClient';

	onAuthStateChanged(auth, (user) => {
		$session = user;

		console.log($session)
	})
</script>

<header>
	<a href={'/'} class="header-brand">one piece world</a>
	<nav>
		<ul>
			<li><a href={'/portfolio'}>Portfolio</a></li>
			<li><a href={'/about'}>About Us</a></li>
			<li><a href={'/contact'}>Contact</a></li>
		</ul>
		<a href="shop" class="header-shop">Shop Now</a>
	</nav>
</header>
<slot />
<footer>
	<ul>
		<li><a href={'/'}>Home</a></li>
		<li><a href={'/portfolio'}>Portfolio</a></li>
		<li><a href={'/about'}>About Us</a></li>
		<li><a href={'/contact'}>Contact</a></li>
	</ul>
</footer>
