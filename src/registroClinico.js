const ListaEnlazada = require("./listaEnlazada");

class RegistroClinico {
  constructor() {
    this.historiales = new Map(); // nombre de mascota -> ListaEnlazada
  }

  // Paso 2: crea el historial si no existe y agrega la atención al final
  registrarAtencion(mascota, atencion) {
    if (!this.historiales.has(mascota)) {
      this.historiales.set(mascota, new ListaEnlazada());
    }
    this.historiales.get(mascota).agregarAlFinal(atencion);
  }

  // Devuelve la lista de una mascota, o null si no existe
  obtenerHistorial(mascota) {
    return this.historiales.get(mascota) || null;
  }

  // Suma los costos de una mascota usando recorrer (callback)
  costoTotal(mascota) {
    const historial = this.obtenerHistorial(mascota);
    if (historial === null) return 0;

    let total = 0;
    historial.recorrer((atencion) => {
      total += atencion.costo;
    });
    return total;
  }

  // Nombres de todas las mascotas registradas
  nombres() {
    return Array.from(this.historiales.keys());
  }
}

module.exports = RegistroClinico;