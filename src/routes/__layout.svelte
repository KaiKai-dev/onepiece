<script>
	import '../styles.css';
	import { onAuthStateChanged } from 'firebase/auth'
	import {session, showMenu, itemToAdd} from '$lib/stores.js'
	import { auth, db } from '$lib/firebaseClient';
	import { scale } from 'svelte/transition'
	import { goto } from '$app/navigation';
	import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
	
	
	

	onAuthStateChanged(auth, (user) => {
		$session = user;

		console.log($session)
	})

    
    async function submitHandler(event){
		if($session == null){
			$showMenu = false;
			goto('/login')
			return;
		}
        const formData = new FormData(event.target)
        let data = Object.fromEntries(formData)
        data.createdAt = serverTimestamp()
		data.owner = auth.currentUser.uid;



        try{
            const cartItemsRef = collection(db, 'cartItems')

            await addDoc(cartItemsRef, data) 
            event.target.reset()
            
			$showMenu = false;
			
        }catch(error){
            alert(error.code)
        }

    }

	// function addToCart(event){
	// 	if($session == null){
	// 		$showMenu = false;
	// 		goto('/login')
	// 		return;
	// 	}
	// 	const formData = new FormData(event.target)
	// 	let data = Object.fromEntries(formData)

	// 	$cart = [...$cart, data]
	// 	console.log($cart)
	// 	$showMenu = false;
		
	// }
</script>
{#if $showMenu}
	<section on:click|self={() => $showMenu = false}>
		<div transition:scale>
			<form on:submit|preventDefault={submitHandler}>
				<input type="text" name='name' readonly value={$itemToAdd.name}>
				<input type="text" name='price' readonly value={$itemToAdd.price}>
				<input type="number" name='quantity' required>
				<input type="hidden" name="fileName" value={$itemToAdd.fileName}>
				<input type="hidden" name="image" value={$itemToAdd.image}>
				<button type='submit'>Add to Cart</button>
			</form>
			<button on:click={() => $showMenu = false}>Close</button>
		</div>
	</section>
{/if}

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


<style>
	section {
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		z-index: 99;

	}
	div{
		padding: 2rem;
		border: 2px black solid;
		background-color: #fff;
		position: fixed;
		z-index: 999;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/* transform: translateY(-50%);  */
	}
</style>