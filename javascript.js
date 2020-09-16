//JavaScript til newfashioned

//JSON fetch:

let cocktails;
let filter = "alle"; //default filter

const link = "https://spreadsheets.google.com/feeds/list/1Eg-ALbGni5-LA8XdI-a-ihkYCiYoDk3TZGRjGxZAW0s/od6/public/values?alt=json"; //json link

async function hentData(link) {
    const respons = await fetch(link);
    const json = await respons.json();
    vis(json);
    buttonEventListeners();
}
//function der kloner og tilføjer content fra JSON til #container article i vores template
function vis(cocktails) {
    console.log(cocktails);
    container.innerHTML = "";

    cocktails.feed.entry.forEach(cocktails => {
        if (filter == "alle" || filter == cocktails.gsx$kategori.$t) {
            console.log('ret filter');
            const klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = cocktails.gsx$navn.$t;

            klon.querySelector("img").src = "imgs/xsmall/" + cocktails.gsx$billede.$t + "_sm.jpg"; //path til vores billeder
            klon.querySelector("img").alt = cocktails.gsx$navn.$t;
            klon.querySelector(".kort").textContent = cocktails.gsx$kort.$t;
            klon.querySelector(".pris").textContent = "Pris: " + cocktails.gsx$pris.$t + " kr.";
            klon.querySelector("#listContainer img").addEventListener("click", () => visDetaljer(cocktails));
            container.appendChild(klon); //klones til DOM
        }
    })
}
//function der tilføjer specifik info for klikket cocktail i vores popop container
function visDetaljer(drink) {
    console.log(cocktails);
    popup.querySelector("h2").textContent = drink.gsx$navn.$t;
    popup.style.display = "block";
    document.querySelector("#popup").addEventListener("click", tilbage); //så vi kan klikke ud af popop vinduet
    popup.querySelector(".kategori").textContent = drink.gsx$kategori.$t;
    popup.querySelector(".lang").textContent = drink.gsx$lang.$t;
    popup.querySelector("img").src = "imgs/small/" + drink.gsx$billede.$t + "_sm.jpg"; //path til vores billeder
    popup.querySelector("img").alt = drink.gsx$navn.$t;
}
//function til at go ud af popup vindu
function tilbage() {
    popup.style.display = "none";
}



//button function for at filtre knapper har evenlisteners
function buttonEventListeners() {
    console.log('buttonEventListeners');
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });

}
//function sætter filtre og ændre dermed listview
function filterBTNs() {
    console.log('clicked button' + this.dataset.type);
    filter = this.dataset.type;
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("buttonClicked")); //fjerner alle styles for ikke klikkede knapper
    this.classList.add("buttonClicked");
    hentData(link);
}


hentData(link); //fetcher vores Gsheet

let container = document.querySelector("#listSection");
let temp = document.querySelector("template"); //definere vores template og container til rigtige HTML elementer


document.querySelector("#burgermenu").addEventListener("click", menuOpen); //tilføjer eventlistener til burgermenu


//BURGER MENU function der åbner menuen
function menuOpen() {
    console.log("menuOpen");
    document.querySelector("nav").style.display = "flex"; //ændrer display fra non til flex
    document.querySelector("#burgermenu").removeEventListener("click", menuOpen);
    document.querySelector("#burgermenu").addEventListener("click", menuClose);
}
//function der fjerner burgermenuen
function menuClose() {
    console.log("menuClose");
    document.querySelector("nav").style.display = "none";
    document.querySelector("#burgermenu").removeEventListener("click", menuClose);
    document.querySelector("#burgermenu").addEventListener("click", menuOpen);
}
