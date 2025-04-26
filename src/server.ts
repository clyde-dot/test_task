import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import morgan from "morgan"
import router from "./routes/routes"
import logger from "./utils/pino.logger"

export const prisma = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

async function main() {
  app.use(express.json())
  app.use("/api", router)
  app.use(morgan(":method :url :status"))
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
  app.all("/", (req: Request, res: Response) => {
    res.status(404).json({ message: `Not found` })
  })

  app.listen(port, () => {
    logger.info(`Server started on port ${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e: Error) => {
    console.error(e.message)
    await prisma.$disconnect()
    process.exit(1)
  })
