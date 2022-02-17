<script>
    import {db} from '$lib/firebaseClient'
    import {collection, addDoc, serverTimestamp} from 'firebase/firestore'

    async function submitHandler(event){
        const formData = new FormData(event.target)
        let data = Object.fromEntries(formData)
        data.createdAt = serverTimestamp()

        try{
            const feedbacksRef = collection(db, 'feedbacks')

            await addDoc(feedbacksRef, data) 
            event.target.reset()
            alert('feedback is sent')
        }catch(error){
            alert(error.code)
        }

    }
</script>

<main>
    <section class="index-banner">
        <div class="signup">
        <h1>Send us a Message</h1>
        <form on:submit|preventDefault={submitHandler}>
            <div class="txt_field">
            <input name='name' type="text" placeholder="Name" required>
            <span></span>
            </div>
            <div class="txt_field">
            <input name='email' type="email" placeholder="Email" required>
            <span></span>
        </div>
            <div class="txt_field">
                <!-- <input type="email" placeholder="Email" required> -->
                <textarea  name='message' placeholder="Message" cols="40" rows="10" required></textarea>
                <span></span>
            </div>
            <input type="submit" value="Send Message">
            <div class="logsign_link">
            
            </div>
        </form>
        </div>
    </section>
  </main>