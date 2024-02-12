const botonBusc = document.getElementById("botonBusc");
const avanzar = document.getElementById("avanzar");
const botonMov = document.getElementById("botonMov");
const botonHAb = document.getElementById("botonHAb");
const retroceder = document.getElementById("retroceder");

const inputBusc = document.getElementById("inputBusc");

const pokedexCerrada = document.getElementById("pokedexCerrada");
const general = document.getElementById("general");
const contenido = document.getElementById("contenido");
const imgAbierta = document.getElementById("imgAbierta");
const info = document.getElementById("info");
const descripcion = document.getElementById("descripcion");
const movimientos = document.getElementById("movimientos");
const habilidades = document.getElementById("habilidades");
const checkboxShiny = document.getElementById("shiny");
const checkboxFemale = document.getElementById("female");
const contenedorAbierto = document.getElementById("contenedorAbierto");
const contenedorAbiertoImg = document.getElementById("contenedorAbiertoImg");

const imgCerrada = document.getElementById("imgCerrada");
const numeroYNombreCerrada = document.getElementById("numeroYNombreCerrada");

const ul_movimientos = document.getElementById("ul_movimientos");
const ul_habilidades = document.getElementById("ul_habilidades");

contenido.style.display = "none";


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

function pokemonNotFound(){
    if(abierta){
        imgAbierta.setAttribute("src", "");
        info.innerHTML = "Pokemon no encontrado";
        descripcion.innerHTML = "";
        contenedorAbiertoImg.style.display = "none";
        contenedorAbierto.style.display = "none";
    }else{
        imgCerrada.setAttribute("src", "");
        numeroYNombreCerrada.innerHTML = "Pokemon no encontrado";
    }
}

imgCerrada.addEventListener("click", () => {
    pokedexCerrada.style.display = "none";
    abierta = true;
    contenido.style.display = "block";
    info.innerHTML = "";
    descripcion.innerHTML = "";
    let url = "https://pokeapi.co/api/v2/pokemon/" + inputBusc.value;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {      
        pokemon.altura =((data.hasOwnProperty('height')) ? JSON.stringify(data.height).replaceAll('"', "") : "");
        pokemon.peso =((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight).replaceAll('"', "") : "")
        pokemon.tipo1 =((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name).replaceAll('"', "") : "");
        pokemon.tipo2 =((data.types.hasOwnProperty('1')) ? "/" + JSON.stringify(data.types[1].type.name).replaceAll('"', "") : "");
        pokemon.front_female =((data.sprites.front_female !== null) ? data.sprites.front_female : "");
        pokemon.front_shiny =((data.sprites.front_shiny !== null) ? data.sprites.front_shiny : "");
        pokemon.front_shiny_female =((data.sprites.front_shiny_female !== null) ? data.sprites.front_shiny_female : "");
        pokemon.back_default =((data.sprites.back_default !== null) ? data.sprites.back_default : "");
        pokemon.back_female =((data.sprites.back_female !== null) ? data.sprites.back_female : "");
        pokemon.back_shiny =((data.sprites.back_shiny !== null) ? data.sprites.back_shiny : "");
        pokemon.back_shiny_female =((data.sprites.back_shiny_female !== null) ? data.sprites.back_shiny_female : "");
        console.log(pokemon.nombre);
        info.innerHTML += " Number: " + pokemon.numPokemon + "<br>";
        info.innerHTML += " Type: " + pokemon.tipo1 + pokemon.tipo2  + "<br>";
        info.innerHTML += " Name: " + pokemon.nombre + "<br>";
        info.innerHTML += " Height: " + pokemon.peso;
        info.innerHTML += " Weight: " + pokemon.altura  + "<br>";

        let url2 = data.species.url;
        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            pokemon.especie = generaSpecieEn (datos).replaceAll('"', "");
            pokemon.habitat = ((datos.hasOwnProperty('habitat') && (datos.habitat !== null)) ? JSON.stringify(datos.habitat.name).replaceAll('"', "") : "");
            pokemon.texto = flavorTextEn(datos).replaceAll("\\n", " " ).replaceAll('"', "").replaceAll("\\f", " " );
            info.innerHTML += " Species: " + pokemon.especie + "<br>";
            info.innerHTML += " Habitat: " + pokemon.habitat;
            descripcion.innerHTML += " Description: " + pokemon.texto;
        }).catch((error2) => {
            console.error("Error en la consulta: " + error2);
        })
        imgAbierta.setAttribute("src", pokemon.front_default);

        checkboxShiny.addEventListener("change", () => {
            if (checkboxShiny.checked) {
                    imgAbierta.setAttribute("src", pokemon.front_shiny);
            } else {
                    imgAbierta.setAttribute("src", pokemon.front_default);
            }
        });

        checkboxFemale.addEventListener("change", () => {
            if (checkboxFemale.checked) {
                if (checkboxShiny.checked && pokemon.front_shiny_female !== "") {
                    imgAbierta.setAttribute("src", pokemon.front_shiny_female);
                } else if (pokemon.front_female !== "") {
                    imgAbierta.setAttribute("src", pokemon.front_female);
                } else {
                    imgAbierta.setAttribute("src", pokemon.front_default);
                }
            } else {
                if (checkboxShiny.checked) {
                    imgAbierta.setAttribute("src", pokemon.front_shiny);
                } else {
                    imgAbierta.setAttribute("src", pokemon.front_default);
                }
            }
        });
        
        imgAbierta.addEventListener("mouseover", () => {
            if (imgAbierta.getAttribute("src") === pokemon.front_default) {
                imgAbierta.setAttribute("src", pokemon.back_default);
            } else if (imgAbierta.getAttribute("src") === pokemon.front_shiny) {
                imgAbierta.setAttribute("src", pokemon.back_shiny);
            }else if (imgAbierta.getAttribute("src") === pokemon.front_female) {
                imgAbierta.setAttribute("src", pokemon.back_female);
            }else if (imgAbierta.getAttribute("src") === pokemon.front_shiny_female) {
                imgAbierta.setAttribute("src", pokemon.back_shiny_female);
            }
            
        });
        
        imgAbierta.addEventListener("mouseout", () => {
            if (imgAbierta.getAttribute("src") === pokemon.back_default) {
                imgAbierta.setAttribute("src", pokemon.front_default);
            } else if (imgAbierta.getAttribute("src") === pokemon.back_shiny) {
                imgAbierta.setAttribute("src", pokemon.front_shiny);
            }   else if (imgAbierta.getAttribute("src") === pokemon.back_female) {
                imgAbierta.setAttribute("src", pokemon.front_female);
            }else if (imgAbierta.getAttribute("src") === pokemon.back_shiny_female) {
                imgAbierta.setAttribute("src", pokemon.front_shiny_female);
            }
        });

        
    }).catch((error) => {
        pokemonNotFound();
        console.error("Error en la consulta: " + error);
    })
})

