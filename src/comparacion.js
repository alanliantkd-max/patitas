const Cola = require("../src/cola");

const N = 100000;

// ----- Cola con nodos -----
const cola = new Cola();

console.time("Cola: encolar 100.000");
for (let i = 0; i < N; i++) {
  cola.encolar(i);
}
console.timeEnd("Cola: encolar 100.000");

console.time("Cola: desencolar 100.000");
for (let i = 0; i < N; i++) {
  cola.desencolar();
}
console.timeEnd("Cola: desencolar 100.000");

// ----- Arreglo con push y shift -----
const arreglo = [];

console.time("Arreglo: push 100.000");
for (let i = 0; i < N; i++) {
  arreglo.push(i);
}
console.timeEnd("Arreglo: push 100.000");

console.time("Arreglo: shift 100.000");
for (let i = 0; i < N; i++) {
  arreglo.shift();
}
console.timeEnd("Arreglo: shift 100.000");