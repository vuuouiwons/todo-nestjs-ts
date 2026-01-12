const promBundle = require("express-prom-bundle");

export const expressMetricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    promClient: {
        collectDefaultMetrics: {}
    },
    // Disable the default /metrics endpoint so we can use our custom one
    autoregister: false
});