const Cola = require("./cola");

class Recepcion {
  constructor() {
    this.urgencias = new Cola();
    this.generales = new Cola();
  }

  // Cada mascota va a la cola que le corresponde según su tipo
  registrarLlegada(turno) {
    if (turno.tipo === "Urgencia") {
      this.urgencias.encolar(turno);
    } else {
      this.generales.encolar(turno);
    }
  }

  // Primero urgencias; si no hay, generales; si no hay nadie, null
  llamarSiguiente() {
    if (!this.urgencias.estaVacia()) {
      return this.urgencias.desencolar();
    }
    return this.generales.desencolar(); // devuelve null si también está vacía
  }

  hayEspera() {
    return !this.urgencias.estaVacia() || !this.generales.estaVacia();
  }
}

module.exports = Recepcion;