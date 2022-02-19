import { writable } from 'svelte/store'

export let session = writable(null);

export let showMenu = writable(false);

export let itemToAdd = writable()
// export let cart = writable([])