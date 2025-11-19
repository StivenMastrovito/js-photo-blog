
const grid = document.getElementById("grid");
const spinner = document.querySelector(".fa-spinner");
const divSpinner = document.querySelector(".spinner-div");
const overview = document.querySelector(".overview");
const imgOverview = document.querySelector(".img-overview");
const button = document.querySelector("button");
const form = document.querySelector("form");

let gradi = 0;

axios.get("https://lanciweb.github.io/demo/api/pictures/").then((resp) => {
    divSpinner.style.display = "none";
    const arrayPictures = resp.data;
    let cardStr = createString(arrayPictures);
    grid.innerHTML = cardStr;
    const cards = document.querySelectorAll(".col");
    clickOverview(cards, arrayPictures);
    form.addEventListener("keyup", (event) => {
        event.preventDefault();
        const filter = document.getElementById("filtro").value;
        let cardStr = createStringFilter(arrayPictures, filter);
        grid.innerHTML = cardStr;
    })
    form.addEventListener("reset",(event)=>{
        event.preventDefault();
        cardStr = createString(arrayPictures);
        grid.innerHTML = cardStr;
    })

})

button.addEventListener("click", () => {
    overview.style.display = "none";
})
overview.addEventListener("click", () => {
    overview.style.display = "none";
})





function createString(array) {
    let str = "";
    array.forEach(({ title, date, url, id }) => {
        str += `
            <div class="col" data-postid = ${id}>
                <img src="${url}" alt="">
                <img id="pin" src="./img/pin.svg" alt="">
                <div class="text">
                    <p class="data">${date}</p>
                    <p class="titolo">${title}</p>
                </div>
            </div>
        `
    });
    return str;
}

function createStringFilter(array, filtro) {
    let str = "";
    array.forEach(({ title, date, url, id }, indice) => {
        for (let i = 0; i < title.length; i++) {
            console.log(title.slice(i, i+filtro.length));
            if (title.slice(i, i+filtro.length).toLowerCase() === filtro.toLowerCase()) {
                console.log("copia");
                
                str += `
            <div class="col" data-postid = ${id}>
                <img src="${url}" alt="">
                <img id="pin" src="./img/pin.svg" alt="">
                <div class="text">
                    <p class="data">${date}</p>
                    <p class="titolo">${title}</p>
                </div>
            </div>
        `;
                i = title.length + 1;
                console.log(str);
                
            }
        }
    });
    return str;
}

function clickOverview(card, arrayPictures) {
    card.forEach((element) => {
        element.addEventListener("click", () => {
            const clickedCard = parseInt(element.dataset.postid);
            const clickedPost = arrayPictures.find((picture) => clickedCard === picture.id)
            imgOverview.src = `${clickedPost.url}`
            overview.style.display = "block";
        })
    })
}