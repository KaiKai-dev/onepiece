<script>
    import { auth, db } from '$lib/firebaseClient';
    import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc, connectFirestoreEmulator} from 'firebase/firestore'
    import {session} from '$lib/stores'
    import { signOut } from 'firebase/auth'
    let cart = [];
    
    // logout function
    async function logout(){
        try {
            await signOut(auth)
        } catch (error) {
            alert(error.code)
        }
    }

    // get items from cart
    async function getCartItems(){
        const cartItemsRef = collection(db, 'cartItems')
        const q = query(cartItemsRef, where('owner', '==', auth.currentUser.uid), orderBy('createdAt'))
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((docSnap) => {
                // console.log('dapat gumana')
                // // cart.push(doc.data())

                cart = [...cart,{ ...docSnap.data(), id:docSnap.id}]
            })
        })
    }

    async function removeItem(id){
        const docRef = doc(db, 'cartItems', id)

        try {
            await deleteDoc(docRef)
            console.log('deleted')
        } catch (error) {
            alert(error.code)
        }

    }


    $: if($session != null){
       
        // getCartItems();
        const cartItemsRef = collection(db, 'cartItems')
        const q = query(cartItemsRef, where('owner', '==', $session.uid), orderBy('createdAt'))
        onSnapshot(q, (snapshot) => {
            cart = []
            snapshot.forEach((docSnap) => {

                cart = [...cart,{ ...docSnap.data(), id:docSnap.id}]
            })
        })
    }

</script>
<svelte:head>
	<title>One Piece World</title>
</svelte:head>
<main>
<section class="index-banner" >
    <div class="vertical-center">
    <h2>SHOP HERE YOUR FAVORITE<br />ONE PIECE MERCH !</h2>
    <h1>We've got all you need, Nakama.</h1>
    </div>
</section>

{#if $session == null}
<section class="index-links">
    
    <a href={'/login'}>
        <div class="index-boxlink-square">
            <h3>Log In</h3>
        </div>
    </a>
    <a href={'/signup'}>
        <div class="index-boxlink-square">
            <h3>Sign Up</h3>
        </div>
    </a>
    <a href={"/shop"}>
        <div class="index-boxlink-rectangle">
            <h3>Store</h3>
        </div>
    </a>
    <!-- <a href="index.html">
        <div class="index-boxlink-square">
            <h3>One Piece World</h3>
        </div>
    </a> -->
    <a href={"/about"}>
        <div class="index-boxlink-rectangle">
            <h3>About Us</h3>
        </div>
    </a>
    <a href={"/contact"}>
        <div class="index-boxlink-square">
            <h3>Contact</h3>
        </div>
    </a>
    <a href="/suggestion">
    <div class="index-boxlink-square">
        <h3>Suggestions</h3>
    </div>
    </a>
</section>

{:else}
<h1>What's Up {($session.displayName)}!</h1>
<button on:click={logout}>Logout</button>
<p>Your orders are:</p>
{#each cart as item}
        <li>{item.name} - {item.quantity} - {item.id} <button on:click={() => removeItem(item.id) }>Remove</button></li>
    
{/each}

{/if}
</main>


<style>
    button {
        cursor: pointer;
        background-color: steelblue;
        padding: 10px;
        font-weight: 600;
        color: white;
        border-radius: 5px;
    }
</style>