botonBusc.addEventListener("click", () => {
    if(abierta){
        //Mostrar la barra encima de la pokedex
        contadorPokemonId = parseInt(inputBusc.value);
        obtenerPokemonPokedexAbierta(contadorPokemonId)

    }else if (!abierta){
        contadorPokemonId = parseInt(inputBusc.value);
        obtenerPokemonPokedexCerrada(contadorPokemonId);

       /* numeroYNombreCerrada.innerHTML = "";
        pokedexCerrada.style.display = "block";
        contenido.style.display = "none";
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
        })*/
    }

});

const max_numPokemon= 1025;
const min_numPokemon = 1;

let contadorPokemonId = min_numPokemon; 


avanzar.addEventListener("click", () => {
    contadorPokemonId++; 
    if (contadorPokemonId > max_numPokemon) {
        contadorPokemonId = min_numPokemon; 
    }
    
    if(abierta){
        obtenerPokemonPokedexAbierta(contadorPokemonId)
    }else{
        obtenerPokemonPokedexCerrada(contadorPokemonId);
    }
    
});

retroceder.addEventListener("click", () => {
    contadorPokemonId--; 
    if (contadorPokemonId < min_numPokemon) {
        contadorPokemonId = max_numPokemon; 
    }
    if(abierta){
        obtenerPokemonPokedexAbierta(contadorPokemonId)
    }else{
        obtenerPokemonPokedexCerrada(contadorPokemonId);
    }
    
});

function obtenerPokemonPokedexCerrada(pokemonId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            pokemon.nombre = ((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name).replaceAll('"', "") : "");
            pokemon.numPokemon = ((data.hasOwnProperty('id')) ? JSON.stringify(data.id).replaceAll('"', "") : "");
            pokemon.front_default = ((data.sprites.front_default !== null) ? data.sprites.front_default : "");
            imgCerrada.setAttribute("src", pokemon.front_default);
            numeroYNombreCerrada.innerHTML = "#" + pokemon.numPokemon + " " + pokemon.nombre;
        })
        .catch((error) => {
            pokemonNotFound();
            console.error("Error en la consulta: " + error);
        });
}


