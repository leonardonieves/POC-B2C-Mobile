# POC-B2C-Mobile — Ejecutar localmente (instrucciones en español)

Resumen rápido

- Proyecto fullstack con cliente React (Vite) en `client/` y servidor Express en `server/`.
- En desarrollo el servidor usa `tsx` para ejecutar TypeScript y arranca Vite en `middlewareMode` para servir el cliente.
- Puerto por defecto: 5000 (puedes cambiarlo con la variable `PORT`).

Requisitos previos

- Node.js 18+ (recomendado 18 o 20). npm incluido.
- Git (opcional).

Pasos para ejecutar

1) Instalar dependencias

PowerShell:

```powershell
cd C:\Users\djlei\Desktop\POC-B2C-Mobile
npm install
```

2) Ejecutar en modo desarrollo (dev)

Esto ejecuta `tsx server/index.ts` y arranca Vite como middleware; el cliente se sirve con HMR.

PowerShell:

```powershell
# usa PORT si quieres exponer en otro puerto
$env:PORT = '5000'; npm run dev
```

El servidor escucha en `0.0.0.0` por defecto; abre http://localhost:5000 en tu navegador.

3) Compilar para producción y ejecutar

```powershell
npm run build
# luego
npm run start
```

Notas y consideraciones

- En Windows los scripts originales usaban `NODE_ENV=...` (sintaxis POSIX). agregado `cross-env` en `devDependencies` y los scripts ahora usan `cross-env` para compatibilidad.
- No necesitas instalar `tsx` globalmente; está en `devDependencies` y `npm install` lo instalará localmente.
- Replit-specific plugins sólo se cargan si `REPL_ID` está definido; no hacen falta localmente.
- Si quieres usar otro puerto en la misma línea (sin `cross-env`) en PowerShell usa `$env:PORT = '3000'; npm run dev`.

Comprobación rápida de endpoints

Después de `npm run dev` puedes probar un endpoint JSON:

PowerShell (Invoke-RestMethod):

```powershell
Invoke-RestMethod http://localhost:5000/api/schools
```

o con curl:

```powershell
curl http://localhost:5000/api/schools
```

Problemas comunes y soluciones

- Errores de tipos TypeScript (p. ej. "Cannot find module 'react'"): ejecutar `npm install` para instalar dependencias.
- Si `npm run dev` falla por `import.meta.dirname` o similares: asegúrate de usar la versión de `tsx` incluida (no Node directo) y Node >= 18.
- Si el puerto está en uso, establece otro con `$env:PORT = '3001'; npm run dev`.

Siguientes pasos recomendados

- Añadir un `.env.example` con variables esperadas (p. ej. PORT).
- Si piensas desplegar, configurar una base de datos real (ahora el servidor usa memoria en `server/storage.ts`).

Resumen de cambios realizados por mi parte

- Actualicé `package.json` para usar `cross-env` en los scripts `dev` y `start` (mejor compatibilidad en Windows).
- Añadí este `README.md` con instrucciones locales en PowerShell.

Si quieres, puedo:

- Ejecutar `npm install` y arrancar el servidor aquí para verificar (si me das permiso para ejecutar comandos en tu entorno de desarrollo).
- Añadir un `.env.example` y un script `check:env`.
- Cambiar `import.meta.dirname` a una alternativa compatible con Node puro (si prefieres no depender de `tsx`).

Dime qué prefieres que haga ahora.
