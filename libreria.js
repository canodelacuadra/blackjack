/// función desordenar
function desordenarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
// funcion temporizadora
function temporizar(nombre, tiempo) {
  setTimeout(nombre, 1000);
}

// función mostrar baraja
function mostrarBaraja() {
  //version 2
  for (var i = 0; i < naipes.length; i++) {
    var carta = "<div class='carta " + naipes[i].palo + "'>";

    carta += "<span class='fuente'>";
    carta += naipes[i].font;
    carta += "</span>";
    carta += "</div>";

    document.querySelector(".tapete").innerHTML += carta;
  }
}

