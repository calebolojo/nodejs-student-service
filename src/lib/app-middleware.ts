import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import logger from "./logger.js";

const appMiddleware = express();
appMiddleware.use(express.json());

// ── Request logging middleware ──────────────────────────────────
appMiddleware.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP Request", {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  });

  next();
});

appMiddleware.get("/error-test", (req, res) => {
  throw new Error("Test error — check CloudWatch!");
});

// ── Global error handler ────────────────────────────────────────
// Must have 4 arguments so Express treats it as an error handler
appMiddleware.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error("Unhandled error", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
    });

    res.status(500).json({ error: "Internal Server Error" });
  },
);

export default appMiddleware;
