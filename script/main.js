const boton = document.getElementById("boton");
const pokemon = document.getElementById("pokemon");
const div = document.getElementById("contenido");

function addImage(url_img) {
    let img = document.createElement("img");
    img.setAttribute("src", url_img);
    div.appendChild(img);
}

boton.addEventListener("click", () => {
    div.innerHTML = "";
    div.setAttribute("class", "pokedex");
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        let especies = document.createElement("div");
        let habitat = document.createElement("div");
        let texto = document.createElement("div");
        let nombre = document.createElement("div");
        let altura = document.createElement("div");
        let peso = document.createElement("div");
        let numPokemon = document.createElement("div");
        let tipo = document.createElement("div");

        if (data.sprites.front_default !== null)
            addImage(data.sprites.front_default);
        if (data.sprites.front_female !== null)
            addImage(data.sprites.front_female);
        if (data.sprites.front_shiny !== null)
            addImage(data.sprites.front_shiny);
        if (data.sprites.front_shiny_female !== null)
            addImage(data.sprites.front_shiny_female);
        if (data.sprites.back_default !== null)
            addImage(data.sprites.back_default);
        if (data.sprites.back_female !== null)
            addImage(data.sprites.back_female);
        if (data.sprites.back_shiny !== null)
            addImage(data.sprites.back_shiny);
        if (data.sprites.back_shiny_female !== null)
            addImage(data.sprites.back_shiny_female);

        numPokemon.innerHTML = "Num. Pokedex: " + ((data.hasOwnProperty('id')) ? JSON.stringify(data.id) : "");
        tipo.innerHTML = "Type: " + ((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name) : "")
            + ((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name) : "");
        nombre.innerHTML = "Name: " + ((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name) : "");
        altura.innerHTML = "Height: " + ((data.hasOwnProperty('height')) ? JSON.stringify(data.height) : "" + "cm");
        peso.innerHTML = "Weight: " + ((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight) : "" + "Kg");

        let url2 = data.species.url;
        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            especies.innerHTML = "Species: " +
                ((datos.genera[5].hasOwnProperty('genus')) ? JSON.stringify(datos.genera[5].genus) : "");
            habitat.innerHTML = "Habitat: " +
                ((datos.hasOwnProperty('habitat')) ? JSON.stringify(datos.habitat.name) : "");
            texto.innerHTML = "Description: " +
                ((datos.flavor_text_entries[34].hasOwnProperty('flavor_text')) ? JSON.stringify(datos.flavor_text_entries[34].flavor_text) : "");
        }).catch((error2) => {
            console.error("Error en la consulta: " + error2);
        })

        div.appendChild(tipo);
        div.appendChild(altura);
        div.appendChild(peso);
        div.appendChild(numPokemon);
        div.appendChild(nombre);
        div.appendChild(especies);
        div.appendChild(habitat);
        div.appendChild(texto);
    }).catch((error) => {
        console.error("Error en la consulta: " + error);
    })
});