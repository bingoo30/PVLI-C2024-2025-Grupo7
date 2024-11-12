function muestraClase(ID) {
    let elementos = document.getElementsByClassName(ID);
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.display = 'block';
    }
}
function muestraID(ID) {
    document.getElementById(ID).style.display = 'block';
}

function escondeClase(ID) {
    let elementos = document.getElementsByClassName(ID);
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.display = 'none';
    }
}
function escondeID(ID) {
    document.getElementById(ID).style.display = 'none';
}

