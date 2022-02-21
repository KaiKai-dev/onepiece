<script>
    import Card from '$lib/components/Card.svelte'
    let products = [

        {name: 'Luffy Dab', image: '/assets/products/luffy1.jpeg', price: "420", fileName: 'luffy1'},
        {name: 'Overseer Luffy', image: '/assets/products/luffy2.jpeg', price: "420", fileName: 'luffy2'},
        {name: 'Adventurer Luffy', image: '/assets/products/luffy3.jpeg', price: "420", fileName: 'luffy3'},
        {name: 'Pirate King', image: '/assets/products/pirateking.jpeg', price: "420", fileName: 'pirateking'},

        {name: 'Onigiri', image: '/assets/products/zorro1.jpeg', price: "420", fileName: 'zorro1'},
        {name: 'Zorro Hoodie', image: '/assets/products/zorro2.jpeg', price: "420", fileName: 'zorro2'},

        {name: 'Chibi Battle Mode Nami', image: '/assets/products/nami1.jpeg', price: "420", fileName: 'nami1'},
        {name: 'Time Skip Nami', image: '/assets/products/nami2.jpeg', price: "420", fileName: 'nami2'},

        {name: 'Pervert Sanji', image: '/assets/products/sanji1.jpeg', price: "420", fileName: 'sanji1'},
        {name: 'Baratie Sanji', image: '/assets/products/sanji2.jpeg', price: "420", fileName: 'sanji2'},
        {name: 'Diablo Jambe', image: '/assets/products/sanji3.jpeg', price: "420", fileName: 'sanji3'},

        {name: 'God Usopp', image: '/assets/products/ussop1.jpeg', price: "420", fileName: 'ussop1'},

        {name: 'Chopper Hat Ver.1', image: '/assets/products/chopper1.jpeg', price: "420", fileName: 'chopper1'},
        {name: 'Chopper Hat Ver.2', image: '/assets/products/chopper2.jpeg', price: "420", fileName: 'chopper2'},

        {name: 'Hat of the Law', image: '/assets/products/other1.jpeg', price: "420", fileName: 'other1'},
        {name: 'A$CE Hoodie', image: '/assets/products/other2.jpeg', price: "420", fileName: 'other2'}
    ];
</script>

<svelte:head>
	<title>Shop - One Piece World</title>
</svelte:head>

{#each products as product}
    <Card {product}></Card>
{/each}



