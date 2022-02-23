<script>
    let devsInfo = [

        {name: "Abellar, Ryan B.", age: '21', job: 'Front-end Developer', email: "abellarryan08@gmail.com", profilePic: '/assets/profile/sanji.jpg'},
        {name: "Calaycay, John Emmanuel G.",  age: '21', job: 'Back-end Developer', email: "emmanuelcalaycay17@gmail.com", profilePic: 'assets/profile/usopp.jpg'} 
        
    ]   
</script>

<svelte:head>
	<title>About Us - One Piece World</title>
</svelte:head>

<main>
    <section>
        <div name="navbar"> 
            WebDev
        </div>
        <div name="location">
            <p class="gMaps"><iframe title="Map of One Piece World Shop" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5466.743104122772!2d121.03118215316454!3d14.33632702556038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d6e09878739f%3A0x4e7bba7291cae75d!2sPolytechnic%20University%20of%20the%20Philippines%20(PUP%20San%20Pedro%2C%20Laguna%20Campus)!5e0!3m2!1sen!2sph!4v1645587430285!5m2!1sen!2sph" width="500" height="375" style="border:0; border-radius: 25px;" allowfull3creen="" loading="lazy"></iframe></p>
            <div name="visit" >Visit us at our Shop!</div>
        </div>

        <h2 class="devHead">About the Developers</h2>
        <div class="devSection">
            {#each devsInfo as dev}
                <div class="devs">
                    <img src={dev.profilePic} alt="">
                    <h2 class="name">{dev.name}</h2>
                    <h4 class="email">{dev.email}</h4>
                    <h2 class="age">{dev.age} yrs. old</h2>
                    <h2 class="job">"{dev.job}"</h2>
                    <p class="background">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ad.</p>
                </div>
            {/each}
        </div>
        
    </section>
    
</main>

<style>

    div[name="navbar"]{

        width: 100%;
        height: 100px;

    }

    div[name="location"] {

        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap-reverse;
        height: 600px;
        width: 100vw;
        position: center;
        z-index: -999;
        
    }

    div[name="visit"] {
        
        text-align: center;
        position: center;
        font-family: 'Roboto', sans-serif;
        font-size: 50px;
        font-weight: bold;
        font-style: oblique;
        color: steelblue;
        transform: translate( 0px, 0px);
        z-index: -99;

    }

    .gMaps {

        width: 500px;
        height: 375px;
        border: 2px steelblue solid;
        border-radius: 25px;
        z-index: -99;

    }

    .devSection{

        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

    }

    .devHead {

        text-align: center;
        color: steelblue;
        font-family: 'Roboto', sans-serif;
        font-size: 50px;
        font-style: oblique;
        
    }

    .devs {

        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        height: 500px;
        width: 500px;
        margin: 2rem;
        border-radius: 30px;
        box-shadow: 1px 2px 4px 1px rgba(0,0,0,0.2);

    }

    div img{

        height: 150px;
        width: 150px;
        border-radius: 50%;
        border: 1px steelblue solid;

    }

    .name {

        font-family: 'Roboto', sans-serif;
        font-size: 30px;
        font-weight: bold;

    }

    .email {

        text-decoration: underline;
        color: blue;

    }

    .job {

        font-family: 'Roboto', sans-serif;
        font-size: 20px;

    }

    @media screen and (max-width: 700px){

        div[name="navbar"]{
            width: 100%;
            height: 100px;
        }

        p{
            z-index: -999;
        }

        div[name="visit"] {
        
            text-align: center;
            position: center;
            /* padding: 30px 180px; */
            transform: translate( 0px, 0px);
            z-index: -99;
        }
    }
</style>