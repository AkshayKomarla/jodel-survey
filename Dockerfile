FROM mhart/alpine-node:12.20 as builder

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

COPY . /app

FROM alpine:3.11

COPY --from=builder /usr/bin/node /usr/bin/
COPY --from=builder /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/

RUN apk add --no-cache tini=0.18.0-r0

COPY --from=builder /app /app

WORKDIR /app

ENV PORT=4444 \
    NODE_ENV=production \
    LOG_LEVEL=info

EXPOSE $PORT

# an init entrypoint that simplifies signal handling 
ENTRYPOINT ["tini", "--"]

CMD ["node", "--max-http-header-size", "24000", "index.js"]
