# Jodel's Survey API

[![Lint](https://github.com/AkshayKomarla/jodel-survey/actions/workflows/ci.yaml/badge.svg)](https://github.com/AkshayKomarla/jodel-survey/actions/workflows/ci.yaml)

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

### Postman Collection

Use the postman collection located here [jodel survey api's](./jodel_survey.postman_collection.json)

## Docker

The `Dockerfile` is based on `alpine:3.11` image. It is assumed that dependencies are built prior running the container.

## CI Pipeline

This project uses `github actions` to check Lint issues for every commit and pull request to master
The CI config can be found in path `./.github/workflows/ci.yaml`
