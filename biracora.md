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

# Reto 4: Patitas v0.1 - Historiales completos

## Diagrama de la estructura

```
RegistroClinico
  historiales (Map)
    "Lola" → cabeza → [02/02 Vacunación] → [15/03 Control] → [20/05 Limpieza] ← cola
    "Toby" → cabeza → [10/01 Cojera] → [12/01 Radiografía] → [05/04 Vacunación] ← cola
    "Mía"  → cabeza → [18/02 Esterilización] → [25/02 Control posquirúrgico] ← cola
```

## Tabla comparativa: ListaEnlazada vs arreglo

| Operación | ListaEnlazada | Arreglo | Por qué |
|---|---|---|---|
| Agregar al final | O(1) | O(1) | La lista usa `cola`; el arreglo usa `push` |
| Agregar al inicio | O(1) | O(n) | El arreglo debe mover todos los elementos una posición |
| Acceder a la atención número k | O(k) ≈ O(n) | O(1) | La lista recorre desde la cabeza; el arreglo salta al índice |
| Buscar por condición | O(n) | O(n) | Ambos revisan elemento por elemento |
| Eliminar la primera | O(1) | O(n) | La lista solo mueve `cabeza`; el arreglo desplaza todo a la izquierda |

## Conclusión

Un historial clínico crece casi siempre al final y se recorre completo, y ahí
la lista enlazada rinde bien. Si se consultara mucho "la atención número k",
un arreglo sería mejor.

## Comparación: Cola vs arreglo (100.000 turnos)

| Operación | Tiempo medido |
|---|---|
| Cola: encolar 100.000 | ___ ms |
| Cola: desencolar 100.000 | ___ ms |
| Arreglo: push 100.000 | ___ ms |
| Arreglo: shift 100.000 | ___ ms |

## Complejidad

| Operación | Cola (nodos) | Arreglo | Por qué |
|---|---|---|---|
| Encolar / push | O(1) | O(1) | La cola usa `final`; el arreglo agrega en su última posición |
| Desencolar / shift | O(1) | O(n) | La cola solo mueve `frente`; `shift` debe correr todos los elementos una posición a la izquierda |

## Diferencia

Desencolar en la cola solo cambia la referencia `frente` al siguiente nodo, sin
tocar el resto. `shift()` en un arreglo, en teoría, tiene que mover cada
elemento restante una posición, por lo que su costo crece con el tamaño (O(n)).
En mi medición, [explica aquí qué viste: cuál fue más rápido y por cuánto].

## Comparación manual vs programa

Resultado: coincidió / no coincidió.

(Solo si hubo diferencia)
- Síntoma: el programa atendió a Max antes que a Rocky.
- Hipótesis: Rocky llegó a las 9:00 justo cuando se liberaba el consultorio
  y mi simulación lo registró después de llamar al siguiente.
- Corrección: registrar las llegadas (`llegada <= tiempo`) antes de llamar.

# Reto 8: Patitas v0.2 - Recepción completa

## Tabla de estructuras

| Estructura | Principio | Uso en Patitas | Operaciones principales |
|---|---|---|---|
| Nodo | Secuencial | Pieza básica: guarda un dato y apunta al siguiente | Crear: O(1) |
| ListaEnlazada | Secuencial | Historial de atenciones de cada mascota | agregarAlFinal O(1), agregarAlInicio O(1), buscar O(n), insertarDespuesDe O(n), eliminar O(n) |
| RegistroClinico | Secuencial (Map de listas) | Un historial por mascota, buscado por nombre | registrarAtencion O(1), obtenerHistorial O(1) |
| Cola | FIFO | Sala de espera: el primero que llega es el primero atendido | encolar O(1), desencolar O(1) |
| Recepcion | FIFO con prioridad (dos colas) | Urgencias antes que consultas generales | registrarLlegada O(1), llamarSiguiente O(1) |
| Pila | LIFO | Guarda las acciones para deshacer y rehacer | apilar O(1), desapilar O(1), verTope O(1) |
| Editor | LIFO (dos pilas) | Registra atenciones y permite corregir errores | agregar O(1), deshacer y rehacer O(n) en el peor caso |

Nota: `deshacer` y `rehacer` son O(n) en el peor caso porque, al quitar
una atención de la lista, `eliminar` debe recorrer los nodos hasta encontrarla.
Las operaciones de las pilas en sí son O(1).

## Cálculo manual de la simulación

(Es el del reto 6: orden Toby, Luna, Kira, Rocky, Max, Simón, Nala.
Promedios: urgencias 8,33 min, generales 58,75 min.)

## Traza de la corrección del error

Las pilas se leen de la base al tope.

| Momento | Historial de Nala | Historial de Kira | Pila deshacer | Pila rehacer |
|---|---|---|---|---|
| Antes de atender a Kira | vacío | vacío | [+Toby, +Luna] | [ ] |
| Error: se registra Kira en Nala | [Kira] | vacío | [+Toby, +Luna, +Kira→Nala] | [ ] |
| deshacer | vacío | vacío | [+Toby, +Luna] | [+Kira→Nala] |
| Registro correcto en Kira | vacío | [Kira] | [+Toby, +Luna, +Kira] | [ ] |

Al registrar de nuevo, la pila de rehacer se vació: la acción equivocada
ya no se puede rehacer, como pasa en cualquier editor.

## Comparación manual vs programa

Resultado: coincidió / no coincidió. (Si hubo diferencia, anota síntoma,
hipótesis y corrección.)

# Reto 9: Catálogo anidado (recursión)

## Diseño de las funciones

### contarServicios(categoria)
- Caso base: una categoría sin subcategorías. El `for` no entra y devuelve
  solo sus propios servicios (implícito).
- Reducción: se llama a la función con cada subcategoría, que es un
  catálogo más pequeño.
- Combinación: servicios propios + suma de lo que devuelve cada subcategoría.

### listarCatalogo(categoria, nivel)
- Caso base: una categoría sin subcategorías. Imprime su nombre y servicios y
  el `for` no entra.
- Reducción: se llama con cada subcategoría y con nivel + 1.
- Combinación: no devuelve nada. Imprime su nombre, sus servicios y luego lo
  que imprimen sus subcategorías, con más sangría.

### profundidad(categoria)
- Caso base: una categoría sin subcategorías tiene profundidad 1.
- Reducción: se llama con cada subcategoría.
- Combinación: 1 + la mayor profundidad entre sus subcategorías.

## Traza de contarServicios(Cirugías)

Cirugías tiene 0 servicios propios y dos subcategorías.

```
contarServicios(Cirugías)             total = 0
  │
  ├─ contarServicios(Esterilización)  total = 2, sin subcategorías
  │     devuelve 2
  │
  │  total = 0 + 2 = 2
  │
  ├─ contarServicios(Limpieza dental) total = 1, sin subcategorías
  │     devuelve 1
  │
  │  total = 2 + 1 = 3
  │
  devuelve 3
```

## Pila de llamadas (el tope está arriba)

| Momento | Pila de llamadas |
|---|---|
| 1. Empieza | Cirugías |
| 2. Llama a Esterilización | Esterilización, Cirugías |
| 3. Esterilización termina (devuelve 2) | Cirugías |
| 4. Llama a Limpieza dental | Limpieza dental, Cirugías |
| 5. Limpieza dental termina (devuelve 1) | Cirugías |
| 6. Cirugías termina (devuelve 3) | vacía |

Es el mismo principio LIFO de la `Pila` del reto 7: la última llamada
en entrar es la primera en terminar.