export interface ItemCarrito {
  precio: number;
  cantidad: number;
  descuento?: number;
}

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
