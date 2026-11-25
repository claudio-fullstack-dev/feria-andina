# Comparativa M1 · calcularTotal

## Herramientas usadas
- Herramienta A: Antigravity
- Herramienta B: (completar al ejecutar la segunda herramienta)

## Comparación
| Criterio | Herramienta A | Herramienta B |
|---|---|---|
| Tiempo hasta una versión aceptable | 1 iteración (código + verificación) | |
| Correcciones necesarias | 0 en lógica/tests (avisó antes de instalar Vitest/TypeScript) | |
| Tests (¿pasan? ¿cubren casos borde?) | Sí (4/4 en Vitest). Cubren carrito vacío, descuento con redondeo, cantidad negativa y descuento fuera de rango | |
| Fidelidad a AGENTS.md | Alta: TS estricto sin `any`, nombres en español, avisó antes de agregar dependencias, no tocó `.env`, usó Conventional Commits | |

## Qué acepté, qué corregí y por qué
- **Herramienta A (Antigravity):** Acepté la interfaz `ItemCarrito`, el redondeo seguro con `Number.EPSILON` y la validación de precios negativos y descuentos fuera de `[0, 1]`. Autorizamos expresamente la instalación de `vitest` y `typescript` tras el aviso de la regla.
- **Herramienta B:** (completar luego de correr la segunda herramienta en su propia rama).

## Un caso borde que el prompt no contemplaba
- Valores de `descuento` fuera del rango `0..1` (o `NaN`), `precio` negativo o no finito (`NaN`/`Infinity`), `cantidad` no finita y errores de precisión de punto flotante al redondear a 2 decimales (como `19.99 * 0.85` o `1.005`).
