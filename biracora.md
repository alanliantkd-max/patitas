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

# Reto 2: Lista enlazada con cabeza y cola

## Dibujos previos

### Caso 1: agregarAlFinal en lista vacía
Antes:   cabeza → null    cola → null
Después: cabeza → [A] ← cola   (cabeza y cola apuntan al MISMO nodo)
Cambian: cabeza, cola, tamano (0 → 1)

### Caso 2: agregarAlFinal con un nodo
Antes:   cabeza → [A] ← cola
Después: cabeza → [A] → [B] ← cola
Cambian: A.siguiente (ahora apunta a B), cola (ahora es B), tamano. La cabeza NO cambia.

### Caso 3: agregarAlFinal con varios nodos
Antes:   cabeza → [A] → [B] → [C] ← cola
Después: cabeza → [A] → [B] → [C] → [D] ← cola
Cambian: C.siguiente, cola, tamano. La cabeza NO cambia.

### Caso 4: agregarAlInicio en lista vacía
Antes:   cabeza → null    cola → null
Después: cabeza → [A] ← cola
Cambian: cabeza, cola, tamano.

### Caso 5: agregarAlInicio con un nodo
Antes:   cabeza → [A] ← cola
Después: cabeza → [B] → [A] ← cola
Cambian: B.siguiente (apunta a A), cabeza (ahora es B), tamano. La cola NO cambia.

### Caso 6: agregarAlInicio con varios nodos
Antes:   cabeza → [A] → [B] → [C] ← cola
Después: cabeza → [X] → [A] → [B] → [C] ← cola
Cambian: X.siguiente, cabeza, tamano. La cola NO cambia.

## Complejidad de cada método

| Método | Complejidad | Por qué |
|---|---|---|
| agregarAlFinal | O(1) | Usa `cola`, no recorre nada |
| agregarAlInicio | O(1) | Usa `cabeza`, no recorre nada |
| recorrer | O(n) | Visita cada nodo una vez |
| aArreglo | O(n) | Usa recorrer, visita cada nodo una vez |
| estaVacia | O(1) | Solo compara el tamaño |
| obtenerTamano | O(1) | Solo devuelve el contador |

# Reto 3: Búsqueda, inserción intermedia y eliminación

## Dibujos de los tres casos de eliminación

### Eliminar la cabeza
Antes:   cabeza → [A] → [B] → [C] ← cola
Después: cabeza → [B] → [C] ← cola
Cambian: cabeza (ahora es B), tamano. La cola NO cambia.

### Eliminar un nodo intermedio
Antes:   cabeza → [A] → [B] → [C] ← cola
Después: cabeza → [A] → [C] ← cola
Cambian: A.siguiente (salta a C), tamano. Cabeza y cola NO cambian.

### Eliminar la cola
Antes:   cabeza → [A] → [B] → [C] ← cola
Después: cabeza → [A] → [B] ← cola
Cambian: B.siguiente (ahora null), cola (ahora es B), tamano.

## Complejidad

| Operación | Complejidad | Por qué |
|---|---|---|
| buscar | O(n) | En el peor caso recorre todos los nodos |
| insertarDespuesDe | O(n) | Busca el nodo (O(n)); el enlace en sí es O(1) |
| eliminar | O(n) | Busca el nodo con anterior y actual |

## ¿Por qué eliminar la cola requiere recorrer la lista?

En una lista simplemente enlazada cada nodo solo sabe cuál es el siguiente,
no cuál es el anterior. Para eliminar la cola necesito que el penúltimo nodo
pase a ser la nueva cola y que su `siguiente` quede en null. Pero la cola
no sabe quién es su penúltimo, así que la única forma de encontrarlo es
empezar desde la cabeza y recorrer hasta llegar al nodo anterior a la cola.
Por eso es O(n), aunque tengamos la referencia `cola`: sirve para agregar
al final, pero no para retroceder.