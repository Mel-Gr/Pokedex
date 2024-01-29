const botonBusc = document.getElementById("botonBusc");
const avanzar = document.getElementById("avanzar");
const botonMov = document.getElementById("botonMov");
const botonHAb = document.getElementById("botonHAb");
const retroceder = document.getElementById("retroceder");

const inputBusc = document.getElementById("inputBusc");

const pokedexCerrada = document.getElementById("pokedexCerrada");
const general = document.getElementById("general");
const contenido = document.getElementById("contenido");
const movimientos = document.getElementById("movimientos");
const habilidades = document.getElementById("habilidades");

const imgCerrada = document.getElementById("imgCerrada");
const numeroYNombreCerrada = document.getElementById("numeroYNombreCerrada");

const ul_movimientos = document.getElementById("ul_movimientos");
const ul_habilidades = document.getElementById("ul_habilidades");

let abierta = false;

let pokemon = {
    nombre: "",
    altura: "",
    peso: "",
    numPokemon: "",
    tipo1: "",
    tipo2: "",
    front_default: "",
    front_female: "",
    front_shiny: "",
    front_shiny_female: "",
    back_default: "",
    back_female: "",
    back_shiny: "",
    back_shiny_female: "",
    especie:"",
    habitat:"",
    texto:""
};

function addImage(url_img,div) {
    let img = document.createElement("img");
    img.setAttribute("src", url_img);
    div.appendChild(img);
}

document.getElementById("fr").addEventListener("submit", (event) => {
    event.preventDefault();
})

function flavorTextEn (datos){
    let arrTextos = datos.flavor_text_entries;
    for (let i = 0; i < arrTextos.length; i++) {
        if (arrTextos[i].language.name == "en")
            return JSON.stringify(datos.flavor_text_entries[i].flavor_text);
    }
    return "";
}

function generaSpecieEn (datos){
    let arrTextos = datos.genera;
    for (let i = 0; i < arrTextos.length; i++) {
        if (arrTextos[i].language.name == "en")
            return JSON.stringify(datos.genera[i].genus);
    }
    return "";
}

movimientos.addEventListener("click", () =>{
    movimientos.innerHTML = "";
  

})

imgCerrada.addEventListener("click", () => {
    pokedexCerrada.setAttribute("hidden","true");
    abierta = false;
    contenido.innerHTML = "";
    let url = "https://pokeapi.co/api/v2/pokemon/" + inputBusc.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        pokemon.nombre =((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name).replaceAll('"', "") : "");
        pokemon.altura =((data.hasOwnProperty('height')) ? JSON.stringify(data.height).replaceAll('"', "") : "");
        pokemon.peso =((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight).replaceAll('"', "") : "")
        pokemon.numPokemon =((data.hasOwnProperty('id')) ? JSON.stringify(data.id).replaceAll('"', "") : "");
        pokemon.tipo1 =((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name).replaceAll('"', "") : "");
        pokemon.tipo2 =((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name).replaceAll('"', "") : "");
        pokemon.front_default =((data.sprites.front_default !== null) ? data.sprites.front_default : "");
        pokemon.front_female =((data.sprites.front_female !== null) ? data.sprites.front_female : "");
        pokemon.front_shiny =((data.sprites.front_shiny !== null) ? data.sprites.front_shiny : "");
        pokemon.front_shiny_female =((data.sprites.front_shiny_female !== null) ? data.sprites.front_shiny_female : "");
        pokemon.back_default =((data.sprites.back_default !== null) ? data.sprites.back_default : "");
        pokemon.back_female =((data.sprites.back_female !== null) ? data.sprites.back_female : "");
        pokemon.back_shiny =((data.sprites.back_shiny !== null) ? data.sprites.back_shiny : "");
        pokemon.back_shiny_female =((data.sprites.back_shiny_female !== null) ? data.sprites.back_shiny_female : "");
        console.log(pokemon.nombre);
        let info = document.createElement("div");
        info.innerHTML += " Pokedex num: " + pokemon.numPokemon;
        info.innerHTML += " Type: " + pokemon.tipo1 + pokemon.tipo2;
        info.innerHTML += " Name: " + pokemon.nombre;
        info.innerHTML += " Height: " + pokemon.peso;
        info.innerHTML += " Weight: " + pokemon.altura;

        let url2 = data.species.url;
        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            pokemon.especie = generaSpecieEn (datos).replaceAll('"', "");
            pokemon.habitat = ((datos.hasOwnProperty('habitat') && (datos.habitat !== null)) ? JSON.stringify(datos.habitat.name).replaceAll('"', "") : "");
            pokemon.texto = flavorTextEn(datos).replaceAll("\\n", " " ).replaceAll('"', "").replaceAll("\\f", " " );
            info.innerHTML += " Species: " + pokemon.especie;
            info.innerHTML += " Habitat: " + pokemon.habitat;
            info.innerHTML += " Description: " + pokemon.texto;
        }).catch((error2) => {
            console.error("Error en la consulta: " + error2);
        })

        //@Sergio Aquí hay que gestionar las imágenes, no se pueden mostrar todas aquí tal y como están. Hay que hacer que en principio solo muestre la default cuando esté cerrada y cuando esté abierta, en un principio la default y luego si pulsa algún check, la que corresponda.
        addImage(pokemon.front_default, contenido);
        addImage(pokemon.front_female, contenido);
        addImage(pokemon.front_shiny, contenido);
        addImage(pokemon.front_shiny_female, contenido);
        addImage(pokemon.back_default, contenido);
        addImage(pokemon.back_female, contenido);
        addImage(pokemon.back_shiny, contenido);
        addImage(pokemon.back_shiny_female, contenido);
        contenido.appendChild(info);
    }).catch((error) => {
        console.error("Error en la consulta: " + error);
    })
})

botonBusc.addEventListener("click", () => {
    if(abierta){
        //Mostrar la barra encima de la pokedex
    }else if (!abierta){
        abierta = true;
        numeroYNombreCerrada.innerHTML = "";
        let url = "https://pokeapi.co/api/v2/pokemon/" + inputBusc.value;
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            pokemon.nombre =((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name).replaceAll('"', "") : "");
            pokemon.numPokemon =((data.hasOwnProperty('id')) ? JSON.stringify(data.id).replaceAll('"', "") : "");
            pokemon.front_default =((data.sprites.front_default !== null) ? data.sprites.front_default : "");
            console.log(pokemon.nombre);
            imgCerrada.setAttribute("src", pokemon.front_default);
            numeroYNombreCerrada.innerHTML += "#" + pokemon.numPokemon;
            numeroYNombreCerrada.innerHTML += " " + pokemon.nombre;
        }).catch((error) => {
            console.error("Error en la consulta: " + error);
        })
    }

});