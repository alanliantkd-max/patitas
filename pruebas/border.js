const ListaEnlazada = require("../src/listaEnlazada.js");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

// Revisa arreglo, tamano, cabeza y cola. Si esperado está vacío, cabeza y cola deben ser null
function revisar(lista, esperado) {
  verificar("  orden correcto", lista.aArreglo(), esperado);
  verificar("  tamano correcto", lista.tamano, esperado.length);
  if (esperado.length === 0) {
    verificar("  cabeza es null", lista.cabeza, null);
    verificar("  cola es null", lista.cola, null);
  } else {
    verificar("  cabeza correcta", lista.cabeza.dato, esperado[0]);
    verificar("  cola correcta", lista.cola.dato, esperado[esperado.length - 1]);
    verificar("  cola.siguiente es null", lista.cola.siguiente, null);
  }
}

// Crea una lista con A, B, C
function crearLista() {
  const lista = new ListaEnlazada();
  lista.agregarAlFinal("A");
  lista.agregarAlFinal("B");
  lista.agregarAlFinal("C");
  return lista;
}

const es = (x) => (dato) => dato === x;

// Prueba 1: eliminar en lista vacía
console.log("Prueba 1: eliminar en lista vacía");
let lista = new ListaEnlazada();
verificar("  devuelve null", lista.eliminar(es("A")), null);
revisar(lista, []);

// Prueba 2: eliminar el único nodo
console.log("Prueba 2: eliminar el único nodo");
lista = new ListaEnlazada();
lista.agregarAlFinal("A");
verificar("  devuelve A", lista.eliminar(es("A")), "A");
revisar(lista, []);

// Prueba 3: eliminar la cabeza
console.log("Prueba 3: eliminar la cabeza");
lista = crearLista();
verificar("  devuelve A", lista.eliminar(es("A")), "A");
revisar(lista, ["B", "C"]);

// Prueba 4: eliminar la cola
console.log("Prueba 4: eliminar la cola");
lista = crearLista();
verificar("  devuelve C", lista.eliminar(es("C")), "C");
revisar(lista, ["A", "B"]);

// Prueba 5: eliminar algo que no existe
console.log("Prueba 5: eliminar algo que no existe");
lista = crearLista();
verificar("  devuelve null", lista.eliminar(es("Z")), null);
revisar(lista, ["A", "B", "C"]);

// Prueba 6: insertar después de la cola
console.log("Prueba 6: insertar después de la cola");
lista = crearLista();
lista.insertarDespuesDe(es("C"), "D");
revisar(lista, ["A", "B", "C", "D"]);

// Extras: nodo intermedio, insertar en medio y buscar
console.log("Extra: eliminar un nodo intermedio");
lista = crearLista();
verificar("  devuelve B", lista.eliminar(es("B")), "B");
revisar(lista, ["A", "C"]);

console.log("Extra: insertar en medio");
lista = crearLista();
lista.insertarDespuesDe(es("A"), "X");
revisar(lista, ["A", "X", "B", "C"]);

console.log("Extra: insertar después de algo que no existe");
lista = crearLista();
verificar("  devuelve false", lista.insertarDespuesDe(es("Z"), "X"), false);
revisar(lista, ["A", "B", "C"]);

console.log("Extra: buscar");
lista = crearLista();
verificar("  encuentra B", lista.buscar(es("B")), "B");
verificar("  no encuentra Z", lista.buscar(es("Z")), null);