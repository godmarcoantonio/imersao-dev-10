let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");

let dados = [];

// Carrega os dados do JSON uma vez quando a página é carregada
window.onload = async function() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    let termoBusca = campoBusca.value.toLowerCase();
    
    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Mostra todos se a busca estiver vazia
        return;
    }

    let resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for(let dado of dados) {
        let article = document.createElement("article");        
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);       
    }
}