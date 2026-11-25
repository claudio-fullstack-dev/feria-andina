/**
 * Representa un ítem dentro del carrito de compras.
 */
export interface ItemCarrito {
  precio: number;
  cantidad: number;
  descuento?: number;
}

/**
 * Redondea un monto a 2 decimales compensando imprecisiones de punto flotante.
 */
function redondearADosDecimales(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula el total de los ítems del carrito aplicando el descuento opcional (entre 0 y 1)
 * y devolviendo el resultado redondeado a 2 decimales.
 */
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
