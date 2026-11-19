const Recepcion = require("./recepcion");

const DURACION = 20; // minutos por atención

// "8:05" -> 485 (minutos desde la medianoche)
function aMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

// 485 -> "8:05"
function aHora(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

// Datos del enunciado
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
const atendidas = [];

let tiempo = aMinutos("8:00"); // reloj de la simulación
let i = 0;                     // próxima llegada por registrar

while (i < llegadas.length || recepcion.hayEspera()) {
  // 1. Registrar a todos los que ya llegaron
  while (i < llegadas.length && llegadas[i].llegada <= tiempo) {
    recepcion.registrarLlegada(llegadas[i]);
    i++;
  }

  // 2. Llamar al siguiente
  const turno = recepcion.llamarSiguiente();

  if (turno === null) {
    // Consultorio libre y nadie esperando: saltar a la próxima llegada
    tiempo = llegadas[i].llegada;
  } else {
    const inicio = tiempo;
    const fin = inicio + DURACION;
    atendidas.push({ ...turno, inicio, fin, espera: inicio - turno.llegada });
    tiempo = fin;
  }
}

// ----- Reporte -----
console.log("===== REPORTE DE LA MAÑANA =====\n");
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

const soloUrgencias = atendidas.filter((a) => a.tipo === "Urgencia");
const soloGenerales = atendidas.filter((a) => a.tipo === "General");

console.log(`\nEspera promedio urgencias: ${promedio(soloUrgencias).toFixed(2)} min`);
console.log(`Espera promedio generales: ${promedio(soloGenerales).toFixed(2)} min`);

// ----- Comparación con el cálculo manual -----
const ordenEsperado = ["Toby", "Luna", "Kira", "Rocky", "Max", "Simón", "Nala"];
const ordenObtenido = atendidas.map((a) => a.mascota);
const coincide = JSON.stringify(ordenEsperado) === JSON.stringify(ordenObtenido);
console.log(`\n${coincide ? "✔" : "✘"} El orden coincide con el cálculo manual`);

const nadieAntes = atendidas.every((a) => a.inicio >= a.llegada);
console.log(`${nadieAntes ? "✔" : "✘"} Nadie fue atendido antes de su hora de llegada`);