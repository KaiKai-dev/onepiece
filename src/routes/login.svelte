<script>
    import {signInWithEmailAndPassword} from 'firebase/auth'
    import { auth } from '$lib/firebaseClient'
    import { goto } from '$app/navigation';

    async function submitHandler(event){
        const formData = new FormData(event.target)
        const {email, password} = Object.fromEntries(formData)
        
        try {
           await signInWithEmailAndPassword(auth, email, password)
           goto('/shop')
        } catch (error) {
            alert(error.code)
        }
    }
</script>
<svelte:head>
	<title>Login - One Piece World</title>
</svelte:head>
<main>
<section class="index-banner" >
    <div class="login">
    <h1>Log In</h1>
    <form on:submit|preventDefault={submitHandler} class="form">
        <div class="txt_field">
        <input name="email" type="email" placeholder="Email" required>
        <span></span>
        </div>
        <div class="txt_field">
        <input name="password" type="password" placeholder="Password" required>
        <span></span>
        </div>
        <div class="pass">Forgot Password?</div>
        <input type="submit" value="Log In">
        <div class="logsign_link">
        Not a member? <a href="/signup">Sign Up</a>
        </div>
    </form>
    </div>
</section>
</main>