const {
  catalogo,
  buscarServicio,
  rutaDeServicio,
  precioPaquete,
  serviciosEnRango,
} = require("../src/catalogo.js");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

const cirugias = catalogo.subcategorias[1];
const vacia = { nombre: "Vacía", servicios: [], subcategorias: [] };

console.log("buscarServicio");
verificar("  primer nivel (Rabia)", buscarServicio(catalogo, "Rabia").precio, 45000);
verificar("  nivel más profundo (Dermatología)", buscarServicio(catalogo, "Dermatología").precio, 110000);
verificar("  inexistente (Peluquería)", buscarServicio(catalogo, "Peluquería"), null);
verificar("  categoría vacía", buscarServicio(vacia, "Gata"), null);

console.log("rutaDeServicio");
verificar("  Gata", rutaDeServicio(catalogo, "Gata"), ["Patitas", "Cirugías", "Esterilización", "Gata"]);
verificar("  Rabia (primer nivel)", rutaDeServicio(catalogo, "Rabia"), ["Patitas", "Vacunas", "Rabia"]);
verificar("  Dermatología (profundo)", rutaDeServicio(catalogo, "Dermatología"), ["Patitas", "Consultas", "Especializada", "Dermatología"]);
verificar("  Peluquería", rutaDeServicio(catalogo, "Peluquería"), null);
verificar("  categoría vacía", rutaDeServicio(vacia, "Gata"), null);

console.log("precioPaquete");
verificar("  Cirugías con 10 % de descuento", precioPaquete(cirugias), 702000);
verificar("  categoría vacía", precioPaquete(vacia), 0);

console.log("serviciosEnRango");
const enRango = serviciosEnRango(catalogo, 80000, 150000).map((s) => s.nombre);
verificar("  entre 80.000 y 150.000", enRango, [
  "Consulta a domicilio",
  "Dermatología",
  "Cardiología",
  "Con anestesia",
  "Triple felina",
]);
verificar("  cantidad", enRango.length, 5);
verificar("  rango sin resultados", serviciosEnRango(catalogo, 1, 10), []);
verificar("  categoría vacía", serviciosEnRango(vacia, 0, 999999), []);