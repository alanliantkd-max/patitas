const RegistroClinico = require("./registroClinico");
const Pila = require("./pila");

class Editor {
  constructor() {
    this.registro = new RegistroClinico();
    this.pilaDeshacer = new Pila();
    this.pilaRehacer = new Pila();
  }

  agregar(mascota, atencion) {
    this.registro.registrarAtencion(mascota, atencion);
    this.pilaDeshacer.apilar({ tipo: "agregar", mascota, atencion });
    this.pilaRehacer = new Pila(); // Paso 4: acción nueva vacía rehacer
  }

  eliminar(mascota, condicion) {
    const historial = this.registro.obtenerHistorial(mascota);
    if (historial === null) return null;

    const atencion = historial.buscar(condicion);
    if (atencion === null) return null; // no existe: no se toca nada

    // Guardar quién iba justo antes (null si era la cabeza)
    let anterior = null;
    let encontrado = false;
    historial.recorrer((dato) => {
      if (!encontrado) {
        if (dato === atencion) {
          encontrado = true;
        } else {
          anterior = dato;
        }
      }
    });

    historial.eliminar((dato) => dato === atencion);
    this.pilaDeshacer.apilar({ tipo: "eliminar", mascota, atencion, anterior });
    this.pilaRehacer = new Pila(); // acción nueva vacía rehacer
    return atencion;
  }

  deshacer() {
    if (this.pilaDeshacer.estaVacia()) return false; // sin errores

    const accion = this.pilaDeshacer.desapilar();
    this.revertir(accion);
    this.pilaRehacer.apilar(accion);
    return true;
  }

  rehacer() {
    if (this.pilaRehacer.estaVacia()) return false; // no hace nada

    const accion = this.pilaRehacer.desapilar();
    this.aplicar(accion);
    this.pilaDeshacer.apilar(accion);
    return true;
  }

  // Hace lo contrario de la acción
  revertir(accion) {
    const historial = this.registro.obtenerHistorial(accion.mascota);

    if (accion.tipo === "agregar") {
      historial.eliminar((dato) => dato === accion.atencion);
    } else if (accion.anterior === null) {
      historial.agregarAlInicio(accion.atencion);
    } else {
      historial.insertarDespuesDe((dato) => dato === accion.anterior, accion.atencion);
    }
  }

  // Vuelve a hacer la acción original
  aplicar(accion) {
    if (accion.tipo === "agregar") {
      this.registro.registrarAtencion(accion.mascota, accion.atencion);
    } else {
      const historial = this.registro.obtenerHistorial(accion.mascota);
      historial.eliminar((dato) => dato === accion.atencion);
    }
  }
}

module.exports = Editor;