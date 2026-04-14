import express from "express";
import { env } from "node:process";
import appMiddleware from "./lib/app-middleware.js";
import cors from "cors";
import router from "./routes.js";
import logger from "./lib/logger.js";

const Sentry = require("@sentry/node");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  sendDefaultPii: true,
  tracesSampleRate: 1.0, // 1.0 = capture 100% of transactions\
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(router);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test Sentry endpoint
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("Sentry debug testing");
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled promise rejection", { reason });
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1); // always exit after an uncaught exception
});

app.listen(PORT, () => {
  const msg = `Server (${process.env.APP_NAME}) running on http://localhost:${PORT}`;
  console.log(msg);
  logger.info(msg);
});
