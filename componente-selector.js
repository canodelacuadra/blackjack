//funcion crear un selector  para que as
// pueda valer o 1 0 11
// debe aparecer cuando el as sale en la mano
// debe aparecer en la botonera del jugador
//aqui agregariamos el conmutador sólo si es el jugador
if (cartaDada.numero === "AS" && nombre === "jugador") {
  soporte.appendChild(crearConmutador());
}
//creamos la interface
function crearConmutador() {
  var div = document.createElement("div");
  div.classList.add("conmutador");
  var label1 = document.createElement("label");
  label1.textContent = 1;
  var span = document.createElement("span");
  span.classList.add("switch-bg");
  var button = document.createElement("button");
  button.id = cartaDada.font;
  button.type = "button";
  button.value = cartaDada.value;
  button.classList.add("switch", "on");
  button.click = conmutar();
  span.appendChild(button);
  var label11 = document.createElement("label");
  label11.textContent = 11;
  div.appendChild(label1);
  div.appendChild(span);
  div.appendChild(label11);
  return div;
}
function conmutar() {
  if (cartaDada.valor === 11) {
    console.log(cartaDada.valor);

    cartaDada.valor = 1;
    this.value = 1;
    console.log(cartaDada.valor);
    this.className = "switch";
    display.mostrarInfo("El AS ahora vale: " + this.value);
  } else {
    this.value = 11;
    cartaDada.valor = 11;
    conmutador.className = "switch on";
    display.mostrarInfo("El AS ahora vale: " + this.value);
  }
}
