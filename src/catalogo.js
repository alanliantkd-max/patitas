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

function buscarServicio(categoria, nombre) {
  // 1. Buscar entre los servicios de esta categoría
  for (const servicio of categoria.servicios) {
    if (servicio.nombre === nombre) {
      return servicio; // lo encontré: retorno temprano
    }
  }

  // 2. Si no está aquí, buscar en cada subcategoría
  for (const sub of categoria.subcategorias) {
    const encontrado = buscarServicio(sub, nombre);
    if (encontrado !== null) {
      return encontrado; // si apareció, no sigo con las demás subcategorías
    }
  }

  return null; // no está en esta rama
}

function buscarServicio(categoria, nombre) {
  // 1. Buscar entre los servicios de esta categoría
  for (const servicio of categoria.servicios) {
    if (servicio.nombre === nombre) {
      return servicio; // lo encontré: retorno temprano
    }
  }

  // 2. Si no está aquí, buscar en cada subcategoría
  for (const sub of categoria.subcategorias) {
    const encontrado = buscarServicio(sub, nombre);
    if (encontrado !== null) {
      return encontrado; // si apareció, no sigo con las demás subcategorías
    }
  }

  return null; // no está en esta rama
}

function rutaDeServicio(categoria, nombre) {
  // Caso: el servicio está en esta categoría
  for (const servicio of categoria.servicios) {
    if (servicio.nombre === nombre) {
      return [categoria.nombre, servicio.nombre];
    }
  }

  // Caso: está en alguna subcategoría
  for (const sub of categoria.subcategorias) {
    const ruta = rutaDeServicio(sub, nombre);
    if (ruta !== null) {
      return [categoria.nombre, ...ruta]; // pongo mi nombre al inicio de la ruta
    }
  }

  return null;
}

// Auxiliar recursiva: suma todos los precios, SIN descuento
function sumaServicios(categoria) {
  let total = 0;

  for (const servicio of categoria.servicios) {
    total += servicio.precio;
  }
  for (const sub of categoria.subcategorias) {
    total += sumaServicios(sub);
  }

  return total;
}

// Principal: aplica el 10 % de descuento una sola vez, al final
function precioPaquete(categoria) {
  const total = sumaServicios(categoria);
  return (total * 90) / 100;
}

// Auxiliar recursiva: agrega al arreglo los servicios que estén en el rango
function recolectarEnRango(categoria, min, max, resultado) {
  for (const servicio of categoria.servicios) {
    if (servicio.precio >= min && servicio.precio <= max) {
      resultado.push(servicio);
    }
  }
  for (const sub of categoria.subcategorias) {
    recolectarEnRango(sub, min, max, resultado);
  }
}

// Principal: crea el arreglo y lo devuelve
function serviciosEnRango(categoria, min, max) {
  const resultado = [];
  recolectarEnRango(categoria, min, max, resultado);
  return resultado;
}

module.exports = {
  catalogo,
  contarServicios,
  listarCatalogo,
  profundidad,
  buscarServicio,
  rutaDeServicio,
  precioPaquete,
  serviciosEnRango,
};