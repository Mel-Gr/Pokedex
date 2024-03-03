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

const max_numPokemon = 1025;
const min_numPokemon = 1;

let contadorPokemonId = min_numPokemon;

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
    especie: "",
    habitat: "",
    texto: ""
};

function addImage(url_img, div) {
    let img = document.createElement("img");
    img.setAttribute("src", url_img);
    div.appendChild(img);
}

document.getElementById("fr").addEventListener("submit", (event) => {
    event.preventDefault();
})

function flavorTextEn(datos) {
    let arrTextos = datos.flavor_text_entries;
    for (let i = 0; i < arrTextos.length; i++) {
        if (arrTextos[i].language.name == "en")
            return JSON.stringify(datos.flavor_text_entries[i].flavor_text);
    }
    return "";
}

function generaSpecieEn(datos) {
    let arrTextos = datos.genera;
    for (let i = 0; i < arrTextos.length; i++) {
        if (arrTextos[i].language.name == "en")
            return JSON.stringify(datos.genera[i].genus);
    }
    return "";
}

function pokemonNotFound() {
    if (abierta) {
        imgAbierta.setAttribute("src", "");
        info.innerHTML = "Pokemon no encontrado";
        descripcion.innerHTML = "";
        imgAbierta.style.display = "none";
        contenedorAbierto.style.display = "none";
        info.style.marginLeft = "30%";
    } else {
        imgCerrada.setAttribute("src", "");
        numeroYNombreCerrada.innerHTML = "Pokemon no encontrado";
    }
}

function cambiarColorFondo(tipo1, tipo2) {
    let color1, color2;
    switch (tipo1) {
        case "normal":
            color1 = "#A8A77A";
            break;
        case "fire":
            color1 = "#EE8130";
            break;
        case "water":
            color1 = "#6390F0";
            break;
        case "electric":
            color1 = "#F7D02C";
            break;
        case "grass":
            color1 = "#7AC74C";
            break;
        case "ice":
            color1 = "#96D9D6";
            break;
        case "fighting":
            color1 = "#C22E28";
            break;
        case "poison":
            color1 = "#A33EA1";
            break;
        case "ground":
            color1 = "#E2BF65";
            break;
        case "flying":
            color1 = "#A98FF3";
            break;
        case "psychic":
            color1 = "#F95587";
            break;
        case "bug":
            color1 = "#A6B91A";
            break;
        case "rock":
            color1 = "#B6A136";
            break;
        case "ghost":
            color1 = "#735797";
            break;
        case "dragon":
            color1 = "#6F35FC";
            break;
        case "dark":
            color1 = "#705746";
            break;
        case "steel":
            color1 = "#B7B7CE";
            break;
        case "fairy":
            color1 = "#D685AD";
            break;
        default:
            color1 = "#FFFFFF";
            break;
    }
    if (tipo2) {
        switch (tipo2) {
            case "normal":
                color2 = "#A8A77A";
                break;
            case "fire":
                color2 = "#EE8130";
                break;
            case "water":
                color2 = "#6390F0";
                break;
            case "electric":
                color2 = "#F7D02C";
                break;
            case "grass":
                color2 = "#7AC74C";
                break;
            case "ice":
                color2 = "#96D9D6";
                break;
            case "fighting":
                color2 = "#C22E28";
                break;
            case "poison":
                color2 = "#A33EA1";
                break;
            case "ground":
                color2 = "#E2BF65";
                break;
            case "flying":
                color2 = "#A98FF3";
                break;
            case "psychic":
                color2 = "#F95587";
                break;
            case "bug":
                color2 = "#A6B91A";
                break;
            case "rock":
                color2 = "#B6A136";
                break;
            case "ghost":
                color2 = "#735797";
                break;
            case "dragon":
                color2 = "#6F35FC";
                break;
            case "dark":
                color2 = "#705746";
                break;
            case "steel":
                color2 = "#B7B7CE";
                break;
            case "fairy":
                color2 = "#D685AD";
                break;
            default:
                color2 = "#FFFFFF"; // Color blanco por defecto
                break;
        }
        document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    } else {
        document.body.style.background = color1;
    }
}

function obtenerPokemonPokedexCerrada(pokemonId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    pokedexCerrada.style.display = "block";
    contenido.style.display = "none";
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
            if (data.types.length == 2) {
                cambiarColorFondo(data.types[0].type.name, data.types[1].type.name);
            } else {
                cambiarColorFondo(data.types[0].type.name);
            }
        })
        .catch((error) => {
            pokemonNotFound();
            console.error("Error en la consulta: " + error);
        });
}




