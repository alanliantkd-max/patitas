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