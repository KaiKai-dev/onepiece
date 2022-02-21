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
			<img src={$itemToAdd.image} alt={$itemToAdd.name}>
			<!-- <h2>{$itemToAdd.name}</h2>
			<h3>Php {$itemToAdd.price}</h3> -->
			<form on:submit|preventDefault={submitHandler} id="formMenu">
				<input type="text" readonly id="name" name="name" value={$itemToAdd.name}>
				<input type="text" readonly id="price" name="price" value="Php {$itemToAdd.price}">
				<input type="button" id="minusQuantity" name="minusQuantity" value="-">
				<input type="number" name='quantity' required value="1" min="1" class="quantityBar">
				<input type="button" id="plusQuantity" name="plusQuantity" value="+">
				<input type="hidden" name="fileName" value={$itemToAdd.fileName} >
				<!-- <p>{() => ($itemTo)}</p> -->
				<button type='submit'>Add to Cart</button>
			</form>
			<button on:click={() => $showMenu = false} id="closebtn">X</button>
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
		border: 2px black dashed;
		
		border-radius: 25px;
		background-color: #fff;
		height: 300px;
		width: 500px;
		position: fixed;
		z-index: 999;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/* transform: translateY(-50%);  */
	}

	section div img {
		height: 200px;
		width: 200px;
		border: 2px black solid;
		border-radius: 20px;
		
	}

	.quantityBar {
		height: 2rem;
		width: 100px;
		border: 1px black solid;
		border-radius: 5px;
		text-align: center;
	}

	#name {
		width: 100%;
		font-family: "Roboto", sans-serif;
		font-size: 25px;
		font-weight: bold;
		text-align: center;
		position: absolute;
		transform: translate(15%, -440%);
	}

	#price {
		width: 100%;
		font-family: "Roboto", sans-serif;
		font-size: 20px;
		text-align: center;
		position: absolute;
		transform: translate(15%, -430%);
	}

	input[type="button"] {
		height: 2rem;
		width: 2rem;
		border: 1px black solid;
		border-radius: 50%;
	}

	input[type="button"]:hover {
		height: 2rem;
		width: 2rem;
		color: white;
		background-color: black;
		border: 1px black solid;
		border-radius: 50%;
	}
	input[type="button"]:active {
		height: 2rem;
		width: 2rem;
		color: white;
		background-color: black;
		border: 1px black solid;
		border-radius: 50%;
		transform: translate(0px, 4px);
	}
	
	
	#closebtn {
		height: 2rem;
		width: 2rem;
		padding: 2px;
		border-radius: 50%;
		border: 1px black solid ;
	}

	#closebtn:hover {
		height: 2rem;
		width: 2rem;
		padding: 2px;
		color: white;
		background-color: black;
		border-radius: 50%;
	}

</style>