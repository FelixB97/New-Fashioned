//JavaScript til newfashioned

//JSON fetch:

let cocktails;
let filter = "alle";

const link = "https://spreadsheets.google.com/feeds/list/1Eg-ALbGni5-LA8XdI-a-ihkYCiYoDk3TZGRjGxZAW0s/od6/public/values?alt=json";

async function hentData(link) {
    const respons = await fetch(link);
    const json = await respons.json();
    vis(json);
    buttonEventListeners();
}

function vis(cocktails) {
    console.log(cocktails);
    container.innerHTML = "";
    let picNumber = 1;

    cocktails.feed.entry.forEach(cocktails => {
        if (filter == "alle" || filter == cocktails.gsx$kategori.$t) {
            console.log('ret filter');
            const klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = cocktails.gsx$navn.$t;

            klon.querySelector("img").src = "imgs/small/" + cocktails.gsx$billede.$t + "_sm.jpg";
            klon.querySelector("img").alt = cocktails.gsx$navn.$t;
            klon.querySelector(".kort").textContent = cocktails.gsx$kort.$t;
            klon.querySelector(".pris").textContent = "pris: " + cocktails.gsx$pris.$t + " kr.";
            klon.querySelector("#listContainer img").addEventListener("click", () => visDetaljer(cocktails));
            container.appendChild(klon);
        }
    })
}

function visDetaljer(drink) {
    console.log(cocktails);
    popup.querySelector("h2").textContent = drink.gsx$navn.$t;
    popup.style.display = "block";
    document.querySelector("#popup").addEventListener("click", tilbage);
    popup.querySelector(".kategori").textContent = drink.gsx$kategori.$t;
    popup.querySelector(".lang").textContent = drink.gsx$lang.$t;

    popup.querySelector("img").src = "imgs/large/" + drink.gsx$billede.$t + "_lg.jpg";
    popup.querySelector("img").alt = drink.gsx$navn.$t;
}

function tilbage() {
    popup.style.display = "none";
}



//button funktioner for filtre:
function buttonEventListeners() {
    console.log('buttonEventListeners');
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });

}

function filterBTNs() {
    console.log('clicked button' + this.dataset.type);
    filter = this.dataset.type;
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("buttonClicked"));

    this.classList.add("buttonClicked");

    //    if (filter == "alle") {
    //
    //        document.querySelector(".filter:first-child").classList.add("buttonClicked");
    //    } else if (filter == "desserter") {
    //
    //        document.querySelector(".filter:nth-child(2)").classList.add("buttonClicked");
    //    } else if (filter == "drikkevarer") {
    //
    //        document.querySelector(".filter:nth-child(3)").classList.add("buttonClicked");
    //    } else if (filter == "forretter") {
    //
    //        document.querySelector(".filter:nth-child(4)").classList.add("buttonClicked");
    //    } else if (filter == "hovedretter") {
    //
    //        document.querySelector(".filter:nth-child(5)").classList.add("buttonClicked");
    //    } else if (filter == "sideorders") {
    //
    //        document.querySelector(".filter:last-child").classList.add("buttonClicked");
    //    }

    hentData(link);
}


hentData(link);

let container = document.querySelector("#listSection");
let temp = document.querySelector("template");


//BURGER MENU function:
document.querySelector("#burgermenu").addEventListener("click", menuOpen);



function menuOpen() {
    console.log("menuOpen");
    document.querySelector("nav").style.display = "flex";
    document.querySelector("#burgermenu").removeEventListener("click", menuOpen);
    document.querySelector("#burgermenu").addEventListener("click", menuClose);
}

function menuClose() {
    console.log("menuClose");
    document.querySelector("nav").style.display = "none";
    document.querySelector("#burgermenu").removeEventListener("click", menuClose);
    document.querySelector("#burgermenu").addEventListener("click", menuOpen);
}


















