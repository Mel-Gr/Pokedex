const boton = document.getElementById("boton");
const pokemon = document.getElementById("pokemon");
const div = document.getElementById("contenido");

function addImage(url_img) {
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

boton.addEventListener("click", () => {
    div.innerHTML = "";
    div.setAttribute("class", "pokedex");
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        let pokemon = {
            nombre: ((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name).replaceAll('"', "") : ""),
            altura: ((data.hasOwnProperty('height')) ? JSON.stringify(data.height).replaceAll('"', "") : ""),
            peso: ((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight).replaceAll('"', "") : ""),
            numPokemon: ((data.hasOwnProperty('id')) ? JSON.stringify(data.id).replaceAll('"', "") : ""),
            tipo1: ((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name).replaceAll('"', "") : ""),
            tipo2: ((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name).replaceAll('"', "") : ""),
            front_default: ((data.sprites.front_default !== null) ? data.sprites.front_default : ""),
            front_female: ((data.sprites.front_female !== null) ? data.sprites.front_female : ""),
            front_shiny: ((data.sprites.front_shiny !== null) ? data.sprites.front_shiny : ""),
            front_shiny_female: ((data.sprites.front_shiny_female !== null) ? data.sprites.front_shiny_female : ""),
            back_default: ((data.sprites.back_default !== null) ? data.sprites.back_default : ""),
            back_female: ((data.sprites.back_female !== null) ? data.sprites.back_female : ""),
            back_shiny: ((data.sprites.back_shiny !== null) ? data.sprites.back_shiny : ""),
            back_shiny_female: ((data.sprites.back_shiny_female !== null) ? data.sprites.back_shiny_female : ""),
            especie:"",
            habitat:"",
            texto:""
        };
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
        addImage(pokemon.front_default);
        addImage(pokemon.front_female);
        addImage(pokemon.front_shiny);
        addImage(pokemon.front_shiny_female);
        addImage(pokemon.back_default);
        addImage(pokemon.back_female);
        addImage(pokemon.back_shiny);
        addImage(pokemon.back_shiny_female);
        div.appendChild(info);
    }).catch((error) => {
        console.error("Error en la consulta: " + error);
    })

    
});