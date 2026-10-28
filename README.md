# Auth Microservice

Microservicio de autenticación hecho con **NestJS** y **TypeScript**, parte del proyecto del curso [NestJS + Microservicios](https://www.udemy.com/course/nestjs-microservicios/) (Udemy, DevTalles). Escucha mensajes de **NATS**; el acceso HTTP es a través del [client-gateway](https://github.com/developer-ortega-microservicios/client-gateway).

> Proyecto de práctica, **en progreso**. Se actualiza a medida que avanza el curso.

## Arquitectura

```
client-gateway  ──NATS──→  auth-ms  →  MongoDB (Prisma)
```

Repositorios relacionados en la organización [developer-ortega-microservicios](https://github.com/developer-ortega-microservicios). Se ejecuta junto al resto de servicios desde el [launcher](https://github.com/developer-ortega-microservicios/products-launcher).

## Qué se va a construir

- Registro de usuarios con la contraseña **encriptada** (bcrypt)
- Inicio de sesión que devuelve un **JWT**
- Verificación y renovación de tokens para proteger las rutas del gateway
- Persistencia en **MongoDB** con **Prisma**
- Comunicación por **Message Patterns** sobre NATS
- Variables de entorno validadas con **Joi**

## Message Patterns

| Patrón | Descripción |
|--------|-------------|
| `auth.register.user` | Registrar un usuario |
| `auth.login.user` | Iniciar sesión (devuelve el token) |
| `auth.verify.user` | Verificar un token JWT |

## Stack técnico

- **NestJS** + **TypeScript**
- **Prisma** + **MongoDB**
- **JWT** (autenticación) y **bcrypt** (hash de contraseñas)
- **NATS** (`@nestjs/microservices`)
- **Joi** y **class-validator**
- **Vitest**, **Oxlint** y **Prettier**

## Cómo correrlo localmente

1. Tener corriendo el servidor de NATS (ver el README del [launcher](https://github.com/developer-ortega-microservicios/products-launcher)).

2. Clonar e instalar:
   ```bash
   git clone https://github.com/developer-ortega-microservicios/auth-ms.git
   cd auth-ms
   npm install
   ```
   Si npm falla con `Cannot read properties of null (reading 'edgesOut')`, usar `npm install --legacy-peer-deps`.

3. Crear un archivo `.env` en la raíz (usar `.env.example` como referencia):
   ```
   PORT=3004
   NATS_SERVERS=nats://localhost:4222
   DATABASE_URL=tu_cadena_de_conexion_de_mongodb
   JWT_SECRET=una_clave_larga_y_aleatoria
   ```

4. Iniciar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servicio |
| `NATS_SERVERS` | Servidores de NATS, separados por coma |
| `DATABASE_URL` | Cadena de conexión a MongoDB (contiene usuario y clave) |
| `JWT_SECRET` | Clave secreta para firmar los tokens |

> **Nunca subas el `.env`, la cadena de conexión ni el `JWT_SECRET` al repositorio.**

## Scripts disponibles

```bash
npm run start:dev   # Desarrollo con recarga automática
npm run build       # Compila a /dist
npm run start:prod  # Ejecuta el build
npm run lint        # Oxlint
npm run test        # Pruebas unitarias
```
