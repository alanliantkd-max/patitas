const Pila = require("../src/pila");
const Editor = require("../src/editor");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

// ----- Pruebas de la Pila -----
console.log("Pila");
const pila = new Pila();
verificar("  vacía al inicio", pila.estaVacia(), true);
verificar("  desapilar en pila vacía devuelve null", pila.desapilar(), null);
verificar("  verTope en pila vacía devuelve null", pila.verTope(), null);
pila.apilar(1);
pila.apilar(2);
pila.apilar(3);
verificar("  tamano es 3", pila.tamano(), 3);
verificar("  el tope es 3", pila.verTope(), 3);
verificar("  sale 3 (LIFO)", pila.desapilar(), 3);
verificar("  sale 2", pila.desapilar(), 2);
verificar("  sale 1", pila.desapilar(), 1);
verificar("  vacía al final", pila.estaVacia(), true);

// ----- Ayudas para el Editor -----
function motivos(editor) {
  const historial = editor.registro.obtenerHistorial("Lola");
  return historial === null ? [] : historial.aArreglo().map((a) => a.motivo);
}

function revisarPaso(editor, numero, descripcion, esperado, nDeshacer, nRehacer) {
  console.log(`Paso ${numero}: ${descripcion}`);
  verificar("  historial", motivos(editor), esperado);

  const historial = editor.registro.obtenerHistorial("Lola");
  verificar("  tamano de la lista", historial.obtenerTamano(), esperado.length);
  if (esperado.length > 0) {
    verificar("  cola correcta", historial.cola.dato.motivo, esperado[esperado.length - 1]);
    verificar("  cola.siguiente es null", historial.cola.siguiente, null);
  }
  verificar("  pila deshacer", editor.pilaDeshacer.tamano(), nDeshacer);
  verificar("  pila rehacer", editor.pilaRehacer.tamano(), nRehacer);
}

const es = (letra) => (a) => a.motivo === letra;

// ----- Secuencia de ocho pasos -----
console.log("\nSecuencia: agregar A, agregar B, eliminar A, deshacer, deshacer, rehacer, agregar C, rehacer\n");
const editor = new Editor();

editor.agregar("Lola", { motivo: "A" });
revisarPaso(editor, 1, "agregar A", ["A"], 1, 0);

editor.agregar("Lola", { motivo: "B" });
revisarPaso(editor, 2, "agregar B", ["A", "B"], 2, 0);

editor.eliminar("Lola", es("A"));
revisarPaso(editor, 3, "eliminar A", ["B"], 3, 0);

editor.deshacer();
revisarPaso(editor, 4, "deshacer (vuelve A)", ["A", "B"], 2, 1);

editor.deshacer();
revisarPaso(editor, 5, "deshacer (se quita B)", ["A"], 1, 2);

editor.rehacer();
revisarPaso(editor, 6, "rehacer (vuelve B)", ["A", "B"], 2, 1);

editor.agregar("Lola", { motivo: "C" });
revisarPaso(editor, 7, "agregar C (vacía rehacer)", ["A", "B", "C"], 3, 0);

editor.rehacer();
revisarPaso(editor, 8, "rehacer sin nada que rehacer", ["A", "B", "C"], 3, 0);

// ----- Pilas vacías -----
console.log("\nDeshacer y rehacer con pilas vacías");
const vacio = new Editor();
verificar("  deshacer devuelve false, sin errores", vacio.deshacer(), false);
verificar("  rehacer devuelve false, sin errores", vacio.rehacer(), false);

// ----- Eliminar en cada posición y deshacer -----
console.log("\nEliminar cabeza, medio y cola, y deshacer cada vez");
const e2 = new Editor();
e2.agregar("Lola", { motivo: "A" });
e2.agregar("Lola", { motivo: "B" });
e2.agregar("Lola", { motivo: "C" });

e2.eliminar("Lola", es("B"));
verificar("  eliminar B (medio)", motivos(e2), ["A", "C"]);
e2.deshacer();
verificar("  deshacer: B vuelve a su lugar", motivos(e2), ["A", "B", "C"]);

e2.eliminar("Lola", es("C"));
verificar("  eliminar C (cola)", motivos(e2), ["A", "B"]);
e2.deshacer();
verificar("  deshacer: C vuelve", motivos(e2), ["A", "B", "C"]);
verificar("  la cola es C", e2.registro.obtenerHistorial("Lola").cola.dato.motivo, "C");

e2.eliminar("Lola", es("A"));
verificar("  eliminar A (cabeza)", motivos(e2), ["B", "C"]);
e2.deshacer();
verificar("  deshacer: A vuelve", motivos(e2), ["A", "B", "C"]);