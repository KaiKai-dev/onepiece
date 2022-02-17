<script>
  import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
  import { auth } from '$lib/firebaseClient'
import { goto } from '$app/navigation';

  async function submitHandler(event){
    const formData = new FormData(event.target)

    const {firstName, lastName, email, password} = Object.fromEntries(formData)
    
    try{
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(userCredential.user, {displayName: firstName + ' ' + lastName})
      console.log('Created user ' + firstName + ' ' + lastName) 
      goto('/')
    }catch(error){
      alert(error.code)
    }
  }
</script>

<main>
    <section class="index-banner" >
      <div class="signup">
        <h1>Sign Up</h1>
        <form on:submit|preventDefault={submitHandler}>
          <div class="txt_field">
            <input name="firstName" type="text" placeholder="First Name" required>
            <span></span>
          </div>
          <div class="txt_field">
            <input name="lastName" type="text" placeholder="Last Name" required>
            <span></span>
          </div>
          <div class="txt_field">
              <input name="email" type="email" placeholder="Email" required>
              <span></span>
            </div>
            <div class="txt_field">
                <input name="password" type="password" placeholder="Password" required>
                <span></span>
                </div>
          <input type="submit" value="Sign Up">
          <div class="logsign_link">
            Already have an account? <a href="logshop.html">Log In</a>
          </div>
        </form>
      </div>
    </section>
  </main>