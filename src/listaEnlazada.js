const Nodo = require("./nodo.js");

class ListaEnlazada {
  constructor() {
    this.cabeza = null; // primer nodo
    this.cola = null;   // último nodo
    this.tamano = 0;    // cuántos nodos hay
  }

  agregarAlFinal(dato) {
    const nuevo = new Nodo(dato);

    if (this.cabeza === null) {
      // lista vacía: el nuevo es cabeza y cola a la vez
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola.siguiente = nuevo; // el último actual apunta al nuevo
      this.cola = nuevo;           // el nuevo pasa a ser la cola
    }

    this.tamano++;
  }

  agregarAlInicio(dato) {
    const nuevo = new Nodo(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.siguiente = this.cabeza; // el nuevo apunta a la antigua cabeza
      this.cabeza = nuevo;           // el nuevo pasa a ser la cabeza
    }

    this.tamano++;
  }

  // Paso 4: ejecuta una función por cada dato
  recorrer(callback) {
    let actual = this.cabeza;
    while (actual !== null) {
      callback(actual.dato);
      actual = actual.siguiente;
    }
  }

  // Devuelve los datos en un arreglo (para las pruebas)
  aArreglo() {
    const resultado = [];
    this.recorrer((dato) => resultado.push(dato));
    return resultado;
  }

  // Paso 5
  estaVacia() {
    return this.tamano === 0;
  }

  obtenerTamano() {
    return this.tamano;
  }
}

module.exports = ListaEnlazada;