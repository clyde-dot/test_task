import { checkSchema } from "express-validator"
import appealService from "../../services/appeal.service"

export const createAppealValidationSchema = checkSchema({
  title: {
    isString: {
      errorMessage: "Заголовок должен быть строкой",
    },
    notEmpty: {
      errorMessage: "Заголовок не может быть пустым",
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: "Заголовок должен быть от 3 до 50 символов",
    },
    trim: true,
  },
  description: {
    isString: {
      errorMessage: "Описание должно быть строкой",
    },
    notEmpty: {
      errorMessage: "Описание не может быть пустым",
    },
    isLength: {
      options: { min: 10, max: 300 },
      errorMessage: "Описание должно быть от 10 до 300 символов",
    },
    trim: true,
  },
})

export const validateAppealIdSchema = checkSchema({
  id: {
    in: ["params"],
    custom: {
      options: async (id: string) => {
        if (!id) {
          throw new Error("id не может быть пустым")
        }
        const appeal = await appealService.getById(id)

        if (!appeal) {
          throw new Error("Обращение не найдено")
        }
        return true
      },
    },
  },
})

export const doneAppealValidationSchema = checkSchema({
  solutionProblem: {
    optional: true,
    isString: {
      errorMessage: "Поле должно быть строкой",
    },
    notEmpty: {
      errorMessage: "Поле не может быть пустым",
    },
    isLength: {
      options: { min: 3, max: 300 },
      errorMessage: "Поле должно быть от 3 до 300 символов",
    },
    trim: true,
  },
})

export const cancelAppealValidationSchema = checkSchema({
  cancelReason: {
    optional: true,
    isString: {
      errorMessage: "Поле должно быть строкой",
    },
    notEmpty: {
      errorMessage: "Поле не может быть пустым",
    },
    isLength: {
      options: { min: 3, max: 300 },
      errorMessage: "Поле должно быть от 3 до 300 символов",
    },
    trim: true,
  },
})
