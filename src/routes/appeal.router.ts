import { Router, Request, Response } from "express"
import {
  cancelAppealValidationSchema,
  createAppealValidationSchema,
  doneAppealValidationSchema,
  validateAppealIdSchema,
} from "../utils/validationSchemas"
import appealController from "../controller/appeal.controller"
import { validationResult } from "express-validator"
import { validateNoExtraFields } from "../utils/validationNoExtraFields"
import { validationFilterSchemas } from "../utils/validationFilterSchemas"

const appealRouter = Router()

appealRouter.post(
  "/",
  validateNoExtraFields(["title", "description"]),
  createAppealValidationSchema,
  (req: Request, res: Response, next: any): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return appealController.create(req, res)
  }
)

appealRouter.get(
  "/",
  validationFilterSchemas,
  (req: Request, res: Response): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return appealController.getAll(req, res)
  }
)

appealRouter.get("/:id", (req: Request, res: Response): any =>
  appealController.getById(req, res)
)

appealRouter.patch(
  "/:id/progress",
  validateAppealIdSchema,
  (req: Request, res: Response): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return appealController.updateStatusProgress(req, res)
  }
)

appealRouter.patch(
  "/:id/done",
  validateAppealIdSchema,
  doneAppealValidationSchema,
  (req: Request, res: Response): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return appealController.updateStatusDone(req, res)
  }
)

appealRouter.patch(
  "/:id/cancel",
  validateAppealIdSchema,
  cancelAppealValidationSchema,
  (req: Request, res: Response): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return appealController.updateStatusClose(req, res)
  }
)

appealRouter.patch(
  "/cancel-all-progress",
  cancelAppealValidationSchema,
  (req: Request, res: Response): any => {
    return appealController.cancelAllProgress(req, res)
  }
)

export default appealRouter
