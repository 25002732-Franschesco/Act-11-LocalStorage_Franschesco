class ResiduoRPBI  {
    constructor(area, tipo, peso){
        this.area = area;
        this.tipo = tipo;
        this.peso = parseFloat(peso);
    }
}

const inputarea = document.getElementById("areaHosp");
const inputtipo = document.getElementById("tipoRPBI");
const inputpeso = document.getElementById("pesoKg");
const btn = document.getElementById("agregarBtn");
const list = document.getElementById("listaRPBI");

document.addEventListener("DOMContentLoaded", cargarRegistros);

btn.addEventListener("click",agregarResiduo);

function agregarResiduo(){
    const area = inputarea.value.trim();
    const tipo = inputtipo.value;
    const peso = inputpeso.value;

    if( area === "" || peso === ""){
        return alert("Padrino, llena todos los campos");
    }

    const nuevoResiduosito = new ResiduoRPBI( area,tipo,peso);
    const registros = obtenerRegistros();
    registros.push(nuevoResiduosito);
    localStorage.setItem("registrosRPBI", JSON.stringify(registros));

    mostrarRegistros();
    inputarea.value = "";
    inputpeso.value = "";
}
function obtenerRegistros(){
    return JSON.parse(localStorage.getItem("registrosRPBI")) || [];
}

function mostrarRegistros(){
    list.innerHTML = "";
    const registros = obtenerRegistros();

    let cantidadPunzocortante = 0;
    let cantidadPatológico = 0;

    for(let i = 0; i < registros.length; i++){
        const registritos = registros[i];


        if(registritos.tipo === "Punzocortante"){
            cantidadPunzocortante += registritos.peso;
        } else if(registritos.tipo === "Patológico"){
            cantidadPatológico +=  registritos.peso;
        }
        list.innerHTML += "<li>" + registritos.area + " - " + registritos.tipo + " - " + registritos.peso + " kg <button onclick='borrarResiduo(" + i + ")'>X</button></li>";
    }

    document.getElementById("totPunzo").textContent = cantidadPunzocortante;
    document.getElementById("totPato").textContent = cantidadPatológico;
}

function borrarResiduo(indice){
    const registros = obtenerRegistros();
    registros.splice(indice, 1);
    localStorage.setItem("registrosRPBI",JSON.stringify(registros));
    mostrarRegistros();
}

function cargarRegistros(){
    mostrarRegistros();
}