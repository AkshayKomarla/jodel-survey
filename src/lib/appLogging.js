const { kDisableRequestLogging } = require("fastify/lib/symbols");

function isLogged(url) {
  return !url.endsWith("/health") && !url.endsWith("/metrics");
}

function makeAttachLoggerWithRequestContext(logger) {
  // Only normal functions are bound to `this`
  return async function attachLoggerWithRequestContext(req, res) {
    if (isLogged(req.raw.url)) {
      const childLogger = logger.child({ req: { ...req.raw, ip: req.ip } });
      // `fastify` does not respect `disableRequestLogging` when logger replaced inside a hook
      childLogger[kDisableRequestLogging] = true;

      this.log = childLogger;
      req.log = childLogger;
      res.log = childLogger;

      req.log.info(
        {
          reqURLPattern: res.context.config.url || req.raw.url,
        },
        `Request received for ${req.raw.method} ${req.raw.url}`
      );
    }
  };
}

async function rememberResponsePayloadOnError(_req, res, payload) {
  const isSelfResponseLogged = this.config.LOG_SELF_RESPONSE;
  if (res.statusCode >= 400 || isSelfResponseLogged) {
    res.res.payload = payload;
  }
}

module.exports = {
  makeAttachLoggerWithRequestContext,
  rememberResponsePayloadOnError,
};
