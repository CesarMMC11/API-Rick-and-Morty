const contenido = document.getElementById('contenido');
const proximo = document.getElementById('siguiente');
const anterior = document.getElementById('anterior');
const numero_pagina = document.getElementById('numero-pagina');

let paginaActual = 1;

function mostrarInformacion(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const PaginasTotales = data.info.pages;
            numero_pagina.innerHTML = `<p>${paginaActual} / ${PaginasTotales}</p>`;
            contenido.innerHTML = "";
            data.results.forEach(personaje => {
                contenido.innerHTML += `
                    <div class="card">
                        <div class="imagen">
                            <img src="${personaje.image}">
                        </div>

                        <div class="personajes">
                            <h2>${personaje.name}</h2>
                            <p>Personaje:${personaje.id}</p>
                            <p>Especie: ${personaje.species}</p>
                            <p>Genero: ${personaje.gender}</p>
                            <p>Origen: ${personaje.origin.name}</p>
                            <p>Ubicacion: ${personaje.location.name}</p>
                        </div>
                    </div>
                `;
            });
            siguiente.onclick = () =>{
                anterior.disabled = false;
                if  (data.info.next) {
                    paginaActual++;
                    mostrarInformacion(data.info.next);
                }
            } ;
            
            anterior.onclick = () => {
                if (data.info.prev) {
                    paginaActual--;
                    mostrarInformacion(data.info.prev)

                    if (paginaActual === 1) {
                        anterior.disabled = true;
                    }
                } else {
                    alert("no hay personajes anteriores");
                }
            }


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

mostrarInformacion('https://rickandmortyapi.com/api/character');
