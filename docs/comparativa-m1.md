# Comparativa M1 · calcularTotal

## Herramientas usadas
- Herramienta A: Antigravity (Gemini 4 Hydrogen) → rama `feat/antigravity`
- Herramienta B: Claude Sonnet 4.6 (Thinking) → rama `feat/claude-sonnet`

## Comparación

| Criterio | Herramienta A · Antigravity | Herramienta B · Claude Sonnet 4.6 |
|---|---|---|
| Tiempo hasta una versión aceptable | 1 iteración. Pidió permiso antes de instalar dependencias | 1 iteración. Generó el código directamente sin consultar |
| Correcciones necesarias | 0 en lógica. Avisó sobre la falta de `package.json` y Vitest antes de proceder | 0 en lógica. No consultó sobre dependencias (ya estaban instaladas) |
| Tests (¿pasan? ¿cubren casos borde?) | ✅ 4/4. Cubre: carrito vacío, descuento con redondeo a 2 decimales (`19.99 * 0.85`), cantidad negativa y descuento fuera de rango (`> 1`) | ✅ 3/3. Cubre: carrito vacío, producto con descuento, cantidad negativa. No cubre descuento fuera de rango ni precisión de punto flotante |
| Fidelidad a AGENTS.md | Alta: `readonly`, sin `any`, nombres en español, Conventional Commits, avisó antes de agregar dependencias, no tocó `.env` | Media-alta: sin `any`, nombres en español, Conventional Commits. Usó `ItemCarrito[]` mutable en lugar de `readonly`. No validó descuento fuera de rango ni precios negativos |

## Qué acepté, qué corregí y por qué

**Herramienta A (Antigravity):**
- Acepté la función sin cambios: lógica completa, tests exhaustivos, redondeo con `Number.EPSILON` para evitar errores de punto flotante y validación de precio, descuento y cantidad.
- Autorizamos expresamente la instalación de `vitest` y `typescript` tras el aviso de la herramienta (respetó la regla de no agregar dependencias sin avisar).

**Herramienta B (Claude Sonnet 4.6):**
- Acepté la implementación en la rama comparativa para mantener la prueba fiel al primer resultado, pero **para llevarla a producción la corregiría** en dos puntos: agregar validación de `descuento` en `[0, 1]` y `precio >= 0`, y usar `Number.EPSILON` en el redondeo (ya que `Math.round(total * 100) / 100` puede redondear mal valores límite como `1.005`).
- No consultó sobre dependencias porque `vitest` y `typescript` ya estaban instalados en `main`.

## Un caso borde que el prompt no contemplaba
El prompt no dice qué hacer si `descuento` es mayor a 1 (ej. `descuento: 2.5`) o negativo, si `precio` es negativo, o si `cantidad` es `NaN` o `Infinity`. Tampoco menciona los errores de redondeo de punto flotante en JavaScript (ej. `19.99 * 0.85 = 16.991499...` o `1.005`).

- **Herramienta A** validó todos estos casos y usó `Number.EPSILON` para el redondeo.
- **Herramienta B** solo validó cantidad negativa (lo que el prompt pide explícitamente).

## Evidencia (resultados de tests y fragmentos)

### Salida de `npm run typecheck` y `npm test` (`vitest run`)

**Rama `feat/antigravity` (`6903158`):**
```text
> feria-andina-web@0.1.0 typecheck
> tsc --noEmit

> feria-andina-web@0.1.0 test
> vitest run

 ✓ src/carrito/calcularTotal.test.ts (4 tests) 4ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
```

**Rama `feat/claude-sonnet` (`528b5fa`):**
```text
> feria-andina-web@0.1.0 typecheck
> tsc --noEmit

> feria-andina-web@0.1.0 test
> vitest run

 ✓ src/carrito/calcularTotal.test.ts (3 tests) 4ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
```

### Comparación de fragmentos clave (`calcularTotal.ts`)

**Antigravity (`feat/antigravity`) — tipado `readonly`, validaciones y redondeo seguro:**
```ts
function redondearADosDecimales(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function calcularTotal(items: readonly ItemCarrito[]): number {
  let total = 0;

  for (const item of items) {
    if (!Number.isFinite(item.cantidad) || item.cantidad < 0) {
      throw new Error('Cantidad inválida');
    }
    if (!Number.isFinite(item.precio) || item.precio < 0) {
      throw new Error('Precio inválido');
    }
    const descuento = item.descuento ?? 0;
    if (!Number.isFinite(descuento) || descuento < 0 || descuento > 1) {
      throw new Error('Descuento inválido');
    }
    total += item.precio * item.cantidad * (1 - descuento);
  }

  return redondearADosDecimales(total);
}
```

**Claude Sonnet 4.6 (`feat/claude-sonnet`) — implementación mínima directa:**
```ts
export function calcularTotal(items: ItemCarrito[]): number {
  let total = 0;

  for (const item of items) {
    if (item.cantidad < 0) {
      throw new Error('Cantidad inválida');
    }

    const descuento = item.descuento ?? 0;
    const subtotal = item.precio * item.cantidad * (1 - descuento);
    total += subtotal;
  }

  return Math.round(total * 100) / 100;
}
```
