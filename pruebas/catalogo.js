const { catalogo, contarServicios, listarCatalogo, profundidad } = require("../src/catalogo.js");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

console.log("===== Catálogo original =====");
listarCatalogo(catalogo);
verificar("contarServicios del catálogo", contarServicios(catalogo), 9);
verificar("profundidad del catálogo", profundidad(catalogo), 3);

// Ramas por separado
const consultas = catalogo.subcategorias[0];
const cirugias = catalogo.subcategorias[1];
verificar("contarServicios de Consultas", contarServicios(consultas), 4);
verificar("contarServicios de Cirugías", contarServicios(cirugias), 3);

// Paso 6: nueva subcategoría dentro de "Especializada"
const especializada = consultas.subcategorias[0];
especializada.subcategorias.push({
  nombre: "Oftalmología",
  servicios: [{ nombre: "Examen de la vista", precio: 95000 }],
  subcategorias: [],
});

console.log("\n===== Catálogo con Oftalmología =====");
listarCatalogo(catalogo);
verificar("contarServicios ahora es 10", contarServicios(catalogo), 10);
verificar("profundidad ahora es 4", profundidad(catalogo), 4);