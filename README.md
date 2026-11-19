# Patitas Motor

Historial clínico de mascotas usando nodos enlazados manualmente en JavaScript.

## Cómo ejecutar
node pruebas/nodos.js

## Estructura
- src/Nodo.js: clase Nodo (dato y siguiente)
- pruebas/nodos.js: crea el historial de Lola, lo recorre y suma costos
- bitacora.md: diagrama y explicación del enlace perdido

# Patitas Motor v0.1

Motor de historiales clínicos para una clínica veterinaria. Guarda las
atenciones de cada mascota en listas enlazadas hechas a mano en JavaScript.

## Cómo ejecutarlo
node src/reporte.js

## Pruebas
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/borde.js

## Estructuras
- Nodo: guarda un dato y una referencia al siguiente.
- ListaEnlazada: cabeza, cola y tamaño; agrega al inicio y al final, recorre, busca, inserta y elimina.
- RegistroClinico: usa un Map con una ListaEnlazada por mascota.

# Patitas Motor v0.2

Motor de una clínica veterinaria hecho con estructuras de datos escritas a mano
en JavaScript: nodos, listas enlazadas, colas y pilas.

## Funcionalidades
- Historial clínico de cada mascota (lista enlazada).
- Sala de espera con prioridad: urgencias primero, y orden de llegada dentro de cada tipo (colas).
- Deshacer y rehacer sobre los registros (pilas).
- Simulación completa de la mañana: atención, historiales y corrección de un error.

## Cómo ejecutar
Simulación de la mañana:
node src/simulacion.js

Reporte de historiales:
node src/reporte.js

## Pruebas
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/borde.js
node pruebas/cola.js
node pruebas/recepcion.js
node pruebas/editor.js

## Estructuras
- Nodo, ListaEnlazada, RegistroClinico
- Cola, Recepcion
- Pila, Editor

La tabla con principio y complejidad de cada una está en bitacora.md.