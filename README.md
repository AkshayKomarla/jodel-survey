# Jodel's Survey API

This service is created for taking surveys from jodel's employees.
This project is built using [Fastify Js](https://github.com/fastify/fastify)

## Local environment setup

To run the server locally, create a `.env` file at project root.
You could base it off [`.env.default`](.env.default).

```shell
cp .env.default .env
```

Install dependencies

```shell
npm i
```

Start the service

```shell
npm run dev
```

## Swagger Docs

Start the project and visit the following url

http://localhost:4444/documentation/static/index.html

## Docker

The `Dockerfile` is based on `alpine:3.11` image. It is assumed that dependencies are built prior running the container.
