const Recepcion = require("./recepcion");
const Editor = require("./editor");

const DURACION = 20; // minutos por atención

function aMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function aHora(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

const llegadas = [
  { mascota: "Toby", tipo: "General", motivo: "Control de vacunas", llegada: aMinutos("8:00") },
  { mascota: "Max", tipo: "General", motivo: "Revisión de piel", llegada: aMinutos("8:05") },
  { mascota: "Luna", tipo: "Urgencia", motivo: "Intoxicación", llegada: aMinutos("8:10") },
  { mascota: "Simón", tipo: "General", motivo: "Corte de uñas", llegada: aMinutos("8:20") },
  { mascota: "Kira", tipo: "Urgencia", motivo: "Herida en pata", llegada: aMinutos("8:25") },
  { mascota: "Nala", tipo: "General", motivo: "Desparasitación", llegada: aMinutos("8:40") },
  { mascota: "Rocky", tipo: "Urgencia", motivo: "Dificultad para respirar", llegada: aMinutos("9:00") },
];

const recepcion = new Recepcion();
const editor = new Editor(); // NUEVO: guarda los historiales y permite deshacer
const atendidas = [];

// NUEVO (paso 4): llamar al siguiente avisa si la sala está vacía
function llamarConAviso() {
  const turno = recepcion.llamarSiguiente();
  if (turno === null) {
    console.log("Aviso: no hay mascotas esperando, la sala está vacía.");
  }
  return turno;
}

console.log("===== SIMULACIÓN DE LA MAÑANA =====\n");

let tiempo = aMinutos("8:00");
let i = 0;

while (i < llegadas.length || recepcion.hayEspera()) {
  // Registrar a todos los que ya llegaron
  while (i < llegadas.length && llegadas[i].llegada <= tiempo) {
    recepcion.registrarLlegada(llegadas[i]);
    i++;
  }

  const turno = recepcion.llamarSiguiente();

  if (turno === null) {
    // Consultorio libre y nadie esperando: saltar a la próxima llegada
    tiempo = llegadas[i].llegada;
  } else {
    const inicio = tiempo;
    const fin = inicio + DURACION;
    const espera = inicio - turno.llegada;

    atendidas.push({ mascota: turno.mascota, tipo: turno.tipo, llegada: turno.llegada, inicio, fin, espera });

    // NUEVO (paso 1): la atención terminada se registra en el historial
    const atencion = { motivo: turno.motivo, tipo: turno.tipo, inicio, fin, espera };

    // NUEVO (paso 2): error simulado. Al atender a Kira, la recepcionista
    // se equivoca y la registra en el historial de Nala.
    const mascotaIngresada = turno.mascota === "Kira" ? "Nala" : turno.mascota;
    editor.agregar(mascotaIngresada, atencion);

    if (mascotaIngresada !== turno.mascota) {
      console.log(`⚠ Error detectado: la atención de ${turno.mascota} se registró en ${mascotaIngresada}`);
      editor.deshacer();
      console.log("  Corregido con deshacer");
      editor.agregar(turno.mascota, atencion);
      console.log(`  Atención registrada correctamente en ${turno.mascota}\n`);
    }

    tiempo = fin;
  }
}

// ----- Reporte de atención (paso 3) -----
console.log("----- Orden, horas y esperas -----");
console.log("Orden | Mascota | Tipo     | Llegada | Inicio | Fin   | Espera");
atendidas.forEach((a, n) => {
  console.log(
    `${n + 1}     | ${a.mascota.padEnd(7)} | ${a.tipo.padEnd(8)} | ${aHora(a.llegada).padEnd(7)} | ${aHora(a.inicio).padEnd(6)} | ${aHora(a.fin).padEnd(5)} | ${a.espera} min`
  );
});

function promedio(lista) {
  let suma = 0;
  for (const a of lista) suma += a.espera;
  return lista.length === 0 ? 0 : suma / lista.length;
}

console.log(`\nEspera promedio urgencias: ${promedio(atendidas.filter((a) => a.tipo === "Urgencia")).toFixed(2)} min`);
console.log(`Espera promedio generales: ${promedio(atendidas.filter((a) => a.tipo === "General")).toFixed(2)} min`);

// ----- Historiales actualizados (paso 3) -----
console.log("\n----- Historial de cada mascota -----");
for (const l of llegadas) {
  const historial = editor.registro.obtenerHistorial(l.mascota);
  console.log(`${l.mascota} (${historial.obtenerTamano()} atención)`);
  historial.recorrer((a) => {
    console.log(`  ${aHora(a.inicio)}-${aHora(a.fin)} | ${a.motivo} | ${a.tipo} | espera ${a.espera} min`);
  });
}

// ----- Verificaciones -----
console.log("\n----- Verificaciones -----");

const ordenEsperado = ["Toby", "Luna", "Kira", "Rocky", "Max", "Simón", "Nala"];
const ordenObtenido = atendidas.map((a) => a.mascota);
console.log(`${JSON.stringify(ordenEsperado) === JSON.stringify(ordenObtenido) ? "✔" : "✘"} El orden coincide con el cálculo manual`);

const todasEnSuHistorial = llegadas.every((l) => {
  const h = editor.registro.obtenerHistorial(l.mascota);
  return h !== null && h.obtenerTamano() === 1 && h.cabeza.dato.motivo === l.motivo;
});
console.log(`${todasEnSuHistorial ? "✔" : "✘"} Las siete atenciones quedaron en el historial correcto`);

console.log(`${editor.pilaRehacer.estaVacia() ? "✔" : "✘"} La pila de rehacer quedó vacía (acción nueva tras deshacer)`);

// ----- Sala vacía (paso 4) -----
console.log("\n----- Llamar al siguiente con la sala vacía -----");
const nadie = llamarConAviso();
console.log(`${nadie === null ? "✔" : "✘"} Devolvió null, sin errores`);