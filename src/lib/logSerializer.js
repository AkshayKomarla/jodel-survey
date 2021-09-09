const pino = require("pino");
const { OPEN_TRACING_HEADERS } = require("../commons/constants");

const tracingHeaders = [...OPEN_TRACING_HEADERS, "referer", "user-agent"];

function requestSerializer(req) {
  return {
    ...pino.stdSerializers.req(req),
    ip: req.ip,
    headers: tracingHeaders.reduce((acc, key) => {
      const value = req.headers[key];
      return value ? { ...acc, [key]: value } : acc;
    }, {}),
  };
}

function responseSerializer(res) {
  return { statusCode: res.statusCode };
}

module.exports = { requestSerializer, responseSerializer };
