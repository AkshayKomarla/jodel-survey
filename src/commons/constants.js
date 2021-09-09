const OPEN_TRACING_HEADERS = [
  "x-request-id",
  "x-b3-traceid",
  "x-b3-spanid",
  "x-b3-parentspanid",
  "x-b3-sampled",
  "x-b3-flags",
  "x-ot-span-context",
  "x-perf-id",
];

const ERROR_CODES = {
  NOT_FOUND: "NOT_FOUND",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
};

module.exports = { OPEN_TRACING_HEADERS, ERROR_CODES };
