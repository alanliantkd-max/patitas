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

    // Paso 1: devuelve el primer dato que cumpla la condición, o null
  buscar(condicion) {
    let actual = this.cabeza;
    while (actual !== null) {
      if (condicion(actual.dato)) {
        return actual.dato;
      }
      actual = actual.siguiente;
    }
    return null;
  }

  // Paso 2: inserta un nodo después del primer nodo que cumpla la condición
  insertarDespuesDe(condicion, dato) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = actual.siguiente; // primero: el nuevo apunta al resto
        actual.siguiente = nuevo;           // luego: el actual apunta al nuevo

        if (actual === this.cola) {
          this.cola = nuevo; // si insertamos después de la cola, hay nueva cola
        }

        this.tamano++;
        return true; // se insertó
      }
      actual = actual.siguiente;
    }

    return false; // no se encontró, no se cambió nada
  }

  // Paso 3: elimina el primer nodo que cumpla la condición y devuelve su dato
  eliminar(condicion) {
    let anterior = null;
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        if (anterior === null) {
          // era la cabeza
          this.cabeza = actual.siguiente;
        } else {
          // estaba en medio o al final
          anterior.siguiente = actual.siguiente;
        }

        if (actual === this.cola) {
          this.cola = anterior; // si era la cola, la nueva cola es el anterior
        }

        this.tamano--;
        return actual.dato;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return null; // no existía, la lista queda igual
  }
}

module.exports = ListaEnlazada;