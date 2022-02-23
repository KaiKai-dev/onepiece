<script>
    export let item;
    import { doc, deleteDoc } from 'firebase/firestore'

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

<div>
    <img src={item.image} alt={item.name}>
    <h2>
        {item.name}
    </h2>
    <h3>Quantity: {item.quantity} </h3>
    
</div>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 300px;
        height: 300px;
        margin: 2rem 1rem;
        position: inherit;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    }
    img {
        width: 60%;
        height: 60%;
        border-radius: 15px;
        border: 1px black solid;
    }
</style>