<script>
    import { auth, db } from '$lib/firebaseClient';
    import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc, connectFirestoreEmulator } from 'firebase/firestore'
    import { session } from '$lib/stores'
    import { signOut } from 'firebase/auth'
    import Card from '$lib/components/CartCard.svelte';

    let cart = [];

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
<section>
    <h3 class="welcome">What's Up {($session.displayName)}!</h3>
    <a name="shop" href='/shop'>Go to Shop</a>
    <!-- <h4>Your orders are:</h4> -->
    {#if cart.length == 0}
        
    <div style="height: 400px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 999;">
        <p style="margin: 1rem 0;
        font-size: 50px;
        font-weight: 2px;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        color: rgba(0,0,0,0.5) ">
            Ooops... Your cart is empty!
        </p>
        <a href="/shop">Shop now?</a>
    </div>

    {:else}
        
        <div style="display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            ">
                {#each cart as item}
                    <Card {item}></Card>
                    <button on:click={() => removeItem(item.id)} style="font-size: 10px;">
                        Remove
                    </button>
                {/each}
        </div>

    {/if}

    
    <!-- {#if cart != []}

       
    {/if} -->
        <button on:click={logout} style="margin: 1rem 1rem;">Logout</button>
    </section>
{/if}
</main>


<style>
    .welcome {
        font-family: "Roboto", sans-serif;
        font-size: 20px;
        text-align: center;
    }

    button {
        cursor: pointer;
        background-color: steelblue;
        padding: 10px;
        font-weight: 600;
        color: white;
        border-radius: 5px;
    }

    a[name='shop'] {
        font-size: 15px;
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
        background-color: steelblue;
        padding: 10px;
        margin: 2rem 0 0 1rem;
        font-weight: bold;
        color: white;
        border-radius: 5px;
    }
    
</style>


