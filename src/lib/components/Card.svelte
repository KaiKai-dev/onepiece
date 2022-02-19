<script>
// import { createUserWithEmailAndPassword } from "firebase/auth";


    export let product;
    import {showMenu, itemToAdd} from '$lib/stores'


    let cart = false;

    function cartHandler () {
        $itemToAdd = product;
        $showMenu = true;
    }

</script>

<main>
    <button on:click={cartHandler}>
        <img src={product.image} alt=' product'/>
        <h1>
            {product.name}
        </h1>
        <h2>
            Php {product.price}
        </h2>
    </button>
</main>



<style>
    main {
        display: flex;
        justify-content: center;
        align-items: space-between;
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 500px;
        height: 500px;
        /* padding: 1rem; */
        margin: 2rem 2rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.4);
    }
    img {
        width: 80%;
        height: 80%;
    }

    @media screen and (max-width: 500px){
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 80%;
            height: 80%;
            padding: 1rem;
            margin: 2rem 2rem;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
        }
    }
</style>