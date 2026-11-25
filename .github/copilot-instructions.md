# Instrucciones para GitHub Copilot · Feria Andina

Seguí las mismas reglas definidas en `AGENTS.md` (sin contradicciones).

## Stack
- Front: React + TypeScript + Redux Toolkit (`/web`).
- Back: Node + Express + PostgreSQL (`/api`).

## Comandos
- En `/web`:
  - `npm test`: ejecuta los tests con Vitest (`vitest run`).
  - `npm run typecheck`: verifica TypeScript estricto (`tsc --noEmit`).

## Convenciones
- TypeScript estricto: no usar `any`.
- Nombres del dominio (tipos, funciones, variables y tests) en español.
- Commits siguiendo Conventional Commits.

## No hacer
- No agregar ni instalar dependencias nuevas sin avisar primero.
- No leer ni modificar archivos `.env`.
