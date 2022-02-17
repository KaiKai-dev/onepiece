<script>
import { auth } from '$lib/firebaseClient';

    import {session} from '$lib/stores'
    import { signOut } from 'firebase/auth'

    async function logout(){
        try {
            await signOut(auth)

            console.log('Babay jeffrey')
        } catch (error) {
            alert(error.code)
        }
    }


</script>

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
            <h3>Shop Now</h3>
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
    <!-- <a href="suggestion.html">
    <div class="index-boxlink-square">
        <h3>Suggestions</h3>
    </div>
    </a> -->
</section>

{:else}
<h1>What's Up {($session.displayName)}!</h1>
<button on:click={logout}>Logout
</button>
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


