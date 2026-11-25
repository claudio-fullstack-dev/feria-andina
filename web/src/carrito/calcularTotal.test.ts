import { describe, it, expect } from 'vitest';
import { calcularTotal, type ItemCarrito } from './calcularTotal';

describe('calcularTotal', () => {
  it('devuelve 0 cuando el carrito está vacío', () => {
    const items: ItemCarrito[] = [];
    expect(calcularTotal(items)).toBe(0);
  });

  it('calcula el total de un producto con descuento y redondea a 2 decimales', () => {
    const items: ItemCarrito[] = [
      { precio: 100, cantidad: 2, descuento: 0.15 },
    ];
    expect(calcularTotal(items)).toBe(170);

    const conDecimales: ItemCarrito[] = [
      { precio: 19.99, cantidad: 1, descuento: 0.15 },
    ];
    expect(calcularTotal(conDecimales)).toBe(16.99);
  });

  it('lanza "Cantidad inválida" cuando alguna cantidad es negativa', () => {
    const items: ItemCarrito[] = [
      { precio: 50, cantidad: 1 },
      { precio: 100, cantidad: -2 },
    ];
    expect(() => calcularTotal(items)).toThrow('Cantidad inválida');
  });

  it('lanza error si el descuento está fuera del rango de 0 a 1', () => {
    const items: ItemCarrito[] = [
      { precio: 100, cantidad: 1, descuento: 1.5 },
    ];
    expect(() => calcularTotal(items)).toThrow('Descuento inválido');
  });
});
