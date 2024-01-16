const boton = document.getElementById("boton");
const pokemon = document.getElementById("pokemon");
const div = document.getElementById("contenido");
boton.addEventListener("click", () => {
    div.innerHTML = "";
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        let img = document.createElement("img");
        img.setAttribute("src", data.sprites.front_default);
        let numPokemon = document.createElement("div");
        numPokemon.innerHTML = "Num. Pokedex: " + ((data.hasOwnProperty('id')) ? JSON.stringify(data.id) : "");
        let tipo = document.createElement("div");
        tipo.innerHTML = "Type: " + ((data.types[0].type.hasOwnProperty('name')) ? JSON.stringify(data.types[0].type.name) : "")
            + ((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name) : "");
        let nombre = document.createElement("div");
        nombre.innerHTML = "Name: " + ((data.forms[0].hasOwnProperty('name')) ? JSON.stringify(data.forms[0].name) : "");
        let especies = document.createElement("div");
        let habitat = document.createElement("div");
        let texto = document.createElement("div");
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
        let altura = document.createElement("div");
        altura.innerHTML = "Height: " + ((data.hasOwnProperty('height')) ? JSON.stringify(data.height) : "" + "cm");
        let peso = document.createElement("div");
        peso.innerHTML = "Weight: " + ((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight) : "" + "");
        div.appendChild(img);
        div.appendChild(tipo);
        div.appendChild(numPokemon);
        div.appendChild(nombre);
        div.appendChild(especies);
        div.appendChild(habitat);
        div.appendChild(texto);
        div.appendChild(altura);
        div.appendChild(peso);
    }).catch((error) => {
        console.error("Error en la consulta: " + error);
    })
});
