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

boton.addEventListener("click", () => {
    div.innerHTML = "";
    div.setAttribute("class", "pokedex");
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        let pokemon = {
            nombre: ((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name) : ""),
            altura: ((data.hasOwnProperty('height')) ? JSON.stringify(data.height) : ""),
            peso: ((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight) : ""),
            numPokemon: ((data.hasOwnProperty('id')) ? JSON.stringify(data.id) : ""),
            tipo1: ((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name) : ""),
            tipo2: ((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name) : ""),
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
        info.innerHTML += "Num. Pokedex: " + pokemon.numPokemon;
        info.innerHTML += "Type: " + pokemon.tipo1 + pokemon.tipo2;
        info.innerHTML += "Name: " + pokemon.nombre;
        info.innerHTML += "Height: " + pokemon.peso;
        info.innerHTML += "Weight: " + pokemon.altura;

        let url2 = data.species.url;
        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            pokemon.especie = ((datos.genera.hasOwnProperty('5')) ? JSON.stringify(datos.genera[5].genus) : "");
            pokemon.habitat = ((datos.hasOwnProperty('habitat')) ? JSON.stringify(datos.habitat.name) : "");
            pokemon.texto = ((datos.flavor_text_entries.hasOwnProperty('34')) ? JSON.stringify(datos.flavor_text_entries[34].flavor_text) : "");
            info.innerHTML += "Species: " + pokemon.especie;
            info.innerHTML += "Habitat: " + pokemon.habitat;
            info.innerHTML += "Description: " + pokemon.texto;
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