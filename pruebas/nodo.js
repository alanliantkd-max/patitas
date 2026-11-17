const Nodo = require("../src/nodo.js");

// Paso 3: las tres atenciones de Lola (cada una es un objeto)
const atencion1 = { fecha: "02/02", motivo: "Vacunación", veterinario: "Dra. Ríos", costo: 85000 };
const atencion2 = { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 };
const atencion3 = { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 };

// Cada atención va dentro de un nodo
const nodo1 = new Nodo(atencion1);
const nodo2 = new Nodo(atencion2);
const nodo3 = new Nodo(atencion3);

// Paso 4: enlazar en orden cronológico
nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;

// La cabeza es el primer nodo
const cabeza = nodo1;

// Paso 5a: recorrer e imprimir cada atención
console.log("Historial de Lola:");
let actual = cabeza;
while (actual !== null) {
  const a = actual.dato;
  console.log(`${a.fecha} - ${a.motivo} - ${a.veterinario} - $${a.costo.toLocaleString("es-CO")}`);
  actual = actual.siguiente; // avanzar al siguiente nodo
}

// Paso 5b: segundo recorrido para sumar los costos
let total = 0;
actual = cabeza; // volvemos al inicio
while (actual !== null) {
  total += actual.dato.costo;
  actual = actual.siguiente;
}

console.log(`Costo total: $${total.toLocaleString("es-CO")}`);