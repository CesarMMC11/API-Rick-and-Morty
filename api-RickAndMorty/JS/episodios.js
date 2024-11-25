const episodios = document.getElementById('episodios');
const prox_pag = document.getElementById('prox-epi');
const ante_pag = document.getElementById('Ante-epi');
const pagina_numero = document.getElementById('pagina-numero')

let ActualPage = 1;



function mostrarEpisodios (url) {
    fetch(url)
    .then (response => response.json())
    .then (data => {
        const totalPages = data.info.pages;
        pagina_numero.innerHTML = `<p>${ActualPage} / ${totalPages}</p>`;
        
        episodios.innerHTML="";
        data.results.forEach(episodio => {
            episodios.innerHTML+=`
                <div>
                    <h3>${episodio.episode} / ${episodio.name}</h3>
                    <p>Fecha de emision: ${episodio.air_date}</p>
                </div>
            `;
        });
        
        prox_pag.onclick = () => {
            ante_pag.disabled = false;
                if  (data.info.next) {
                    ActualPage++;
                    mostrarEpisodios(data.info.next);
                }
        };
        

        ante_pag.onclick = () => {
            if (data.info.prev) {
                ActualPage--;
                mostrarEpisodios(data.info.prev)

                if (ActualPage === 1) {
                    ante_pag.disabled = true;
                }
            }else {
                alert("no hay personajes anteriores");
            }
        };
    });

}


mostrarEpisodios('https://rickandmortyapi.com/api/episode');