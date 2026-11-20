const catalogo = {
  nombre: "Patitas",
  servicios: [],
  subcategorias: [
    {
      nombre: "Consultas",
      servicios: [
        { nombre: "Consulta general", precio: 60000 },
        { nombre: "Consulta a domicilio", precio: 90000 },
      ],
      subcategorias: [
        {
          nombre: "Especializada",
          servicios: [
            { nombre: "Dermatología", precio: 110000 },
            { nombre: "Cardiología", precio: 130000 },
          ],
          subcategorias: [],
        },
      ],
    },
    {
      nombre: "Cirugías",
      servicios: [],
      subcategorias: [
        {
          nombre: "Esterilización",
          servicios: [
            { nombre: "Gata", precio: 280000 },
            { nombre: "Perra", precio: 350000 },
          ],
          subcategorias: [],
        },
        {
          nombre: "Limpieza dental",
          servicios: [{ nombre: "Con anestesia", precio: 150000 }],
          subcategorias: [],
        },
      ],
    },
    {
      nombre: "Vacunas",
      servicios: [
        { nombre: "Rabia", precio: 45000 },
        { nombre: "Triple felina", precio: 85000 },
      ],
      subcategorias: [],
    },
  ],
};

function contarServicios(categoria) {
  let total = categoria.servicios.length; // servicios de esta categoría

  for (const sub of categoria.subcategorias) {
    total += contarServicios(sub); // más lo que cuenta cada subcategoría
  }

  return total;
}

function dinero(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

function listarCatalogo(categoria, nivel = 0) {
  const sangria = " ".repeat(nivel * 2);

  console.log(sangria + categoria.nombre);

  for (const servicio of categoria.servicios) {
    console.log(sangria + "  - " + servicio.nombre + ": " + dinero(servicio.precio));
  }

  for (const sub of categoria.subcategorias) {
    listarCatalogo(sub, nivel + 1); // un nivel más profundo, más sangría
  }
}

function profundidad(categoria) {
  let masProfunda = 0;

  for (const sub of categoria.subcategorias) {
    const p = profundidad(sub);
    if (p > masProfunda) {
      masProfunda = p; // me quedo con la rama más profunda
    }
  }

  return 1 + masProfunda; // 1 por este nivel
}

module.exports = { catalogo, contarServicios, listarCatalogo, profundidad };