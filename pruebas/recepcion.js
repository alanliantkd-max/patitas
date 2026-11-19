const Recepcion = require("../src/recepcion");

function verificar(descripcion, obtenido, esperado) {
  const ok = JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✔" : "✘"} ${descripcion}`);
  if (!ok) console.log("   esperado:", esperado, "obtenido:", obtenido);
}

const r = new Recepcion();

verificar("sala vacía: llamarSiguiente devuelve null", r.llamarSiguiente(), null);
verificar("sala vacía: hayEspera es false", r.hayEspera(), false);

r.registrarLlegada({ mascota: "Toby", tipo: "General" });
r.registrarLlegada({ mascota: "Max", tipo: "General" });
r.registrarLlegada({ mascota: "Luna", tipo: "Urgencia" });

verificar("hayEspera es true", r.hayEspera(), true);
verificar("primero la urgencia", r.llamarSiguiente().mascota, "Luna");
verificar("luego el general más antiguo", r.llamarSiguiente().mascota, "Toby");
verificar("luego el siguiente general", r.llamarSiguiente().mascota, "Max");
verificar("sala vacía otra vez: null", r.llamarSiguiente(), null);