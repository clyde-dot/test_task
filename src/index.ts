import express from "express"
import { configDotenv } from "dotenv"

function start(): void {
  configDotenv()

  const app = express()
  const PORT = process.env.PORT || 5000

  app.listen(PORT, () => console.log(`Running on port ${PORT}`))
}

start()
