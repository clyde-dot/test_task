import { Request, Response } from "express"
import appealService from "../services/appeal.service"
import { ParamsDictionary } from "express-serve-static-core"
import { AppealStatus } from "../../generated/prisma"
import logger from "../utils/pino.logger"

class AppealController {
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body

      const newAppeal = await appealService.create({ title, description })
      logger.info(`Appeal ${newAppeal.id} created`)

      return res.status(201).json({ message: "Обращение успешно создано" })
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const appeals = await appealService.getAll(req, res)

      return res.status(200).json(appeals)
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params as ParamsDictionary
      const appeal = await appealService.getById(id)

      if (!appeal) {
        return res.status(404).json({ message: "Обращение не найдено" })
      }

      return res.status(200).json(appeal)
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async updateStatusProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params as ParamsDictionary

      const appeal = await appealService.updateStatus(id, {
        status: AppealStatus.IN_PROGRESS,
      })

      logger.info(`Appeal ${appeal.id} in progress`)

      return res
        .status(200)
        .json({ message: "Обращение успешно взято в работу" })
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async updateStatusDone(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params as ParamsDictionary
      const solutionProblem = req.body?.solutionProblem || null

      const appeal = await appealService.updateStatus(id, {
        status: AppealStatus.DONE,
        solutionProblem,
      })

      logger.info(`Appeal ${appeal.id} done`)

      return res.status(200).json({ message: "Обращение успешно завершено" })
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async updateStatusClose(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params as ParamsDictionary
      const cancelReason = req.body?.cancelReason || null

      const appeal = await appealService.updateStatus(id, {
        status: AppealStatus.CANCELLED,
        cancelReason,
      })

      logger.info(`Appeal ${appeal.id} cancelled`)

      return res.status(200).json({ message: "Обращение успешно отменено" })
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async cancelAllProgress(req: Request, res: Response): Promise<Response> {
    try {
      const cancelReason = req.body?.cancelReason || null
      const isSuccess = await appealService.cancelAllProgress(cancelReason)
      if (!isSuccess) {
        return res
          .status(404)
          .json({ message: "Обращения с статусом 'В работе' не найдены" })
      }
      logger.info(`All progress appeals cancelled`)
      return res
        .status(200)
        .json({ message: "Все обращения с статусом 'В работе' отменены" })
    } catch (error: Error | any) {
      logger.error(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default new AppealController()
