import { checkSchema } from "express-validator"
import dayjs from "dayjs"
import { AppealStatus } from "../../../generated/prisma"

export const validationFilterSchemas = checkSchema({
  date: {
    in: ["query"],
    optional: true,
    isISO8601: {
      errorMessage: "Некорректная дата",
    },
    custom: {
      options: (value) => {
        const date = dayjs(value)
        if (!date.isValid()) {
          throw new Error("Некорректная дата")
        }
        return true
      },
    },
  },
  startDate: {
    in: ["query"],
    optional: true,
    isISO8601: {
      errorMessage: "Некорректная дата",
    },
    isDate: {
      errorMessage: "Некорректная дата",
    },
    custom: {
      options: (value) => {
        const date = dayjs(value)
        if (!date.isValid()) {
          throw new Error("Некорректная дата")
        }
        return true
      },
    },
  },
  endDate: {
    in: ["query"],
    optional: true,
    isISO8601: {
      errorMessage: "Некорректная дата",
    },
    isDate: {
      errorMessage: "Некорректная дата",
    },
    custom: {
      options: (value) => {
        const date = dayjs(value)
        if (!date.isValid()) {
          throw new Error("Некорректная дата")
        }
        return true
      },
    },
  },
  status: {
    in: ["query"],
    optional: true,
    isString: {
      errorMessage: "Статус должен быть строкой",
    },
    isIn: {
      options: [Object.values(AppealStatus)],
      errorMessage: "Некорректный статус",
    },
  },
  page: {
    in: ["query"],
    optional: true,
  },
  limit: {
    in: ["query"],
    optional: true,
  },
})
