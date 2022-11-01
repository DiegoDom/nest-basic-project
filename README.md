<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h1 align="center">Basic NestJS proyect</h1>

Este es un proyecto con que funciona como plantilla para expandir cualquier proyecto en NestJS.

>**Nota:** Incluye el modulo de autenticación y usuarios.

## Ficha técnica
<ol>
  <li>Base de datos: MySQL</li>
  <li>Plataforma: Express</li>
  <li>API: REST</li>
  <li>Autenticación: JWT</li>
</ol>

## Configuración
1. Tener Nest CLI instalado
```bash
$ npm i -g @nestjs/cli
```
2. Configurar las variables de entorno en ```.env``` (utiliza ```.env.example``` como plantilla).
```bash
# puerto donde corre la app
PORT=3000

# HOST de la base de datos MySQL
DB_HOST=localhost

# Puerto de la base de datos de MySQL
DB_PORT=3306

# Nombre de la base de datos de MySQL
DB_NAME=

# Usuario para la conexion a MySQL
DB_USERNAME=

# Contraseña para la conexion a MySQL
DB_PASSWORD=

# Secret para firmar los JWT
JWT_SECRET=
```

>**Nota:** [Genera un secret aleatorio](https://generate-secret.vercel.app/32) en este enlace.

## Instalación de los paquetes

```bash
$ yarn install
```

## Corriendo la app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```