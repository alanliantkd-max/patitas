# Bitácora - Patitas Motor

## Diagrama de nodos

```
cabeza
  │
  ▼
┌──────────────────┬───┐   ┌──────────────────┬───┐   ┌──────────────────┬──────┐
│ 02/02 Vacunación │ ──┼──►│ 15/03 Control    │ ──┼──►│ 20/05 Limpieza   │ null │
│ Dra. Ríos $85000 │   │   │ Dr. Gómez $40000 │   │   │ Dra. Ríos $150000│      │
└──────────────────┴───┘   └──────────────────┴───┘   └──────────────────┴──────┘
      nodo1                       nodo2                      nodo3
```

## Experimento: perder un enlace

Probé asignando `nodo1.siguiente = null`.

Resultado: el recorrido solo imprimió la vacunación y el costo total fue $85.000.

Explicación: el recorrido solo avanza siguiendo las flechas. Al borrar la flecha del
primer nodo, `nodo2` y `nodo3` quedan sin que nadie apunte a ellos, así que el
programa ya no puede llegar a esas atenciones. En una carpeta real sería como
perder la hoja que dice cuál es la siguiente: los datos existen, pero no se
puede llegar a ellos. Después quité esa línea para dejar el código correcto.