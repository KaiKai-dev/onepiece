<script>
	import '../styles.css';
	import { onAuthStateChanged } from 'firebase/auth'
	import {session, showMenu, itemToAdd} from '$lib/stores.js'
	import { auth, db } from '$lib/firebaseClient';
	import { scale } from 'svelte/transition'
	import { goto } from '$app/navigation';
	import { addDoc, collection, serverTimestamp} from 'firebase/firestore';

	let quantity = 1;
	let price=0;

	$: if($itemToAdd != null){
		price = quantity * $itemToAdd.price;
	}

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
            
			quantity = 1;
			$showMenu = false;
			
        }catch(error){
            alert(error.code)
        }

    }
	
	function qtyHandler(event){
		const formData = new FormData(event.target)
        let data = Object.fromEntries(formData)

		price = data.quantity.value * data.price2.value
	}
	// function priceHandler(event) {
	// 	const formData = new FormData(event.target)
    //     let data = Object.fromEntries(formData)

	// 	price = data.price * 
	// }
	
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
			
			<form on:submit|preventDefault={submitHandler} id="formMenu">
				<input type="text" readonly id="name" name="name" value={$itemToAdd.name}>
				<span id="price">
					₱
					<input type="text" readonly name="price" bind:value={$itemToAdd.price}>
				</span>
				
				
				<input type="button" on:click={() => quantity -= 1} id="minusQuantity" name="minusQuantity" value="-">
				<input type="number" name='quantity' required bind:value={quantity} min="1" class="quantityBar">
				<input type="button" on:click={() => quantity += 1} id="plusQuantity" name="plusQuantity" value="+">
				
				<input type="text"  name='total_qty'  bind:value={price} min="0" id="priceBar" >
				<input type="hidden" name="fileName" value={$itemToAdd.fileName} >
				<!-- <p>{() => ($itemTo)}</p> -->

				<button type='submit'>Add to Cart</button>
			</form>

			<button on:click={() => {$showMenu = false; quantity=1;}} id="closebtn">X</button>

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
		border-radius: 20px;
		text-align: center;

		position: absolute;
		transform: translate(40%, 90%)
	}

	input[name="minusQuantity"] {
		height: 2rem;
		width: 2rem;
		border: 1px black solid;
		border-radius: 50%;

		position: absolute;
		transform: translate(10%, 101%)
	}

	input[name="plusQuantity"] {
		height: 2rem;
		width: 2rem;
		border: 1px black solid;
		border-radius: 50%;

		position: absolute;
		transform: translate(465%, 101%)
	}

	input[type="button"]:hover {
		height: 2rem;
		width: 2rem;
		color: white;
		background-color: darkgray;
		border: 1px black solid;
		border-radius: 50%;
	}

	input[name="plusQuantity"]:active {
		background-color: gray;
		position: absolute;
		transform: translate(465%, 111%);

	}

	input[name="minusQuantity"]:active {
		background-color: gray;
		position: absolute;
		transform: translate(10%, 111%)

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
		font-size: 15px;
		text-align: center;
		position: absolute;
		transform: translate(15%, -430%);
	}
	
	#closebtn {
		height: 2rem;
		width: 2rem;
		padding: 2px;
		border-radius: 50%;
		border: 1px black solid ;

		position: absolute;
		transform: translate(1535%, -770%)
	}

	#closebtn:hover {
		height: 2rem;
		width: 2rem;
		padding: 2px;
		color: white;
		background-color: black;
		border-radius: 50%;
	}

	#priceBar{
		border: 1px black solid;
	}
</style>