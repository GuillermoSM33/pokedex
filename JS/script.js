//1.Enlace

let botonMostrar = document.getElementById("botonMostrar");
var contador = 0;
let botonOcultar = document.getElementById("botonOcultar");
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//La api solo jala si está en ingles :/

const typeColors ={
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#A2FAA3',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
}

const searchPokemon = event =>{
    event.preventDefault();
    const {value} = event.target.POKEMON;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .then(contenedor.innerHTML = '')
}

const renderPokemonData = data =>{
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent =stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

//2. enlazar el contenedor

let contenedor = document.getElementById("contenedor");

//3. Creamos la funcion

function obtenerDatosAPI() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
        .then(respuesta => respuesta.json())
        .then(datos => {
            const ListadePokemones = datos.results;
            ListadePokemones.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(respuesta => respuesta.json())
                    .then(datosPokemon => {
                        const divPokemon = document.createElement("div8");
                        divPokemon.classList.add("pokemones");
                        const nombrePokemon = document.createElement("h3");
                        nombrePokemon.textContent = datosPokemon.name;
                        const imagenPokemon=document.createElement("img");
                        imagenPokemon.src=datosPokemon.sprites.front_default;
                        const idPokemon = document.createElement("h3");
                        idPokemon.textContent = datosPokemon.id;
                        divPokemon.appendChild(nombrePokemon);
                        divPokemon.appendChild(imagenPokemon);
                        contenedor.appendChild(divPokemon);
                    });
            });
        })
}

//Agregar un evento

    botonMostrar.addEventListener("click", function () {
        botonMostrar.style.background = "black";
            obtenerDatosAPI();       
    });

botonOcultar.addEventListener("click", function (){
        botonOcultar.style.background = "black";
        contenedor.innerHTML = '';
        
});
