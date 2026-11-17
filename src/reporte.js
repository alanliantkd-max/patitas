const RegistroClinico = require("./registroClinico");

const registro = new RegistroClinico();

// Datos de la tabla del enunciado
registro.registrarAtencion("Lola", { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });
registro.registrarAtencion("Lola", { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 });
registro.registrarAtencion("Lola", { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });

registro.registrarAtencion("Toby", { fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 });
registro.registrarAtencion("Toby", { fecha: "12/07", motivo: "Radiografía de pata", veterinario: "Dra. Ríos", costo: 120000 });
registro.registrarAtencion("Toby", { fecha: "05/09", motivo: "Vacunación", veterinario: "Dra. Ríos", costo: 85000 });

registro.registrarAtencion("Mía", { fecha: "18/02", motivo: "Esterilización", veterinario: "Dr. Gómez", costo: 280000 });
registro.registrarAtencion("Mía", { fecha: "25/03", motivo: "Control posoperatorio", veterinario: "Dra. Ríos", costo: 0 });

// Formatea 275000 como $275.000
function dinero(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

console.log("===== REPORTE DE HISTORIALES - PATITAS =====\n");

let totalClinica = 0;

for (const nombre of registro.nombres()) {
  const historial = registro.obtenerHistorial(nombre);
  const total = registro.costoTotal(nombre);
  totalClinica += total;

  console.log(`${nombre} (${historial.obtenerTamano()} atenciones)`);
  historial.recorrer((a) => {
    console.log(`  ${a.fecha} - ${a.motivo} - ${a.veterinario} - ${dinero(a.costo)}`);
  });
  console.log(`  Costo total de ${nombre}: ${dinero(total)}\n`);
}

console.log(`Total de la clínica: ${dinero(totalClinica)}`);