function obtenerPokemonPokedexAbierta(pokemonId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    pokedexCerrada.style.display = "none";
    contenido.style.display = "block";
    imgAbierta.style.display = "block";
    info.style.marginLeft = "0px";
    contenedorAbierto.style.display = "block";

    abierta = true;

    if (checkboxFemale.checked) {
        checkboxFemale.checked = false
    }

    if (checkboxShiny.checked) {
        checkboxShiny.checked = false
    }

    
    info.innerHTML = "";
    descripcion.innerHTML = "";

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        pokemon.altura = ((data.hasOwnProperty('height')) ? JSON.stringify(data.height).replaceAll('"', "") : "");
        pokemon.peso = ((data.hasOwnProperty('weight')) ? JSON.stringify(data.weight).replaceAll('"', "") : "")
        pokemon.tipo1 = ((data.types.hasOwnProperty('0')) ? JSON.stringify(data.types[0].type.name).replaceAll('"', "") : "");
        pokemon.tipo2 = ((data.types.hasOwnProperty('1')) ? " / " + JSON.stringify(data.types[1].type.name).replaceAll('"', "") : "");
        pokemon.front_female = ((data.sprites.front_female !== null) ? data.sprites.front_female : "");
        pokemon.front_shiny = ((data.sprites.front_shiny !== null) ? data.sprites.front_shiny : "");
        pokemon.front_shiny_female = ((data.sprites.front_shiny_female !== null) ? data.sprites.front_shiny_female : "");
        pokemon.back_default = ((data.sprites.back_default !== null) ? data.sprites.back_default : "");
        pokemon.back_female = ((data.sprites.back_female !== null) ? data.sprites.back_female : "");
        pokemon.back_shiny = ((data.sprites.back_shiny !== null) ? data.sprites.back_shiny : "");
        pokemon.back_shiny_female = ((data.sprites.back_shiny_female !== null) ? data.sprites.back_shiny_female : "");

        info.innerHTML += " Number: " + pokemon.numPokemon + "<br>";
        info.innerHTML += " Type: " + pokemon.tipo1 + pokemon.tipo2 + "<br>";
        info.innerHTML += " Name: " + pokemon.nombre + "<br>";
        info.innerHTML += " Height: " + pokemon.peso;
        info.innerHTML += " Weight: " + pokemon.altura + "<br>";

        if (data.types.length == 2) {
            cambiarColorFondo(data.types[0].type.name, data.types[1].type.name);
        } else {
            cambiarColorFondo(data.types[0].type.name);
        }

        let url2 = data.species.url;

        fetch(url2).then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            pokemon.especie = generaSpecieEn(datos).replaceAll('"', "");
            pokemon.habitat = ((datos.hasOwnProperty('habitat') && (datos.habitat !== null)) ? JSON.stringify(datos.habitat.name).replaceAll('"', "") : "");
            pokemon.texto = flavorTextEn(datos).replaceAll("\\n", " ").replaceAll('"', "").replaceAll("\\f", " ");
            info.innerHTML += " Species: " + pokemon.especie + "<br>";
            info.innerHTML += " Habitat: " + pokemon.habitat;
            descripcion.innerHTML += " Description: " + pokemon.texto;
        }).catch((error2) => {
            console.error("Error en la consulta: " + error2);
        })

        imgAbierta.setAttribute("src", pokemon.front_default);

        checkboxShiny.addEventListener("change", () => {
            if (checkboxShiny.checked) {
                if (checkboxShiny.checked && checkboxFemale.checked) {
                    imgAbierta.setAttribute("src", pokemon.front_shiny_female);
                } else {
                    imgAbierta.setAttribute("src", pokemon.front_shiny);
                }
            } else if (checkboxFemale.checked && pokemon.front_female !== "") {
                imgAbierta.setAttribute("src", pokemon.front_female);
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
                } else if (checkboxShiny.checked && pokemon.front_female === "") {
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

    }).catch((error) => {
        pokemonNotFound();
        console.error("Error en la consulta: " + error);
    });
}

movimientos.addEventListener("click", () => {
    movimientos.innerHTML = "";

})

imgCerrada.addEventListener("click", () => {
    obtenerPokemonPokedexAbierta(pokemon.numPokemon);

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

botonBusc.addEventListener("click", () => {
    if (abierta) {
        //Mostrar la barra encima de la pokedex
        obtenerPokemonPokedexCerrada(inputBusc.value);

    } else if (!abierta) {
        numeroYNombreCerrada.innerHTML = "";
        pokedexCerrada.style.display = "block";
        contenido.style.display = "none";
        obtenerPokemonPokedexCerrada(inputBusc.value);
    }

});




avanzar.addEventListener("click", () => {
    contadorPokemonId = pokemon.numPokemon;
    contadorPokemonId++;
    if (contadorPokemonId > max_numPokemon) {
        contadorPokemonId = min_numPokemon;
    }

    if (abierta) {
        obtenerPokemonPokedexCerrada(contadorPokemonId)
        obtenerPokemonPokedexAbierta(contadorPokemonId)
    } else {
        obtenerPokemonPokedexCerrada(contadorPokemonId);
    }

});

retroceder.addEventListener("click", () => {
    contadorPokemonId = pokemon.numPokemon;
    contadorPokemonId--;
    if (contadorPokemonId < min_numPokemon) {
        contadorPokemonId = max_numPokemon;
    }
    if (abierta) {
        obtenerPokemonPokedexCerrada(contadorPokemonId)
        obtenerPokemonPokedexAbierta(contadorPokemonId)
    } else {
        obtenerPokemonPokedexCerrada(contadorPokemonId);
    }
    
});




