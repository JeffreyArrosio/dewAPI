const main = document.querySelector("main div")
const ESP = document.querySelector("#ESP")
const ENG = document.querySelector("#ENG")
const ITA = document.querySelector("#ITA")
const GER = document.querySelector("#GER")
const arrayESP = []
const arrayENG = []
const arrayITA = []
const arrayGER = []
const tablaESP = []
const tablaENG = []
const tablaITA = []
const tablaGER = []
const botonAntiguo = document.getElementById("antiguo")
const botonEstadio = document.getElementById("estadio")
const botonAZ = document.getElementById("az")
let ligaActual
let contador


const option = {
    method: "GET"
}

function init() {
    ESP.addEventListener('click', fetchLaLiga)
    ENG.addEventListener('click', fetchPremier)
    ITA.addEventListener('click', fetchSerieA)
    GER.addEventListener('click', fetchBundesliga)
    botonAntiguo.addEventListener('click', ordenAntiguo)
    botonEstadio.addEventListener('click', ordenEstadio)
    botonAZ.addEventListener('click', ordenAlfabetico)
}

function fetchLaLiga() {
    contador = 1
    ligaActual = 'ESP'
    arrayESP.length == 0 ?
        fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish La Liga", option)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                vistaEquipos(arrayESP, data)
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
        :
        vistaEquipos(arrayESP)

}

function fetchPremier() {
    contador = 1
    ligaActual = 'ENG'
    arrayENG.length == 0 ?
        fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English Premier League", option)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                vistaEquipos(arrayENG, data)
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
        :
        vistaEquipos(arrayENG)
}

function fetchBundesliga() {
    contador = 1
    ligaActual = "GER"
    arrayGER.length == 0 ?
        fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=German Bundesliga", option)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                vistaEquipos(arrayGER, data)
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
        :
        vistaEquipos(arrayGER)
}

function fetchSerieA() {
    contador = 1
    ligaActual = 'ITA'
    arrayITA.length == 0 ?
        fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Italian Serie A", option)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                vistaEquipos(arrayITA, data)
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
        :
        vistaEquipos(arrayITA)
}


function vistaEquipos(array, data = null) {
    main.innerHTML = ""
    if (data !== null) {
        guardarEquipos(data, array)
        creaTabla(array)
    }
    for (let i = 0; i < array.length; i++) {
        const equipo = document.createElement("span")
        equipo.classList.add("card", "col-3")
        equipo.setAttribute('idTeam', array[i].idTeam)
        equipo.setAttribute('league', array[i].strLeague)
        equipo.style.background = array[i].strColour1
        equipo.style.color = array[i].strColour2
        equipo.innerHTML = `
            <div class="card-body text-center">
            <img src="${array[i].strBadge}" class="card-img-top" alt="...">
            <h5 class="card-title" >${array[i].strTeam}</h5>
            </div>
        `
        const imagen = equipo.querySelector('img')
        imagen.addEventListener('click', infoEquipo)
        main.appendChild(equipo)
    }
    vistaTabla()
}

function guardarEquipos(data, array) {
    const nombre = data.teams
    for (let i = 0; i < nombre.length; i++) {
        array.push(nombre[i])
    }
}

function creaTabla(array) {
    let tabla
    if (ligaActual == 'ESP') {
        tabla = tablaESP
    }
    else if (ligaActual == 'ENG') {
        tabla = tablaENG
    }
    else if (ligaActual == 'ITA') {
        tabla = tablaITA
    }
    else {
        tabla = tablaGER
    }
    array.forEach(e => {
        const posicion = {
            equipo: e.strTeam,
            escudo: e.strBadge,
            puntos: Math.floor((Math.random() * 60) + 9)
        }
        tabla.push(posicion)
    });
    tabla.sort((a, b) => b.puntos - a.puntos)
    console.log(tabla);
}

