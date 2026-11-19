const Nodo = require("./nodo.js");

class Pila {
  constructor() {
    this.tope = null; // el último que entró
    this.cantidad = 0;
  }

  // Pone un dato encima de la pila. O(1)
  apilar(dato) {
    const nuevo = new Nodo(dato);
    nuevo.siguiente = this.tope; // el nuevo apunta al antiguo tope
    this.tope = nuevo;           // el nuevo pasa a ser el tope
    this.cantidad++;
  }

  // Saca el dato de arriba y lo devuelve. O(1)
  desapilar() {
    if (this.tope === null) {
      return null; // pila vacía: sin errores
    }
    const dato = this.tope.dato;
    this.tope = this.tope.siguiente; // el tope baja un nodo
    this.cantidad--;
    return dato;
  }

  // Mira el tope sin sacarlo. O(1)
  verTope() {
    if (this.tope === null) {
      return null;
    }
    return this.tope.dato;
  }

  estaVacia() {
    return this.cantidad === 0;
  }

  tamano() {
    return this.cantidad;
  }
}

module.exports = Pila;