
const grid = document.getElementById("grid");
const spinner = document.querySelector(".fa-spinner");
const divSpinner = document.querySelector(".spinner-div");
let gradi = 0;
console.log(spinner);

const spinnerInterval = setInterval(()=>{
    spinner.style.transform = `rotate(${gradi}deg)`; 
    gradi += 10;
    if(gradi === 360){
        gradi = 0;
    }
}, 100)

axios.get("https://lanciweb.github.io/demo/api/pictures/").then((resp) => {
    clearInterval(spinnerInterval);
    divSpinner.style.display = "none";
    const arrayPictures = resp.data;
    let cardStr = createString(arrayPictures);
    grid.innerHTML = cardStr;
})





function createString(array){
    let str = "";
    array.forEach(({ title, date, url }) => {
        str += `
            <div class="col">
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
