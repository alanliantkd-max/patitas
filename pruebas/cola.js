const Cola = require("../src/cola");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

const turnos = [
  { mascota: "Lola", tutor: "Ana Pérez", horaLlegada: "08:00", motivo: "Vacunación" },
  { mascota: "Toby", tutor: "Luis Gómez", horaLlegada: "08:10", motivo: "Cojera" },
  { mascota: "Mía", tutor: "Sara Ruiz", horaLlegada: "08:20", motivo: "Control" },
  { mascota: "Rex", tutor: "Juan Díaz", horaLlegada: "08:30", motivo: "Limpieza dental" },
  { mascota: "Nala", tutor: "Eva Mora", horaLlegada: "08:40", motivo: "Revisión" },
];

const cola = new Cola();

console.log("Cola nueva");
verificar("  estaVacia es true", cola.estaVacia(), true);
verificar("  desencolar en cola vacía devuelve null", cola.desencolar(), null);
verificar("  verFrente en cola vacía devuelve null", cola.verFrente(), null);

console.log("Encolar los cinco turnos");
for (const turno of turnos) {
  cola.encolar(turno);
}
verificar("  tamano es 5", cola.tamano(), 5);
verificar("  frente es Lola", cola.verFrente().mascota, "Lola");

console.log("Desencolar: salen en el orden en que llegaron");
const ordenSalida = [];
while (!cola.estaVacia()) {
  ordenSalida.push(cola.desencolar().mascota);
}
verificar("  orden de salida", ordenSalida, ["Lola", "Toby", "Mía", "Rex", "Nala"]);

console.log("Cola vacía después de sacar todos");
verificar("  desencolar devuelve null", cola.desencolar(), null);
verificar("  frente es null", cola.frente, null);
verificar("  final es null", cola.final, null);
verificar("  tamano es 0", cola.tamano(), 0);

console.log("La cola sigue funcionando después de vaciarse");
cola.encolar(turnos[0]);
verificar("  frente es Lola", cola.verFrente().mascota, "Lola");
verificar("  final es Lola", cola.final.dato.mascota, "Lola");