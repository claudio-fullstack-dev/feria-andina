import { describe, it, expect } from 'vitest';
import { calcularTotal } from './calcularTotal';

describe('calcularTotal', () => {
  it('devuelve 0 con carrito vacío', () => {
    expect(calcularTotal([])).toBe(0);
  });

  it('calcula un producto con descuento', () => {
    expect(calcularTotal([{ precio: 100, cantidad: 2, descuento: 0.1 }])).toBe(180);
  });

  it('lanza error si la cantidad es negativa', () => {
    expect(() => calcularTotal([{ precio: 10, cantidad: -1 }])).toThrow('Cantidad inválida');
  });
});
