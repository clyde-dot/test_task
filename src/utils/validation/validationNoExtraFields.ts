import { NextFunction, Request, Response } from "express"

export const validateNoExtraFields = (allowedFields: string[]) : any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    )

    if (extraFields.length > 0) {
      return res.status(400).json({
        error: `Недопустимые поля: ${extraFields.join(", ")}`,
      })
    }

    next()
  }
}