function vistaTabla() {
    let tabla
    if (ligaActual == 'ESP') {
        tabla = tablaESP
    }
    else if (ligaActual == 'ENG') {
        tabla = tablaENG
    }
    else if (ligaActual == 'ITA') {
        tabla = tablaITA
    }
    else {
        tabla = tablaGER
    }
    const h1 = document.createElement('h1')
    h1.classList.add("mt-4", "text-center")
    h1.textContent = "Clasificación"
    main.appendChild(h1)
    const tablaEquipos = document.createElement('table')
    tablaEquipos.classList.add('table', 'table-dark', 'table-striped',"mt-4")
    tablaEquipos.innerHTML = `
        <thead>
            <tr>
                <th>Puesto</th>
                <th>Equipo</th>
                <th>Puntos</th>
            </tr>
        </thead>
    `
    const tbody = document.createElement('tbody')
    tablaEquipos.appendChild(tbody)
    for (let i = 0; i < tabla.length; i++) {
        const puesto = document.createElement('tr')
        if (i <= 3) puesto.classList.add('table-success')
        else if (i > 3 && i <= 6) puesto.classList.add('table-warning')
        else if (i > tabla.length - 4 && i <= tabla.length - 1) puesto.classList.add('table-danger')
        let random = []
        for (let i = 0; i < 5; i++) {
            let num = Math.floor(Math.random()*100)
            if(num%3 == 0){
                random[i] = {
                    result: "E",
                    class: "bg-warning"
                }
            }else if(num%3 == 1){
                random[i] = {
                    result: "V",
                    class: "bg-success"
                }
            }else{
                random[i] = {
                    result: "D",
                    class: "bg-danger"
                }
            }
            
        }
        puesto.innerHTML = `
            <td>${i + 1}</td>
            <td><img src="${tabla[i].escudo}" alt=""> ${tabla[i].equipo}</td>
            <td>
            <div class="row p-2">
                <span class="col-2 h5">${tabla[i].puntos}</span>
                <span class="col-2 text-center text-white ${random[0].class}">${random[0].result}</span>
                <span class="col-2 text-center text-white ${random[1].class}">${random[1].result}</span>
                <span class="col-2 text-center text-white ${random[2].class}">${random[2].result}</span>
                <span class="col-2 text-center text-white ${random[3].class}">${random[3].result}</span>
                <span class="col-2 text-center text-white ${random[4].class}">${random[4].result}</span>
            </div>
            </td>
        `
        tbody.appendChild(puesto)
    }
    main.appendChild(tablaEquipos)
    leyenda()
}

function leyenda(){
    const leyenda = document.createElement('div')
    leyenda.classList.add("mt-4","mb-4")
    leyenda.innerHTML = `
        <div class="row mt-1">
            <div class="col-1 bg-success"></div>
            <div class="col-11">Champions League</div>
        </div>
        <div class="row mt-1">
            <div class="col-1 bg-warning"></div>
            <div class="col-11">Europa League</div>
        </div>
        <div class="row mt-1">
            <div class="col-1 bg-danger"></div>
            <div class="col-11">Descenso</div>
        </div>
    `
    main.appendChild(leyenda)
}

function infoEquipo(e) {
    let equipo = e.target.parentElement.parentElement
    let liga = equipo.getAttribute('league')
    if (liga == 'Spanish La Liga') muestraEquipo(equipo.getAttribute('idTeam'), arrayESP)
    else if (liga == 'English Premier League') muestraEquipo(equipo.getAttribute('idTeam'), arrayENG)
    else if (liga == 'Italian Serie A') muestraEquipo(equipo.getAttribute('idTeam'), arrayITA)
    else muestraEquipo(equipo.getAttribute('idTeam'), arrayGER)
}

function muestraEquipo(id, array) {
    let equipo = array.find(e => e.idTeam == id)
    main.innerHTML = ""
    const contenido = document.createElement('div')
    contenido.classList.add('equipo')
    contenido.innerHTML = `
        <h1 class="d-flex justify-content-between">
            ${equipo.strTeam}
            <button id="back">Volver</button>      
        </h1>
        <img src="${equipo.strBadge}" alt="">
        <p>Liga: ${equipo.strLeague}</p>
        <p>Estadio: ${equipo.strStadium}</p>
        <p>Capacidad: ${equipo.intStadiumCapacity}</p>
        <p>Año fundación: ${equipo.intFormedYear}</p>
        <p>Descripción (ENG): ${equipo.strDescriptionEN} </p>
        <p> Equipación: </p>
        <img src="${equipo.strEquipment}" alt="">
    `
    contenido.querySelector('h1 button').addEventListener('click', volverAtras)
    main.appendChild(contenido)
}