function obtenerPokemonPokedexAbierta(pokemonId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    contenedorAbierto.style.display = "block";
    contenedorAbiertoImg.style.display = "flex";
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            pokemon.nombre = ((data.forms.hasOwnProperty('0')) ? JSON.stringify(data.forms[0].name).replaceAll('"', "") : "");
            pokemon.numPokemon = ((data.hasOwnProperty('id')) ? JSON.stringify(data.id).replaceAll('"', "") : "");
            pokemon.front_default = ((data.sprites.front_default !== null) ? data.sprites.front_default : "");
            pokemon.front_female = ((data.sprites.front_female !== null) ? data.sprites.front_female : "");
            pokemon.front_shiny = ((data.sprites.front_shiny !== null) ? data.sprites.front_shiny : "");
            pokemon.front_shiny_female = ((data.sprites.front_shiny_female !== null) ? data.sprites.front_shiny_female : "");
            pokemon.back_default = ((data.sprites.back_default !== null) ? data.sprites.back_default : "");
            pokemon.back_female = ((data.sprites.back_female !== null) ? data.sprites.back_female : "");
            pokemon.back_shiny = ((data.sprites.back_shiny !== null) ? data.sprites.back_shiny : "");
            pokemon.back_shiny_female = ((data.sprites.back_shiny_female !== null) ? data.sprites.back_shiny_female : "");

            
            info.innerHTML = " Number: " + pokemon.numPokemon + "<br>";
            info.innerHTML += " Type: " + pokemon.tipo1 + pokemon.tipo2  + "<br>";
            info.innerHTML += " Name: " + pokemon.nombre + "<br>";
            info.innerHTML += " Height: " + pokemon.peso;
            info.innerHTML += " Weight: " + pokemon.altura  + "<br>";
            

            imgAbierta.setAttribute("src", pokemon.front_default);

            checkboxShiny.addEventListener("change", () => {
                if (checkboxShiny.checked) {
                        imgAbierta.setAttribute("src", pokemon.front_shiny);
                } else {
                        imgAbierta.setAttribute("src", pokemon.front_default);
                }
            });
    
            checkboxFemale.addEventListener("change", () => {
                if (checkboxFemale.checked) {
                    if (checkboxShiny.checked && pokemon.front_shiny_female !== "") {
                        imgAbierta.setAttribute("src", pokemon.front_shiny_female);
                    } else if (pokemon.front_female !== "") {
                        imgAbierta.setAttribute("src", pokemon.front_female);
                    } else if (checkboxShiny.checked && pokemon.front_female === ""){
                        imgAbierta.setAttribute("src", pokemon.front_shiny);
                    } else {
                        imgAbierta.setAttribute("src", pokemon.front_default);
                    }
                } else {
                    if (checkboxShiny.checked) {
                        imgAbierta.setAttribute("src", pokemon.front_shiny);
                    } else {
                        imgAbierta.setAttribute("src", pokemon.front_default);
                    }
                }
            });

            imgAbierta.addEventListener("mouseover", () => {
                if (imgAbierta.getAttribute("src") === pokemon.front_default) {
                    imgAbierta.setAttribute("src", pokemon.back_default);
                } else if (imgAbierta.getAttribute("src") === pokemon.front_shiny) {
                    imgAbierta.setAttribute("src", pokemon.back_shiny);
                } else if (imgAbierta.getAttribute("src") === pokemon.front_female) {
                    imgAbierta.setAttribute("src", pokemon.back_female);
                } else if (imgAbierta.getAttribute("src") === pokemon.front_shiny_female) {
                    imgAbierta.setAttribute("src", pokemon.back_shiny_female);
                }
            });

            imgAbierta.addEventListener("mouseout", () => {
                if (imgAbierta.getAttribute("src") === pokemon.back_default) {
                    imgAbierta.setAttribute("src", pokemon.front_default);
                } else if (imgAbierta.getAttribute("src") === pokemon.back_shiny) {
                    imgAbierta.setAttribute("src", pokemon.front_shiny);
                } else if (imgAbierta.getAttribute("src") === pokemon.back_female) {
                    imgAbierta.setAttribute("src", pokemon.front_female);
                } else if (imgAbierta.getAttribute("src") === pokemon.back_shiny_female) {
                    imgAbierta.setAttribute("src", pokemon.front_shiny_female);
                }
            });

        })
        .catch((error) => {
            pokemonNotFound();
            console.error("Error en la consulta: " + error);
        });
}
