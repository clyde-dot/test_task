import pino from "pino"

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  },
  timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
})

export default logger
