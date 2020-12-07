// CON L'API
const myKey = 'cf1aced2a8d67e59db7ba2ea1314b9a7';
const emergencyKey = 'c07a342362917c615e86ab8abf39b054';
const url = 'https://gnews.io/api/v4/search?q=e&country=it&sortby=publishedAt&token=';
const btnNext = document.getElementById("btnNext");
const list = document.getElementById("card_list");

try {
    riempiLista(url + myKey);
} catch (err) {
    riempiLista(url + emergencyKey);
}

function riempiLista(collegamento) {
    fetch(collegamento)
        .then(response => response.json())
        .then(file => {
            file.articles.forEach(a => list.appendChild(toCard(a)));
        })
}

function toCard(articolo) {
    let card = document.createElement("div");
    card.className = "card bg-dark";
    // RIGA
    let riga = document.createElement("div");
    riga.className = "row no-gutters";
    card.appendChild(riga);
    //COLONNA IMMAGINE
    let colonnaImmagine = document.createElement("div");
    colonnaImmagine.className = "col-md-6";
    riga.appendChild(colonnaImmagine);
    // IMMAGINE
    let immagine = document.createElement("img");
    immagine.className = "card-img";
    immagine.alt = "no image";
    immagine.src = articolo.image;
    colonnaImmagine.appendChild(immagine);
    // COLONNA TESTO
    let colonnaTesto = document.createElement("div");
    colonnaTesto.className = "col-md-6";
    colonnaTesto.style = "background-color: black;"
    riga.appendChild(colonnaTesto);
    // CARD BODY
    let cardBody = document.createElement("div");
    cardBody.className = "card-body align-self-center";
    colonnaTesto.appendChild(cardBody);
    // TITOLO CARD
    let titolo = document.createElement("h5");
    titolo.className = "card-title";
    titolo.innerHTML = articolo.title;
    cardBody.appendChild(titolo);
    // TESTO CARD
    let testo = document.createElement("p");
    testo.className = "card-text";
    testo.innerHTML = articolo.content;
    cardBody.appendChild(testo);
    //PUBBLICAZIONE CARD
    let pubblicazione = document.createElement("p");
    pubblicazione.className = "card-text";
    cardBody.appendChild(pubblicazione);
    // PUBBLICAZIONE SMALL
    let pubblicazioneSmall = document.createElement("small");
    pubblicazioneSmall.innerHTML = getData(articolo.publishedAt);
    pubblicazione.appendChild(pubblicazioneSmall);
    //CONTINUA A LEGGERE
    let continua = document.createElement("a");
    continua.className = "card-link";
    continua.href = articolo.url;
    continua.target = "_blank";
    continua.innerHTML = '<i class="fa fa-external-link" aria-hidden="true"> Continua a leggere</i>';
    continua.taget = "_blank"; //apro in una pagina nuova
    cardBody.appendChild(continua);
    //CARD FOOTER
    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer text-muted align-self-baseline";
    cardFooter.innerHTML = 'Fonte: ';
    colonnaTesto.appendChild(cardFooter);
    //COLLEGAMENTO FONTE
    let collegamentoFonte = document.createElement("a");
    collegamentoFonte.href = articolo.source.url;
    collegamentoFonte.target = "_blank";
    collegamentoFonte.innerHTML = articolo.source.name;
    cardFooter.appendChild(collegamentoFonte);
    return card;
}

function getData(data) {
    let anno = data.slice(0, 4);
    let mese = data.slice(5, 7);
    let nomeMese;
    switch (mese) {
        case '01':
            nomeMese = 'gennaio';
            break;
        case '02':
            nomeMese = 'febbraio';
            break;
        case '03':
            nomeMese = 'marzo';
            break;
        case '04':
            nomeMese = 'aprile';
            break;
        case '05':
            nomeMese = 'maggio';
            break;
        case '06':
            nomeMese = 'giugno';
            break;
        case '07':
            nomeMese = 'luglio';
            break;
        case '08':
            nomeMese = 'agosto';
            break;
        case '09':
            nomeMese = 'settembre';
            break;
        case '10':
            nomeMese = 'ottobre';
            break;
        case '11':
            nomeMese = 'novembre';
            break;
        case '12':
            nomeMese = 'dicembre';
            break;
        default:
            nomeMese = '';
            break;
    }
    let giorno = data.slice(8, 10);
    let ora = data.slice(11, 16);
    return 'pubblicato il ' + giorno + ' ' + nomeMese + ' ' + anno + ' alle ' + ora;
}