function ordenAntiguo() {
    if (ligaActual == 'ESP') {
        contador % 2 == 0 ? arrayESP.sort((a, b) => a.intFormedYear - b.intFormedYear) : arrayESP.sort((a, b) => b.intFormedYear - a.intFormedYear)
        vistaEquipos(arrayESP)
    }
    else if (ligaActual == 'ENG') {
        contador % 2 == 0 ? arrayENG.sort((a, b) => a.intFormedYear - b.intFormedYear) : arrayENG.sort((a, b) => b.intFormedYear - a.intFormedYear)
        vistaEquipos(arrayENG)
    }
    else if (ligaActual == 'ITA') {
        contador % 2 == 0 ? arrayITA.sort((a, b) => a.intFormedYear - b.intFormedYear) : arrayITA.sort((a, b) => b.intFormedYear - a.intFormedYear)
        vistaEquipos(arrayITA)
    }
    else if (ligaActual == 'GER') {
        contador % 2 == 0 ? arrayGER.sort((a, b) => a.intFormedYear - b.intFormedYear) : arrayGER.sort((a, b) => b.intFormedYear - a.intFormedYear)
        vistaEquipos(arrayGER)
    }
    contador++
}

function ordenEstadio() {
    if (ligaActual == 'ESP') {
        contador % 2 == 0 ? arrayESP.sort((a, b) => a.intStadiumCapacity - b.intStadiumCapacity) : arrayESP.sort((a, b) => b.intStadiumCapacity - a.intStadiumCapacity)
        vistaEquipos(arrayESP)
    }
    else if (ligaActual == 'ENG') {
        contador % 2 == 0 ? arrayENG.sort((a, b) => a.intStadiumCapacity - b.intStadiumCapacity) : arrayENG.sort((a, b) => b.intStadiumCapacity - a.intStadiumCapacity)
        vistaEquipos(arrayENG)
    }
    else if (ligaActual == 'ITA') {
        contador % 2 == 0 ? arrayITA.sort((a, b) => a.intStadiumCapacity - b.intStadiumCapacity) : arrayITA.sort((a, b) => b.intStadiumCapacity - a.intStadiumCapacity)
        vistaEquipos(arrayITA)
    }
    else if (ligaActual == 'GER') {
        contador % 2 == 0 ? arrayGER.sort((a, b) => a.intStadiumCapacity - b.intStadiumCapacity) : arrayGER.sort((a, b) => b.intStadiumCapacity - a.intStadiumCapacity)
        vistaEquipos(arrayGER)
    }
    contador++
}

function ordenAlfabetico() {
    if (ligaActual == 'ESP') {
        contador % 2 == 0 ? arrayESP.sort((a, b) => a.strTeam.localeCompare(b.strTeam)) : arrayESP.sort((a, b) => b.strTeam.localeCompare(a.strTeam))
        vistaEquipos(arrayESP)
    }
    else if (ligaActual == 'ENG') {
        contador % 2 == 0 ? arrayENG.sort((a, b) => a.strTeam.localeCompare(b.strTeam)) : arrayENG.sort((a, b) => b.strTeam.localeCompare(a.strTeam))
        vistaEquipos(arrayENG)
    }
    else if (ligaActual == 'ITA') {
        contador % 2 == 0 ? arrayITA.sort((a, b) => a.strTeam.localeCompare(b.strTeam)) : arrayITA.sort((a, b) => b.strTeam.localeCompare(a.strTeam))
        vistaEquipos(arrayITA)
    }
    else if (ligaActual == 'GER') {
        contador % 2 == 0 ? arrayGER.sort((a, b) => a.strTeam.localeCompare(b.strTeam)) : arrayGER.sort((a, b) => b.strTeam.localeCompare(a.strTeam))
        vistaEquipos(arrayGER)
    }
    contador++
}

function volverAtras() {
    if (ligaActual == 'ESP') vistaEquipos(arrayESP)
    else if (ligaActual == 'ENG') vistaEquipos(arrayENG)
    else if (ligaActual == 'ITA') vistaEquipos(arrayITA)
    else vistaEquipos(arrayGER)
}

init()