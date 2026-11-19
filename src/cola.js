const Nodo = require("./nodo.js");

class Cola {
  constructor() {
    this.frente = null; // el primero en la fila (el próximo en salir)
    this.final = null;  // el último en la fila
    this.cantidad = 0;
  }

  // Agrega al final de la fila. Sin ciclos: O(1)
  encolar(dato) {
    const nuevo = new Nodo(dato);

    if (this.final === null) {
      // cola vacía: el nuevo es frente y final a la vez
      this.frente = nuevo;
      this.final = nuevo;
    } else {
      this.final.siguiente = nuevo; // el último actual apunta al nuevo
      this.final = nuevo;           // el nuevo pasa a ser el final
    }

    this.cantidad++;
  }

  // Saca al primero de la fila y lo devuelve. Sin ciclos: O(1)
  desencolar() {
    if (this.frente === null) {
      return null; // cola vacía: sin errores
    }

    const dato = this.frente.dato;
    this.frente = this.frente.siguiente; // el frente avanza al siguiente

    if (this.frente === null) {
      this.final = null; // si quedó vacía, final también debe ser null
    }

    this.cantidad--;
    return dato;
  }

  // Mira quién va primero sin sacarlo
  verFrente() {
    if (this.frente === null) {
      return null;
    }
    return this.frente.dato;
  }

  estaVacia() {
    return this.cantidad === 0;
  }

  tamano() {
    return this.cantidad;
  }
}

module.exports = Cola;