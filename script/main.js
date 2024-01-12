const boton = document.getElementById("boton");
const pokemon = document.getElementById("pokemon");
const div = document.getElementById("contenido");
boton.addEventListener("click", () => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        let img = document.createElement("img");
        img.setAttribute("src",data.sprites.front_default);
        let numPokemon = document.createElement("div");
        numPokemon.innerHTML = "Nº pokemon: " + ((data.hasOwnProperty('id')) ? JSON.stringify(data.id) : "");
        let tipo = document.createElement("div");
        tipo = "Tipo: " + data.types[0].type.name;
        let nombre = document.createElement("div");
        nombre.innerHTML = "Nombre: " + data.forms[0].name;
        let especies = document.createElement("div");
        let url2 = data.species.url;
        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            especies.innerHTML = "Especie: " + datos.genera[5].genus;
            especies.innerHTML += "Habitat: " + datos.habitat.name;
            especies.innerHTML += "Flavor-text: " + datos.flavor_text_entries[34].flavor_text;
        }).catch((error) => {
            console.error("Error en la consulta: " + error);
        })
        let altura = document.createElement("div");
        altura.innerHTML = "Altura: " + data.height;
        let peso = document.createElement("div");
        peso.innerHTML = "Peso: " + data.types.weight;
        div.appendChild(img);
        div.appendChild(tipo);
        div.appendChild(numPokemon);
        div.appendChild(nombre);
        div.appendChild(especies);
        div.appendChild(altura);
        div.appendChild(peso);
    }).catch((error) => {
        console.error("Error en la consulta: " + error);
    })
});
