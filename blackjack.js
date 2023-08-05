function Blackjack() {
  var baraja = {
    naipes: desordenarArray(naipes),
    naipesBarajados: naipes.slice(0, naipes.length),
  };

  /// Objeto Jugador
  var jugador = {
    nombre: "jugador",
    mano: [],
    getMano: function () {
      return this.mano;
    },
    setMano: function (cartaDada) {
      this.mano.push(cartaDada);
    },
    sumarMano: function () {
      var suma = 0;
      for (var i = 0; i < this.mano.length; i++) {
        suma += this.mano[i].valor;
      }
      marcadores.mostrarResultadoJug(suma);
      return suma;
    },
    pedirCarta: function () {
      croupier.darCarta(jugador);
      jugador.sumarMano();
      display.mostrarInfo("La carta se ha repartido");
      reglas.pasarse();
    },
    plantarse() {
      btnPedir.style.opacity = 0;
      btnPlantar.style.opacity = 0;
      display.mostrarInfo("el jugador se planta, el croupier juega");
      croupier.jugar();
    },
  };
  /// Objeto Croupier con su propio literal

  var croupier = {
    nombre: "croupier",
    mano: [],
    getMano: function () {
      return this.mano;
    },
    setMano: function (cartaDada) {
      this.mano.push(cartaDada);
    },
    sumarMano: function () {
      var suma = 0;
      for (var i = 0; i < this.mano.length; i++) {
        suma += this.mano[i].valor;
      }
      // agregamos el valor en el contador

      marcadores.mostrarResultadoCrup(suma);
      return suma;
    },
    pedirCarta: function () {
      //pedir 16 y plantase con 17
      croupier.darCarta(croupier);
      croupier.sumarMano();
      display.mostrarInfo("La carta se ha repartido al croupier");
      reglas.pasarse();
    },
    darCarta: function (player) {
      // el parámetro player es para especificar a quién da la carta o al croupier o al jugador
      var cartaDada = baraja.naipesBarajados.shift();
      player.setMano(cartaDada);
      carta.mostrarCarta(cartaDada, player["nombre"]);
      return cartaDada;
    },
    plantarse: function () {
      // if mano es > 16
      display.mostrarInfo("El croupier se planta!");
      reglas.compararPuntos();
    },
    jugar: function () {
      //El croupier debe pedir con 16 y plantase con 17
      while (croupier.sumarMano() < 17) {
        croupier.pedirCarta(croupier);
      }
      if (croupier.sumarMano() > 16 && croupier.sumarMano() < 22) {
        croupier.plantarse();
      }
    },
  };
  ////Objetos de la vista que muestran datos.
  var marcadores = {
    mostrarResultadoJug: function (sumarMano) {
      marcJugador.textContent = sumarMano;
    },
    mostrarResultadoCrup: function (sumarMano) {
      marcCroupier.textContent = sumarMano;
    },
  };
  var carta = {
    mostrarCarta: function (cartaDada, nombre) {
      var soporte = document.createElement("div");
      soporte.classList.add("carta");
      var figura = document.createElement("span");
      figura.classList.add("animacion", "fuente", cartaDada.palo);
      figura.textContent = cartaDada.font;
      soporte.appendChild(figura);
      //agregamos la carta a su tablero correspondiente
      document.querySelector(".tabl-" + nombre).appendChild(soporte);
    },
  };

  /// Accesos e interface DOM

  // marcadores
  var marcJugador = document.querySelector(".marc-jugador");
  var marcCroupier = document.querySelector(".marc-croupier");
  // mostrar info por display.
  var display = {
    mostrarInfo: function (mensaje) {
      document.querySelector(".display").textContent = mensaje;
    },
  };
  // boton inicio
  var btnIniciar = document.getElementById("iniciar");
  btnIniciar.addEventListener("click", inicioJuego);
  //boton pedir
  var btnPedir = document.getElementById("pedirCarta");
  btnPedir.addEventListener("click", jugador.pedirCarta);
  btnPedir.style.opacity = 0;
  //boton plantarse
  var btnPlantar = document.getElementById("plantarse");
  btnPlantar.addEventListener("click", jugador.plantarse);
  btnPlantar.style.opacity = 0;

  function newFunction() {
    return crearConmutador();
  }

  function resetear() {
    jugador.mano = [];
    jugador.sumarMano();
    croupier.mano = [];
    croupier.sumarMano();

    const tabljug = document.querySelector(".tabl-jugador");
    while (tabljug.firstChild) {
      tabljug.firstChild.remove();
    }
    const tablcroup = document.querySelector(".tabl-croupier");
    while (tablcroup.firstChild) {
      tablcroup.firstChild.remove();
    }
    btnPedir.style.opacity = 0;
    btnPlantar.style.opacity = 0;
    marcJugador.style.color = "black";
    marcCroupier.style.color = "black";
  }

  /// desarrollo del juego
  function inicioJuego() {
    // limpiamos la mesa anterior si la hubiera, reiniciamos el dom
    resetear();
    // empaezamos
    baraja.naipes;
    display.mostrarInfo("Se reparten las cartas iniciales ");
    croupier.darCarta(jugador);
    croupier.darCarta(jugador);
    jugador.sumarMano();
    setTimeout(() => {
      croupier.darCarta(croupier);
      croupier.sumarMano();
      display.mostrarInfo("Se reparte el croupier la carta ");
    }, 3000);
    setTimeout(() => {
      btnIniciar.style.opacity = 0;
      btnPedir.style.opacity = 1;
      btnPlantar.style.opacity = 1;
    }, 4000);
  }
  //// pasarse
  var reglas = {
    pasarse: function () {
      if (jugador.sumarMano() > 21) {
        display.mostrarInfo("has perdido, te has pasado");
        marcJugador.style.color = "red";
        btnPedir.style.opacity = 0;
        btnPlantar.style.opacity = 0;
        // botón otra partida
        setTimeout(() => {
          document.querySelector("#iniciar").style.opacity = 1;
        }, 3000);
      }
      if (croupier.sumarMano() > 21) {
        display.mostrarInfo("has ganado, la banca se ha pasado");
        marcCroupier.style.color = "red";
        marcJugador.style.color = "green";
        // botón otra partida
        setTimeout(() => {
          document.querySelector("#iniciar").style.opacity = 1;
        }, 3000);
      }
    },
    compararPuntos: function () {
      if (jugador.sumarMano() > croupier.sumarMano()) {
        display.mostrarInfo("el Jugador Gana");
      } else {
        if (jugador.sumarMano() < croupier.sumarMano()) {
          display.mostrarInfo("La banca Gana");
        } else {
          display.mostrarInfo("Habéis empatado amigos");
        }
      }
      // botón otra partida
      setTimeout(() => {
        document.querySelector("#iniciar").style.opacity = 1;
      }, 3000);
      //
    },
  };
}
Blackjack();
/* //document
        .getElementById("btnPedCart")
  .addEventListener("click", jugador.pedirCarta()); */
