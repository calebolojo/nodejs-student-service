import winston from "winston";
import WinstonCloudwatch from "winston-cloudwatch";

const isProduction = process.env.NODE_ENV === "production";

// Shared log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }), // includes stack traces
  winston.format.json(),
);

const transports: winston.transport[] = [
  // Always log to console
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
];

// Only stream to CloudWatch in production
if (isProduction) {
  transports.push(
    new WinstonCloudwatch({
      logGroupName: `/my-app/${process.env.NODE_ENV as string}`,
      logStreamName: () =>
        // New stream per day — keeps CloudWatch organized
        `app-${new Date().toISOString().slice(0, 10)}`,
      awsRegion: process.env.AWS_REGION as string,
      jsonMessage: true, // send structured JSON, not plain strings
      retentionInDays: 30, // auto-expire old logs
      uploadRate: 2000, // flush to CloudWatch every 2 seconds
    }),
  );
}

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: logFormat,
  transports,
});

export default logger;
