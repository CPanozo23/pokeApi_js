const getPokemons = async () => {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon")
    const data = await resp.json()
    console.log(data.results)
    return data.results
    
}

const renderPokemons = async () => {
    const listPoke= document.querySelector("#listPoke")
    const list = await getPokemons()
    let datos =""
    list.forEach(el => {
        datos+=`<div class="col-2 bg-info" onclick="handlePokemonClick('${el.name}')"> ${el.name}</div>`
    });

    listPoke.innerHTML= datos
} 

const getPokemonDetails = async (name) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await resp.json()
    return data
}


const handlePokemonClick = async (name) => {
    const pokemon = await getPokemonDetails(name)
    console.log(pokemon)

    const pokeDetails = document.querySelector("#pokeDetails")
    const imgPoke = document.querySelector("#imgPoke")
    const namePoke = document.querySelector("#namePoke")
    const types = document.querySelector("#types")
    const stats = document.querySelector("#stats")
    const sprite1 = document.querySelector("#sprite1")
    const sprite2 = document.querySelector("#sprite2")

    pokeDetails.classList.remove("d-none")

    namePoke.innerHTML=pokemon.name
    imgPoke.src=pokemon.sprites.other.dream_world.front_default
    imgPoke.alt=pokemon.name

    typesData = ""
    pokemon.types.forEach(el => {
        typesData+=`<li>${el.type.name}</li>`
    });
    types.innerHTML=typesData

    statsData = ""
    pokemon.stats.forEach(el => {
        statsData+=`<li>${el.stat.name}: ${el.base_stat}</li>`
    });
    stats.innerHTML=statsData

    sprite1.src=pokemon.sprites.front_default

    sprite2.src=pokemon.sprites.front_shiny

}
renderPokemons()

