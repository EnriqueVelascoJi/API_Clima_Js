
const conatiner = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {

    formulario.addEventListener("submit", buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;


    if( ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorioss");

        return
    }

    //Consultar API
    consultarAPI( ciudad, pais);
}

function mostrarError(mensaje) {
    
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        //Crear una alerta

        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center");
        alerta.innerHTML = `
            <strong class="font-bold">Error!</stron>
            <span class="block">${mensaje}</span>
        `;
        conatiner.appendChild(alerta)

        setTimeout(() => {
            alerta.remove();
        }, 5000);

    }

    
    
}

function consultarAPI( ciudad, pais ) {

    const appId = '0f04f57bfa737d9c040338eab764c7fb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();
    fetch(url)
    .then( response => response.json())
    .then( data => {
        limpiarHTML();
        if(data.cod === "404") {
            mostrarError("Ciudad no encontrada");
            return;
        }

        mostrarClima(data);
    });

}
function mostrarClima(datos) {
    const {name, main:{temp, temp_max, temp_min}} = datos;
    
    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add("font-bold", "text-6xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');

    const temMaxima = document.createElement("p");
    temMaxima.innerHTML = `Max: ${max} &#8451;`;
    temMaxima.classList.add("text-xl");

    const temMinima = document.createElement("p");
    temMinima.innerHTML = `Min: ${min} &#8451;`;
    temMinima.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temMaxima);
    resultadoDiv.appendChild(temMinima);
    
    resultado.appendChild(resultadoDiv);
}
const  kelvinCentigrados = (grados) => parseInt( grados - 273.15 );
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>`;

    resultado.appendChild(divSpinner);


}