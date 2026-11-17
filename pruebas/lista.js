const ListaEnlazada = require("../src/listaEnlazada");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

// Revisa orden, tamano, cabeza y cola de una lista
function revisar(lista, esperado) {
  verificar("  aArreglo en orden", lista.aArreglo(), esperado);
  verificar("  tamano correcto", lista.tamano, esperado.length);
  verificar("  cabeza correcta", lista.cabeza.dato, esperado[0]);
  verificar("  cola correcta", lista.cola.dato, esperado[esperado.length - 1]);
}

// Lista nueva
const vacia = new ListaEnlazada();
console.log("Lista nueva");
verificar("  estaVacia es true", vacia.estaVacia(), true);
verificar("  tamano es 0", vacia.obtenerTamano(), 0);

// Caso 1: agregarAlFinal en lista vacía
console.log("Caso 1: agregarAlFinal en lista vacía");
let lista = new ListaEnlazada();
lista.agregarAlFinal("A");
revisar(lista, ["A"]);
verificar("  cabeza y cola son el mismo nodo", lista.cabeza === lista.cola, true);

// Caso 2: agregarAlFinal con un nodo
console.log("Caso 2: agregarAlFinal con un nodo");
lista = new ListaEnlazada();
lista.agregarAlFinal("A");
lista.agregarAlFinal("B");
revisar(lista, ["A", "B"]);

// Caso 3: agregarAlFinal con varios nodos
console.log("Caso 3: agregarAlFinal con varios nodos");
lista = new ListaEnlazada();
lista.agregarAlFinal("A");
lista.agregarAlFinal("B");
lista.agregarAlFinal("C");
lista.agregarAlFinal("D");
revisar(lista, ["A", "B", "C", "D"]);

// Caso 4: agregarAlInicio en lista vacía
console.log("Caso 4: agregarAlInicio en lista vacía");
lista = new ListaEnlazada();
lista.agregarAlInicio("A");
revisar(lista, ["A"]);
verificar("  cabeza y cola son el mismo nodo", lista.cabeza === lista.cola, true);

// Caso 5: agregarAlInicio con un nodo
console.log("Caso 5: agregarAlInicio con un nodo");
lista = new ListaEnlazada();
lista.agregarAlInicio("A");
lista.agregarAlInicio("B");
revisar(lista, ["B", "A"]);

// Caso 6: agregarAlInicio con varios nodos
console.log("Caso 6: agregarAlInicio con varios nodos");
lista = new ListaEnlazada();
lista.agregarAlInicio("C");
lista.agregarAlInicio("B");
lista.agregarAlInicio("A");
lista.agregarAlInicio("X");
revisar(lista, ["X", "A", "B", "C"]);
verificar("  estaVacia es false", lista.estaVacia(), false);